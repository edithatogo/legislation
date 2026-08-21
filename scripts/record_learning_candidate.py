#!/usr/bin/env python3
"""Append non-committing learning candidates to a conductor backlog file."""

from __future__ import annotations

import argparse
from pathlib import Path
from typing import List, Tuple


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Append a learning candidate entry.")
    parser.add_argument(
        "--backlog",
        default="conductor/improvement-backlog.md",
        help="Path to the backlog markdown file.",
    )
    parser.add_argument(
        "--message",
        required=True,
        help="Candidate summary to add as a checklist item.",
    )
    parser.add_argument(
        "--evidence",
        action="append",
        default=[],
        help="Optional evidence lines to include under the candidate.",
    )
    parser.add_argument(
        "--snapshot",
        default="",
        help="Optional file path to write only the new candidate lines for artifact use.",
    )
    return parser.parse_args()


SECTION_HEADING = "## Active candidates"


def read_text_lines(path: Path) -> list[str]:
    if not path.exists():
        return []
    return path.read_text(encoding="utf-8", errors="replace").splitlines()


def find_section(lines: list[str], heading: str) -> int:
    for idx, line in enumerate(lines):
        if line.strip() == heading:
            return idx
    return -1


def build_entry_lines(message: str, evidence: list[str]) -> list[str]:
    entry = [f"- [ ] {message}"]
    for item in evidence:
        if item.strip():
            entry.append(f"  - {item.strip()}")
    return entry


def section_has_entry(section_lines: list[str], candidate_lines: list[str]) -> bool:
    if not section_lines:
        return False
    raw = "\n".join(section_lines)
    return "\n".join(candidate_lines) in raw


def append_candidate(path: Path, message: str, evidence: List[str]) -> Tuple[bool, List[str]]:
    lines = read_text_lines(path)
    candidate_lines = build_entry_lines(message, evidence)

    start = find_section(lines, SECTION_HEADING)
    if start == -1:
        lines.extend(["", SECTION_HEADING, ""])
        start = len(lines) - 1

    end = len(lines)
    for idx in range(start + 1, len(lines)):
        if lines[idx].startswith("## "):
            end = idx
            break

    section_body = lines[start + 1 : end]
    if section_has_entry(section_body, candidate_lines):
        return False, candidate_lines

    insert_at = end
    if section_body and section_body[-1].strip():
        candidate_lines = [""] + candidate_lines

    updated_lines = lines[:insert_at] + candidate_lines + lines[insert_at:]
    output = "\n".join(updated_lines).rstrip() + "\n"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(output, encoding="utf-8")
    return True, candidate_lines


def write_snapshot(path: str, candidate_lines: list[str]) -> None:
    if not path:
        return
    snapshot = Path(path)
    snapshot.parent.mkdir(parents=True, exist_ok=True)
    snapshot.write_text("\n".join(candidate_lines) + "\n", encoding="utf-8")


def main() -> None:
    args = parse_args()
    backlog = Path(args.backlog)
    inserted, candidate_lines = append_candidate(backlog, args.message, args.evidence)

    if args.snapshot:
        write_snapshot(args.snapshot, candidate_lines)

    if inserted:
        print(f"Recorded learning candidate in {backlog}")
    else:
        print(f"Learning candidate already present in {backlog}")


if __name__ == "__main__":
    main()
