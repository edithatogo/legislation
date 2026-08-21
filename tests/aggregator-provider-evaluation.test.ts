import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const fixture = JSON.parse(
  readFileSync(
    resolve(process.cwd(), 'docs/maintainers/aggregator-provider-evaluation.json'),
    'utf8'
  )
) as {
  policy: Record<string, boolean>;
  candidates: Array<{
    providerId: string;
    sourceUrls: string[];
    provenanceStatus: string;
    licenceStatus: string;
    runtimeDecision: string;
    nextEvidence: string[];
  }>;
  fixturePolicy: string;
};

describe('aggregator provider evaluation', () => {
  it('keeps the evaluation fail-closed and metadata-only', () => {
    expect(fixture.policy).toMatchObject({
      officialSourceFirst: true,
      runtimeEnabled: false,
      legalRecordsIncluded: false,
      submissionAllowed: false,
      attributionRequired: true,
      licenceReviewRequired: true,
    });
    expect(fixture.fixturePolicy).toContain('metadata-only');
    expect(fixture.fixturePolicy).toContain('no legal text');
  });

  it('requires HTTPS provenance, licence review, and explicit runtime gating', () => {
    expect(fixture.candidates.length).toBeGreaterThanOrEqual(2);
    for (const candidate of fixture.candidates) {
      expect(candidate.sourceUrls.length).toBeGreaterThan(0);
      for (const sourceUrl of candidate.sourceUrls) {
        expect(new URL(sourceUrl).protocol).toBe('https:');
      }
      expect(candidate.provenanceStatus).toContain('requires');
      expect(candidate.licenceStatus).toContain('review-required');
      expect(candidate.runtimeDecision).toBe('evaluation-only');
      expect(candidate.nextEvidence.length).toBeGreaterThan(0);
    }
  });
});
