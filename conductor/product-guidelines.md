# Product Guidelines

## Truth before reach

- Describe only capabilities supported by current source-backed behavior.
- Never substitute fixtures, placeholders, synthetic records, or inferred legal
  content for authoritative legal data in user-facing results.
- Label provider maturity consistently as stable, prerelease, planned, or
  unsupported.
- Include provenance where users could otherwise mistake transformed or cached
  content for an authoritative source.

## Compatibility first

- Treat `nz-legislation-tool`, `nzlegislation`, and `nzlegislation-mcp` as stable
  compatibility surfaces.
- Treat `anzlegislation` and `anzlegislation-mcp` as transition aliases, not an
  authorization to remove legacy names.
- Prefer additive provider-aware changes over breaking replacements.
- Keep CLI, MCP, export, package metadata, documentation, and install examples in
  sync.

## Safe release posture

- Preparation is not publication. Registry records, package metadata, website
  content, and integration artifacts remain local until their gates pass.
- Require explicit security, provenance, capability, test, build, and snippet
  verification before an external release or submission.
- Keep secrets out of source, logs, fixtures, generated output, and examples.
- Fail closed when provider capability or provenance is uncertain.

## User experience

- Preserve scriptable output and stable exit behavior.
- Make errors actionable and identify the failing provider or operation.
- Keep human-readable output concise while offering machine-readable JSON and
  export formats.
- Avoid color-only meaning and support non-interactive and accessibility needs.

## Engineering quality

- Use strict TypeScript and explicit types at provider and transport boundaries.
- Validate external input and provider responses at runtime.
- Test compatibility aliases, capability declarations, failure paths, and
  provider-specific behavior.
- Prefer narrow, reviewable changes tied to a Conductor task.
- Update documentation and manifests in the same change when behavior changes.

## Documentation language

- Use precise jurisdiction and provider names.
- Distinguish product behavior from future roadmap intent.
- Do not imply endorsement by legislation publishers, registries, marketplaces,
  or assistant vendors.
- Use examples that are reproducible and do not expose credentials.
