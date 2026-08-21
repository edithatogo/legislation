# Self-Improvement Loop Template

Use this file for both conductor-level learning artifacts and per-track postmortems.

## Incident metadata

- `entry_id`: `track-18-<short-id>`
- `observed_on`: `YYYY-MM-DD`
- `repo`: `root` or repo path
- `scope`: `track | workflow | skill | tooling`
- `severity`: `low | medium | high | critical`
- `status`: `open | resolved | verified`
- `owner`: handle

## Observe

- What failed (commands, logs, tests, review comments, or blocked steps)
- Primary evidence IDs (build URLs, ticket IDs, command transcripts, trace IDs)

## Reflect

- Root cause hypothesis
- Why current controls failed to prevent recurrence
- What was missing (template/schema/process check)

## Distill

### lessons_learned

- Lesson 1
- Lesson 2

### next_check_to_add

- Check 1
- Check 2

## Improve

- Concrete change to make
- File paths to touch
- Acceptance condition
- Validation command (no external side effects required)

## Evaluate

- Was the change effective after retry? `yes` / `no` / `partial`
- Validation date
- Supporting evidence

## Promote

- Promote to shared template: `[ ]` (only if reviewed and verified)
- Promote to skill patch: `[ ]` (only if reviewed and approved in the owning repo)
- Reviewer: ``
- Review date:
- Is this lesson verified: `[ ]`
