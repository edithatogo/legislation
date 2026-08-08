#!/usr/bin/env python3
"""Fail a workflow when high/critical code-scanning alerts exist for the current commit."""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request
from typing import Any

DEFAULT_PER_PAGE = 100
DEFAULT_TIMEOUT_SECONDS = 90
DEFAULT_POLL_INTERVAL_SECONDS = 10
BLOCKING_SEVERITIES = {"high", "critical"}


class AlertHit:
    """A blocking code-scanning alert."""

    def __init__(self, number: int, rule_id: str, severity: str, message: str, html_url: str) -> None:
        self.number = number
        self.rule_id = rule_id
        self.severity = severity
        self.message = message
        self.html_url = html_url


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Fail if the current commit has open high/critical code-scanning alerts."
    )
    parser.add_argument("--repository", default=os.environ.get("GITHUB_REPOSITORY"))
    parser.add_argument("--commit-sha", default=os.environ.get("GITHUB_SHA"))
    parser.add_argument(
        "--token", default=os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    )
    parser.add_argument("--timeout-seconds", type=int, default=DEFAULT_TIMEOUT_SECONDS)
    parser.add_argument("--poll-interval-seconds", type=int, default=DEFAULT_POLL_INTERVAL_SECONDS)
    parser.add_argument("--per-page", type=int, default=DEFAULT_PER_PAGE)
    return parser.parse_args()


def _http_get_json(url: str, token: str | None) -> tuple[Any, dict[str, str]]:
    request = urllib.request.Request(  # noqa: S310
        url,
        headers={
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            **({"Authorization": f"Bearer {token}"} if token else {}),
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:  # noqa: S310
        payload = response.read().decode("utf-8")
    return json.loads(payload), dict(response.headers.items())


def _fetch_page(repository: str, token: str | None, page: int, per_page: int) -> list[dict[str, Any]]:
    url = (
        f"https://api.github.com/repos/{repository}/code-scanning/alerts"
        f"?state=open&per_page={per_page}&page={page}"
    )
    payload, _headers = _http_get_json(url, token)
    if not isinstance(payload, list):
        msg = f"Unexpected API payload for {url}"
        raise RuntimeError(msg)
    return payload


def iter_open_alerts(
    repository: str,
    token: str | None,
    *,
    per_page: int = DEFAULT_PER_PAGE,
) -> list[dict[str, Any]]:
    alerts: list[dict[str, Any]] = []
    for page in range(1, 101):
        page_alerts = _fetch_page(repository, token, page, per_page)
        alerts.extend(page_alerts)
        if len(page_alerts) < per_page:
            break
    return alerts


def alert_severity(alert: dict[str, Any]) -> str:
    rule = alert.get("rule") or {}
    severity = str(rule.get("security_severity_level") or "").lower()
    if severity:
        return severity
    return str(rule.get("severity") or "").lower()


def blocking_alerts(
    alerts: list[dict[str, Any]],
    *,
    commit_sha: str,
    severities: set[str] | None = None,
) -> list[AlertHit]:
    allowed = severities or BLOCKING_SEVERITIES
    hits: list[AlertHit] = []
    for alert in alerts:
        recent = alert.get("most_recent_instance") or {}
        if str(recent.get("commit_sha") or "") != commit_sha:
            continue
        severity = alert_severity(alert)
        if severity not in allowed:
            continue
        rule = alert.get("rule") or {}
        message = (recent.get("message") or {}).get("text") or ""
        hits.append(
            AlertHit(
                number=int(alert.get("number") or 0),
                rule_id=str(rule.get("id") or "unknown"),
                severity=severity,
                message=message,
                html_url=str(alert.get("html_url") or ""),
            )
        )
    return hits


def _format_hit(hit: AlertHit) -> str:
    return f"#{hit.number} {hit.rule_id} [{hit.severity}] {hit.message} ({hit.html_url})"


def main() -> int:
    args = parse_args()
    if not args.repository:
        print("Missing repository. Set GITHUB_REPOSITORY or pass --repository.", file=sys.stderr)
        return 2
    if not args.commit_sha:
        print("Missing commit SHA. Set GITHUB_SHA or pass --commit-sha.", file=sys.stderr)
        return 2

    deadline = time.monotonic() + max(args.timeout_seconds, 0)
    while True:
        try:
            alerts = iter_open_alerts(args.repository, args.token, per_page=args.per_page)
        except (urllib.error.HTTPError, urllib.error.URLError, RuntimeError) as exc:
            print(f"Failed to query code-scanning alerts: {exc}", file=sys.stderr)
            return 1

        hits = blocking_alerts(alerts, commit_sha=args.commit_sha)
        if hits or time.monotonic() >= deadline:
            if hits:
                print("Blocking code-scanning alerts found:")
                for hit in hits:
                    print(f"- {_format_hit(hit)}")
                return 1

            print("No open high/critical code-scanning alerts found for the current commit.")
            return 0

        time.sleep(max(args.poll_interval_seconds, 1))


if __name__ == "__main__":
    raise SystemExit(main())
