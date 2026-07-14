# Australian Jurisdiction Mainstreaming Plan

## Phase 1 — Contract and evidence

- [x] Task: Reconcile jurisdiction requirements and dependencies
- [x] Task: Define shared provider conformance and provenance contracts
- [x] Task: Add a machine-readable jurisdiction and source registry
- [x] Task: Record licensing and access evidence for every provider

## Phase 2 — Provider convergence

- [x] Task: Mainstream Commonwealth through shared gates
- [ ] Task: Mainstream Queensland through shared gates
- [ ] Task: Mainstream New South Wales through shared gates
- [ ] Task: Mainstream Victoria through shared gates
- [ ] Task: Mainstream South Australia through shared gates
- [ ] Task: Mainstream Western Australia through shared gates
- [ ] Task: Mainstream Tasmania through shared gates
- [ ] Task: Mainstream Australian Capital Territory through shared gates
- [ ] Task: Mainstream Northern Territory through shared gates

## Phase 2A — Freedom-of-Information vertical slice

- [x] Task: Register the nine primary Australian information-access statutes
      and map each to its existing provider lane.
- [ ] Task: Export pinned current and point-in-time FOI statute identifiers,
      versions, source URLs, digests, and provider capability states.
- [ ] Task: Include applicable regulations, fee instruments, amendments, and
      commencement metadata without treating regulator guidance as legislation.
- [ ] Task: Add a deterministic FOI source-pack manifest for downstream FOI-O use.
- [ ] Task: Add contract tests that reject missing jurisdiction, version,
      provenance, and unsupported-capability fields.
- [ ] Task: Review official provider surfaces for newly documented APIs; update
      the relevant provider issue and track before adding any new adapter.

## Phase 3 — Unified behavior

- [ ] Task: Implement deterministic cross-jurisdiction discovery and routing
- [ ] Task: Align CLI, MCP, export, citation, and capability output
- [ ] Task: Add end-to-end multi-jurisdiction conformance tests
- [ ] Task: Review each maturity claim and run all release gates

## Validation evidence

- `gate:jurisdiction-mainstreaming`: passed (3 tests).
- `gate:conductor-requirements`: passed.
- TypeScript strict typecheck and scoped Prettier: passed.
- Commonwealth is prerelease/source-backed; all other Australian lanes remain planned or source-shape-only.
