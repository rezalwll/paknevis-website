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
    <details className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 open:bg-slate-950/80">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-4 py-4 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h5 className="text-sm font-medium text-white md:text-base">{item.question}</h5>
            <span className="inline-flex rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300">
              ترتیب {item.sortOrder}
            </span>
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
                archived
                  ? "bg-amber-500/10 text-amber-200"
                  : "bg-sky-500/10 text-sky-200"
              }`}
            >
              {archived ? "آرشیوشده" : "فعال"}
            </span>
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-400">
            {getPreviewText(item.answer, 120)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden text-xs text-slate-500 md:inline">
            {formatAdminDateTime(item.updatedAt)}
          </span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 transition group-open:rotate-180">
            <ChevronDown className="h-4 w-4" />
          </span>
        </div>
      </summary>

      <div className="border-t border-slate-800 px-4 py-4">
        <form action={updateHelpQuestionAction} className="space-y-4">
          <input type="hidden" name="questionId" value={item.id} />
          <input type="hidden" name="returnCategoryId" value={categoryId} />
          <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-2">
              <label className="block text-sm text-slate-300">متن سؤال</label>
              <input
                name="question"
                type="text"
                defaultValue={item.question}
                required
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-slate-300">ترتیب نمایش</label>
              <input
                name="sortOrder"
                type="number"
                min="0"
                step="1"
                defaultValue={item.sortOrder}
                required
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-slate-300">پاسخ</label>
            <textarea
              name="answer"
              rows={4}
              defaultValue={item.answer}
              required
              className="w-full rounded-[1.5rem] border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
            >
              ذخیره تغییرات سؤال
            </button>
            <span className="text-xs text-slate-500">
              ایجاد شده: {formatAdminDateTime(item.createdAt)} | آخرین تغییر:{" "}
              {formatAdminDateTime(item.updatedAt)}
            </span>
          </div>
        </form>

        <div className="mt-4 border-t border-slate-800 pt-4">
          {archived ? (
            <form action={restoreHelpQuestionAction}>
              <input type="hidden" name="questionId" value={item.id} />
              <input type="hidden" name="returnCategoryId" value={categoryId} />
              <button
                type="submit"
                className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/20"
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
                className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm font-medium text-amber-200 transition hover:bg-amber-500/20"
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
    <section className="rounded-[1.75rem] border border-slate-800 bg-slate-900/70">
      <div className="border-b border-slate-800 px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
            {categories.length} مورد
          </span>
        </div>
      </div>

      {categories.length > 0 ? (
        <div className="divide-y divide-slate-800">
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
                  isSelected ? "bg-sky-500/10" : "hover:bg-slate-800/60"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-medium text-white md:text-base">
                      {category.title}
                    </h4>
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] text-slate-300">
                      {HELP_ICON_LABELS[category.iconKey]}
                    </span>
                    <span className="rounded-full bg-sky-500/10 px-2.5 py-1 text-[11px] text-sky-200">
                      {activeQuestions} فعال
                    </span>
                    <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] text-amber-200">
                      {archivedQuestions} آرشیو
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    ترتیب {category.sortOrder} | آخرین تغییر {formatAdminDateTime(category.updatedAt)}
                  </p>
                </div>
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-950 text-slate-300">
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
      <section className="rounded-[2rem] border border-dashed border-slate-700 bg-slate-900/40 px-6 py-12 text-center text-slate-400">
        یک دسته‌بندی از ستون کناری انتخاب کنید تا مدیریت سؤال‌ها و تنظیمات آن نمایش داده شود.
      </section>
    );
  }

  const activeQuestions = category.questions.filter((item) => !item.isArchived);
  const archivedQuestions = category.questions.filter((item) => item.isArchived);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold text-white">{category.title}</h2>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                  category.isArchived
                    ? "bg-slate-700 text-slate-300"
                    : "bg-emerald-500/10 text-emerald-200"
                }`}
              >
                {category.isArchived ? "آرشیوشده" : "فعال"}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              آیکون: {HELP_ICON_LABELS[category.iconKey]} | ترتیب: {category.sortOrder}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              ایجاد شده: {formatAdminDateTime(category.createdAt)} | آخرین تغییر:{" "}
              {formatAdminDateTime(category.updatedAt)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-200">
              {activeQuestions.length} سؤال فعال
            </span>
            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-200">
              {archivedQuestions.length} سؤال آرشیوشده
            </span>
          </div>
        </div>

        <form action={updateHelpCategoryAction} className="mt-6 grid gap-4 xl:grid-cols-3">
          <input type="hidden" name="categoryId" value={category.id} />
          <div className="space-y-2">
            <label className="block text-sm text-slate-300">عنوان دسته‌بندی</label>
            <input
              name="title"
              type="text"
              defaultValue={category.title}
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-slate-300">آیکون</label>
            <select
              name="iconKey"
              defaultValue={category.iconKey}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
            >
              {HELP_ICON_KEYS.map((iconKey) => (
                <option key={iconKey} value={iconKey}>
                  {HELP_ICON_LABELS[iconKey]}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-slate-300">ترتیب نمایش</label>
            <input
              name="sortOrder"
              type="number"
              min="0"
              step="1"
              defaultValue={category.sortOrder}
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
            />
          </div>
          <div className="xl:col-span-3">
            <button
              type="submit"
              className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
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
                className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/20"
              >
                بازگردانی دسته‌بندی
              </button>
            </form>
          ) : (
            <form action={archiveHelpCategoryAction}>
              <input type="hidden" name="categoryId" value={category.id} />
              <button
                type="submit"
                className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm font-medium text-amber-200 transition hover:bg-amber-500/20"
              >
                آرشیو دسته‌بندی
              </button>
            </form>
          )}
        </div>
      </section>

      <details className="group overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-900/70">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-slate-950">
              <Plus className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-white md:text-base">افزودن سؤال جدید</h3>
              <p className="text-xs text-slate-500">فرم ساخت سؤال فقط در صورت نیاز باز می‌شود.</p>
            </div>
          </div>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-950 text-slate-300 transition group-open:rotate-180">
            <ChevronDown className="h-4 w-4" />
          </span>
        </summary>
        <div className="border-t border-slate-800 px-5 py-5">
          <form action={createHelpQuestionAction} className="space-y-4">
            <input type="hidden" name="categoryId" value={category.id} />
            <input type="hidden" name="returnCategoryId" value={category.id} />
            <div className="grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
              <div className="space-y-2">
                <label className="block text-sm text-slate-300">متن سؤال</label>
                <input
                  name="question"
                  type="text"
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
                  placeholder="خالی = آخر لیست"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-slate-300">پاسخ</label>
              <textarea
                name="answer"
                rows={4}
                required
                className="w-full rounded-[1.5rem] border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
              />
            </div>
            <button
              type="submit"
              className="rounded-2xl bg-sky-500 px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-400"
            >
              افزودن سؤال جدید
            </button>
          </form>
        </div>
      </details>

      <section className="rounded-[1.75rem] border border-slate-800 bg-slate-900/70">
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-5 py-4">
          <div>
            <h3 className="text-sm font-semibold text-white md:text-base">سؤال‌های فعال</h3>
            <p className="text-xs text-slate-500">لیست فشرده سؤال‌های منتشرشده این دسته</p>
          </div>
          <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs text-sky-200">
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
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 px-4 py-5 text-sm text-slate-400">
              هنوز سؤال فعالی برای این دسته‌بندی ثبت نشده است.
            </div>
          )}
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-slate-800 bg-slate-900/70">
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-5 py-4">
          <div>
            <h3 className="text-sm font-semibold text-white md:text-base">سؤال‌های آرشیوشده</h3>
            <p className="text-xs text-slate-500">موارد پنهان‌شده از سایت که هنوز قابل مدیریت هستند</p>
          </div>
          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-200">
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
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 px-4 py-5 text-sm text-slate-400">
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
      <header className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
        <h1 className="text-3xl font-semibold text-white">مدیریت راهنما</h1>
        <p className="mt-3 max-w-3xl leading-8 text-slate-400">
          دسته‌بندی‌ها را از ستون کناری انتخاب کنید و فقط همان بخش را مدیریت کنید. این چیدمان
          فضای کمتری می‌گیرد و برای کار روزانه سریع‌تر است.
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
        <article className="rounded-[1.5rem] border border-slate-800 bg-slate-900/70 px-5 py-4">
          <p className="text-xs text-slate-400">کل دسته‌بندی‌ها</p>
          <p className="mt-2 text-2xl font-semibold text-white">{categories.length}</p>
        </article>
        <article className="rounded-[1.5rem] border border-slate-800 bg-slate-900/70 px-5 py-4">
          <p className="text-xs text-slate-400">دسته‌بندی‌های فعال</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-300">
            {activeCategories.length}
          </p>
        </article>
        <article className="rounded-[1.5rem] border border-slate-800 bg-slate-900/70 px-5 py-4">
          <p className="text-xs text-slate-400">سؤال‌های فعال</p>
          <p className="mt-2 text-2xl font-semibold text-sky-300">{activeQuestionCount}</p>
        </article>
      </section>

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <aside className="space-y-6">
          <details className="group overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-900/70">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
              <div>
                <h2 className="text-sm font-semibold text-white md:text-base">ساخت دسته‌بندی جدید</h2>
                <p className="text-xs text-slate-500">فرم ساخت را فقط در صورت نیاز باز کنید.</p>
              </div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-950 text-slate-300 transition group-open:rotate-180">
                <ChevronDown className="h-4 w-4" />
              </span>
            </summary>
            <div className="border-t border-slate-800 px-5 py-5">
              <form action={createHelpCategoryAction} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm text-slate-300">
                    عنوان دسته‌بندی
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="iconKey" className="block text-sm text-slate-300">
                      آیکون
                    </label>
                    <select
                      id="iconKey"
                      name="iconKey"
                      defaultValue="help_circle"
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
                    >
                      {HELP_ICON_KEYS.map((iconKey) => (
                        <option key={iconKey} value={iconKey}>
                          {HELP_ICON_LABELS[iconKey]}
                        </option>
                      ))}
                    </select>
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
                      placeholder="خالی"
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="rounded-2xl bg-sky-500 px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-400"
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
