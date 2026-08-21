import { rmSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawn } from 'node:child_process';

interface RunResult {
  stdout: string;
  stderr: string;
}

const root = process.cwd();
const workspace = resolve(root, '.tmp', 'install-snippet-smoke');
const packDir = join(workspace, 'pack');
const projectDir = join(workspace, 'project');
const isWindows = process.platform === 'win32';

function shimmedCommand(command: string, args: string[]): { command: string; args: string[] } {
  if (!isWindows) {
    return { command, args };
  }

  return {
    command: process.env.ComSpec ?? 'cmd.exe',
    args: ['/d', '/s', '/c', command, ...args],
  };
}

function run(
  command: string,
  args: string[],
  options: {
    cwd?: string;
    timeoutMs?: number;
    input?: string;
    successText?: string;
    shell?: boolean;
  } = {}
): Promise<RunResult> {
  return new Promise((resolveRun, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd ?? root,
      shell: options.shell ?? false,
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';
    let settled = false;
    const finish = (result: RunResult): void => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      resolveRun(result);
    };
    const fail = (error: Error): void => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      reject(error);
    };
    const timer = setTimeout(() => {
      child.kill('SIGTERM');
      fail(new Error(`Command timed out: ${command} ${args.join(' ')}`));
    }, options.timeoutMs ?? 30000);

    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', chunk => {
      stdout += chunk;
      if (options.successText && stdout.includes(options.successText)) {
        child.kill('SIGTERM');
        finish({ stdout, stderr });
      }
    });
    child.stderr.on('data', chunk => {
      stderr += chunk;
      if (options.successText && stderr.includes(options.successText)) {
        child.kill('SIGTERM');
        finish({ stdout, stderr });
      }
    });

    child.on('error', error => {
      fail(error);
    });

    child.on('close', code => {
      if (settled) {
        return;
      }
      if (
        options.successText &&
        (stdout.includes(options.successText) || stderr.includes(options.successText))
      ) {
        finish({ stdout, stderr });
        return;
      }
      if (code === 0) {
        finish({ stdout, stderr });
        return;
      }
      fail(
        new Error(
          [
            `Command failed (${code}): ${command} ${args.join(' ')}`,
            stdout.trim() && `stdout:\n${stdout.trim()}`,
            stderr.trim() && `stderr:\n${stderr.trim()}`,
          ]
            .filter(Boolean)
            .join('\n')
        )
      );
    });

    if (options.input) {
      child.stdin.end(options.input);
    } else {
      child.stdin.end();
    }
  });
}

function findPackedTarball(): string {
  const tarballs = readdirSync(packDir)
    .filter(file => file.endsWith('.tgz'))
    .map(file => join(packDir, file));

  if (tarballs.length !== 1) {
    throw new Error(`Expected exactly one packed tarball in ${packDir}, found ${tarballs.length}.`);
  }

  return tarballs[0];
}

async function main(): Promise<void> {
  rmSync(workspace, { recursive: true, force: true });
  mkdirSync(packDir, { recursive: true });
  mkdirSync(projectDir, { recursive: true });

  console.log('Building workspace package...');
  {
    const command = shimmedCommand('pnpm', ['build']);
    await run(command.command, command.args, { timeoutMs: 60000 });
  }
  console.log('Packing workspace package...');
  {
    const command = shimmedCommand('pnpm', ['pack', '--pack-destination', packDir]);
    await run(command.command, command.args, { timeoutMs: 60000 });
  }

  const tarball = findPackedTarball();
  writeFileSync(join(projectDir, 'package.json'), '{"private":true,"type":"module"}\n');

  console.log('Installing packed package into a clean temp project...');
  {
    const command = shimmedCommand('npm', [
      'install',
      '--ignore-scripts',
      '--no-audit',
      '--no-fund',
      tarball,
    ]);
    await run(command.command, command.args, { cwd: projectDir, timeoutMs: 120000 });
  }

  const installedPackageDir = join(projectDir, 'node_modules', 'nz-legislation-tool');
  const cliEntry = join(installedPackageDir, 'dist', 'cli.js');
  const mcpEntry = join(installedPackageDir, 'dist', 'mcp-cli.js');

  console.log('Checking installed nzlegislation CLI help...');
  const cliHelp = await run(process.execPath, [cliEntry, '--help'], {
    cwd: projectDir,
    timeoutMs: 30000,
  });
  if (!cliHelp.stdout.includes('Usage:') || !cliHelp.stdout.includes('search')) {
    throw new Error('Installed nzlegislation --help output did not include expected CLI usage.');
  }

  console.log('Checking installed nzlegislation-mcp stdio startup...');
  const initializeRequest = `${JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2025-11-25',
      capabilities: {},
      clientInfo: { name: 'install-snippet-smoke', version: '0.0.0' },
    },
  })}\n`;
  const mcpStartup = await run(process.execPath, [mcpEntry], {
    cwd: projectDir,
    timeoutMs: 30000,
    input: initializeRequest,
    successText: '"id":1',
  });

  if (!mcpStartup.stderr.includes('NZ Legislation MCP Server running on stdio')) {
    throw new Error('Installed nzlegislation-mcp did not report stdio startup.');
  }
  if (!mcpStartup.stderr.includes('Tools available:')) {
    throw new Error('Installed nzlegislation-mcp did not report available MCP tools.');
  }
  if (
    !mcpStartup.stdout.includes('"jsonrpc":"2.0"') ||
    !mcpStartup.stdout.includes('"serverInfo"')
  ) {
    throw new Error('Installed nzlegislation-mcp did not answer the MCP initialize request.');
  }

  console.log(`Install snippet smoke passed with ${tarball}`);
}

main().catch(error => {
  console.error('Install snippet smoke failed:');
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
