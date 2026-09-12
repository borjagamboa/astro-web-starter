# [Migration ID] — [Short title]

- **From:** [CORE or MODULE version/range]
- **To:** [CORE or MODULE version]
- **Scope:** [CORE | MODULE: module-id]
- **Requirement:** [Required | Optional]

## Motivation

[Why this migration exists and what compatibility outcome it provides.]

## Preconditions

- [Required repository, manifest, version, module or configuration state.]
- [Required recovery checkpoint or clean-state condition.]

## Potentially affected paths

- `[path or glob]`

## Must preserve

- [PROJECT-owned content, assets, routes, configuration or known customizations.]

## Steps

1. [Ordered, bounded migration step.]

## Validation

```text
[Commands and manual checks required before completion.]
```

## Rollback

[How to restore the pre-migration checkpoint or reverse the reviewed patch.]

## Manifest update

[Fields and migration record to write only after successful validation.]
