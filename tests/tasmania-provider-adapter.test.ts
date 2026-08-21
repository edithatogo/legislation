import { describe, expect, it } from 'vitest';

import type { OfficialSourceArtifact } from '../src/providers/official-source-contract.ts';
import { parseTasmaniaActXml } from '../src/providers/tasmania.ts';

const source: OfficialSourceArtifact = {
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

const xml = `<!DOCTYPE ACT SYSTEM "act.dtd"><ACT STATE="TAS" YEAR="2009" ACTNO="70" FIRST.VALID.DATE="2026-07-01" END.VALID.DATE="9999-11-02" PUBLICATION.DATE="2026-07-01" TITLE="Right to Information Act 2009" ID="act-2009-070"><FRONT/></ACT>`;

describe('Tasmania XML adapter', () => {
  it('maps the official ACT root to normalized metadata with provenance', () => {
    expect(parseTasmaniaActXml(xml, source)).toMatchObject({
      id: 'act-2009-070',
      jurisdiction: 'au-tas',
      providerId: 'tasmanian-legislation',
      title: 'Right to Information Act 2009',
      type: 'act',
      officialVersion: '2026-07-01',
      effectiveFrom: '2026-07-01',
      status: 'in-force',
      source,
    });
  });

  it('derives the Act identifier from XML rather than assuming a fixed Act', () => {
    const otherSource = {
      ...source,
      title: 'Example Act 2010',
      sourceUrl:
        'https://www.legislation.tas.gov.au/view/whole/xml/inforce/2026-07-01/act-2010-001',
    } satisfies OfficialSourceArtifact;
    const otherXml = xml
      .replace('TITLE="Right to Information Act 2009"', 'TITLE="Example Act 2010"')
      .replace('ID="act-2009-070"', 'ID="act-2010-001"');

    expect(parseTasmaniaActXml(otherXml, otherSource)).toMatchObject({
      id: 'act-2010-001',
      title: 'Example Act 2010',
      source: otherSource,
    });
  });

  it.each([
    ['missing root', '<DOCUMENT/>', /ACT root/],
    [
      'wrong identity',
      xml.replace('Right to Information Act 2009', 'Example Act 2010'),
      /identity/,
    ],
    [
      'wrong version',
      xml.replace('PUBLICATION.DATE="2026-07-01"', 'PUBLICATION.DATE="2025-07-01"'),
      /version/,
    ],
  ])('rejects %s source evidence', (_label, candidate, expected) => {
    expect(() => parseTasmaniaActXml(candidate, source)).toThrow(expected);
  });
});
