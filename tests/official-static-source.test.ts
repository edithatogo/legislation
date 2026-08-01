import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { mapOfficialPdfActMetadata } from '../src/providers/official-static-source.ts';
import type { OfficialSourceArtifact } from '../src/providers/official-source-contract.ts';

type Candidate = OfficialSourceArtifact & { accessStatus: string };

const manifest = JSON.parse(
  readFileSync('docs/maintainers/australian-official-source-pack-candidate-2026-08-01.json', 'utf8')
) as { sources: Candidate[] };

const hosts: Record<string, string> = {
  'au-act': 'www.legislation.act.gov.au',
  'au-nt': 'legislation.nt.gov.au',
  'au-sa': 'www.legislation.sa.gov.au',
  'au-vic': 'content.legislation.vic.gov.au',
  'au-wa': 'www.legislation.wa.gov.au',
};

describe('official PDF source mappings', () => {
  it('maps all five verified PDF candidates without activating runtime support', () => {
    const pdfSources = manifest.sources.filter(source => source.format === 'PDF');

    expect(pdfSources).toHaveLength(5);
    for (const source of pdfSources) {
      const metadata = mapOfficialPdfActMetadata(source, {
        allowedHosts: [hosts[source.jurisdiction] ?? ''],
        expectedId: `${source.jurisdiction}:${source.officialVersion}`,
      });

      expect(metadata).toMatchObject({
        jurisdiction: source.jurisdiction,
        providerId: source.providerId,
        title: source.title,
        type: 'act',
        officialVersion: source.officialVersion,
        effectiveFrom: source.effectiveFrom,
      });
      expect(metadata.source).toMatchObject({
        jurisdiction: source.jurisdiction,
        providerId: source.providerId,
        title: source.title,
        officialVersion: source.officialVersion,
        effectiveFrom: source.effectiveFrom,
        sourceUrl: source.sourceUrl,
        format: source.format,
        byteCount: source.byteCount,
        contentSha256: source.contentSha256,
      });
    }
  });

  it('rejects XML when a PDF mapping is required', () => {
    const tasmania = manifest.sources.find(source => source.jurisdiction === 'au-tas');
    expect(tasmania).toBeDefined();

    if (tasmania) {
      expect(() =>
        mapOfficialPdfActMetadata(tasmania, {
          allowedHosts: ['www.legislation.tas.gov.au'],
          expectedId: 'au-tas:2026-07-01',
        })
      ).toThrow(/requires a PDF/);
    }
  });
});
