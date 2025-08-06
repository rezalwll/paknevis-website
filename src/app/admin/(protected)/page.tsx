import Link from "next/link";

import { getAdminDashboardSummary, listContactMessages } from "@/lib/admin-data";
import { requireAdminUser } from "@/lib/admin-auth";
import {
  MESSAGE_STATUS_LABELS,
  MESSAGE_STATUS_STYLES,
  formatAdminDateTime,
} from "@/lib/admin-types";

export const dynamic = "force-dynamic";

const numberFormatter = new Intl.NumberFormat("fa-IR");
const trendDateFormatter = new Intl.DateTimeFormat("fa-IR", {
  month: "short",
  day: "numeric",
});

function formatDashboardNumber(value: number): string {
  return numberFormatter.format(value);
}

function formatTrendDateLabel(value: string): string {
  return trendDateFormatter.format(new Date(`${value}T00:00:00`));
}

function formatTrackedPathLabel(path: string): string {
  if (path === "/") {
    return "صفحه اصلی";
  }

  return path;
}

export default async function AdminDashboardPage() {
  const currentUser = await requireAdminUser();
  const [dashboard, recentMessages] = await Promise.all([
    getAdminDashboardSummary(currentUser),
    listContactMessages(
      {
        page: 1,
        pageSize: 5,
        search: "",
        status: "",
        assignedTo: "",
      },
      currentUser,
    ),
  ]);

  const maxTrendViews = Math.max(
    1,
    ...dashboard.analytics.dailyTrend.map((item) => item.views),
  );

  return (
    <div className="space-y-8">
      <header className="rounded-[2rem] border border-slate-200 bg-white/90 p-6">
        <p className="text-sm text-sky-700">داشبورد ادمین</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">نمای کلی سایت و پیام‌ها</h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-500">
          از این بخش می‌توانید وضعیت پیام‌های جدید و آمار بازدید سایت را در یک نگاه ببینید.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-5">
          <p className="text-sm text-slate-500">کل پیام‌ها</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {formatDashboardNumber(dashboard.messages.totalCount)}
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-5">
          <p className="text-sm text-slate-500">پیام‌های جدید</p>
          <p className="mt-3 text-3xl font-semibold text-sky-700">
            {formatDashboardNumber(dashboard.messages.newCount)}
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-5">
          <p className="text-sm text-slate-500">بازدید امروز</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {formatDashboardNumber(dashboard.analytics.todayViews)}
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-5">
          <p className="text-sm text-slate-500">بازدید ۷ روز اخیر</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {formatDashboardNumber(dashboard.analytics.last7DaysViews)}
          </p>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1.2fr]">
        <article className="rounded-[2rem] border border-slate-200 bg-white/90 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">نیازمند رسیدگی</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                {formatDashboardNumber(dashboard.messages.newCount)} پیام جدید
              </h2>
            </div>
            <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
              جدید
            </span>
          </div>
          <p className="mt-4 leading-7 text-slate-500">
            پیام‌های تازه ثبت‌شده را بررسی کنید تا پاسخ‌گویی و پیگیری آن‌ها عقب نماند.
          </p>
          <Link
            href="/admin/messages?status=new"
            className="mt-6 inline-flex rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            مشاهده پیام‌های جدید
          </Link>
        </article>

        <article className="rounded-[2rem] border border-slate-200 bg-white/90 p-6">
          <p className="text-sm text-slate-500">میانبرهای سریع</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href="/admin/messages"
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-800 transition hover:border-sky-400 hover:bg-white"
            >
              پیام‌ها
            </Link>
            <Link
              href="/admin/help-center"
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-800 transition hover:border-sky-400 hover:bg-white"
            >
              Help Center
            </Link>
            <Link
              href="/admin/enterprise-plans"
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-800 transition hover:border-sky-400 hover:bg-white"
            >
              پلن‌ها
            </Link>
            <Link
              href="/admin/profile"
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-800 transition hover:border-sky-400 hover:bg-white"
            >
              پروفایل
            </Link>
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.9fr]">
        <article className="rounded-[2rem] border border-slate-200 bg-white/90 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">روند بازدید ۷ روز اخیر</h2>
              <p className="mt-2 text-sm text-slate-500">نمای روزانه بازدید صفحات عمومی سایت</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
              ۷ روز
            </span>
          </div>

          <div className="mt-8 grid grid-cols-7 items-end gap-3">
            {dashboard.analytics.dailyTrend.map((item) => {
              const barHeight = Math.max(12, Math.round((item.views / maxTrendViews) * 180));

              return (
                <div key={item.date} className="flex flex-col items-center gap-3">
                  <span className="text-xs text-slate-500">
                    {formatDashboardNumber(item.views)}
                  </span>
                  <div className="flex h-48 w-full items-end justify-center rounded-[1.5rem] bg-slate-50 px-2 py-3">
                    <div
                      className="w-full rounded-full bg-sky-500/85"
                      style={{ height: `${barHeight}px` }}
                    />
                  </div>
                  <span className="text-center text-xs text-slate-500">
                    {formatTrendDateLabel(item.date)}
                  </span>
                </div>
              );
            })}
          </div>
        </article>

        <article className="rounded-[2rem] border border-slate-200 bg-white/90 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">صفحات پربازدید</h2>
              <p className="mt-2 text-sm text-slate-500">بر پایه مجموع بازدید ۷ روز اخیر</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {dashboard.analytics.topPages.length > 0 ? (
              dashboard.analytics.topPages.map((page, index) => (
                <div
                  key={page.path}
                  className="flex items-center justify-between rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4"
                >
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">#{formatDashboardNumber(index + 1)}</p>
                    <p className="mt-1 truncate font-medium text-slate-900">
                      {formatTrackedPathLabel(page.path)}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-sky-700">
                    {formatDashboardNumber(page.views)} بازدید
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                هنوز داده‌ای برای بازدید صفحات ثبت نشده است.
              </div>
            )}
          </div>
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
            مشاهده صندوق پیام‌ها
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
                        className="text-sky-700 transition hover:text-sky-800"
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
