import type { OfficialSourceArtifact } from './official-source-contract.js';
import { validateOfficialSourceArtifact } from './official-source-contract.js';

export interface OfficialActMetadata {
  readonly id: string;
  readonly jurisdiction: OfficialSourceArtifact['jurisdiction'];
  readonly providerId: string;
  readonly title: string;
  readonly type: 'act';
  readonly officialVersion: string;
  readonly effectiveFrom: string;
  readonly status: 'in-force' | 'historical';
  readonly source: OfficialSourceArtifact;
}

export interface OfficialActMetadataOptions {
  readonly allowedHosts: readonly string[];
  readonly expectedId: string;
  readonly expectedStatus?: 'in-force' | 'historical';
}

export function mapOfficialPdfActMetadata(
  artifact: OfficialSourceArtifact,
  options: OfficialActMetadataOptions
): OfficialActMetadata {
  const source = validateOfficialSourceArtifact(artifact, {
    allowedHosts: options.allowedHosts,
    expectedJurisdiction: artifact.jurisdiction,
    expectedProviderId: artifact.providerId,
  });

  if (source.format !== 'PDF') {
    throw new Error(`${source.jurisdiction} static adapter requires a PDF source artifact`);
  }

  return Object.freeze({
    id: options.expectedId,
    jurisdiction: source.jurisdiction,
    providerId: source.providerId,
    title: source.title,
    type: 'act',
    officialVersion: source.officialVersion,
    effectiveFrom: source.effectiveFrom,
    status: options.expectedStatus ?? 'in-force',
    source,
  });
}
