# Accessibility standard

The public experience targets WCAG 2.1 AA. Accessibility is treated as an executable constraint, not a final visual review.

## Interaction requirements

- Every input has a persistent programmatic label.
- The text workbench can be submitted with `Control+Enter` or `Command+Enter`.
- Result counts and copy/export feedback use polite live regions.
- Findings include source line and column; color is never their only status signal.
- Category checkboxes and severity selection use native controls.
- Focus moves to the result region after an explicit audit without trapping the keyboard.
- Icon-only social links have localized accessible names and decorative icons are hidden from assistive technology.

## Automated coverage

Playwright runs axe against both the landing page and `/tools/text-audit` using WCAG 2.0/2.1 A and AA tags. The gate fails on serious or critical violations. Browser tests also exercise the editor, keyboard shortcut, category filtering, and severity filtering.

## Manual release checks

Before a public release:

1. Navigate the header, workbench, filters, results, and footer using only Tab, Shift+Tab, Enter, and Space.
2. Verify focus remains visible at 200% zoom.
3. Test the page with reduced-motion enabled.
4. Confirm Persian labels are announced in the correct order by a screen reader.
5. Check error and success states with high-contrast mode.

Automated tests reduce regressions, but they do not replace these keyboard, zoom, language, and assistive-technology checks.
