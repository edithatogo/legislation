import { describe, expect, it } from 'vitest';

import {
  validateOfficialSourceArtifact,
  type OfficialSourceArtifact,
} from '../src/providers/official-source-contract.ts';

const tasmania: OfficialSourceArtifact = {
  jurisdiction: 'au-tas',
  providerId: 'tasmanian-legislation',
  title: 'Right to Information Act 2009',
  officialVersion: '2026-07-01',
  effectiveFrom: '2026-07-01',
  sourceUrl: 'https://www.legislation.tas.gov.au/view/whole/xml/inforce/2026-07-01/act-2009-070',
  format: 'XML',
  byteCount: 280287,
  contentSha256: '45fa401335a1f57ba3de30ea2ba3b2f14eb53eec6400e59081120e0e979cb4e6',
};

const options = {
  allowedHosts: ['www.legislation.tas.gov.au'],
  expectedByteCount: 280287,
  expectedProviderId: 'tasmanian-legislation',
  expectedJurisdiction: 'au-tas' as const,
};

describe('official source contract', () => {
  it('accepts a complete, pinned official artifact', () => {
    expect(validateOfficialSourceArtifact(tasmania, options)).toEqual(tasmania);
  });

  it.each([
    [
      'wrong protocol',
      { sourceUrl: tasmania.sourceUrl.replace('https:', 'http:') },
      /must use HTTPS/,
    ],
    ['wrong host', { sourceUrl: 'https://example.invalid/act.xml' }, /not allowlisted/],
    ['truncated bytes', { byteCount: 65024 }, /byteCount mismatch/],
    ['hash mismatch shape', { contentSha256: 'not-a-hash' }, /lowercase SHA-256/],
    ['stale date shape', { effectiveFrom: '2026-7-1' }, /must be an ISO date/],
  ])('rejects %s evidence', (_label, change, expected) => {
    expect(() => validateOfficialSourceArtifact({ ...tasmania, ...change }, options)).toThrow(
      expected
    );
  });

  it('rejects a jurisdiction or provider crosswalk mismatch', () => {
    expect(() =>
      validateOfficialSourceArtifact({ ...tasmania, providerId: 'victorian-legislation' }, options)
    ).toThrow(/providerId mismatch/);
  });
});
