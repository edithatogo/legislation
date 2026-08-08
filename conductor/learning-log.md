# Conductor Learning Log

This log is the repository-local source of truth for repeatable learning artifacts.

## 2026-06-23 — Track 18 rollout (self-learning loop implementation)

- `entry_id`: `track-18-root-legal-nz`
- `observed_on`: 2026-06-23
- `repo`: `legal-nz`
- `scope`: `track`
- `trigger`: `Track 18 implementation requires shared loop artifacts and repository-local learning surfaces`
- `severity`: `low`
- `status`: `resolved`
- `lessons_learned`:
  - Self-learning improvements need a machine-readable schema before CI automation can reason about logs.
  - Track templates without `lessons_learned` / `next_check_to_add` fields are difficult to promote safely.
  - Multiple conductor repos in this workspace need mirrored learning surfaces to avoid hidden gaps.
- `next_check_to_add`:
  - Add CI validation that checks the schema for every `learning-log.md` entry.
  - Add a lightweight step to emit learning candidates from failing workflows into `improvement-backlog.md`.
- `evidence`:
  - `conductor/templates/self-improvement-loop.md`
  - `conductor/templates/learning-entry.schema.json`
  - `conductor/templates/track-improvement-template.md`
  - `conductor/learning-log.md`
  - `conductor/improvement-backlog.md`

## 2026-06-23 — Track 18 phase 4 completion (automation and retrospective controls)

- `entry_id`: `track-18-automation-review-gates`
- `observed_on`: 2026-06-23
- `repo`: `legal-nz`
- `scope`: `workflow`
- `trigger`: `Remaining Track 18 automation controls required to complete CI learning and registry review feedback loops`
- `severity`: `medium`
- `status`: `resolved`
- `lessons_learned`:
  - CI failure candidate capture should emit artifacts or backlog candidates, but must not auto-commit in local-only mode.
  - Registry submission feedback is only useful if captured in a structured, reviewable record at the submission boundary.
  - Promotion of reusable improvements must remain reviewer-gated to avoid accidental template drift.
- `next_check_to_add`:
  - Add a reusable pre-commit/CI check that validates `learning-log.md` entries against `conductor/templates/learning-entry.schema.json`.
  - Add a manual "reviewer sign-off" check before promoting lessons to shared templates or skill-level notes.
- `evidence`:
  - `scripts/record_learning_candidate.py`
  - `.github/workflows/ci-learning-candidates.yml`
  - `.github/workflows/release-huggingface.yml`
  - `.github/workflows/release-zenodo.yml`
