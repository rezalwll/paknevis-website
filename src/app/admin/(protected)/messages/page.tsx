import Link from "next/link";

import {
  assignMessageAction,
  updateMessageStatusAction,
} from "@/app/admin/(protected)/messages/actions";
import { listAssignableAdmins, listContactMessages } from "@/lib/admin-data";
import { requireAdminUser } from "@/lib/admin-auth";
import {
  MESSAGE_STATUSES,
  MESSAGE_STATUS_LABELS,
  MESSAGE_STATUS_STYLES,
  canManageAssignments,
  formatAdminDateTime,
  type ContactMessageListFilters,
} from "@/lib/admin-types";

export const dynamic = "force-dynamic";

type MessagesPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
    assignedTo?: string;
    page?: string;
  }>;
};

function parseFilters(raw: Awaited<MessagesPageProps["searchParams"]>): ContactMessageListFilters {
  const page = Number.parseInt(raw.page ?? "1", 10);

  return {
    page: Number.isInteger(page) && page > 0 ? page : 1,
    pageSize: 20,
    search: raw.q?.trim() ?? "",
    status: raw.status?.trim() ?? "",
    assignedTo: raw.assignedTo?.trim() ?? "",
  };
}

function buildMessagesUrl(filters: ContactMessageListFilters, page: number): string {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("q", filters.search);
  }

  if (filters.status) {
    params.set("status", filters.status);
  }

  if (filters.assignedTo) {
    params.set("assignedTo", filters.assignedTo);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();
  return queryString ? `/admin/messages?${queryString}` : "/admin/messages";
}

export default async function AdminMessagesPage({ searchParams }: MessagesPageProps) {
  const currentUser = await requireAdminUser();
  const resolvedSearchParams = await searchParams;
  const filters = parseFilters(resolvedSearchParams);
  const canAssign = canManageAssignments(currentUser.role);
  const [messages, assignableAdmins] = await Promise.all([
    listContactMessages(filters, currentUser),
    canAssign ? listAssignableAdmins() : Promise.resolve([]),
  ]);

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-slate-200 bg-white/90 p-6">
        <h1 className="text-3xl font-semibold text-slate-900">صندوق پیام‌های تماس</h1>
        <p className="mt-3 max-w-3xl leading-8 text-slate-500">
          پیام‌های ثبت‌شده از فرم عمومی سایت را از اینجا ببینید، وضعیت‌شان را تغییر دهید و
          مسئول پیگیری تعیین کنید.
        </p>
      </header>

      <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-5">
        <form className="grid gap-4 xl:grid-cols-[1.5fr_0.8fr_0.8fr_auto]">
          <input
            type="search"
            name="q"
            defaultValue={filters.search}
            placeholder="جستجو در نام، ایمیل، تلفن یا متن پیام"
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-right text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10"
          />

          <select
            name="status"
            defaultValue={filters.status}
            className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10"
          >
            <option value="">همه وضعیت‌ها</option>
            {MESSAGE_STATUSES.map((status) => (
              <option key={status} value={status}>
                {MESSAGE_STATUS_LABELS[status]}
              </option>
            ))}
          </select>

          {canAssign ? (
            <select
              name="assignedTo"
              defaultValue={filters.assignedTo}
              className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10"
            >
              <option value="">همه مسئول‌ها</option>
              <option value="unassigned">بدون مسئول</option>
              {assignableAdmins.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.fullName}
                </option>
              ))}
            </select>
          ) : (
            <input type="hidden" name="assignedTo" value="" />
          )}

          <button
            type="submit"
            className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            اعمال فیلتر
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">لیست پیام‌ها</h2>
            <p className="mt-2 text-sm text-slate-500">
              {messages.totalCount} پیام در دسترس شماست.
            </p>
          </div>
          <p className="text-sm text-slate-500">
            صفحه {messages.currentPage} از {messages.totalPages}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50/80">
              <tr className="text-right text-xs text-slate-500">
                <th className="px-6 py-4 font-medium">فرستنده</th>
                <th className="px-6 py-4 font-medium">خلاصه پیام</th>
                <th className="px-6 py-4 font-medium">وضعیت</th>
                <th className="px-6 py-4 font-medium">مسئول</th>
                <th className="px-6 py-4 font-medium">ثبت شده</th>
                <th className="px-6 py-4 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
              {messages.items.length > 0 ? (
                messages.items.map((message) => {
                  const redirectTo = buildMessagesUrl(filters, messages.currentPage);

                  return (
                    <tr key={message.id} className="align-top">
                      <td className="px-6 py-5">
                        <p className="font-medium text-slate-900">
                          {message.firstName} {message.lastName}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">{message.email}</p>
                        <p className="mt-1 text-xs text-slate-500">{message.phone}</p>
                      </td>
                      <td className="px-6 py-5">
                        <p className="max-w-md leading-7 text-slate-600">
                          {message.message.length > 120
                            ? `${message.message.slice(0, 120)}...`
                            : message.message}
                        </p>
                        <p className="mt-2 text-xs text-slate-500">
                          {message.readAt
                            ? `مشاهده شده: ${formatAdminDateTime(message.readAt)}`
                            : "هنوز باز نشده"}
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${MESSAGE_STATUS_STYLES[message.status]}`}
                        >
                          {MESSAGE_STATUS_LABELS[message.status]}
                        </span>
                        <form action={updateMessageStatusAction} className="mt-3 space-y-2">
                          <input type="hidden" name="messageId" value={message.id} />
                          <input type="hidden" name="redirectTo" value={redirectTo} />
                          <select
                            name="status"
                            defaultValue={message.status}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-sky-500"
                          >
                            {MESSAGE_STATUSES.map((status) => (
                              <option key={status} value={status}>
                                {MESSAGE_STATUS_LABELS[status]}
                              </option>
                            ))}
                          </select>
                          <button
                            type="submit"
                            className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700 transition hover:border-sky-400 hover:text-slate-900"
                          >
                            ذخیره وضعیت
                          </button>
                        </form>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm text-slate-700">
                          {message.assignedToName ?? "بدون مسئول"}
                        </p>
                        {canAssign ? (
                          <form action={assignMessageAction} className="mt-3 space-y-2">
                            <input type="hidden" name="messageId" value={message.id} />
                            <input type="hidden" name="redirectTo" value={redirectTo} />
                            <select
                              name="assignedTo"
                              defaultValue={message.assignedTo?.toString() ?? ""}
                              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-sky-500"
                            >
                              <option value="">بدون مسئول</option>
                              {assignableAdmins.map((admin) => (
                                <option key={admin.id} value={admin.id}>
                                  {admin.fullName}
                                </option>
                              ))}
                            </select>
                            <button
                              type="submit"
                              className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700 transition hover:border-sky-400 hover:text-slate-900"
                            >
                              ثبت مسئول
                            </button>
                          </form>
                        ) : null}
                      </td>
                      <td className="px-6 py-5 text-xs text-slate-500">
                        {formatAdminDateTime(message.createdAt)}
                      </td>
                      <td className="px-6 py-5">
                        <Link
                          href={`/admin/messages/${message.id}`}
                          className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          مشاهده جزئیات
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-500">
                    موردی با فیلترهای فعلی پیدا نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[2rem] border border-slate-200 bg-white/90 px-6 py-4 text-sm">
        <Link
          href={buildMessagesUrl(filters, Math.max(1, messages.currentPage - 1))}
          className={`rounded-full px-4 py-2 transition ${
            messages.currentPage > 1
              ? "bg-slate-100 text-slate-900 hover:bg-slate-200"
              : "cursor-not-allowed bg-slate-100 text-slate-400"
          }`}
        >
          صفحه قبل
        </Link>
        <p className="text-slate-500">{messages.totalCount} نتیجه</p>
        <Link
          href={buildMessagesUrl(filters, Math.min(messages.totalPages, messages.currentPage + 1))}
          className={`rounded-full px-4 py-2 transition ${
            messages.currentPage < messages.totalPages
              ? "bg-sky-600 text-white hover:bg-sky-700"
              : "cursor-not-allowed bg-slate-100 text-slate-400"
          }`}
        >
          صفحه بعد
        </Link>
      </div>
    </div>
  );
}
