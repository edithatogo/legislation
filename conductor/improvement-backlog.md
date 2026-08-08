# Conductor Improvement Backlog

## Active candidates

- [x] Add repository-scoped script to append learning candidates without automatic commit in CI failure paths.
- [x] Capture registry/review/skills-feedback events into the backlog from failing submission workflows.
- [x] Add phase-level retrospective notes for each Phase 1/2/3/4 run and record reviewer sign-off.
- [ ] Validate `conductor/learning-log.md` entries against `conductor/templates/learning-entry.schema.json` in CI or local pre-commit checks.
- [ ] Promote a reusable lesson to shared templates without reviewer sign-off.

## Skills touched by this workspace

- `conductor-implement`
- `conductor-review`
- `conductor-track-new`
- `subagent` orchestration (`swarm` / `subagents.yaml`)
- `workspace-doctor`
- `track-status`
- `scripting` (batch and PowerShell for workspace maintenance)

## Repo-local lesson hooks

- [ ] For each future workspace-level lesson that affects agent behavior, add a repo-local note here and promote only after review.
- [ ] Continue using local notes instead of writing into global skill directories unless explicitly approved.
