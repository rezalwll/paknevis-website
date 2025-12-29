import type { Metadata } from "next";

import { TextAuditWorkbench } from "@/features/text-audit/TextAuditWorkbench";

export const metadata: Metadata = {
  title: "ممیزی متن فارسی | پاک‌نویس",
  description: "فاصله‌گذاری، نویسه‌ها و نشانه‌گذاری متن فارسی را پیش از انتشار بررسی کنید.",
};

export default function TextAuditPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-3xl">
          <p className="text-sm font-bold text-cyan-700">آزمایشگاه پاک‌نویس</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">ممیزی متن فارسی پیش از انتشار</h1>
          <p className="mt-4 text-base leading-8 text-slate-600">
            متن را در مرورگر و بدون ذخیره‌سازی بررسی کنید؛ هر پیشنهاد همراه با محل دقیق و راه اصلاح نمایش داده می‌شود.
          </p>
        </header>
        <div className="mt-8">
          <TextAuditWorkbench />
        </div>
      </div>
    </main>
  );
}
