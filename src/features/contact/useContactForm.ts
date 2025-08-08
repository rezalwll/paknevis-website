"use client";

import { type FormEvent, useState } from "react";

import {
  type ContactFieldErrors,
  type ContactFieldName,
  type ContactFormData,
  validateContactPayload,
} from "@/lib/contact";

type ContactApiResponse =
  | { ok: true }
  | { ok: false; message?: string; fieldErrors?: ContactFieldErrors };

function createEmptyFormData(): ContactFormData {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };
}

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(createEmptyFormData);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setFieldValue = (field: ContactFieldName, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));

    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }
      const nextErrors = { ...current };
      delete nextErrors[field];
      return nextErrors;
    });

    if (submitError) {
      setSubmitError("");
    }
    if (submitSuccess) {
      setSubmitSuccess("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setSubmitError("");
    setSubmitSuccess("");

    const validation = validateContactPayload(formData);
    if (!validation.success) {
      setFieldErrors(validation.fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const result = (await response.json().catch(() => null)) as ContactApiResponse | null;

      if (response.status === 400 && result && !result.ok && result.fieldErrors) {
        setFieldErrors(result.fieldErrors);
        if (result.message) {
          setSubmitError(result.message);
        }
        return;
      }

      if (!response.ok || !result || !result.ok) {
        setSubmitError(
          result && !result.ok && result.message
            ? result.message
            : "ثبت پیام با خطا مواجه شد. لطفاً دوباره تلاش کنید.",
        );
        return;
      }

      setFormData(createEmptyFormData());
      setFieldErrors({});
      setSubmitSuccess("پیام شما با موفقیت ثبت شد.");
    } catch {
      setSubmitError("ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    fieldErrors,
    submitError,
    submitSuccess,
    isSubmitting,
    setFieldValue,
    handleSubmit,
  };
}

