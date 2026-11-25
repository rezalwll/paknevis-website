# Authoring text-audit rules

Rules live in `src/content/text-audit-rules.json`. They are data rather than branches in application code so the browser and API always evaluate the same catalog.

## Required fields

- `id`: stable kebab-case identifier; never reuse an old identifier for different behavior.
- `title`: short Persian label.
- `category`: one of `characters`, `digits`, `punctuation`, `spacing`, `spelling`, or `style`.
- `severity`: `info`, `warning`, or `error`.
- `pattern` and `flags`: a JavaScript regular expression compiled with global and Unicode flags.
- `message`: explanation of the finding.
- `suggestion`: an actionable correction.
- `example`: minimal text that must match the rule.
- `replacement`: optional deterministic replacement.

## Review checklist

1. Prefer a narrow expression over a broad linguistic guess.
2. Avoid nested unbounded quantifiers and other catastrophic-backtracking shapes.
3. Verify the example is representative Persian, not only a synthetic token.
4. Use `error` only for unambiguous character or spelling faults.
5. Use `info` for style recommendations where both forms may be acceptable.
6. Check overlap with neighboring rules and explain intentional overlap in the pull request.
7. Run `npm run check:text-audit-rules` and the analyzer tests.

## Compatibility

Changing an existing rule's meaning may alter report output without changing the report schema. Treat such changes as catalog behavior changes, include focused tests, and describe them in release notes. A structural response change requires a new report version.
