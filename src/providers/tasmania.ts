import type { OfficialSourceArtifact } from './official-source-contract.js';
import { validateOfficialSourceArtifact } from './official-source-contract.js';

export interface TasmaniaActMetadata {
  readonly id: string;
  readonly jurisdiction: 'au-tas';
  readonly providerId: 'tasmanian-legislation';
  readonly title: string;
  readonly type: 'act';
  readonly officialVersion: string;
  readonly effectiveFrom: string;
  readonly status: 'in-force' | 'historical';
  readonly source: OfficialSourceArtifact;
}

const TASMANIA_HOST = 'www.legislation.tas.gov.au';
const ACT_ROOT_PATTERN = /<ACT\b([^>]*)>/;
const ATTRIBUTE_PATTERN = /([A-Z][A-Z.]+)="([^"]*)"/g;

function rootAttributes(xml: string): Record<string, string> {
  const root = xml.match(ACT_ROOT_PATTERN)?.[1];

  if (!root) {
    throw new Error('Tasmania XML must contain an ACT root element');
  }

  const attributes: Record<string, string> = {};
  for (const match of root.matchAll(ATTRIBUTE_PATTERN)) {
    const key = match[1];
    const value = match[2];
    if (key && value !== undefined) {
      attributes[key] = value;
    }
  }

  return attributes;
}

export function parseTasmaniaActXml(
  xml: string,
  artifact: OfficialSourceArtifact
): TasmaniaActMetadata {
  const source = validateOfficialSourceArtifact(artifact, {
    allowedHosts: [TASMANIA_HOST],
    expectedJurisdiction: 'au-tas',
    expectedProviderId: 'tasmanian-legislation',
  });

  if (source.format !== 'XML') {
    throw new Error('Tasmania adapter requires an XML source artifact');
  }

  const attributes = rootAttributes(xml);
  const id = attributes.ID;
  const title = attributes.TITLE;
  const effectiveFrom = attributes['FIRST.VALID.DATE'];
  const officialVersion = attributes['PUBLICATION.DATE'];

  for (const [name, value] of Object.entries({ id, title, effectiveFrom, officialVersion })) {
    if (!value) {
      throw new Error(`Tasmania XML ACT root is missing ${name}`);
    }
  }

  if (!id || !title || !effectiveFrom || !officialVersion) {
    throw new Error('Tasmania XML ACT root is missing required identity or version data');
  }

  if (title !== source.title) {
    throw new Error('Tasmania XML identity does not match the pinned source artifact');
  }

  if (effectiveFrom !== source.effectiveFrom || officialVersion !== source.officialVersion) {
    throw new Error('Tasmania XML version does not match the pinned source artifact');
  }

  return Object.freeze({
    id,
    jurisdiction: 'au-tas',
    providerId: 'tasmanian-legislation',
    title,
    type: 'act',
    officialVersion,
    effectiveFrom,
    status: attributes['END.VALID.DATE'] === '9999-11-02' ? 'in-force' : 'historical',
    source,
  });
}
