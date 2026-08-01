# Project Workflow

Adapt the command placeholders and optional policies to the repository during setup. Keep authorization-sensitive external actions outside ordinary implementation.

## Guiding principles

1. `plan.md` is the task source of truth.
2. Document deliberate stack changes before implementing them.
3. Use test-driven development when behavior is testable.
4. Prefer project-defined, non-interactive validation commands.
5. Keep repository readiness separate from deployment, publication, signing, submission, payment, communication, credentials, rights, hosted checks, and human approval.
6. Preserve unrelated worktree changes and commit only owned scope.
7. Human-only verification remains pending until the named human provides explicit evidence; automated checks and agent judgment cannot substitute for it.

## Task workflow

For each task:

1. Select the next unblocked `[ ]` task and mark it `[~]`.
2. Define the narrowest evidence that proves completion.
3. For testable behavior, write or identify a failing test and confirm the expected failure.
4. Implement the smallest coherent change that satisfies the specification.
5. Run targeted tests, then applicable lint, formatting, type, documentation, schema, or data validators.
6. Refactor only while the proof remains green.
7. Review the diff for correctness, scope, security, public-contract drift, and unrelated files.
8. Inspect `git status --short`. Keep incidental logs, screenshots, recordings, caches, and scratch output in an OS temporary directory unless the specification names them as deliverables. Never blanket-delete or ignore extensions that may contain legitimate project assets.
9. Stage explicit owned paths and commit the functional change with the repository's message convention.
10. If git notes are enabled, attach a note containing task, rationale, files, and validation evidence.
11. Record the short functional SHA in `plan.md`, mark the task `[x]`, and commit the plan update if the repository uses separate plan commits.

Documentation, governance, generated-data, and evidence-only tasks may use a deterministic validator instead of manufacturing a unit test. Record that deviation in the plan.

## Phase checkpoint

At the end of each phase:

1. Determine the phase revision range from plan-recorded SHAs.
2. Invoke Conductor review over source and Conductor artifacts.
3. Apply high-confidence fixes and run targeted validation.
4. Run the complete project gate defined below.
5. Stop after two unsuccessful fix-validation loops for the same failure.
6. Record the exact commands, results, review fixes, and remaining external boundaries in the checkpoint evidence.
7. Ask for manual verification only when user-observable behavior cannot be proven automatically.

## Track completion and archive

1. Verify every acceptance criterion, required task, metadata transition, registry entry, and named validation gate.
2. Keep unresolved external or exact-approval gates that are inside the track contract pending. A gate explicitly outside the track contract may coexist with repository completion, but must remain machine-readable and visible in status.
3. Run whole-track review and the complete project gate.
4. Mark registry and metadata completed only after the track is internally complete.
5. Move an archive-eligible track to `conductor/archive/<track_id>/`, preferring `git mv` when tracked, and update—never remove—its completed registry entry.
6. Inspect `git status --short` to verify both source deletion and archive destination are staged, then search for stale `conductor/tracks/<track_id>/` references and repair them before declaring archival complete.

## Project commands

Replace placeholders during setup. Remove commands that do not apply.

```text
environment: <command or none>
targeted tests: <command>
full tests: <command>
format check: <command or none>
lint: <command or none>
type check: <command or none>
security/schema/data validation: <command or none>
complete project gate: <command>
```

## Coverage policy

Default target: at least 80% for changed testable code unless the repository defines a stronger or more appropriate metric. A numeric threshold does not replace acceptance-criteria coverage, failure-path tests, or evidence validation.

## Commit and notes policy

- Commit cadence: one focused functional commit per task.
- Plan updates: separate commit unless the repository explicitly uses atomic combined commits.
- Git notes: enabled by default for task and checkpoint evidence.
- Structured evidence: `evidence.jsonl` schema 1.0 is authoritative for opted-in tracks; Git notes are an optional mirror.
- Push: only when the user or repository workflow authorizes it.
- Merge, tag, release, deploy, publish, submit, send, sign, pay, migrate, rotate secrets, restore backups, or notify users: never implied; require their own authorization and validation.

## Optional worktree isolation

```text
isolation mode: off
worktree root: auto
lease ttl seconds: 900
delete isolated branch after integration: false
```

Isolation is disabled unless this workflow explicitly sets `isolation mode: worktree`.
An active exact lease is required before mutation. Renew it before and after a
mutating task and at least every five minutes. An expired lease is a stale
candidate, not free ownership: generic continuation is not takeover authorization.
Never use `--force`, destructive reset, or automatic branch deletion. Cleanup
requires a clean worktree, verified integration ancestry, exact path and branch
agreement, and recorded cleanup evidence; retain the branch by default.

## Definition of done

A task is complete only when:

- its scoped behavior or artifact satisfies the specification;
- required tests and validators pass;
- applicable style, type, documentation, security, provenance, and schema checks pass;
- the diff contains no unrelated changes;
- completion evidence and the functional SHA are recorded;
- remaining external boundaries are explicit and not represented as complete.
