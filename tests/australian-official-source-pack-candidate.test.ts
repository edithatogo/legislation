import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

type SourceCandidate = {
  jurisdiction: string;
  providerId: string;
  sourceUrl: string;
  format: string;
  byteCount: number;
  contentSha256: string;
  accessStatus: string;
};

const manifest = JSON.parse(
  readFileSync('docs/maintainers/australian-official-source-pack-candidate-2026-08-01.json', 'utf8')
) as {
  schemaVersion: string;
  status: string;
  runtimeActivation: boolean;
  publication: boolean;
  redistribution: boolean;
  empiricalUse: boolean;
  sources: SourceCandidate[];
};

describe('Australian official source-pack candidate', () => {
  it('is an immutable-evidence candidate, not a runtime or release activation', () => {
    expect(manifest.schemaVersion).toBe('foio.australian-official-source-pack.candidate.v1');
    expect(manifest.status).toBe('candidate-restricted-local');
    expect(manifest.runtimeActivation).toBe(false);
    expect(manifest.publication).toBe(false);
    expect(manifest.redistribution).toBe(false);
    expect(manifest.empiricalUse).toBe(false);
  });

  it('pins six official sources with complete-byte evidence', () => {
    expect(manifest.sources.map(source => source.jurisdiction)).toEqual([
      'au-act',
      'au-nt',
      'au-sa',
      'au-tas',
      'au-vic',
      'au-wa',
    ]);

    for (const source of manifest.sources) {
      const url = new URL(source.sourceUrl);
      expect(url.protocol).toBe('https:');
      expect(source.byteCount).toBeGreaterThan(0);
      expect(source.contentSha256).toMatch(/^[a-f0-9]{64}$/);
      expect(source.accessStatus).toBe('hash-verified-restricted-local');
      expect(['PDF', 'XML']).toContain(source.format);
    }
  });
});
