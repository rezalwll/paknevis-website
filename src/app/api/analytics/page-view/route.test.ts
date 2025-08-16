import { beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "./route";

const {
  mockIsLikelyBotUserAgent,
  mockNormalizeTrackedPath,
  mockRecordPageView,
  mockLogServerError,
} = vi.hoisted(() => ({
  mockIsLikelyBotUserAgent: vi.fn(),
  mockNormalizeTrackedPath: vi.fn(),
  mockRecordPageView: vi.fn(),
  mockLogServerError: vi.fn(),
}));

vi.mock("@/lib/page-views", () => ({
  isLikelyBotUserAgent: mockIsLikelyBotUserAgent,
  normalizeTrackedPath: mockNormalizeTrackedPath,
  recordPageView: mockRecordPageView,
}));

vi.mock("@/lib/server-log", () => ({
  logServerError: mockLogServerError,
}));

describe("POST /api/analytics/page-view", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 204 for likely bot requests", async () => {
    mockIsLikelyBotUserAgent.mockReturnValue(true);

    const request = new Request("http://localhost/api/analytics/page-view", {
      method: "POST",
      body: JSON.stringify({ path: "/" }),
      headers: { "Content-Type": "application/json", "user-agent": "bot" },
    });

    const response = await POST(request as never);

    expect(response.status).toBe(204);
    expect(mockRecordPageView).not.toHaveBeenCalled();
  });

  it("returns 204 when path is invalid", async () => {
    mockIsLikelyBotUserAgent.mockReturnValue(false);
    mockNormalizeTrackedPath.mockReturnValue(null);

    const request = new Request("http://localhost/api/analytics/page-view", {
      method: "POST",
      body: JSON.stringify({ path: "invalid" }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request as never);

    expect(response.status).toBe(204);
    expect(mockRecordPageView).not.toHaveBeenCalled();
  });

  it("records page view for valid payload", async () => {
    mockIsLikelyBotUserAgent.mockReturnValue(false);
    mockNormalizeTrackedPath.mockReturnValue("/pricing");

    const request = new Request("http://localhost/api/analytics/page-view", {
      method: "POST",
      body: JSON.stringify({ path: "/pricing" }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request as never);

    expect(response.status).toBe(204);
    expect(mockRecordPageView).toHaveBeenCalledWith("/pricing");
    expect(mockLogServerError).not.toHaveBeenCalled();
  });

  it("returns 204 and logs error if recordPageView fails", async () => {
    mockIsLikelyBotUserAgent.mockReturnValue(false);
    mockNormalizeTrackedPath.mockReturnValue("/contact");
    mockRecordPageView.mockRejectedValue(new Error("db fail"));

    const request = new Request("http://localhost/api/analytics/page-view", {
      method: "POST",
      body: JSON.stringify({ path: "/contact" }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request as never);

    expect(response.status).toBe(204);
    expect(mockRecordPageView).toHaveBeenCalledWith("/contact");
    expect(mockLogServerError).toHaveBeenCalledTimes(1);
  });
});
