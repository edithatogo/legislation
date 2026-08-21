# Plan: Aggregator Provider Evaluation

## Phase 1: Evaluation guard

**Status:** In progress.

- [x] Add aggregator evaluation to the requirements contract register.
- [x] Add this Conductor track for the roadmap entry.
- [x] Identify candidate aggregators and licence/provenance constraints in the
      maintainer evaluation register.
- [x] Decide that candidates remain evaluation-only discovery aids; no runtime
      route or redistribution is enabled.

## Phase 2: Runtime decision

**Status:** Pending.

- [ ] Add provider capability status only after an explicit source and licence
      review.
- [ ] Add tests before any runtime route is enabled.

Evidence: `docs/maintainers/aggregator-provider-evaluation.json` and
`tests/aggregator-provider-evaluation.test.ts` record AustLII and NZLII source,
provenance, licence, freshness, and attribution constraints without legal
records or runtime capability.
