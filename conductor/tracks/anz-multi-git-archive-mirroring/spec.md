# Specification - Multi-Git and Multi-Archive Mirroring

## Overview

This track implements multi-git repository mirroring and backup publishing strategies for the `nz-legislation` CLI tool to guarantee durability and prevent censorship or single-point-of-failure repository/package takedowns.

## Requirements

1. **Multi-Git Mirroring**: Automatically push codebase updates to secondary Git remotes (GitLab and Codeberg) on every push to the canonical branches.
2. **Release Registry Redundancy**: Sync releases and package distributions to both npm, GitHub Packages, and GitHub Releases to ensure client installations remain resilient.

## Acceptance Criteria

- `.github/workflows/mirror_sync.yml` exists and triggers on pushes to main/master branches.
- Workflow successfully bypasses when mirror URL or SSH credentials are empty.
- Secondary Git remote config pushes codebase to Codeberg/GitLab mirrors.
