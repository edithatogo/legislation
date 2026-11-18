# Spec: Rust Migration Readiness

## Scope

Advance a staged Rust migration inside this repository without splitting the
package or creating a separate repository. The TypeScript implementation remains
the release authority until parity gates pass.

## Requirements

- Preserve language-neutral runtime, CLI, MCP, export, provider, and package
  contracts.
- Keep test parity expectations executable and documented before cutover.
- Keep compatibility names stable.

## Contracts

- **Runtime:** Rust work is staged behind parity gates; no production cutover is
  permitted until those gates pass.
- **Compatibility:** any future implementation must preserve current CLI,
  package, MCP, export, and provider contracts.
- **Publication:** no Rust package, repository, or migration announcement until
  release governance explicitly approves it.

## Serde adoption within the planned Rust transition — 18 November 2026

The repository already has a bounded Rust compatibility crate at `rust/compatibility-contract` using `serde` derive and `serde_json`. The existing TypeScript provider/runtime remains authoritative until parity gates pass. **Retain** Serde for stable versioned Rust API/export DTOs; do not apply it to TypeScript code, and do not replace XML/HTML parsing, legislation citation logic, HTTP transport or source provenance with serialization traits.

- [ ] In the *existing* Rust migration-readiness track, enumerate current Rust DTOs and compare them to pinned TypeScript CLI/MCP/provider/export JSON fixtures, including unknown fields, discriminants, dates, identifiers, UTF-8 and error semantics.
- [ ] Use stable typed Serde contracts for genuine Rust-boundary consumers; keep raw official source documents, jurisdiction/version citation identifiers and extension metadata lossless.
- [ ] Test hostile/oversized XML/JSON, duplicate keys, schema version evolution and byte/semantic parity independently. Maintain rights, authority and source integrity checks.
- [ ] Any future production Rust adoption requires passing the stated cross-runtime/ABI/feature/security gates and an approved integration cutover. No unrelated non-Rust component is targeted; planning is not transition completion.
