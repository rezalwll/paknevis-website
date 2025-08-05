"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, Plus } from "lucide-react";

import {
  archiveHelpCategoryAction,
  archiveHelpQuestionAction,
  createHelpCategoryAction,
  createHelpQuestionAction,
  restoreHelpCategoryAction,
  restoreHelpQuestionAction,
  updateHelpCategoryAction,
  updateHelpQuestionAction,
} from "@/app/admin/(protected)/help-center/actions";
import {
  HELP_ICON_KEYS,
  HELP_ICON_LABELS,
  formatAdminDateTime,
  type HelpCategory,
  type HelpQuestion,
} from "@/lib/admin-types";

type StateMessage = {
  type: "success" | "error";
  text: string;
} | null;

function getPreviewText(value: string, maxLength = 140): string {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength).trim()}...`;
}

function QuestionRow({
  item,
  archived,
  categoryId,
}: {
  item: HelpQuestion;
  archived: boolean;
  categoryId: number;
}) {
  return (
    <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/90 open:bg-white">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-4 py-4 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h5 className="text-sm font-medium text-slate-900 md:text-base">{item.question}</h5>
            <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
              ترتیب {item.sortOrder}
            </span>
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
                archived
                  ? "bg-amber-50 text-amber-700"
                  : "bg-sky-50 text-sky-700"
              }`}
            >
              {archived ? "آرشیوشده" : "فعال"}
            </span>
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            {getPreviewText(item.answer, 120)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden text-xs text-slate-500 md:inline">
            {formatAdminDateTime(item.updatedAt)}
          </span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition group-open:rotate-180">
            <ChevronDown className="h-4 w-4" />
          </span>
        </div>
      </summary>

      <div className="border-t border-slate-200 px-4 py-4">
        <form action={updateHelpQuestionAction} className="space-y-4">
          <input type="hidden" name="questionId" value={item.id} />
          <input type="hidden" name="returnCategoryId" value={categoryId} />
          <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-2">
              <label className="block text-sm text-slate-600">متن سؤال</label>
              <input
                name="question"
                type="text"
                defaultValue={item.question}
                required
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-slate-600">ترتیب نمایش</label>
              <input
                name="sortOrder"
                type="number"
                min="0"
                step="1"
                defaultValue={item.sortOrder}
                required
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-slate-600">پاسخ</label>
            <textarea
              name="answer"
              rows={4}
              defaultValue={item.answer}
              required
              className="w-full rounded-[1.5rem] border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              ذخیره تغییرات سؤال
            </button>
            <span className="text-xs text-slate-500">
              ایجاد شده: {formatAdminDateTime(item.createdAt)} | آخرین تغییر:{" "}
              {formatAdminDateTime(item.updatedAt)}
            </span>
          </div>
        </form>

        <div className="mt-4 border-t border-slate-200 pt-4">
          {archived ? (
            <form action={restoreHelpQuestionAction}>
              <input type="hidden" name="questionId" value={item.id} />
              <input type="hidden" name="returnCategoryId" value={categoryId} />
              <button
                type="submit"
                className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
              >
                بازگردانی سؤال
              </button>
            </form>
          ) : (
            <form action={archiveHelpQuestionAction}>
              <input type="hidden" name="questionId" value={item.id} />
              <input type="hidden" name="returnCategoryId" value={categoryId} />
              <button
                type="submit"
                className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 transition hover:bg-amber-100"
              >
                آرشیو سؤال
              </button>
            </form>
          )}
        </div>
      </div>
    </details>
  );
}

function CategoryListSection({
  title,
  categories,
  selectedCategoryId,
  onSelect,
}: {
  title: string;
  categories: HelpCategory[];
  selectedCategoryId: number | null;
  onSelect: (categoryId: number) => void;
}) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white/90">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
            {categories.length} مورد
          </span>
        </div>
      </div>

      {categories.length > 0 ? (
        <div className="divide-y divide-slate-200">
          {categories.map((category) => {
            const activeQuestions = category.questions.filter((item) => !item.isArchived).length;
            const archivedQuestions = category.questions.length - activeQuestions;
            const isSelected = selectedCategoryId === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelect(category.id)}
                className={`flex w-full items-center justify-between gap-3 px-5 py-4 text-right transition ${
                  isSelected ? "bg-sky-50" : "hover:bg-slate-100/60"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-medium text-slate-900 md:text-base">
                      {category.title}
                    </h4>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-600">
                      {HELP_ICON_LABELS[category.iconKey]}
                    </span>
                    <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[11px] text-sky-700">
                      {activeQuestions} فعال
                    </span>
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] text-amber-700">
                      {archivedQuestions} آرشیو
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    ترتیب {category.sortOrder} | آخرین تغییر {formatAdminDateTime(category.updatedAt)}
                  </p>
                </div>
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-slate-50 text-slate-600">
                  <ChevronLeft className="h-4 w-4" />
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="px-5 py-6 text-sm text-slate-500">آیتمی در این بخش وجود ندارد.</div>
      )}
    </section>
  );
}

function SelectedCategoryPanel({ category }: { category: HelpCategory | null }) {
  if (!category) {
    return (
      <section className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50/80 px-6 py-12 text-center text-slate-500">
        یک دسته‌بندی از ستون کناری انتخاب کنید تا مدیریت سؤال‌ها و تنظیمات آن نمایش داده شود.
      </section>
    );
  }

  const activeQuestions = category.questions.filter((item) => !item.isArchived);
  const archivedQuestions = category.questions.filter((item) => item.isArchived);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold text-slate-900">{category.title}</h2>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                  category.isArchived
                    ? "bg-slate-100 text-slate-700"
                    : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {category.isArchived ? "آرشیوشده" : "فعال"}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              آیکون: {HELP_ICON_LABELS[category.iconKey]} | ترتیب: {category.sortOrder}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              ایجاد شده: {formatAdminDateTime(category.createdAt)} | آخرین تغییر:{" "}
              {formatAdminDateTime(category.updatedAt)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
              {activeQuestions.length} سؤال فعال
            </span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              {archivedQuestions.length} سؤال آرشیوشده
            </span>
          </div>
        </div>

        <form action={updateHelpCategoryAction} className="mt-6 grid gap-4 xl:grid-cols-3">
          <input type="hidden" name="categoryId" value={category.id} />
          <div className="space-y-2">
            <label className="block text-sm text-slate-600">عنوان دسته‌بندی</label>
            <input
              name="title"
              type="text"
              defaultValue={category.title}
              required
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-slate-600">آیکون</label>
            <select
              name="iconKey"
              defaultValue={category.iconKey}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
            >
              {HELP_ICON_KEYS.map((iconKey) => (
                <option key={iconKey} value={iconKey}>
                  {HELP_ICON_LABELS[iconKey]}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-slate-600">ترتیب نمایش</label>
            <input
              name="sortOrder"
              type="number"
              min="0"
              step="1"
              defaultValue={category.sortOrder}
              required
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
            />
          </div>
          <div className="xl:col-span-3">
            <button
              type="submit"
              className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              ذخیره تغییرات دسته‌بندی
            </button>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap gap-3">
          {category.isArchived ? (
            <form action={restoreHelpCategoryAction}>
              <input type="hidden" name="categoryId" value={category.id} />
              <button
                type="submit"
                className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
              >
                بازگردانی دسته‌بندی
              </button>
            </form>
          ) : (
            <form action={archiveHelpCategoryAction}>
              <input type="hidden" name="categoryId" value={category.id} />
              <button
                type="submit"
                className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 transition hover:bg-amber-100"
              >
                آرشیو دسته‌بندی
              </button>
            </form>
          )}
        </div>
      </section>

      <details className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/90">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white">
              <Plus className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 md:text-base">افزودن سؤال جدید</h3>
              <p className="text-xs text-slate-500">فرم ساخت سؤال فقط در صورت نیاز باز می‌شود.</p>
            </div>
          </div>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-slate-50 text-slate-600 transition group-open:rotate-180">
            <ChevronDown className="h-4 w-4" />
          </span>
        </summary>
        <div className="border-t border-slate-200 px-5 py-5">
          <form action={createHelpQuestionAction} className="space-y-4">
            <input type="hidden" name="categoryId" value={category.id} />
            <input type="hidden" name="returnCategoryId" value={category.id} />
            <div className="grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
              <div className="space-y-2">
                <label className="block text-sm text-slate-600">متن سؤال</label>
                <input
                  name="question"
                  type="text"
                  required
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-slate-600">ترتیب نمایش</label>
                <input
                  name="sortOrder"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="خالی = آخر لیست"
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-slate-600">پاسخ</label>
              <textarea
                name="answer"
                rows={4}
                required
                className="w-full rounded-[1.5rem] border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              />
            </div>
            <button
              type="submit"
              className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-sky-700"
            >
              افزودن سؤال جدید
            </button>
          </form>
        </div>
      </details>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white/90">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 md:text-base">سؤال‌های فعال</h3>
            <p className="text-xs text-slate-500">لیست فشرده سؤال‌های منتشرشده این دسته</p>
          </div>
          <span className="rounded-full bg-sky-50 px-3 py-1 text-xs text-sky-700">
            {activeQuestions.length} مورد
          </span>
        </div>
        <div className="space-y-3 px-5 py-5">
          {activeQuestions.length > 0 ? (
            activeQuestions.map((item) => (
              <QuestionRow
                key={item.id}
                item={item}
                archived={false}
                categoryId={category.id}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 px-4 py-5 text-sm text-slate-500">
              هنوز سؤال فعالی برای این دسته‌بندی ثبت نشده است.
            </div>
          )}
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white/90">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 md:text-base">سؤال‌های آرشیوشده</h3>
            <p className="text-xs text-slate-500">موارد پنهان‌شده از سایت که هنوز قابل مدیریت هستند</p>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-700">
            {archivedQuestions.length} مورد
          </span>
        </div>
        <div className="space-y-3 px-5 py-5">
          {archivedQuestions.length > 0 ? (
            archivedQuestions.map((item) => (
              <QuestionRow
                key={item.id}
                item={item}
                archived
                categoryId={category.id}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 px-4 py-5 text-sm text-slate-500">
              هنوز سؤال آرشیوشده‌ای برای این دسته‌بندی وجود ندارد.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function HelpCenterManager({
  categories,
  stateMessage,
  initialCategoryId,
}: {
  categories: HelpCategory[];
  stateMessage: StateMessage;
  initialCategoryId: number | null;
}) {
  const activeCategories = useMemo(
    () => categories.filter((category) => !category.isArchived),
    [categories],
  );
  const archivedCategories = useMemo(
    () => categories.filter((category) => category.isArchived),
    [categories],
  );
  const fallbackCategoryId =
    activeCategories[0]?.id ?? archivedCategories[0]?.id ?? null;
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    initialCategoryId ?? fallbackCategoryId,
  );

  useEffect(() => {
    setSelectedCategoryId(initialCategoryId ?? fallbackCategoryId);
  }, [fallbackCategoryId, initialCategoryId]);

  const selectedCategory = useMemo(
    () =>
      categories.find((category) => category.id === selectedCategoryId) ??
      categories.find((category) => category.id === fallbackCategoryId) ??
      null,
    [categories, fallbackCategoryId, selectedCategoryId],
  );

  const activeQuestionCount = useMemo(
    () =>
      categories.reduce(
        (sum, category) => sum + category.questions.filter((item) => !item.isArchived).length,
        0,
      ),
    [categories],
  );

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("category", String(categoryId));
      window.history.replaceState(window.history.state, "", url);
    }
  };

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-slate-200 bg-white/90 p-6">
        <h1 className="text-3xl font-semibold text-slate-900">مدیریت راهنما</h1>
        <p className="mt-3 max-w-3xl leading-8 text-slate-500">
          دسته‌بندی‌ها را از ستون کناری انتخاب کنید و فقط همان بخش را مدیریت کنید. این چیدمان
          فضای کمتری می‌گیرد و برای کار روزانه سریع‌تر است.
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

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-[1.5rem] border border-slate-200 bg-white/90 px-5 py-4">
          <p className="text-xs text-slate-500">کل دسته‌بندی‌ها</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{categories.length}</p>
        </article>
        <article className="rounded-[1.5rem] border border-slate-200 bg-white/90 px-5 py-4">
          <p className="text-xs text-slate-500">دسته‌بندی‌های فعال</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-700">
            {activeCategories.length}
          </p>
        </article>
        <article className="rounded-[1.5rem] border border-slate-200 bg-white/90 px-5 py-4">
          <p className="text-xs text-slate-500">سؤال‌های فعال</p>
          <p className="mt-2 text-2xl font-semibold text-sky-700">{activeQuestionCount}</p>
        </article>
      </section>

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <aside className="space-y-6">
          <details className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/90">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 md:text-base">ساخت دسته‌بندی جدید</h2>
                <p className="text-xs text-slate-500">فرم ساخت را فقط در صورت نیاز باز کنید.</p>
              </div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-slate-50 text-slate-600 transition group-open:rotate-180">
                <ChevronDown className="h-4 w-4" />
              </span>
            </summary>
            <div className="border-t border-slate-200 px-5 py-5">
              <form action={createHelpCategoryAction} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm text-slate-600">
                    عنوان دسته‌بندی
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="iconKey" className="block text-sm text-slate-600">
                      آیکون
                    </label>
                    <select
                      id="iconKey"
                      name="iconKey"
                      defaultValue="help_circle"
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
                    >
                      {HELP_ICON_KEYS.map((iconKey) => (
                        <option key={iconKey} value={iconKey}>
                          {HELP_ICON_LABELS[iconKey]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="sortOrder" className="block text-sm text-slate-600">
                      ترتیب نمایش
                    </label>
                    <input
                      id="sortOrder"
                      name="sortOrder"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="خالی"
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-sky-700"
                >
                  ساخت دسته‌بندی جدید
                </button>
              </form>
            </div>
          </details>

          <CategoryListSection
            title="دسته‌بندی‌های فعال"
            categories={activeCategories}
            selectedCategoryId={selectedCategory?.id ?? null}
            onSelect={handleSelectCategory}
          />

          <CategoryListSection
            title="دسته‌بندی‌های آرشیوشده"
            categories={archivedCategories}
            selectedCategoryId={selectedCategory?.id ?? null}
            onSelect={handleSelectCategory}
          />
        </aside>

        <SelectedCategoryPanel category={selectedCategory} />
      </div>
    </div>
  );
}
