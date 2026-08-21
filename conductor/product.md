# Product Definition

## Product

ANZ Legislation is a single-repository TypeScript platform for searching,
retrieving, exporting, citing, and serving legislation through command-line and
MCP interfaces. New Zealand is the stable compatibility lane. Australian
providers are introduced only from source-backed data and must be described by
their actual capability maturity.

## Mission

Maintain one repository and deliver a truthful, provider-aware release and
distribution roadmap without breaking established New Zealand users.

## Users

- Researchers, policy analysts, legal-information practitioners, and developers
- CLI users who need machine-readable or human-readable legislation results
- MCP clients and assistant integrations that require explicit provider and
  provenance information
- Maintainers preparing packages, documentation, registries, and integration
  artifacts

## Core capabilities

- Search and retrieve legislation through source-backed providers
- Export and cite results without fabricating legal data
- Expose provider-aware CLI and MCP behavior
- Declare provider and operation maturity through a capability manifest
- Preserve stable package and executable compatibility during the ANZ transition
- Produce accurate package, documentation, website, and integration surfaces

## Compatibility contract

- Preserve `nz-legislation-tool`, `nzlegislation`, and `nzlegislation-mcp`.
- Keep `anzlegislation` and `anzlegislation-mcp` as aliases until an approved
  migration policy changes that contract.
- Keep integrations inside this repository under `integrations/`.
- Do not split or rename repositories or packages as an implicit implementation
  step.

## Product boundaries

- Do not publish fabricated, placeholder, or unverifiable legal data.
- Do not claim stable Australian support before the relevant gates pass.
- Do not publish, deploy, or submit to registries merely because preparation
  artifacts exist.
- Do not expose community plugin loading before a trust model exists.
- Do not begin a Rust rewrite; record only future migration-readiness contracts.

## Success criteria

1. Existing New Zealand package, CLI, MCP, and export behavior remains compatible.
2. Every implemented provider is source-backed and accurately represented in the
   capability manifest.
3. MCP and exports identify provider, provenance, and supported operations.
4. Security, provenance, testing, build, documentation, and capability gates
   pass before external publication or submission.
5. Release and integration surfaces make a clear distinction between NZ stable,
   AU prerelease, planned, and unsupported capabilities.

The detailed normative requirements are maintained in
[`requirements.md`](./requirements.md).
