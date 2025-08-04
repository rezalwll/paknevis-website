import {
  createEnterprisePlanAction,
  setPopularEnterprisePlanAction,
  toggleEnterprisePlanActiveAction,
  updateEnterprisePlanAction,
} from "@/app/admin/(protected)/enterprise-plans/actions";
import { requireAdminRole } from "@/lib/admin-auth";
import { formatAdminDateTime } from "@/lib/admin-types";
import { listEnterprisePlans } from "@/lib/enterprise-plans";

export const dynamic = "force-dynamic";

type EnterprisePlansPageProps = {
  searchParams: Promise<{
    error?: string;
    notice?: string;
  }>;
};

function getStateMessage(params: Awaited<EnterprisePlansPageProps["searchParams"]>) {
  if (params.notice === "plan-created") {
    return {
      type: "success" as const,
      text: "طرح جدید با موفقیت ساخته شد.",
    };
  }

  if (params.notice === "plan-updated") {
    return {
      type: "success" as const,
      text: "اطلاعات طرح با موفقیت به‌روزرسانی شد.",
    };
  }

  if (params.notice === "plan-status-updated") {
    return {
      type: "success" as const,
      text: "وضعیت نمایش طرح با موفقیت تغییر کرد.",
    };
  }

  if (params.notice === "plan-popular-updated") {
    return {
      type: "success" as const,
      text: "طرح محبوب با موفقیت به‌روزرسانی شد.",
    };
  }

  if (params.error === "invalid-plan") {
    return {
      type: "error" as const,
      text: "اطلاعات طرح معتبر نیست. همه فیلدها را درست پر کنید.",
    };
  }

  if (params.error === "invalid-plan-id") {
    return {
      type: "error" as const,
      text: "طرح موردنظر پیدا نشد.",
    };
  }

  if (params.error === "inactive-plan") {
    return {
      type: "error" as const,
      text: "فقط طرح فعال می‌تواند محبوب باشد.",
    };
  }

  return null;
}

export default async function AdminEnterprisePlansPage({
  searchParams,
}: EnterprisePlansPageProps) {
  await requireAdminRole(["super_admin", "support_manager"]);

  const [plans, stateMessage] = await Promise.all([
    listEnterprisePlans(),
    searchParams.then(getStateMessage),
  ]);

  const activeCount = plans.filter((plan) => plan.isActive).length;
  const inactiveCount = plans.length - activeCount;

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
        <h1 className="text-3xl font-semibold text-white">مدیریت طرح‌های سازمانی</h1>
        <p className="mt-3 max-w-3xl leading-8 text-slate-400">
          از این بخش طرح‌های صفحه نسخه سازمانی را مدیریت کنید، قیمت و تعداد کاربر را تغییر
          دهید، طرح جدید بسازید و مشخص کنید کدام پلن به‌عنوان پیشنهاد محبوب نمایش داده شود.
        </p>
      </header>

      {stateMessage ? (
        <p
          className={`rounded-2xl px-5 py-4 text-sm ${
            stateMessage.type === "success"
              ? "bg-emerald-500/10 text-emerald-200"
              : "bg-red-500/10 text-red-200"
          }`}
        >
          {stateMessage.text}
        </p>
      ) : null}

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-[1.75rem] border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">کل طرح‌ها</p>
          <p className="mt-3 text-3xl font-semibold text-white">{plans.length}</p>
        </article>
        <article className="rounded-[1.75rem] border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">طرح‌های فعال</p>
          <p className="mt-3 text-3xl font-semibold text-emerald-300">{activeCount}</p>
        </article>
        <article className="rounded-[1.75rem] border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">طرح‌های غیرفعال</p>
          <p className="mt-3 text-3xl font-semibold text-amber-300">{inactiveCount}</p>
        </article>
      </section>

      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-xl font-semibold text-white">ساخت طرح جدید</h2>
        <form action={createEnterprisePlanAction} className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm text-slate-300">
              عنوان طرح
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="priceMillion" className="block text-sm text-slate-300">
              قیمت (میلیون تومان)
            </label>
            <input
              id="priceMillion"
              name="priceMillion"
              type="number"
              min="0.01"
              step="0.01"
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="userCount" className="block text-sm text-slate-300">
              تعداد کاربر
            </label>
            <input
              id="userCount"
              name="userCount"
              type="number"
              min="1"
              step="1"
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="sortOrder" className="block text-sm text-slate-300">
              ترتیب نمایش
            </label>
            <input
              id="sortOrder"
              name="sortOrder"
              type="number"
              min="0"
              step="1"
              placeholder="اگر خالی باشد آخر لیست قرار می‌گیرد"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
            />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <label htmlFor="description" className="block text-sm text-slate-300">
              توضیح طرح
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              className="w-full rounded-[1.5rem] border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
            />
          </div>
          <label className="inline-flex items-center gap-3 text-sm text-slate-300 lg:col-span-2">
            <input
              type="checkbox"
              name="makePopular"
              className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-sky-500 focus:ring-sky-500"
            />
            این طرح بلافاصله محبوب شود
          </label>
          <div className="lg:col-span-2">
            <button
              type="submit"
              className="rounded-2xl bg-sky-500 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-400"
            >
              ساخت طرح جدید
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">لیست طرح‌ها</h2>
          <p className="text-sm text-slate-400">همه طرح‌ها با وضعیت فعال یا غیرفعال</p>
        </div>

        {plans.length > 0 ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {plans.map((plan) => (
              <article
                key={plan.id}
                className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{plan.title}</h3>
                    <p className="mt-2 text-xs text-slate-500">
                      ساخته‌شده: {formatAdminDateTime(plan.createdAt)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      آخرین تغییر: {formatAdminDateTime(plan.updatedAt)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        plan.isActive
                          ? "bg-emerald-500/10 text-emerald-200"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {plan.isActive ? "فعال" : "غیرفعال"}
                    </span>
                    {plan.isPopular ? (
                      <span className="inline-flex rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-200">
                        محبوب
                      </span>
                    ) : null}
                  </div>
                </div>

                <form action={updateEnterprisePlanAction} className="mt-6 space-y-4">
                  <input type="hidden" name="planId" value={plan.id} />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="block text-sm text-slate-300">عنوان طرح</label>
                      <input
                        name="title"
                        type="text"
                        defaultValue={plan.title}
                        required
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm text-slate-300">قیمت (میلیون تومان)</label>
                      <input
                        name="priceMillion"
                        type="number"
                        min="0.01"
                        step="0.01"
                        defaultValue={plan.priceMillion}
                        required
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm text-slate-300">تعداد کاربر</label>
                      <input
                        name="userCount"
                        type="number"
                        min="1"
                        step="1"
                        defaultValue={plan.userCount}
                        required
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm text-slate-300">ترتیب نمایش</label>
                      <input
                        name="sortOrder"
                        type="number"
                        min="0"
                        step="1"
                        defaultValue={plan.sortOrder}
                        required
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm text-slate-300">توضیح طرح</label>
                    <textarea
                      name="description"
                      rows={4}
                      defaultValue={plan.description}
                      required
                      className="w-full rounded-[1.5rem] border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
                  >
                    ذخیره تغییرات
                  </button>
                </form>

                <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-800 pt-5">
                  {plan.isPopular ? (
                    <span className="inline-flex rounded-2xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm text-sky-200">
                      این طرح محبوب فعلی است
                    </span>
                  ) : plan.isActive ? (
                    <form action={setPopularEnterprisePlanAction}>
                      <input type="hidden" name="planId" value={plan.id} />
                      <button
                        type="submit"
                        className="rounded-2xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm font-medium text-sky-200 transition hover:bg-sky-500/20"
                      >
                        محبوب کردن این طرح
                      </button>
                    </form>
                  ) : (
                    <span className="inline-flex rounded-2xl border border-slate-700 px-4 py-3 text-sm text-slate-400">
                      طرح غیرفعال نمی‌تواند محبوب باشد
                    </span>
                  )}

                  <form action={toggleEnterprisePlanActiveAction}>
                    <input type="hidden" name="planId" value={plan.id} />
                    <input
                      type="hidden"
                      name="nextActiveState"
                      value={plan.isActive ? "false" : "true"}
                    />
                    <button
                      type="submit"
                      className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                        plan.isActive
                          ? "border border-red-500/30 bg-red-500/10 text-red-200 hover:bg-red-500/20"
                          : "border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20"
                      }`}
                    >
                      {plan.isActive ? "غیرفعال کردن طرح" : "فعال کردن طرح"}
                    </button>
                  </form>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-700 bg-slate-900/40 p-8 text-center text-slate-400">
            هنوز هیچ طرحی برای نسخه سازمانی ثبت نشده است.
          </div>
        )}
      </section>
    </div>
  );
}
