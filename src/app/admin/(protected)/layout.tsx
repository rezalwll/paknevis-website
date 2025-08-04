import Link from "next/link";

import { logoutAdminAction } from "@/app/admin/(protected)/actions";
import { requireAdminUser } from "@/lib/admin-auth";
import {
  ADMIN_ROLE_LABELS,
  canManageEnterprisePlans,
  canManageUsers,
  formatAdminDateTime,
} from "@/lib/admin-types";

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await requireAdminUser();

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[280px_1fr]">
        <aside className="border-l border-slate-800 bg-slate-900/70 px-6 py-8 backdrop-blur">
          <p className="text-sm font-medium text-sky-400">پنل مدیریت پاک‌نویس</p>
          <div className="mt-6 rounded-[1.75rem] border border-slate-800 bg-slate-950/70 p-5">
            <p className="text-xs text-slate-400">کاربر واردشده</p>
            <p className="mt-2 text-lg font-semibold text-white">{currentUser.fullName}</p>
            <p className="mt-1 text-sm text-slate-400">{currentUser.email}</p>
            <p className="mt-3 inline-flex rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300">
              {ADMIN_ROLE_LABELS[currentUser.role]}
            </p>
          </div>

          <nav className="mt-8 space-y-3">
            <Link
              href="/admin"
              className="block rounded-2xl border border-slate-800 px-4 py-3 text-sm text-slate-200 transition hover:border-sky-500/40 hover:bg-slate-800"
            >
              داشبورد
            </Link>
            <Link
              href="/admin/messages"
              className="block rounded-2xl border border-slate-800 px-4 py-3 text-sm text-slate-200 transition hover:border-sky-500/40 hover:bg-slate-800"
            >
              پیام‌های تماس
            </Link>
            {canManageEnterprisePlans(currentUser.role) ? (
              <Link
                href="/admin/enterprise-plans"
                className="block rounded-2xl border border-slate-800 px-4 py-3 text-sm text-slate-200 transition hover:border-sky-500/40 hover:bg-slate-800"
              >
                طرح‌های سازمانی
              </Link>
            ) : null}
            {canManageUsers(currentUser.role) ? (
              <Link
                href="/admin/users"
                className="block rounded-2xl border border-slate-800 px-4 py-3 text-sm text-slate-200 transition hover:border-sky-500/40 hover:bg-slate-800"
              >
                کاربران ادمین
              </Link>
            ) : null}
          </nav>

          <form action={logoutAdminAction} className="mt-8">
            <button
              type="submit"
              className="w-full rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200 transition hover:bg-red-500/20"
            >
              خروج از حساب
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-xs leading-6 text-slate-400">
            <p>راه‌اندازی اولیه ادمین:</p>
            <code className="mt-2 block rounded-xl bg-slate-900 px-3 py-2 text-[11px] text-slate-300">
              npm run bootstrap:admin
            </code>
            <p className="mt-3">
              بعد از تنظیم envهای <span className="text-slate-200">ADMIN_BOOTSTRAP_*</span> اجرا
              شود.
            </p>
            <p className="mt-3">
              زمان فعلی:{" "}
              <span className="text-slate-200">{formatAdminDateTime(new Date().toISOString())}</span>
            </p>
          </div>
        </aside>

        <section className="bg-slate-950 px-4 py-6 md:px-8 lg:px-10">{children}</section>
      </div>
    </div>
  );
}
