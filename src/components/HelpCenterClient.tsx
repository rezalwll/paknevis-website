"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  Building2,
  CreditCard,
  FileWarning,
  HelpCircle,
  Laptop,
  Mail,
  Plus,
  Search,
  User,
} from "lucide-react";

import type { HelpIconKey, PublicHelpCategory } from "@/lib/admin-types";

const HELP_ICONS: Record<HelpIconKey, LucideIcon> = {
  user: User,
  credit_card: CreditCard,
  file_warning: FileWarning,
  laptop: Laptop,
  help_circle: HelpCircle,
  building: Building2,
};

function normalizeSearchText(value: string): string {
  return value.trim().toLocaleLowerCase("fa-IR");
}

export default function HelpCenterClient({
  categories,
}: {
  categories: PublicHelpCategory[];
}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({});
  const questionsRef = useRef<HTMLDivElement>(null);
  const scrollAnimRef = useRef<number | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  const filteredCategories = useMemo(() => {
    const needle = normalizeSearchText(debouncedQuery);

    if (!needle) {
      return categories;
    }

    return categories.flatMap((category) => {
      const categoryMatches = normalizeSearchText(category.title).includes(needle);

      if (categoryMatches) {
        return [category];
      }

      const questions = category.questions.filter((item) => {
        const questionMatches = normalizeSearchText(item.question).includes(needle);
        const answerMatches = normalizeSearchText(item.answer).includes(needle);
        return questionMatches || answerMatches;
      });

      if (questions.length === 0) {
        return [];
      }

      return [{ ...category, questions }];
    });
  }, [categories, debouncedQuery]);

  const selectedCategory = useMemo(() => {
    if (filteredCategories.length === 0) {
      return null;
    }

    if (activeCategoryId === null) {
      return debouncedQuery.trim() ? filteredCategories[0] : null;
    }

    return (
      filteredCategories.find((category) => category.id === activeCategoryId) ??
      (debouncedQuery.trim() ? filteredCategories[0] : null)
    );
  }, [activeCategoryId, filteredCategories, debouncedQuery]);

  const cancelScroll = useCallback(() => {
    if (scrollAnimRef.current !== null) {
      cancelAnimationFrame(scrollAnimRef.current);
      scrollAnimRef.current = null;
    }
  }, []);

  const smoothScrollTo = useCallback((targetTop: number, duration = 650) => {
    cancelScroll();

    const start = window.scrollY;
    const change = targetTop - start;
    const startTime = performance.now();

    const easeInOutCubic = (time: number) =>
      time < 0.5 ? 4 * time * time * time : 1 - Math.pow(-2 * time + 2, 3) / 2;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const time = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(time);

      window.scrollTo(0, start + change * eased);

      if (time < 1) {
        scrollAnimRef.current = requestAnimationFrame(step);
      } else {
        scrollAnimRef.current = null;
      }
    };

    scrollAnimRef.current = requestAnimationFrame(step);
  }, [cancelScroll]);

  const scrollToQuestions = useCallback(() => {
    const element = questionsRef.current;

    if (!element) {
      return;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const top = element.getBoundingClientRect().top + window.scrollY - 16;

    if (prefersReducedMotion) {
      window.scrollTo({ top, behavior: "auto" });
      return;
    }

    smoothScrollTo(top);
  }, [smoothScrollTo]);

  useEffect(() => {
    if (selectedCategory !== null && questionsRef.current) {
      requestAnimationFrame(scrollToQuestions);
    }
  }, [selectedCategory, scrollToQuestions]);

  useEffect(() => cancelScroll, [cancelScroll]);

  useEffect(() => {
    if (filteredCategories.length === 0) {
      if (activeCategoryId !== null) {
        setActiveCategoryId(null);
      }

      return;
    }

    const hasActiveCategory = filteredCategories.some(
      (category) => category.id === activeCategoryId,
    );

    if (!hasActiveCategory && debouncedQuery.trim()) {
      setActiveCategoryId(filteredCategories[0]?.id ?? null);
    }
  }, [activeCategoryId, filteredCategories, debouncedQuery]);

  useEffect(() => {
    setExpandedQuestions({});
  }, [debouncedQuery]);

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const showEmptyCatalogState = categories.length === 0;
  const showSearchEmptyState =
    !showEmptyCatalogState && debouncedQuery.trim() && filteredCategories.length === 0;

  return (
    <div
      dir="rtl"
      className="
        relative isolate min-h-screen text-slate-800
        bg-gradient-to-b from-slate-50/70 via-white to-white
        text-[15px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]
      "
    >
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute right-[15%] top-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,_#66C0FF,_transparent_70%)] opacity-[.22] blur-[28px]"
          />
          <div
            className="absolute bottom-[-28%] left-[10%] h-[760px] w-[760px] rounded-full bg-[radial-gradient(closest-side,_#0094F0,_transparent_65%)] opacity-[.22] blur-[28px]"
          />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 pb-8 pt-40 text-center md:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
          <h1
            className="
              text-3xl font-bold tracking-tight text-slate-900
              md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-[4.1rem]
            "
          >
            سلام! چطور می‌تونیم کمک کنیم؟
          </h1>

          <div className="mt-20 flex items-center justify-center">
            <div
              className="
                flex w-full max-w-xl items-center rounded-full border border-slate-200
                bg-white/75 px-4 py-3 shadow-sm backdrop-blur-md
                md:max-w-2xl lg:px-5 lg:py-4 xl:max-w-3xl 2xl:max-w-4xl
              "
            >
              <Search className="h-5 w-5 shrink-0 text-slate-400 lg:h-6 lg:w-6" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="جستجو برای پاسخ‌ها"
                className="
                  w-full bg-transparent pr-3 text-slate-700 outline-none placeholder:text-slate-400
                  text-sm md:text-base xl:text-[1.05rem] 2xl:text-[1.15rem]
                "
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="
          mx-auto max-w-4xl space-y-8 px-4 py-8
          text-sm md:max-w-5xl md:text-[15px] xl:max-w-7xl xl:text-base 2xl:max-w-8xl 2xl:text-[1.08rem]
        "
      >
        {showEmptyCatalogState ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/80 px-6 py-12 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">فعلا راهنمای فعالی ثبت نشده است</h2>
            <p className="mx-auto mt-3 max-w-2xl leading-8 text-slate-600">
              مدیر سایت هنوز هیچ دسته‌بندی یا سؤال فعالی برای راهنما منتشر نکرده است. اگر
              به پاسخ فوری نیاز دارید، از طریق صفحه تماس با ما درخواست خود را ثبت کنید.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              ثبت درخواست پشتیبانی
              <ArrowLeft className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
              {filteredCategories.map((category) => {
                const Icon = HELP_ICONS[category.iconKey];
                const isActive = selectedCategory?.id === category.id;

                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategoryId(category.id);
                      setExpandedQuestions({});

                      if (selectedCategory?.id === category.id) {
                        requestAnimationFrame(scrollToQuestions);
                      }
                    }}
                    className={`
                      group flex flex-col items-center gap-4 text-center text-slate-700 transition-colors
                      ${isActive ? "text-indigo-700" : ""}
                    `}
                    aria-expanded={isActive}
                    type="button"
                  >
                    <div
                      className={`
                        flex h-16 w-16 items-center justify-center rounded-2xl border transition-colors
                        ${
                          isActive
                            ? "border-indigo-200/70 bg-[#e2f2fb]"
                            : "border-slate-200 bg-slate-50/60"
                        }
                      `}
                    >
                      <Icon
                        className="h-9 w-9 text-[#0094F0] lg:h-10 lg:w-10"
                        strokeWidth={1.75}
                      />
                    </div>
                    <div className="space-y-1">
                      <div
                        className="
                          text-sm font-medium text-slate-900 group-hover:text-indigo-700
                          md:text-base xl:text-[1.08rem] 2xl:text-[1.12rem]
                        "
                      >
                        {category.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {showSearchEmptyState ? (
              <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/80 px-6 py-10 text-center shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">نتیجه‌ای پیدا نشد</h2>
                <p className="mt-3 leading-8 text-slate-600">
                  عبارت جستجوی شما با هیچ عنوان، سؤال یا پاسخی در بخش راهنما تطابق نداشت.
                </p>
              </div>
            ) : null}

            {selectedCategory !== null ? (
              <div ref={questionsRef} className="space-y-4 pt-12">
                <div className="text-center">
                  <h2
                    className="
                      mt-20 text-lg font-semibold text-slate-900
                      md:text-xl xl:text-[1.45rem] 2xl:text-[1.55rem]
                    "
                  >
                    سوالات و پاسخ‌های دسته «{selectedCategory.title}»
                  </h2>
                </div>

                <div className="mt-10">
                  {selectedCategory.questions.map((item) => {
                    const isOpen = !!expandedQuestions[item.id];

                    return (
                      <div
                        key={item.id}
                        className="border-b border-transparent"
                        style={{
                          borderImage:
                            "linear-gradient(to right, rgba(52, 152, 219, 0), #0094F0, rgba(52, 152, 219, 0)) 1",
                        }}
                      >
                        <button
                          onClick={() => toggleQuestion(item.id)}
                          className="flex w-full items-center justify-between px-5 py-4 text-right"
                          aria-expanded={isOpen}
                          type="button"
                        >
                          <span
                            className="
                              text-sm font-medium text-slate-900
                              md:text-base xl:text-[1.08rem] 2xl:text-[1.13rem]
                            "
                          >
                            {item.question}
                          </span>

                          <Plus
                            className={`
                              h-4 w-4 text-[#0094F0] transition-transform lg:h-5 lg:w-5
                              ${isOpen ? "rotate-45" : ""}
                            `}
                          />
                        </button>

                        <div
                          className={`
                            grid overflow-hidden transition-all duration-300 ease-in-out
                            ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                          `}
                          aria-hidden={!isOpen}
                        >
                          <div
                            className="
                              min-h-0 px-5 pb-2 text-slate-600
                              text-sm leading-7 md:text-[15px] xl:text-base xl:leading-8 2xl:text-[1.08rem]
                            "
                          >
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </>
        )}
      </section>

      <section
        className="
          mx-auto max-w-4xl px-4 py-10
          text-sm md:max-w-5xl md:text-base xl:max-w-7xl xl:text-[1.08rem] 2xl:max-w-8xl
        "
      >
        <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white/75 px-6 py-6 text-slate-700 shadow-sm backdrop-blur-md">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-[#e2f2fb] text-[#0094F0]">
            <Mail className="h-5 w-5 lg:h-6 lg:w-6" />
          </span>
          <span>پاسخ‌تان را پیدا نکردید؟</span>
          <a
            href="/contact"
            className="inline-flex items-center gap-1 text-[#0094F0]"
          >
            با ما تماس بگیرید
            <ArrowLeft className="h-4 w-4 lg:h-5 lg:w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
