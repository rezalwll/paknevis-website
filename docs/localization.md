# Persian localization conventions

Paknevis is Persian-first. The root document declares `lang="fa"` and `dir="rtl"`; individual code samples or external identifiers may opt into `dir="auto"` or left-to-right rendering where necessary.

## Writing conventions

- Use Persian ی and ک in user-visible content.
- Use Persian digits for formatted metrics through `toLocaleString("fa-IR")`.
- Use نیم‌فاصله in compounds such as «می‌شود»، «آن‌ها»، and «به‌عنوان».
- Use Persian punctuation (`،`، `؛`، `؟`) in prose.
- Keep API codes, rule IDs, file names, and JSON property names in stable English identifiers.
- Do not translate machine-readable enum values after release.

## Layout conventions

- Prefer logical alignment and spacing where CSS support is reliable.
- Test mixed Persian and Latin content; do not assume inherited RTL is correct for code or URLs.
- Icon direction must reflect meaning. A back arrow used for history differs from an arrow that means “continue”.
- Avoid reversing data order only to make a visual grid look RTL.

## Encoding checks

All source and content files are UTF-8. Run `npm run check:encoding` before release. Replacement characters, mojibake, and question-mark placeholders are defects even when the production build succeeds.

The text-audit catalog may recommend normalization, but application copy must already follow these conventions and must not rely on the analyzer to repair repository content.
