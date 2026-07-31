# Conductor Tracks

This registry lists active delivery tracks in this repository. The umbrella
release/distribution track remains the source of truth for publication,
submission, registry, and marketplace gates. `conductor/requirements.md` is the
MoSCoW requirements and contract register for the provider, publication,
registry, integration, and migration tracks listed here.

## Umbrella track

| Track | Priority | Status | Purpose |
| ----- | -------- | ------ | ------- |

## Product unification tracks

| Track                                    | Priority | Status  | Purpose                                                                                         |
| ---------------------------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------- |
| `legislation-jurisdiction-mainstreaming` | P0       | Planned | Converge NZ and every Australian jurisdiction on one evidence-backed provider contract.         |
| `legislation-brand-migration`            | P0       | Planned | Adopt legislation as the neutral product identity through a compatibility-preserving migration. |
| `official-gazette-sources`               | P0       | Planned | Add NZ and Australian Gazette or equivalent sources as a distinct content family.               |
| `global_foi_legislation_gazette_coverage_20260721` | P0 | Planned | Complete official legislation and Gazette/equivalent evidence for every FOI-O roadmap target. |

## Provider implementation tracks

Australian provider tracks do not permit publishing, deployment, registry
submission, or stable support claims. Commonwealth is the source-backed
prerelease provider lane for search, get-work, versions, export, and MCP inside
this repo. NZ remains the only stable support lane until the umbrella release
track says otherwise.

| Track                                | Jurisdiction                  | Priority | Current phase                                                            |
| ------------------------------------ | ----------------------------- | -------- | ------------------------------------------------------------------------ |
| `nz-provider-stable-compatibility`   | New Zealand                   | P0       | Stable compatibility guard for existing NZ package, CLI, MCP, and export |
| `anz-provider-commonwealth`          | Australian Commonwealth       | P0       | Source-backed prerelease runtime; fixture expansion and release gates    |
| `anz-provider-queensland`            | Queensland                    | P0       | API access and source-backed adapter                                     |
| `anz-provider-nsw`                   | New South Wales               | P1       | XML/export adapter design                                                |
| `anz-provider-victoria`              | Victoria                      | P1       | Source-shape discovery and adapter mapping                               |
| `anz-provider-south-australia`       | South Australia               | P1       | Source-shape discovery and adapter mapping                               |
| `anz-provider-western-australia`     | Western Australia             | P1       | Source-shape discovery and adapter mapping                               |
| `anz-provider-tasmania`              | Tasmania                      | P1       | Source-shape discovery and adapter mapping                               |
| `anz-provider-northern-territory`    | Northern Territory            | P1       | Source-shape discovery and adapter mapping                               |
| `anz-provider-aggregator-evaluation` | Cross-jurisdiction aggregator | P2       | Evaluation-only source/provenance and licence review                     |

## Publication, registry, and integration tracks

These tracks do not authorize publication, deployment, marketplace submission,
registry submission, or package/repository renaming. They define the contracts
and readiness gates each channel must satisfy before any later external action.

| Track                                | Channel scope                           | Priority | Current phase                                 |
| ------------------------------------ | --------------------------------------- | -------- | --------------------------------------------- |
| `anz-publication-package-registries` | npm, GitHub Packages, GitHub Releases   | P0       | Preparation-only package and release contract |
| `anz-publication-website-docs`       | Website/docs, install pages, `llms.txt` | P0       | Preparation-only docs and deployment contract |
| `anz-registry-mcp-directories`       | Smithery and other MCP directories      | P0       | Preparation-only MCP registry contract        |
| `anz-rust-migration-readiness`       | Staged Rust migration                   | P2       | In-repository parity work behind release gates |
