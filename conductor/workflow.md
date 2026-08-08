# Development Workflow

## Sources of truth

1. `AGENTS.md` defines repository mission, hard rules, priority, and validation.
2. `conductor/requirements.md` defines capability and release contracts.
3. `conductor/tracks.md` identifies delivery tracks.
4. Each linked `conductor/tracks/<track-id>/plan.md` records phase and task
   progress.
5. `package.json` and the lockfile define executable tooling and versions.

When these artifacts disagree, stop and reconcile the contract before changing
product behavior or making release claims.

## Track execution

1. Select the requested track or the next incomplete P0 track.
2. Read its specification, plan, metadata, and linked supporting artifacts.
3. Mark only the active task `[~]`; retain `[ ]` for pending and `[x]` for
   completed work.
4. Implement the smallest reviewable slice that satisfies the task.
5. Add or update tests before considering behavior complete.
6. Run proportionate checks and then the full repository validation gate when
   the phase or change is ready.
7. Update the plan, metadata, requirements, capability manifest, and docs where
   the verified behavior requires it.
8. Do not mark a task complete when required evidence or an external gate is
   missing.

## Required validation

Run from the repository root:

```bash
pnpm install
pnpm typecheck
pnpm test:run
pnpm build
pnpm exec prettier --check .
```

Run additional repository gates defined in `package.json` when relevant,
especially security, capability, provider, integration, and release-readiness
checks. If the full formatting check is noisy because of pre-existing repository
state, run the current scoped checks and record the exact exception; do not
silently weaken the gate.

## Test and evidence policy

- Test success paths, error paths, provider boundaries, and compatibility names.
- Use source-backed fixtures with documented provenance where fixtures are
  necessary.
- Never make live-network tests the only evidence for deterministic behavior.
- Do not replace failed provider retrieval with fabricated legal data.
- Record commands and outcomes needed to support completion or release claims.

## Branch and commit policy

- Preserve unrelated user changes in a dirty worktree.
- Use focused branches and conventional commit messages.
- Keep commits narrow enough to review and revert safely.
- Do not publish, push, open a pull request, or submit externally unless the user
  requests that action and all applicable gates pass.

## Release and submission protocol

Before any package publication, website deployment, registry submission,
marketplace submission, container publication, or Homebrew release:

1. Confirm placeholder legal data has been removed.
2. Verify the provider capability manifest against implemented behavior.
3. Verify MCP and export output is provider-aware.
4. Verify package metadata, documentation, install snippets, and release notes.
5. Pass security and provenance review.
6. Preserve stable NZ names and approved transition aliases.
7. Obtain explicit authorization for the external action.

Absent any one of these conditions, the work remains preparation-only.

## Phase completion

A phase is complete only when all of its tasks are `[x]`, required validation has
passed, documentation and contracts reflect the implementation, and unresolved
blockers are recorded. The next phase must not inherit an ambiguous or falsely
green status.
