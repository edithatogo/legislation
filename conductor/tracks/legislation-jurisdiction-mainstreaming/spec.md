# Australian Jurisdiction Mainstreaming

## Goal

Move the Commonwealth, states, and territories into the same provider contract
used by stable New Zealand support, without overstating maturity or weakening
provenance.

## Scope

- Australian Commonwealth, Queensland, New South Wales, Victoria, South
  Australia, Western Australia, Tasmania, Australian Capital Territory, and
  Northern Territory
- Shared search, retrieval, versions, export, citation, MCP, provenance,
  caching, error, and capability contracts
- Source, licensing, fixture, conformance, and release evidence for every lane
- One product in which jurisdiction is configuration and data, not a separate
  tool
- A Freedom-of-Information vertical slice covering the nine primary
  Commonwealth, state, and territory information-access statutes and their
  subordinate instruments.

Existing provider tracks remain the detailed implementation lanes. A provider
is mainstream only after its source and licence are verified and its declared
operations pass shared conformance tests. NZ compatibility remains stable.
Fabricated records and silent cross-provider fallbacks are prohibited.

## Acceptance criteria

- All nine Australian provider tracks use the shared contract and manifest.
- Cross-jurisdiction discovery and provider selection are deterministic.
- CLI, MCP, export, citation, and docs report jurisdiction and source.
- Release claims distinguish stable, prerelease, planned, and blocked lanes.
- A versioned FOI source-pack manifest can be consumed by `foi-o` without
  copying unpinned legal text or collapsing jurisdiction-specific legal effects.
