import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/LoginForm";
import { getCurrentAdminUser } from "@/lib/admin-auth";

export default async function AdminLoginPage() {
  const currentUser = await getCurrentAdminUser();

  if (currentUser) {
    redirect("/admin");
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe,_#f8fafc_48%,_#e2e8f0_100%)] px-4 py-10"
    >
      <div className="mx-auto grid min-h-[85vh] max-w-5xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-2xl shadow-slate-300/40 backdrop-blur">
          <p className="text-sm font-medium text-sky-700">Paknevis Admin</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-950 md:text-4xl">
            صندوق پیام‌های کاربران را از همین پروژه مدیریت کنید
          </h1>
          <p className="mt-5 max-w-2xl leading-8 text-slate-600">
            این پنل برای پیگیری پیام‌های فرم تماس ساخته شده است. مدیران می‌توانند پیام‌های
            جدید را ببینند، مسئول تعیین کنند و روند پاسخ‌گویی را از داخل سایت کنترل کنند.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-950 px-5 py-4 text-white">
              <p className="text-sm text-slate-300">ورود امن</p>
              <p className="mt-2 text-lg font-medium">Session Cookie</p>
            </div>
            <div className="rounded-3xl bg-white px-5 py-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm text-slate-500">مدیریت پیام‌ها</p>
              <p className="mt-2 text-lg font-medium">Inbox داخلی</p>
            </div>
            <div className="rounded-3xl bg-white px-5 py-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm text-slate-500">نقش‌ها</p>
              <p className="mt-2 text-lg font-medium">چند ادمین</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/30">
          <div className="mb-6 text-right">
            <h2 className="text-2xl font-semibold text-slate-950">ورود مدیر</h2>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              برای مشاهده پیام‌های کاربران با حساب ادمین وارد شوید.
            </p>
          </div>
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
