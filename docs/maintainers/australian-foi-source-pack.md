# Australian freedom-of-information legislation source pack

This FOI-specific vertical slice reuses the repository's jurisdiction provider
contracts. It does not create a separate scraper, legal-data store, or product.

## Primary legislation set

| Jurisdiction | Primary information-access legislation | Provider lane |
| --- | --- | --- |
| Commonwealth | Freedom of Information Act 1982 | `anz-provider-commonwealth` |
| Australian Capital Territory | Freedom of Information Act 2016 | `anz-provider-act` |
| New South Wales | Government Information (Public Access) Act 2009 | `anz-provider-nsw` |
| Northern Territory | Information Act 2002 | `anz-provider-northern-territory` |
| Queensland | Right to Information Act 2009 | `anz-provider-queensland` |
| South Australia | Freedom of Information Act 1991 | `anz-provider-south-australia` |
| Tasmania | Right to Information Act 2009 | `anz-provider-tasmania` |
| Victoria | Freedom of Information Act 1982 | `anz-provider-victoria` |
| Western Australia | Freedom of Information Act 1992 | `anz-provider-western-australia` |

## Required source-pack contents

Each jurisdiction must expose, where the official source supports it:

- current and point-in-time primary legislation;
- regulations, fee instruments, amendment and commencement metadata;
- stable official identifiers, versions, source URLs, retrieval timestamps,
  content digests, licence/access notes, and provider capability status;
- explicit unsupported results where a provider cannot yet supply a source.

Regulator guidance, review decisions, disclosure logs, and public request
examples are evidence inputs for FOI-O but are not legislation-provider records.
Those inputs remain in their owning archive/source systems and link back to the
legislation identifiers produced here.

## API and machine-readable source posture

- Commonwealth: use the official Federal Register of Legislation API.
- Queensland: use the official Queensland Legislation API once registration,
  fixture, and provider gates in `anz-provider-queensland` pass.
- New South Wales: use the official XML export and JSON listing surfaces.
- Other jurisdictions: retain source-shape discovery and unsupported runtime
  status unless a documented official API or export surface is verified.

Undocumented website endpoints must not be promoted as public APIs. Discovery
of a new documented official API requires updating the relevant provider issue,
track, source validation, capability manifest, tests, and provenance card.

## Downstream contract

FOI-O consumes pinned, bitemporal source-pack manifests. It does not copy
unversioned legal text or infer that similarly named provisions have equivalent
legal effect across jurisdictions.
