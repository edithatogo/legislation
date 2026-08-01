import type { JurisdictionCode } from './capability-manifest.js';

export type OfficialSourceFormat = 'HTML' | 'PDF' | 'XML';

export interface OfficialSourceArtifact {
  readonly jurisdiction: JurisdictionCode;
  readonly providerId: string;
  readonly title: string;
  readonly officialVersion: string;
  readonly effectiveFrom: string;
  readonly sourceUrl: string;
  readonly format: OfficialSourceFormat;
  readonly byteCount: number;
  readonly contentSha256: string;
}

export interface OfficialSourceValidationOptions {
  readonly allowedHosts: readonly string[];
  readonly expectedByteCount?: number;
  readonly expectedProviderId?: string;
  readonly expectedJurisdiction?: JurisdictionCode;
}

const SHA256_PATTERN = /^[a-f0-9]{64}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function assertString(value: unknown, field: string): asserts value is string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Official source ${field} must be a non-empty string`);
  }
}

export function validateOfficialSourceArtifact(
  candidate: unknown,
  options: OfficialSourceValidationOptions
): OfficialSourceArtifact {
  if (!candidate || typeof candidate !== 'object') {
    throw new Error('Official source artifact must be an object');
  }

  const artifact = candidate as Partial<OfficialSourceArtifact>;
  assertString(artifact.jurisdiction, 'jurisdiction');
  assertString(artifact.providerId, 'providerId');
  assertString(artifact.title, 'title');
  assertString(artifact.officialVersion, 'officialVersion');
  assertString(artifact.effectiveFrom, 'effectiveFrom');
  assertString(artifact.sourceUrl, 'sourceUrl');
  assertString(artifact.format, 'format');
  assertString(artifact.contentSha256, 'contentSha256');

  if (!DATE_PATTERN.test(artifact.effectiveFrom)) {
    throw new Error('Official source effectiveFrom must be an ISO date');
  }

  if (!['HTML', 'PDF', 'XML'].includes(artifact.format)) {
    throw new Error(`Official source format is unsupported: ${artifact.format}`);
  }

  const byteCount = artifact.byteCount;
  if (typeof byteCount !== 'number' || !Number.isInteger(byteCount) || byteCount <= 0) {
    throw new Error('Official source byteCount must be a positive integer');
  }

  if (options.expectedByteCount !== undefined && byteCount !== options.expectedByteCount) {
    throw new Error(
      `Official source byteCount mismatch: expected ${options.expectedByteCount}, received ${byteCount}`
    );
  }

  if (!SHA256_PATTERN.test(artifact.contentSha256)) {
    throw new Error('Official source contentSha256 must be a lowercase SHA-256 digest');
  }

  let sourceUrl: URL;
  try {
    sourceUrl = new URL(artifact.sourceUrl);
  } catch (error) {
    throw new Error('Official source sourceUrl must be an absolute URL', { cause: error });
  }

  if (sourceUrl.protocol !== 'https:') {
    throw new Error('Official source sourceUrl must use HTTPS');
  }

  if (sourceUrl.username || sourceUrl.password || sourceUrl.hash) {
    throw new Error('Official source sourceUrl must not contain credentials or a fragment');
  }

  if (!options.allowedHosts.includes(sourceUrl.hostname)) {
    throw new Error(`Official source host is not allowlisted: ${sourceUrl.hostname}`);
  }

  if (options.expectedProviderId && artifact.providerId !== options.expectedProviderId) {
    throw new Error(`Official source providerId mismatch: ${artifact.providerId}`);
  }

  if (options.expectedJurisdiction && artifact.jurisdiction !== options.expectedJurisdiction) {
    throw new Error(`Official source jurisdiction mismatch: ${artifact.jurisdiction}`);
  }

  return Object.freeze({
    jurisdiction: artifact.jurisdiction,
    providerId: artifact.providerId,
    title: artifact.title,
    officialVersion: artifact.officialVersion,
    effectiveFrom: artifact.effectiveFrom,
    sourceUrl: sourceUrl.toString(),
    format: artifact.format,
    byteCount,
    contentSha256: artifact.contentSha256,
  });
}
