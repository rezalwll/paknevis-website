"use client";
import type { Metadata } from "next";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Milestone = {
  date: string;
  title: string;
  icon: React.ReactNode;
  tone?: "navy" | "rose" | "amber";
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function makeGeneralMailto(email: string) {
  const subject = encodeURIComponent("ارتباط با تیم پاک‌نویس");
  const body = encodeURIComponent(
    `سلام\n\nمی‌خواستم دربارهٔ پاک‌نویس بازخورد/پیشنهاد/درخواست همکاری داشته باشم:\n\nنام:\nموضوع:\nمتن پیام:\n\nسپاس`
  );
  return `mailto:${email}?subject=${subject}&body=${body}`;
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "opacity-0 translate-y-4 transition-all duration-700 will-change-transform",
        inView && "opacity-100 translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
}

function IconNodes(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <path
        d="M18 22v20M32 22v20M46 22v20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M14 32h36"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="18" cy="18" r="5" stroke="currentColor" strokeWidth="3" />
      <circle cx="32" cy="18" r="5" stroke="currentColor" strokeWidth="3" />
      <circle cx="46" cy="18" r="5" stroke="currentColor" strokeWidth="3" />
      <circle cx="18" cy="46" r="5" stroke="currentColor" strokeWidth="3" />
      <circle cx="32" cy="46" r="5" stroke="currentColor" strokeWidth="3" />
      <circle cx="46" cy="46" r="5" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

function IconSpell(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <path
        d="M10 48h44"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M18 48 30 16l12 32"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M24 34h16"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M44 22l6 6"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M50 22l-6 6"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPlugin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <path
        d="M26 10v12M38 10v12"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M18 22h28a8 8 0 0 1 8 8v10a12 12 0 0 1-12 12H22A12 12 0 0 1 10 40V30a8 8 0 0 1 8-8Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M22 34h20"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconRocket(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <path
        d="M36 10c10 3 18 11 18 21-5 3-10 5-15 6-1 5-3 10-6 15-10 0-18-8-21-18 5-3 10-5 15-6 1-5 3-10 6-15Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M26 38l-6 6M20 38l6 6"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="40" cy="26" r="5" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}

function ToneBadge({ tone }: { tone?: Milestone["tone"] }) {
  const cls =
    tone === "rose"
      ? "bg-rose-600"
      : tone === "amber"
      ? "bg-amber-500"
      : "bg-slate-900";
  return <span className={cn("inline-block h-1 w-16 rounded-full", cls)} />;
}

function Roadmap({ items }: { items: Milestone[] }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 shadow-sm ring-1 ring-slate-200 backdrop-blur">
              <IconNodes className="h-8 w-8 text-slate-800" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              این تازه یک شروعه
            </h2>
            <p className="max-w-2xl text-slate-600">
              نقشهٔ راه و نقاط عطف پاک‌نویس (چیدمان و حس‌وحال دقیقاً مشابه طرحی
              که فرستادی). فقط متن‌ها و تاریخ‌ها رو با واقعیت‌های خودتون جایگزین
              کن.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-10">
          {/* خط اصلی تایم‌لاین */}
          <div className="pointer-events-none absolute left-0 right-0 top-[388px] hidden h-px bg-slate-900/70 md:block" />

          {/* ماسک گرادیانی برای حس اسکرول */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-slate-50 to-transparent md:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-slate-50 to-transparent md:w-16" />

          <div
            dir="rtl"
            className={cn(
              "relative flex snap-x snap-mandatory gap-6 overflow-x-auto pb-10 pt-2",
              "[-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2",
              "[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300/80"
            )}
          >
            <div className="w-2 shrink-0" />

            {items.map((m, idx) => (
              <div
                key={idx}
                className="snap-start shrink-0"
                style={{ width: "min(86vw, 280px)" }}
              >
                <Reveal delay={idx * 70}>
                  <div className="group relative flex flex-col items-center">
                    <div
                      className={cn(
                        "w-full overflow-hidden rounded-2xl bg-white/80 shadow-[0_18px_40px_rgba(15,23,42,0.12)] ring-1 ring-slate-200 backdrop-blur",
                        "transition-transform duration-300 group-hover:-translate-y-1"
                      )}
                    >
                      {/* هدر تاریخ */}
                      <div className="px-5 pt-5 text-center">
                        <div className="text-xl font-extrabold text-slate-800">
                          {m.date}
                        </div>
                        <div className="mt-3 flex justify-center">
                          <ToneBadge tone={m.tone} />
                        </div>
                      </div>

                      {/* آیکون */}
                      <div className="px-5 pt-5">
                        <div
                          className={cn(
                            "mx-auto grid h-20 w-20 place-items-center rounded-2xl",
                            "bg-gradient-to-b from-slate-50 to-white ring-1 ring-slate-200"
                          )}
                        >
                          <div
                            className={cn(
                              "h-12 w-12 text-slate-800 transition-transform duration-300",
                              "group-hover:rotate-[-4deg] group-hover:scale-[1.03]"
                            )}
                          >
                            {m.icon}
                          </div>
                        </div>
                      </div>

                      {/* متن */}
                      <div className="px-5 pb-6 pt-5 text-center">
                        <div className="text-base font-bold leading-7 text-slate-900">
                          {m.title}
                        </div>
                        <div className="mt-4 flex justify-center">
                          <ToneBadge tone={m.tone} />
                        </div>
                      </div>
                    </div>

                    {/* پایه به خط تایم‌لاین */}
                    <div className="relative mt-4 hidden w-full items-center justify-center md:flex">
                      <div className="h-10 w-px bg-slate-900/40" />
                      <div className="absolute -bottom-2 h-3.5 w-3.5 rounded-full bg-slate-900" />
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}

            <div className="w-6 shrink-0" />
          </div>

          {/* نسخه موبایل: خط زیر کارت‌ها */}
          <div className="mx-auto -mt-2 block h-px w-[calc(100%-32px)] bg-slate-900/70 md:hidden" />
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group rounded-3xl bg-white/70 p-6 shadow-sm ring-1 ring-slate-200 backdrop-blur transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
          <div className="h-7 w-7">{icon}</div>
        </div>
        <div>
          <div className="text-lg font-extrabold text-slate-900">{title}</div>
          <p className="mt-2 leading-8 text-slate-600">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const contactEmail = "sales@paknevis.ir";

  const storyParagraphs = useMemo(
    () => [
      "تیم پاک‌نویس در سال ۱۳۹۶ با هدف تولید نرم‌افزاری کاربردی در حوزهٔ خط و زبان فارسی آغاز به کار کرد.",
      "دغدغهٔ تیم، کمک به بهبود سطح تعامل میان کاربران با زبان فارسی، در محیط‌های مجازی است. برای این منظور، انتقال پیام میان گوینده (در اینجا نویسنده) و مخاطب باید به‌درستی و با کمترین ابهام صورت گیرد و گاهی دشواریِ این کار سدی بزرگ در مقابل ایجاد تعامل درست میان افراد می‌سازد.",
      "تیم پاک‌نویس با انگیزهٔ تقویت اعتمادبه‌نفس کاربران و کم‌کردن نگرانی آن‌ها از صورت‌گرفتن خطاهای احتمالی در نوشتار، تلاش کرده است سامانه‌ای راه‌اندازی کند که خطاهای املایی، نگارشی، معنایی و نحوی را در متن‌ فارسی تشخیص دهد و برای پیرایش آن‌ها تا حد امکان پیشنهادهای کاربردی مطرح کند و درنهایت با تأیید کاربر، متن را ویرایش نماید.",
      "تاکنون گروه پاک‌نویس موفق شده است در محیط مایکروسافت وُرد افزونه‌ای تولید کند که قادر است خطاهای املایی، نگارشی و تاحدی معنایی را پوشش دهد.",
      "تیم پاک‌نویس امیدوار است با دریافت پیشنهادها و بازخوردهای شما، بهتر از گذشته در این راه گام بردارد و به کاربرانش لذت و سرعت در نوشتن را هدیه کند.",
    ],
    []
  );

  // ✅ اینجارو دقیقاً با نقاط عطف واقعی پاک‌نویس شخصی‌سازی کن
  const milestones: Milestone[] = useMemo(
    () => [
      {
        date: "۱۳۹۶",
        title: "آغاز مسیر پاک‌نویس با تمرکز روی خط و زبان فارسی",
        icon: <IconRocket className="h-full w-full" />,
        tone: "navy",
      },
      {
        date: "۱۳۹۶–۱۳۹۷",
        title: "ساخت هستهٔ تشخیص خطاهای املایی و نگارشی (نسخهٔ اولیه)",
        icon: <IconSpell className="h-full w-full" />,
        tone: "rose",
      },
      {
        date: "توسعه تدریجی",
        title: "گسترش پیشنهادهای اصلاحی با حفظ اختیار کامل کاربر",
        icon: <IconNodes className="h-full w-full" />,
        tone: "amber",
      },
      {
        date: "دستاورد کلیدی",
        title:
          "تولید افزونهٔ Microsoft Word برای پوشش املایی/نگارشی و تاحدی معنایی",
        icon: <IconPlugin className="h-full w-full" />,
        tone: "navy",
      },
      {
        date: "امروز و ادامهٔ راه",
        title: "پیشروی به سمت پوشش بهتر خطاهای معنایی/نحوی و تجربهٔ سریع‌تر",
        icon: <IconRocket className="h-full w-full" />,
        tone: "rose",
      },
    ],
    []
  );

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* پس‌زمینه: گرادیان + دات‌پترن + Blob */}
        <div aria-hidden className="absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-rose-400/25 via-indigo-400/20 to-amber-300/25 blur-3xl" />
          <div className="absolute -bottom-28 -right-24 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-indigo-500/20 via-sky-400/15 to-rose-400/20 blur-3xl animate-blob" />
          <div className="absolute -bottom-32 -left-24 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-amber-400/20 via-rose-400/15 to-indigo-400/20 blur-3xl animate-blob2" />
          <div
            className={cn(
              "absolute inset-0 opacity-[0.65]",
              "bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.10)_1px,transparent_0)]",
              "bg-[size:18px_18px]"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-slate-50" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 md:pb-24 md:pt-24">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-rose-500" />
              تیم پاک‌نویس — از ۱۳۹۶ تا امروز
            </div>
          </Reveal>

          <div className="mt-6 grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <Reveal delay={80}>
                <h1 className="text-3xl font-extrabold leading-[1.25] tracking-tight text-slate-900 md:text-5xl">
                  دربارهٔ{" "}
                  <span className="bg-gradient-to-l from-rose-600 via-indigo-600 to-slate-900 bg-clip-text text-transparent">
                    پاک‌نویس
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={140}>
                <p className="mt-5 max-w-2xl leading-8 text-slate-600 md:text-lg">
                  ما روی یک چیز وسواس داریم: «انتقال پیامِ درست، با کمترین
                  ابهام». پاک‌نویس تلاش می‌کند با تشخیص خطاهای{" "}
                  <span className="font-bold text-slate-800">
                    املایی، نگارشی، معنایی و نحوی
                  </span>{" "}
                  به نوشتنِ سریع‌تر و مطمئن‌تر کمک کند.
                </p>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/pricing"
                    className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/20"
                  >
                    مشاهدهٔ طرح‌ها
                  </Link>

                  <a
                    href={makeGeneralMailto(contactEmail)}
                    className="rounded-2xl bg-white/70 px-5 py-3 text-sm font-bold text-slate-900 ring-1 ring-slate-200 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-slate-900/10"
                  >
                    ارتباط با ما
                  </a>

                  <Link
                    href="/"
                    className="rounded-2xl px-5 py-3 text-sm font-bold text-slate-700 transition hover:text-slate-900"
                  >
                    رفتن به صفحه اصلی →
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* کارت تصویری/نمایشی */}
            <div className="md:col-span-5">
              <Reveal delay={180}>
                <div className="relative overflow-hidden rounded-3xl bg-white/70 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.14)] ring-1 ring-slate-200 backdrop-blur">
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-rose-400/15 blur-2xl" />
                  <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-indigo-400/15 blur-2xl" />

                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white">
                        <IconSpell className="h-7 w-7" />
                      </div>
                      <div>
                        <div className="text-base font-extrabold text-slate-900">
                          هدف ما
                        </div>
                        <div className="text-sm text-slate-600">
                          اعتمادبه‌نفس بیشتر در نوشتن فارسی
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {[
                        "تشخیص خطاهای املایی",
                        "تشخیص خطاهای نگارشی",
                        "پیشنهادهای کاربردی",
                        "ویرایش با تأیید کاربر",
                      ].map((t) => (
                        <div
                          key={t}
                          className="rounded-2xl bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-800 ring-1 ring-slate-200"
                        >
                          {t}
                        </div>
                      ))}
                    </div>

                    <p className="mt-5 text-sm leading-7 text-slate-600">
                      پاک‌نویس تلاش می‌کند «نگرانی از خطاهای نوشتاری» را کم کند
                      و لذت نوشتن را برگرداند.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
              داستان ما
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              هر خطا، می‌تواند معنی را عوض کند — و ما دقیقاً همین‌جا وارد
              می‌شویم.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {storyParagraphs.map((p, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="rounded-3xl bg-white/70 p-7 leading-8 text-slate-700 shadow-sm ring-1 ring-slate-200 backdrop-blur">
                  {p}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES / WHAT WE DO */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
              ما دقیقاً چه می‌کنیم؟
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              تمرکز ما روی تجربهٔ نوشتن است: تشخیص + پیشنهاد + اصلاح نهایی (با
              تأیید کاربر).
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <Reveal delay={80}>
              <InfoCard
                title="تشخیص چندلایه"
                desc="املایی، نگارشی، معنایی و نحوی را تا حد امکان بررسی می‌کنیم تا پیام دقیق منتقل شود."
                icon={<IconSpell className="h-full w-full" />}
              />
            </Reveal>
            <Reveal delay={140}>
              <InfoCard
                title="پیشنهادهای کاربردی"
                desc="برای پیرایش متن، پیشنهاد می‌دهیم؛ اما تصمیم نهایی همیشه با شماست."
                icon={<IconNodes className="h-full w-full" />}
              />
            </Reveal>
            <Reveal delay={200}>
              <InfoCard
                title="راه‌حل‌های واقعی"
                desc="افزونهٔ Microsoft Word یکی از خروجی‌های عملی تیم پاک‌نویس تا امروز است."
                icon={<IconPlugin className="h-full w-full" />}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ROADMAP (شخصی‌سازی شده مشابه عکس) */}
      <section className="py-16 md:py-20">
        <Roadmap items={milestones} />
      </section>

      {/* ACHIEVEMENTS + CTA */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-12 md:items-start">
            <Reveal className="md:col-span-7">
              <div className="rounded-3xl bg-white/70 p-8 shadow-sm ring-1 ring-slate-200 backdrop-blur">
                <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                  چرا بازخورد شما مهم است؟
                </h2>
                <p className="mt-3 leading-8 text-slate-600">
                  زبان زنده است و نوشتن، سلیقه و زمینه دارد. پیشنهادها و
                  بازخوردهای شما به ما کمک می‌کند پاک‌نویس را دقیق‌تر، سریع‌تر و
                  کاربردی‌تر کنیم.
                </p>

                <ul className="mt-6 space-y-3 text-slate-700">
                  {[
                    "تقویت تجربهٔ نوشتنِ روان و مطمئن",
                    "کاهش ابهام و سوءبرداشت در متن",
                    "افزایش سرعت و لذت در نوشتن فارسی",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="mt-2 inline-block h-2 w-2 rounded-full bg-rose-500" />
                      <span className="leading-8">{t}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={makeGeneralMailto(contactEmail)}
                    className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/20"
                  >
                    ارسال بازخورد
                  </a>
                  <Link
                    href="/pricing"
                    className="rounded-2xl bg-white/70 px-5 py-3 text-sm font-bold text-slate-900 ring-1 ring-slate-200 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-slate-900/10"
                  >
                    نسخه سازمانی و طرح‌ها
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal className="md:col-span-5" delay={120}>
              <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-[0_24px_60px_rgba(15,23,42,0.25)]">
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-rose-500/25 blur-3xl animate-float" />
                <div className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-indigo-400/25 blur-3xl animate-float2" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold ring-1 ring-white/15">
                    <span className="inline-block h-2 w-2 rounded-full bg-amber-300" />
                    همکاری، پیشنهاد، حمایت
                  </div>

                  <h3 className="mt-5 text-xl font-extrabold">
                    پاک‌نویس برای بهتر نوشتن فارسی ساخته شده
                  </h3>
                  <p className="mt-3 leading-8 text-white/80">
                    اگر ایده‌ای داری یا جایی از محصول بهبود لازم دارد، همین الان
                    به ما پیام بده.
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                      <div className="text-sm font-bold text-white/90">
                        ایمیل تیم
                      </div>
                      <div className="mt-1 text-sm text-white/80">
                        {contactEmail}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                      <div className="text-sm font-bold text-white/90">
                        پیشنهاد سریع
                      </div>
                      <div className="mt-1 text-sm text-white/80">
                        «چه چیزی را باید اول بهتر کنیم؟»
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* انیمیشن‌های ساده بدون نیاز به پلاگین */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(18px, -22px) scale(1.03);
          }
          66% {
            transform: translate(-16px, 14px) scale(0.98);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 9s ease-in-out infinite;
        }
        .animate-blob2 {
          animation: blob 11s ease-in-out infinite;
        }

        @keyframes floaty {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .animate-float {
          animation: floaty 6.5s ease-in-out infinite;
        }
        .animate-float2 {
          animation: floaty 7.5s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
