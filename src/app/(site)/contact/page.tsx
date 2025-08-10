"use client";

import { TextAreaField } from "@/components/ui/fields/TextAreaField";
import { TextField } from "@/components/ui/fields/TextField";
import { Button } from "@/components/ui/Button";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { useContactForm } from "@/features/contact/useContactForm";

export default function ContactPage() {
  const { formData, fieldErrors, submitError, submitSuccess, isSubmitting, setFieldValue, handleSubmit } =
    useContactForm();

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#e7f0ff] px-4 py-14 text-[16px] text-slate-800 md:px-8 md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]"
    >
      <div className="mx-auto grid w-full max-w-6xl items-start gap-8 lg:grid-cols-2 lg:gap-12 2xl:max-w-7xl">
        <section className="space-y-8 pt-10 text-right text-slate-700">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl lg:text-5xl xl:text-[3.3rem] 2xl:text-[3.6rem]">
              تماس با ما
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-500 md:text-[1.05rem] lg:text-[1.12rem] xl:text-[1.2rem]">
              ایمیل بزن، تماس بگیر یا فرم کنار صفحه را پر کن تا با هم در ارتباط باشیم و درباره نیازهایت صحبت
              کنیم.
            </p>
          </div>

          <div className="space-y-2 text-sm md:text-[1.02rem] lg:text-[1.08rem]">
            <p className="font-medium text-slate-900">info@example.com</p>
            <p className="font-medium text-slate-900">۰۲۱-۱۲۳۴۵۶۷۸</p>
          </div>
        </section>

        <section className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white px-5 py-6 shadow-xl sm:max-w-lg sm:px-6 sm:py-7 lg:max-w-xl">
            <div className="mb-4 space-y-1 text-right">
              <h2 className="text-2xl font-semibold text-slate-900 lg:text-3xl">در تماس باشید</h2>
              <p className="text-sm text-slate-500 md:text-[0.98rem] lg:text-[1.05rem]">
                هر زمان خواستی می‌توانی با ما ارتباط بگیری.
              </p>
            </div>

            <form noValidate onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField
                  id="firstName"
                  name="firstName"
                  label="نام"
                  autoComplete="given-name"
                  required
                  disabled={isSubmitting}
                  value={formData.firstName}
                  error={fieldErrors.firstName}
                  onChange={(value) => setFieldValue("firstName", value)}
                />
                <TextField
                  id="lastName"
                  name="lastName"
                  label="نام خانوادگی"
                  autoComplete="family-name"
                  required
                  disabled={isSubmitting}
                  value={formData.lastName}
                  error={fieldErrors.lastName}
                  onChange={(value) => setFieldValue("lastName", value)}
                />
              </div>

              <TextField
                id="email"
                name="email"
                type="email"
                label="ایمیل"
                autoComplete="email"
                required
                disabled={isSubmitting}
                value={formData.email}
                error={fieldErrors.email}
                onChange={(value) => setFieldValue("email", value)}
              />

              <TextField
                id="phone"
                name="phone"
                type="tel"
                label="شماره تماس"
                autoComplete="tel"
                required
                disabled={isSubmitting}
                value={formData.phone}
                error={fieldErrors.phone}
                onChange={(value) => setFieldValue("phone", value)}
              />

              <TextAreaField
                id="message"
                name="message"
                label="چطور می‌توانیم کمک کنیم؟"
                required
                maxLength={220}
                disabled={isSubmitting}
                value={formData.message}
                error={fieldErrors.message}
                onChange={(value) => setFieldValue("message", value)}
              />

              {submitSuccess ? <StatusMessage tone="success">{submitSuccess}</StatusMessage> : null}
              {submitError ? <StatusMessage tone="error">{submitError}</StatusMessage> : null}

              <Button type="submit" disabled={isSubmitting} className="mt-1 w-full">
                {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
              </Button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

