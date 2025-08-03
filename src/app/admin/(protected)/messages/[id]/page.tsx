import Link from "next/link";
import { notFound } from "next/navigation";

import {
  assignMessageAction,
  updateMessageStatusAction,
} from "@/app/admin/(protected)/messages/actions";
import { getContactMessageById, listAssignableAdmins } from "@/lib/admin-data";
import { requireAdminUser } from "@/lib/admin-auth";
import {
  MESSAGE_STATUSES,
  MESSAGE_STATUS_LABELS,
  MESSAGE_STATUS_STYLES,
  canManageAssignments,
  formatAdminDateTime,
} from "@/lib/admin-types";

export const dynamic = "force-dynamic";

type MessageDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminMessageDetailsPage({
  params,
}: MessageDetailsPageProps) {
  const currentUser = await requireAdminUser();
  const { id } = await params;
  const messageId = Number.parseInt(id, 10);

  if (!Number.isInteger(messageId) || messageId <= 0) {
    notFound();
  }

  const message = await getContactMessageById(messageId, currentUser);

  if (!message) {
    notFound();
  }

  const canAssign = canManageAssignments(currentUser.role);
  const assignableAdmins = canAssign ? await listAssignableAdmins() : [];
  const redirectTo = `/admin/messages/${message.id}`;

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm text-sky-400">جزئیات پیام</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">
              {message.firstName} {message.lastName}
            </h1>
            <p className="mt-3 text-sm text-slate-400">{message.email}</p>
            <p className="mt-1 text-sm text-slate-500">{message.phone}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${MESSAGE_STATUS_STYLES[message.status]}`}
            >
              {MESSAGE_STATUS_LABELS[message.status]}
            </span>
            <span className="inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
              {message.assignedToName ?? "بدون مسئول"}
            </span>
          </div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-lg font-semibold text-white">متن پیام</h2>
          <p className="mt-5 whitespace-pre-wrap leading-8 text-slate-300">{message.message}</p>

          <dl className="mt-8 grid gap-4 border-t border-slate-800 pt-6 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-950/60 p-4">
              <dt className="text-xs text-slate-500">تاریخ ثبت</dt>
              <dd className="mt-2 text-sm text-slate-200">{formatAdminDateTime(message.createdAt)}</dd>
            </div>
            <div className="rounded-2xl bg-slate-950/60 p-4">
              <dt className="text-xs text-slate-500">آخرین تغییر</dt>
              <dd className="mt-2 text-sm text-slate-200">{formatAdminDateTime(message.updatedAt)}</dd>
            </div>
            <div className="rounded-2xl bg-slate-950/60 p-4">
              <dt className="text-xs text-slate-500">اولین مشاهده</dt>
              <dd className="mt-2 text-sm text-slate-200">{formatAdminDateTime(message.readAt)}</dd>
            </div>
            <div className="rounded-2xl bg-slate-950/60 p-4">
              <dt className="text-xs text-slate-500">مسئول فعلی</dt>
              <dd className="mt-2 text-sm text-slate-200">{message.assignedToName ?? "بدون مسئول"}</dd>
            </div>
          </dl>
        </section>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-lg font-semibold text-white">به‌روزرسانی وضعیت</h2>
            <form action={updateMessageStatusAction} className="mt-5 space-y-3">
              <input type="hidden" name="messageId" value={message.id} />
              <input type="hidden" name="redirectTo" value={redirectTo} />
              <select
                name="status"
                defaultValue={message.status}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500"
              >
                {MESSAGE_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {MESSAGE_STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full rounded-2xl bg-sky-500 px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-400"
              >
                ذخیره وضعیت
              </button>
            </form>
          </section>

          {canAssign ? (
            <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-lg font-semibold text-white">تعیین مسئول پیگیری</h2>
              <form action={assignMessageAction} className="mt-5 space-y-3">
                <input type="hidden" name="messageId" value={message.id} />
                <input type="hidden" name="redirectTo" value={redirectTo} />
                <select
                  name="assignedTo"
                  defaultValue={message.assignedTo?.toString() ?? ""}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500"
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
                  className="w-full rounded-2xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-sky-400 hover:bg-slate-800"
                >
                  ثبت مسئول
                </button>
              </form>
            </section>
          ) : null}

          <Link
            href="/admin/messages"
            className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-800"
          >
            بازگشت به لیست پیام‌ها
          </Link>
        </aside>
      </div>
    </div>
  );
}
