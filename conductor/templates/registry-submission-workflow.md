# Registry Submission Workflow Template

## Purpose

Use this workflow for MCP servers/apps, CLIs, packages, containers, datasets, models, and archive submissions. The owning subrepo performs implementation; the root workspace coordinates mapping and evidence only.

## Required Inputs

- `registry-submission.json` conforming to `conductor/templates/registry-submission.schema.json`.
- A fixture/example starting point from `conductor/templates/registry-submission-fixtures/` when creating a new manifest.
- Current package version and SemVer decision.
- Public contract list: CLI commands, MCP tools, APIs, schemas, datasets, or release artifacts.
- Registry target list and per-registry requirements.
- Security, provenance, and quality gate evidence.

## Manifest Placement

- Put implementation-owned manifests in the owning subrepo, normally under `conductor/registry-submissions/`.
- Use one manifest per artifact and release channel so review status, registry URLs, and blockers stay specific.
- Keep root `legal-nz` manifests only for root-owned orchestration artifacts.
- Use `not_applicable` instead of deleting a registry target when a common registry family was considered and rejected.
- Record blocked external-write, account, Chrome, token, upload, and publication steps explicitly rather than marking them complete.

## Phase 1: Registry Inventory

- Identify all relevant registries.
- Record exact submission requirements for each registry.
- Classify each target as `required`, `optional`, `deferred`, or `not_applicable`.
- Commit inventory in the owning repo.
- Push and check GitHub Actions.

## Phase 1a: Manifest Validation

- Validate each manifest against `conductor/templates/registry-submission.schema.json` before any readiness or submission claim.
- Validate fixtures locally before copying them into an owning repo.
- Keep validation evidence in the owning repo manifest or progress surface.
- Do not claim registry readiness from a manifest that has only placeholder evidence paths.

## Phase 2: Local Readiness

- Ensure package metadata is complete.
- Ensure README, license, changelog, support policy, security policy, examples, screenshots, or dataset/model cards exist as required.
- Ensure SemVer and release notes match.
- Ensure MCP tools/apps include schemas, permissions, security notes, and least-privilege documentation.
- Commit each readiness task separately.
- Push and check GitHub Actions after each task or logical phase.

## Phase 3: CI and Security Readiness

- Run tests, type checks, lint/format checks, package build, and registry dry-runs where supported.
- Run dependency/security scanning where supported.
- Generate provenance or attestations where supported.
- Confirm no secrets, private source archives, or gated materials are included.
- Commit evidence updates.
- Push and check GitHub Actions.

## Phase 4: Submission

- Submit only after local readiness, CI readiness, and review approval.
- Use Chrome only for registry web consoles that cannot be handled by CLI/API.
- Record submission URL, review URL, status, and follow-up tasks.
- Commit submission evidence.
- Push and check GitHub Actions.

## Phase 5: Post-Submission Learning Loop

- Record what failed, what passed, and what should be templated.
- Add reusable checks to the owning repo where possible.
- Promote general lessons into conductor templates or skills only after review.
- Commit the learning update.
- Push and check GitHub Actions.

## Phase 5a: Review and rejection capture (required)

- Record review/rejection feedback for every failed submission attempt.
- Capture submission status and feedback text in the owning repo’s `conductor/improvement-backlog.md` using a non-committing script invocation.
- Use a reviewer-only step to triage feedback and promote only validated lessons.
- Required command example:

```bash
python3 scripts/record_learning_candidate.py \
  --backlog conductor/improvement-backlog.md \
  --message "Registry submission rejected for <artifact> on <registry>" \
  --evidence "workflow=${{ github.workflow }}" \
  --evidence "run=${{ github.run_id }}" \
  --evidence "artifacts=..."
```

## Suggested Local Validation Command

From the root workspace, use a JSON Schema validator that supports draft 2020-12. For example:

```bash
python -m check_jsonschema --schemafile conductor/templates/registry-submission.schema.json path/to/registry-submission.json
```

If the owning repo uses another maintained validator, record the exact command in that repo's manifest evidence.

## Required Registry Families

- npm and GitHub Packages for Node/TypeScript CLIs and MCP packages.
- GitHub Releases for release binaries and source archives.
- GHCR or Docker Hub for containers.
- Homebrew tap or Homebrew core for CLI installation where appropriate.
- Smithery and MCP registries/directories for MCP servers/apps where appropriate.
- PyPI and conda-forge for Python packages where appropriate.
- Hugging Face, Zenodo, and OSF for datasets, models, source archives, and DOI-backed releases.

## Guardrails

- Do not submit to a registry from the root aggregation repo unless the artifact is root-owned.
- Do not submit without evidence of tests and package build.
- Do not publish private/gated source material.
- Do not rely on browser-only submission if a stable CLI/API exists.
- Do not mark accepted until the registry status is verified.
- Do not edit `.env` files, create tokens, upload artifacts, open Chrome, mutate registry state, push commits, or check authenticated GitHub Actions without explicit approval.
