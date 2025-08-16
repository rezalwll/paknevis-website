import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useContactForm } from "./useContactForm";

describe("useContactForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("initializes with empty form and idle states", () => {
    const { result } = renderHook(() => useContactForm());

    expect(result.current.formData).toEqual({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
    expect(result.current.fieldErrors).toEqual({});
    expect(result.current.submitError).toBe("");
    expect(result.current.submitSuccess).toBe("");
    expect(result.current.isSubmitting).toBe(false);
  });

  it("prevents invalid submit and sets field errors", async () => {
    const fetchSpy = vi.spyOn(global, "fetch");
    const { result } = renderHook(() => useContactForm());

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as never);
    });

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(result.current.fieldErrors).toMatchObject({
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
      phone: expect.any(String),
      message: expect.any(String),
    });
  });

  it("submits successfully and clears form", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.setFieldValue("firstName", "Ali");
      result.current.setFieldValue("lastName", "Ahmadi");
      result.current.setFieldValue("email", "ali@example.com");
      result.current.setFieldValue("phone", "09121234567");
      result.current.setFieldValue("message", "Hello there");
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as never);
    });

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.submitError).toBe("");
    expect(result.current.submitSuccess).not.toBe("");
    expect(result.current.formData).toEqual({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  });

  it("sets submitError when api responds with error", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: false, message: "failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.setFieldValue("firstName", "Ali");
      result.current.setFieldValue("lastName", "Ahmadi");
      result.current.setFieldValue("email", "ali@example.com");
      result.current.setFieldValue("phone", "09121234567");
      result.current.setFieldValue("message", "Hello there");
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as never);
    });

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.submitSuccess).toBe("");
    expect(result.current.submitError).toBe("failed");
  });
});
