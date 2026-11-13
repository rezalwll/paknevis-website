# Text-audit API

`POST /api/text-audit` exposes the same deterministic analyzer used by the browser workbench.

## Request

```json
{
  "text": "متن برای بررسی"
}
```

- The body must be valid JSON.
- `text` must be a string with at most 20,000 UTF-16 code units.
- The full request body is limited to 64,000 UTF-8 bytes before JSON parsing.
- Callers may provide an `X-Request-Id` containing 8–80 letters, digits, underscores, or hyphens. Invalid values are replaced.

## Success contract

The response has status `200`, `Cache-Control: no-store`, and an `X-Request-Id` header. Its body contains `ok`, a versioned `report`, and `meta.requestId`.

```json
{
  "ok": true,
  "report": {
    "version": "1.0",
    "normalizedText": "متن برای بررسی",
    "metrics": {},
    "issues": [],
    "summary": { "total": 0, "score": 100 }
  },
  "meta": { "requestId": "client-request-2026" }
}
```

## Errors

| Status | Code | Meaning |
| --- | --- | --- |
| 400 | `INVALID_JSON` | Body is not valid JSON. |
| 413 | `PAYLOAD_TOO_LARGE` | Encoded request exceeds 64,000 bytes. |
| 413 | `TEXT_TOO_LONG` | Text exceeds 20,000 code units. |
| 422 | `INVALID_TEXT` | `text` is absent or not a string. |
| 500 | `INTERNAL_ERROR` | An unexpected server failure occurred. |

Clients should branch on `error.code`, not on the localized message.
