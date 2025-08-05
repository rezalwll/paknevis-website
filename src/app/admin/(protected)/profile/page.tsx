import {
  changeOwnPasswordAction,
  updateOwnProfileAction,
} from "@/app/admin/(protected)/profile/actions";
import { requireAdminUser } from "@/lib/admin-auth";
import { ADMIN_ROLE_LABELS } from "@/lib/admin-types";

export const dynamic = "force-dynamic";

type ProfilePageProps = {
  searchParams: Promise<{
    error?: string;
    notice?: string;
  }>;
};

function getStateMessage(params: Awaited<ProfilePageProps["searchParams"]>) {
  const successMessages: Record<string, string> = {
    "profile-updated": "اطلاعات پروفایل با موفقیت به‌روزرسانی شد.",
    "password-updated": "رمز عبور با موفقیت تغییر کرد.",
  };
  const errorMessages: Record<string, string> = {
    "invalid-profile": "اطلاعات پروفایل معتبر نیست.",
    "email-taken": "این ایمیل قبلاً ثبت شده است.",
    "username-taken": "این یوزرنیم قبلاً ثبت شده است.",
    "invalid-password": "اطلاعات رمز عبور معتبر نیست.",
    "current-password": "رمز عبور فعلی درست نیست.",
  };

  if (params.notice && successMessages[params.notice]) {
    return {
      type: "success" as const,
      text: successMessages[params.notice],
    };
  }

  if (params.error && errorMessages[params.error]) {
    return {
      type: "error" as const,
      text: errorMessages[params.error],
    };
  }

  return null;
}

export default async function AdminProfilePage({ searchParams }: ProfilePageProps) {
  const [currentUser, stateMessage] = await Promise.all([
    requireAdminUser(),
    searchParams.then(getStateMessage),
  ]);

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-slate-200 bg-white/90 p-6">
        <p className="text-sm text-sky-700">پروفایل من</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          ویرایش اطلاعات حساب
        </h1>
        <p className="mt-3 max-w-3xl leading-8 text-slate-500">
          اطلاعات ورود و مشخصات حساب ادمین خودتان را از این بخش مدیریت کنید.
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

      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">اطلاعات پروفایل</h2>
              <p className="mt-2 text-sm text-slate-500">
                نقش فعلی: {ADMIN_ROLE_LABELS[currentUser.role]}
              </p>
            </div>
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
              @{currentUser.username}
            </span>
          </div>

          <form action={updateOwnProfileAction} className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="profile-full-name" className="block text-sm text-slate-600">
                نام کامل
              </label>
              <input
                id="profile-full-name"
                name="fullName"
                type="text"
                defaultValue={currentUser.fullName}
                maxLength={120}
                required
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="profile-email" className="block text-sm text-slate-600">
                ایمیل
              </label>
              <input
                id="profile-email"
                name="email"
                type="email"
                defaultValue={currentUser.email}
                required
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              />
            </div>

            <div className="space-y-2 lg:col-span-2">
              <label htmlFor="profile-username" className="block text-sm text-slate-600">
                یوزرنیم
              </label>
              <input
                id="profile-username"
                name="username"
                type="text"
                pattern="[a-z0-9._-]{3,40}"
                minLength={3}
                maxLength={40}
                defaultValue={currentUser.username}
                required
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              />
            </div>

            <div className="lg:col-span-2">
              <button
                type="submit"
                className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-700"
              >
                ذخیره اطلاعات پروفایل
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6">
          <h2 className="text-xl font-semibold text-slate-900">تغییر رمز عبور</h2>
          <form action={changeOwnPasswordAction} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="current-password" className="block text-sm text-slate-600">
                رمز عبور فعلی
              </label>
              <input
                id="current-password"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="next-password" className="block text-sm text-slate-600">
                رمز عبور جدید
              </label>
              <input
                id="next-password"
                name="nextPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="next-password-confirmation" className="block text-sm text-slate-600">
                تکرار رمز عبور جدید
              </label>
              <input
                id="next-password-confirmation"
                name="nextPasswordConfirmation"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition hover:border-sky-400 hover:bg-slate-100"
            >
              تغییر رمز عبور
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
