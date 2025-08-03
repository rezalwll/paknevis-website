"use client";

import React, { type FormEvent, useEffect, useState } from "react";

import {
  type ContactFieldErrors,
  type ContactFieldName,
  type ContactFormData,
  validateContactPayload,
} from "@/lib/contact";

type FocusedState = Record<ContactFieldName, boolean>;

type ContactApiResponse =
  | {
      ok: true;
    }
  | {
      ok: false;
      message?: string;
      fieldErrors?: ContactFieldErrors;
    };

function createEmptyFormData(): ContactFormData {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };
}

function createEmptyFocusedState(): FocusedState {
  return {
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    message: false,
  };
}

function useWindowsScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const dpr = window.devicePixelRatio || 1;
      setScale(dpr);
    };

    update();
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  return scale;
}

export default function ContactPage() {
  const scale = useWindowsScale();
  const [formData, setFormData] = useState<ContactFormData>(createEmptyFormData);
  const [focused, setFocused] = useState<FocusedState>(createEmptyFocusedState);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isWin125 = scale > 1.15 && scale < 1.35;
  const baseTextSizeClass = isWin125 ? "scale-100" : "scale-100";

  const setFieldValue = (field: ContactFieldName, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

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

  const setFieldFocus = (field: ContactFieldName, isFocused: boolean) => {
    setFocused((current) => ({
      ...current,
      [field]: isFocused,
    }));
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
        headers: {
          "Content-Type": "application/json",
        },
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
      setFocused(createEmptyFocusedState());
      setFieldErrors({});
      setSubmitSuccess("پیام شما با موفقیت ثبت شد.");
    } catch {
      setSubmitError("ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const firstNameActive = focused.firstName || Boolean(formData.firstName);
  const lastNameActive = focused.lastName || Boolean(formData.lastName);
  const emailActive = focused.email || Boolean(formData.email);
  const phoneActive = focused.phone || Boolean(formData.phone);
  const messageActive = focused.message || Boolean(formData.message);

  return (
    <main
      dir="rtl"
      className="
        min-h-screen flex items-center
        bg-[#e7f0ff]
        text-slate-800
        text-[16px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]
      "
    >
      <div
        className={`
          mx-auto w-full
          px-4 md:px-8
          max-w-4xl md:max-w-5xl lg:max-w-6xl 2xl:max-w-7xl
          mt-[-50px]
          ${baseTextSizeClass}
        `}
      >
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-10 pt-15 text-right text-slate-700">
            <div>
              <h1
                className="
                  text-3xl md:text-4xl lg:text-5xl xl:text-[3.3rem] 2xl:text-[3.6rem]
                  font-semibold text-slate-900
                "
              >
                تماس با ما
              </h1>
              <p
                className="
                  mt-5
                  max-w-md leading-relaxed text-slate-500
                  text-sm md:text-[1.05rem] lg:text-[1.12rem] xl:text-[1.2rem]
                "
              >
                ایمیل بزن، تماس بگیر یا فرم کنار صفحه را پر کن تا با هم در ارتباط باشیم و
                درباره نیازهایت صحبت کنیم.
              </p>
            </div>

            <div
              className="
                space-y-2
                text-sm md:text-[1.02rem] lg:text-[1.08rem]
              "
            >
              <p className="font-medium text-slate-900">info@example.com</p>
              <p className="font-medium text-slate-900">۰۲۱-۱۲۳۴۵۶۷۸</p>
            </div>

            <div className="mt-25 grid gap-4 border-t border-slate-200 pt-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <h2
                  className="
                    text-sm md:text-[0.98rem] lg:text-[1.05rem]
                    font-semibold text-slate-900
                  "
                >
                  پشتیبانی مشتریان
                </h2>
                <p
                  className="
                    leading-relaxed text-slate-500
                    text-xs md:text-sm lg:text-[0.98rem]
                  "
                >
                  تیم پشتیبانی ما آماده است تا هر سؤال یا مشکلی را بررسی کند.
                </p>
              </div>

              <div className="space-y-1.5">
                <h2
                  className="
                    text-sm md:text-[0.98rem] lg:text-[1.05rem]
                    font-semibold text-slate-900
                  "
                >
                  بازخورد و پیشنهادها
                </h2>
                <p
                  className="
                    leading-relaxed text-slate-500
                    text-xs md:text-sm lg:text-[0.98rem]
                  "
                >
                  هر پیشنهادی برای بهتر شدن سرویس داریم با ما در میان بگذار.
                </p>
              </div>

              <div className="space-y-1.5">
                <h2
                  className="
                    text-sm md:text-[0.98rem] lg:text-[1.05rem]
                    font-semibold text-slate-900
                  "
                >
                  رسانه و همکاری
                </h2>
                <p
                  className="
                    leading-relaxed text-slate-500
                    text-xs md:text-sm lg:text-[0.98rem]
                  "
                >
                  برای همکاری‌های رسانه‌ای و تجاری، با ایمیل مخصوص رسانه در تماس باش.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div
              className="
                w-full
                max-w-md md:max-w-lg lg:max-w-xl
                rounded-3xl border border-slate-100 bg-white
                px-5 py-6 shadow-xl sm:px-6 sm:py-7
              "
            >
              <div className="mb-4 space-y-1 text-right">
                <h2
                  className="
                    text-2xl lg:text-3xl
                    font-semibold text-slate-900
                  "
                >
                  در تماس باشید
                </h2>
                <p
                  className="
                    text-sm text-slate-500 md:text-[0.98rem] lg:text-[1.05rem]
                  "
                >
                  هر زمان خواستی می‌توانی با ما ارتباط بگیری.
                </p>
              </div>

              <form
                noValidate
                onSubmit={handleSubmit}
                className="
                  min-h-[300px]
                  space-y-5
                "
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="relative text-right">
                    <label
                      htmlFor="firstName"
                      className={`absolute right-3 pointer-events-none transition-all duration-300 ease-out ${
                        firstNameActive
                          ? "-top-2.5 bg-white px-1 text-[10px] text-blue-600"
                          : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
                      }`}
                    >
                      نام
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      disabled={isSubmitting}
                      value={formData.firstName}
                      onChange={(event) => setFieldValue("firstName", event.target.value)}
                      onFocus={() => setFieldFocus("firstName", true)}
                      onBlur={() => setFieldFocus("firstName", false)}
                      aria-invalid={Boolean(fieldErrors.firstName)}
                      aria-describedby={fieldErrors.firstName ? "firstName-error" : undefined}
                      className={`
                        w-full rounded-xl border bg-slate-50/60
                        px-3 py-2.5
                        text-sm md:text-[0.98rem] lg:text-[1.05rem]
                        outline-none transition-all duration-300
                        focus:bg-white focus:ring-1
                        disabled:cursor-not-allowed disabled:bg-slate-100
                        ${
                          fieldErrors.firstName
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                            : "border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        }
                      `}
                    />
                    {fieldErrors.firstName ? (
                      <p id="firstName-error" className="mt-1 text-xs text-red-600">
                        {fieldErrors.firstName}
                      </p>
                    ) : null}
                  </div>

                  <div className="relative text-right">
                    <label
                      htmlFor="lastName"
                      className={`absolute right-3 pointer-events-none transition-all duration-300 ease-out ${
                        lastNameActive
                          ? "-top-2.5 bg-white px-1 text-[10px] text-blue-600"
                          : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
                      }`}
                    >
                      نام خانوادگی
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      disabled={isSubmitting}
                      value={formData.lastName}
                      onChange={(event) => setFieldValue("lastName", event.target.value)}
                      onFocus={() => setFieldFocus("lastName", true)}
                      onBlur={() => setFieldFocus("lastName", false)}
                      aria-invalid={Boolean(fieldErrors.lastName)}
                      aria-describedby={fieldErrors.lastName ? "lastName-error" : undefined}
                      className={`
                        w-full rounded-xl border bg-slate-50/60
                        px-3 py-2.5
                        text-sm md:text-[0.98rem] lg:text-[1.05rem]
                        outline-none transition-all duration-300
                        focus:bg-white focus:ring-1
                        disabled:cursor-not-allowed disabled:bg-slate-100
                        ${
                          fieldErrors.lastName
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                            : "border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        }
                      `}
                    />
                    {fieldErrors.lastName ? (
                      <p id="lastName-error" className="mt-1 text-xs text-red-600">
                        {fieldErrors.lastName}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="relative text-right">
                  <label
                    htmlFor="email"
                    className={`absolute right-3 z-10 pointer-events-none transition-all duration-300 ease-out ${
                      emailActive
                        ? "-top-2.5 bg-white px-1 text-[10px] text-blue-600"
                        : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
                    }`}
                  >
                    ایمیل
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={(event) => setFieldValue("email", event.target.value)}
                    onFocus={() => setFieldFocus("email", true)}
                    onBlur={() => setFieldFocus("email", false)}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                    className={`
                      w-full rounded-xl border bg-slate-50/60
                      px-3 py-2.5
                      text-sm md:text-[0.98rem] lg:text-[1.05rem]
                      outline-none transition-all duration-300
                      focus:bg-white focus:ring-1
                      disabled:cursor-not-allowed disabled:bg-slate-100
                      ${
                        fieldErrors.email
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                          : "border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      }
                    `}
                  />
                  {fieldErrors.email ? (
                    <p id="email-error" className="mt-1 text-xs text-red-600">
                      {fieldErrors.email}
                    </p>
                  ) : null}
                </div>

                <div className="relative text-right">
                  <label
                    htmlFor="phone"
                    className={`absolute right-3 pointer-events-none transition-all duration-300 ease-out ${
                      phoneActive
                        ? "-top-2.5 bg-white px-1 text-[10px] text-blue-600"
                        : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
                    }`}
                  >
                    شماره تماس
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    disabled={isSubmitting}
                    value={formData.phone}
                    onChange={(event) => setFieldValue("phone", event.target.value)}
                    onFocus={() => setFieldFocus("phone", true)}
                    onBlur={() => setFieldFocus("phone", false)}
                    aria-invalid={Boolean(fieldErrors.phone)}
                    aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                    className={`
                      w-full rounded-xl border bg-slate-50/60
                      px-3 py-2.5
                      text-sm md:text-[0.98rem] lg:text-[1.05rem]
                      outline-none transition-all duration-300
                      focus:bg-white focus:ring-1
                      disabled:cursor-not-allowed disabled:bg-slate-100
                      ${
                        fieldErrors.phone
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                          : "border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      }
                    `}
                  />
                  {fieldErrors.phone ? (
                    <p id="phone-error" className="mt-1 text-xs text-red-600">
                      {fieldErrors.phone}
                    </p>
                  ) : null}
                </div>

                <div className="relative text-right">
                  <label
                    htmlFor="message"
                    className={`absolute right-3 z-10 pointer-events-none transition-all duration-300 ease-out ${
                      messageActive
                        ? "-top-2.5 bg-white px-1 text-[10px] text-blue-600"
                        : "top-3 text-sm text-slate-400"
                    }`}
                  >
                    چطور می‌توانیم کمک کنیم؟
                  </label>
                  <div
                    className={`
                      rounded-2xl border bg-slate-50/60
                      px-3 py-2.5 transition-all duration-300
                      focus-within:bg-white focus-within:ring-1
                      ${
                        fieldErrors.message
                          ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500"
                          : "border-slate-200 focus-within:border-blue-500 focus-within:ring-blue-500"
                      }
                    `}
                  >
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      maxLength={220}
                      required
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={(event) => setFieldValue("message", event.target.value)}
                      onFocus={() => setFieldFocus("message", true)}
                      onBlur={() => setFieldFocus("message", false)}
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={fieldErrors.message ? "message-error" : undefined}
                      className="
                        w-full resize-none bg-transparent
                        text-sm md:text-[0.98rem] lg:text-[1.05rem]
                        outline-none disabled:cursor-not-allowed
                      "
                    />
                    <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 md:text-xs">
                      <span>حداکثر ۲۲۰ کاراکتر</span>
                      <span>{formData.message.length}/220</span>
                    </div>
                  </div>
                  {fieldErrors.message ? (
                    <p id="message-error" className="mt-1 text-xs text-red-600">
                      {fieldErrors.message}
                    </p>
                  ) : null}
                </div>

                {submitSuccess ? (
                  <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    {submitSuccess}
                  </p>
                ) : null}

                {submitError ? (
                  <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    mt-1 w-full rounded-full bg-blue-600 py-2.5
                    text-sm font-medium text-white shadow-md transition
                    hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-blue-500 focus-visible:ring-offset-2
                    focus-visible:ring-offset-white
                    md:text-[0.98rem] lg:text-[1.05rem]
                  "
                >
                  {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
                </button>

                <p
                  className="
                    mt-1 text-center leading-relaxed text-slate-400
                    text-[10px] md:text-xs
                  "
                >
                  با ارسال این فرم، با
                  <button type="button" className="mx-1 underline underline-offset-2">
                    شرایط استفاده
                  </button>
                  و
                  <button type="button" className="mx-1 underline underline-offset-2">
                    سیاست حریم خصوصی
                  </button>
                  موافقت می‌کنید.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
