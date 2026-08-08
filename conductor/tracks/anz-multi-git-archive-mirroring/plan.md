# Plan - Multi-Git and Multi-Archive Mirroring

## Phase 1: Git Remote Mirror Setup

- [x] Task: Write `.github/workflows/mirror_sync.yml` to support automated SSH mirroring to secondary Git remotes (GitLab/Codeberg).
- [x] Task: Confirm the workflow skips locally when `GIT_MIRROR_URL` or `GIT_MIRROR_SSH_PRIVATE_KEY` is not configured.
- [ ] Gated: Configure repository secrets `GIT_MIRROR_URL` and `GIT_MIRROR_SSH_PRIVATE_KEY` on GitHub.
- [ ] Gated: Verify successful manual and push triggers for mirror sync.

## Phase 2: Registry Redundancy Verification

- [ ] Gated: Confirm package versions publish to both canonical npm registry and secondary GitHub Packages registry.
- [ ] Gated: Conductor - User Manual Verification 'Phase 2: Registry Redundancy Verification' (Protocol in workflow.md)

## Evidence - 2026-06-14 chrome_operator

- Checked `task_plan.md`, `.swarm/prompts/chrome_operator_subdir_swarm.md`, and `conductor/tracks.md`.
- No explicit Chrome, browser-profile, credential, account, publish, push, or mirror approval was present for this lane.
- Verified `.github/workflows/mirror_sync.yml` exists and triggers on pushes to `main`/`master` plus `workflow_dispatch`.
- Hardened `.github/workflows/mirror_sync.yml` so it exits successfully without external writes when either required mirror secret is empty.
- Validation passed: `.\node_modules\.bin\prettier.cmd --check .github/workflows/mirror_sync.yml conductor/tracks/anz-multi-git-archive-mirroring/metadata.json conductor/tracks/anz-multi-git-archive-mirroring/plan.md conductor/tracks/anz-multi-git-archive-mirroring/spec.md conductor/tracks.md task_plan.md`.
- Validation passed: `pnpm gate:channel-readiness` after sandbox retry; the first sandboxed run failed with `spawn EPERM` while starting `tsx`/`esbuild`.
- Validation passed: `git diff --check`.
- Remaining repository-secret setup, manual workflow runs, push-trigger verification, npm publication, GitHub Packages publication, and external mirror mutation are queued as gated work.

## Evidence - 2026-06-14 codex_gpt55_engineer

- Confirmed no local `subagents.yaml` or `swarm-config.yaml` was present; used `task_plan.md`, `conductor/tracks.md`, `conductor/requirements.md`, and this track plan as source-of-truth surfaces.
- Verified `.github/workflows/mirror_sync.yml` is repository-local, triggers only on `push` to `main`/`master` and `workflow_dispatch`, exits before external writes when `GIT_MIRROR_URL` or `GIT_MIRROR_SSH_PRIVATE_KEY` is unset, and leaves remote mirroring gated.
- Ran `pnpm gate:conductor-requirements`: passed with `Conductor requirements gate passed: 19 tracks have MoSCoW contracts and Conductor files.`
- Ran `./node_modules/.bin/prettier.CMD --check conductor/tracks.md conductor/tracks/anz-multi-git-archive-mirroring/spec.md conductor/tracks/anz-multi-git-archive-mirroring/plan.md conductor/tracks/anz-multi-git-archive-mirroring/metadata.json .github/workflows/mirror_sync.yml task_plan.md`: initially failed for formatting on `conductor/tracks.md`, this track's `spec.md` and `plan.md`, `.github/workflows/mirror_sync.yml`, and `task_plan.md`.
- Ran `./node_modules/.bin/prettier.CMD --write conductor/tracks.md conductor/tracks/anz-multi-git-archive-mirroring/spec.md conductor/tracks/anz-multi-git-archive-mirroring/plan.md conductor/tracks/anz-multi-git-archive-mirroring/metadata.json .github/workflows/mirror_sync.yml task_plan.md`: completed successfully; `metadata.json` was unchanged.
- Queued, but did not perform, GitHub secret configuration, manual workflow dispatch, push-trigger verification, remote mirror push, npm verification, GitHub Packages verification, commit, push, Chrome/browser-profile work, credential work, and account-dependent actions.
