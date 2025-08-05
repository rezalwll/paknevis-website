import {
  createAdminUserAction,
  toggleAdminUserActiveAction,
} from "@/app/admin/(protected)/users/actions";
import { listAdminUsers } from "@/lib/admin-data";
import { requireAdminRole } from "@/lib/admin-auth";
import {
  ADMIN_ROLES,
  ADMIN_ROLE_LABELS,
  formatAdminDateTime,
} from "@/lib/admin-types";

export const dynamic = "force-dynamic";

type UsersPageProps = {
  searchParams: Promise<{
    error?: string;
    notice?: string;
  }>;
};

function getStateMessage(params: Awaited<UsersPageProps["searchParams"]>) {
  if (params.notice === "user-created") {
    return {
      type: "success" as const,
      text: "کاربر ادمین جدید با موفقیت ساخته شد.",
    };
  }

  if (params.notice === "user-updated") {
    return {
      type: "success" as const,
      text: "وضعیت کاربر با موفقیت به‌روزرسانی شد.",
    };
  }

  if (params.error === "email-taken") {
    return {
      type: "error" as const,
      text: "این ایمیل قبلاً ثبت شده است.",
    };
  }

  if (params.error === "self-disable") {
    return {
      type: "error" as const,
      text: "نمی‌توانید حساب فعلی خودتان را غیرفعال کنید.",
    };
  }

  if (params.error === "last-super-admin") {
    return {
      type: "error" as const,
      text: "حداقل یک super admin فعال باید در سیستم بماند.",
    };
  }

  if (params.error === "invalid-user") {
    return {
      type: "error" as const,
      text: "اطلاعات کاربر معتبر نیست.",
    };
  }

  return null;
}

export default async function AdminUsersPage({ searchParams }: UsersPageProps) {
  await requireAdminRole(["super_admin"]);
  const [users, stateMessage] = await Promise.all([
    listAdminUsers(),
    searchParams.then(getStateMessage),
  ]);

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-slate-200 bg-white/90 p-6">
        <h1 className="text-3xl font-semibold text-slate-900">مدیریت کاربران ادمین</h1>
        <p className="mt-3 max-w-3xl leading-8 text-slate-500">
          از این بخش حساب‌های مدیریتی، نقش‌ها و فعال یا غیرفعال بودن آن‌ها را کنترل کنید.
        </p>
      </header>

      {stateMessage ? (
        <p
          className={`rounded-2xl px-5 py-4 text-sm ${
            stateMessage.type === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {stateMessage.text}
        </p>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6">
          <h2 className="text-xl font-semibold text-slate-900">ساخت ادمین جدید</h2>
          <form action={createAdminUserAction} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm text-slate-600">
                نام کامل
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-slate-600">
                ایمیل
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm text-slate-600">
                رمز عبور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                minLength={8}
                required
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm text-slate-600">
                نقش
              </label>
              <select
                id="role"
                name="role"
                defaultValue="support_agent"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              >
                {ADMIN_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {ADMIN_ROLE_LABELS[role]}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-sky-700"
            >
              ساخت حساب ادمین
            </button>
          </form>
        </section>

        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-xl font-semibold text-slate-900">لیست کاربران مدیریت</h2>
            <p className="mt-2 text-sm text-slate-500">
              {users.length} حساب ادمین در سیستم ثبت شده است.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50/80">
                <tr className="text-right text-xs text-slate-500">
                  <th className="px-6 py-4 font-medium">کاربر</th>
                  <th className="px-6 py-4 font-medium">نقش</th>
                  <th className="px-6 py-4 font-medium">وضعیت</th>
                  <th className="px-6 py-4 font-medium">آخرین ورود</th>
                  <th className="px-6 py-4 font-medium">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-5">
                      <p className="font-medium text-slate-900">{user.fullName}</p>
                      <p className="mt-1 text-xs text-slate-500">{user.email}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        ایجاد شده: {formatAdminDateTime(user.createdAt)}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-slate-600">{ADMIN_ROLE_LABELS[user.role]}</td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          user.isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {user.isActive ? "فعال" : "غیرفعال"}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-xs text-slate-500">
                      {formatAdminDateTime(user.lastLoginAt)}
                    </td>
                    <td className="px-6 py-5">
                      <form action={toggleAdminUserActiveAction}>
                        <input type="hidden" name="userId" value={user.id} />
                        <input
                          type="hidden"
                          name="nextActiveState"
                          value={user.isActive ? "false" : "true"}
                        />
                        <button
                          type="submit"
                          className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                            user.isActive
                              ? "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                              : "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          }`}
                        >
                          {user.isActive ? "غیرفعال کردن" : "فعال کردن"}
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
