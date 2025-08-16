import { beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "./route";

const {
  mockValidateContactPayload,
  mockInsertContactMessage,
  mockLogServerError,
  mockSendUserCommentChrome,
} = vi.hoisted(() => ({
  mockValidateContactPayload: vi.fn(),
  mockInsertContactMessage: vi.fn(),
  mockLogServerError: vi.fn(),
  mockSendUserCommentChrome: vi.fn(),
}));

vi.mock("@/lib/contact", () => ({
  validateContactPayload: mockValidateContactPayload,
}));

vi.mock("@/lib/db", () => ({
  insertContactMessage: mockInsertContactMessage,
}));

vi.mock("@/lib/server-log", () => ({
  logServerError: mockLogServerError,
}));

vi.mock("@/lib/user-comments-chrome", () => ({
  sendUserCommentChrome: mockSendUserCommentChrome,
}));

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 when payload is invalid json", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: "{invalid json",
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({ ok: false });
  });

  it("returns 400 with field errors when validation fails", async () => {
    mockValidateContactPayload.mockReturnValue({
      success: false,
      fieldErrors: { email: "invalid" },
    });

    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({ email: "bad" }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      fieldErrors: { email: "invalid" },
    });
    expect(mockSendUserCommentChrome).not.toHaveBeenCalled();
    expect(mockInsertContactMessage).not.toHaveBeenCalled();
  });

  it("returns 201 when payload is valid and dependencies succeed", async () => {
    const validData = {
      firstName: "A",
      lastName: "B",
      email: "a@b.com",
      phone: "09120000000",
      message: "hello",
    };
    mockValidateContactPayload.mockReturnValue({
      success: true,
      data: validData,
      fieldErrors: {},
    });

    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify(validData),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(mockSendUserCommentChrome).toHaveBeenCalledWith(validData);
    expect(mockInsertContactMessage).toHaveBeenCalledWith(validData);
  });

  it("returns 502 when chrome relay fails", async () => {
    const validData = {
      firstName: "A",
      lastName: "B",
      email: "a@b.com",
      phone: "09120000000",
      message: "hello",
    };
    mockValidateContactPayload.mockReturnValue({
      success: true,
      data: validData,
      fieldErrors: {},
    });
    mockSendUserCommentChrome.mockRejectedValue(new Error("relay fail"));

    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify(validData),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toMatchObject({ ok: false });
    expect(mockInsertContactMessage).not.toHaveBeenCalled();
    expect(mockLogServerError).toHaveBeenCalledTimes(1);
  });

  it("returns 500 when saving message fails", async () => {
    const validData = {
      firstName: "A",
      lastName: "B",
      email: "a@b.com",
      phone: "09120000000",
      message: "hello",
    };
    mockValidateContactPayload.mockReturnValue({
      success: true,
      data: validData,
      fieldErrors: {},
    });
    mockSendUserCommentChrome.mockResolvedValue(undefined);
    mockInsertContactMessage.mockRejectedValue(new Error("db fail"));

    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify(validData),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toMatchObject({ ok: false });
    expect(mockLogServerError).toHaveBeenCalledTimes(1);
  });
});
