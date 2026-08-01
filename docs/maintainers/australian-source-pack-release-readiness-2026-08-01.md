# Australian source-pack release-readiness packet

Status: locally validated, externally gated

This packet records the restricted-local implementation state for the six
official Australian source candidates and the cross-repository Commonwealth
and NSW evidence references. It is a readiness record, not a release,
publication, redistribution or runtime-activation authorization.

## Evidence inputs

| Item                             | Evidence                                                                                            |
| -------------------------------- | --------------------------------------------------------------------------------------------------- |
| Candidate manifest               | `docs/maintainers/australian-official-source-pack-candidate-2026-08-01.json`                        |
| Candidate manifest SHA-256       | `c4557999f29d683ee4ead5ee5146b5dc9b18cecc5f768060af4b06a86f034fb8`                                  |
| Candidate manifest status        | `candidate-restricted-local`                                                                        |
| Local source candidates          | ACT, NT, SA, Tasmania, Victoria and WA; six hash-verified artifacts                                 |
| Cross-repository parent evidence | Commonwealth and NSW references explicitly marked `approved-parent-evidence-not-local-source-bytes` |
| Local implementation commits     | `995a7d1`, `e6dd0bb`, `b2d9daf`, `196c558`, `50673d8`, `37ca63e`                                    |
| Current local HEAD               | `37ca63eeb10bd361f97d4d101818b1bfe73d671b`                                                          |

## Validation evidence

| Gate                            | Result                                                                 |
| ------------------------------- | ---------------------------------------------------------------------- |
| Full Vitest suite               | 159 passed, 10 skipped                                                 |
| TypeScript typecheck            | Passed                                                                 |
| Provider capability manifest    | Passed                                                                 |
| Jurisdiction mainstreaming      | Passed                                                                 |
| No-placeholder legal data       | Passed                                                                 |
| Conductor requirements          | Passed                                                                 |
| Official-source contract        | Passed, including host, version, byte-count and SHA-256 negative paths |
| Tasmania XML mapping            | Passed, including identity and stale-version rejection                 |
| Australian PDF metadata mapping | Passed for ACT, NT, SA, Victoria and WA                                |

## Runtime and rights boundaries

- NZ remains the only stable provider.
- Commonwealth remains prerelease under its existing provider contract.
- Tasmania and the five PDF jurisdictions remain planned/unsupported in the
  capability manifest.
- Candidate source bytes remain restricted-local.
- No empirical use, legal certification, publication, redistribution, training,
  profile promotion or release is authorized by this packet.

## External gate

The legislation checkout contains local commits ahead of `origin/main`. A
future push or pull request must be authorized separately and must identify the
exact commit head. Merge requires a further exact-head authorization after
required hosted checks pass and branch protections remain intact.

The pre-existing untracked `.zenodo.json` and `CITATION.cff` files are outside
this packet and were not modified or staged.
