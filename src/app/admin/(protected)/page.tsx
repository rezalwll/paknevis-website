import Link from "next/link";

import { listContactMessages, getAdminDashboardCounts } from "@/lib/admin-data";
import { requireAdminUser } from "@/lib/admin-auth";
import {
  MESSAGE_STATUS_LABELS,
  MESSAGE_STATUS_STYLES,
  formatAdminDateTime,
} from "@/lib/admin-types";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const currentUser = await requireAdminUser();
  const counts = await getAdminDashboardCounts(currentUser);
  const recentMessages = await listContactMessages(
    {
      page: 1,
      pageSize: 5,
      search: "",
      status: "",
      assignedTo: "",
    },
    currentUser,
  );

  return (
    <div className="space-y-8">
      <header className="rounded-[2rem] border border-slate-200 bg-white/90 p-6">
        <p className="text-sm text-sky-700">داشبورد ادمین</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">مرکز مدیریت پیام‌های کاربران</h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-500">
          از اینجا می‌توانید پیام‌های جدید را ببینید، روند پیگیری را کنترل کنید و مسئول هر
          مورد را مشخص کنید.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-5">
          <p className="text-sm text-slate-500">کل پیام‌ها</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{counts.totalCount}</p>
        </article>
        <article className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-5">
          <p className="text-sm text-slate-500">پیام‌های جدید</p>
          <p className="mt-3 text-3xl font-semibold text-sky-700">{counts.newCount}</p>
        </article>
        <article className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-5">
          <p className="text-sm text-slate-500">در حال پیگیری</p>
          <p className="mt-3 text-3xl font-semibold text-amber-700">{counts.inProgressCount}</p>
        </article>
        <article className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-5">
          <p className="text-sm text-slate-500">پاسخ داده شده</p>
          <p className="mt-3 text-3xl font-semibold text-emerald-700">{counts.resolvedCount}</p>
        </article>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white/90">
        <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">آخرین پیام‌ها</h2>
            <p className="mt-2 text-sm text-slate-500">نمای سریع آخرین پیام‌های ثبت‌شده</p>
          </div>
          <Link
            href="/admin/messages"
            className="inline-flex w-fit items-center rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            مشاهده صندوق ورودی
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50/80">
              <tr className="text-right text-xs text-slate-500">
                <th className="px-6 py-4 font-medium">فرستنده</th>
                <th className="px-6 py-4 font-medium">وضعیت</th>
                <th className="px-6 py-4 font-medium">تاریخ ثبت</th>
                <th className="px-6 py-4 font-medium">جزئیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
              {recentMessages.items.length > 0 ? (
                recentMessages.items.map((message) => (
                  <tr key={message.id}>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">
                        {message.firstName} {message.lastName}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{message.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${MESSAGE_STATUS_STYLES[message.status]}`}
                      >
                        {MESSAGE_STATUS_LABELS[message.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {formatAdminDateTime(message.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/messages/${message.id}`}
                        className="text-sky-700 transition hover:text-sky-700"
                      >
                        باز کردن پیام
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-500">
                    هنوز پیامی ثبت نشده است.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
