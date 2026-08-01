# Git VCS adapter

Adapter version: `conductor.vcs/1`

- Discover the root with `git rev-parse --show-toplevel` and require an exact match.
- Invoke Git with argument arrays and no shell.
- Use literal, root-relative pathspecs after `--` and stage only owned paths.
- Refuse a commit when unrelated staged paths exist.
- Use `git mv` for tracked moves; otherwise rename and stage exact old/new paths.
- Write commit messages through standard input or a message file, never shell interpolation.
- Git notes are optional evidence mirrors. Push, merge, tag, release, and branch
  deletion are outside this adapter and require separate authorization.
