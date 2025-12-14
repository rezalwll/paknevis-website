// app/pricing/page.tsx
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "نسخه سازمانی پاک‌نویس | طرح‌ها و قیمت‌ها",
  description:
    "طرح‌های نسخه آفلاین پاک‌نویس برای سازمان‌ها به همراه راه ارتباط با ما فروش.",
};

function makeGeneralMailto(email: string) {
  const subject = encodeURIComponent("درخواست مشاوره نسخه آفلاین پاک‌نویس");
  const body = encodeURIComponent(
    `سلام\n\nبرای دریافت مشاوره و اطلاعات نسخهٔ آفلاین پاک‌نویس درخواست دارم.\n\nنام سازمان:\nتعداد کاربران/نیاز:\nشماره تماس:\n\nسپاس`
  );
  return `mailto:${email}?subject=${subject}&body=${body}`;
}

function makePlanMailto(email: string, planName: string) {
  const subject = encodeURIComponent(
    `درخواست مشاوره نسخهٔ آفلاین پاک‌نویس — طرح ${planName}`
  );
  const body = encodeURIComponent(
    `سلام\n\nبرای دریافت مشاوره و پیش‌فاکتور نسخهٔ آفلاین پاک‌نویس درخواست دارم.\n\nطرح موردنظر: ${planName}\nنام سازمان:\nتعداد کاربران/نیاز:\nشماره تماس:\n\nسپاس`
  );
  return `mailto:${email}?subject=${subject}&body=${body}`;
}

type Feature = { label: string; ok: boolean };
type PricingPlan = {
  id: string;
  name: string; // فارسی
  price: string; // مثلا "۱۹"
  cents: string; // مثلا "میلیون"
  unit: string; // مثلا "تومان (شروع از)"
  topGrad: string; // tailwind classes
  bottomGrad: string; // tailwind classes
  accentText: string; // tailwind classes
  featured?: boolean;
  features: Feature[];
};

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="10" className="fill-emerald-500/15" />
      <path
        d="M7.5 12.5l2.8 2.9 6.2-6.6"
        className="stroke-emerald-600"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="10" className="stroke-emerald-600/25" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="10" className="fill-rose-500/10" />
      <path
        d="M8.2 8.2l7.6 7.6M15.8 8.2l-7.6 7.6"
        className="stroke-rose-600"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="10" className="stroke-rose-600/25" />
    </svg>
  );
}

function PricingCard({
  plan,
  contactEmail,
}: {
  plan: PricingPlan;
  contactEmail: string;
}) {
  const topClip: React.CSSProperties = {
    clipPath: "polygon(0 0, 100% 0, 100% 86%, 0 72%)",
  };

  const sheetClip: React.CSSProperties = {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 90%)",
  };

  return (
    <div
      className={[
        "relative w-full max-w-[270px] overflow-hidden rounded-[28px]",
        "shadow-[0_24px_60px_rgba(15,23,42,0.22)]",
        plan.featured ? "md:-mt-4" : "",
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-white" />

      {/* TOP shadow thickness */}
      <div
        className="absolute left-0 top-0 h-[150px] w-full translate-x-[10px] translate-y-[10px] rounded-[28px] bg-black/35"
        style={topClip}
      />

      {/* TOP gradient */}
      <div
        className={["relative h-[150px] w-full", plan.topGrad].join(" ")}
        style={topClip}
      >
        {/* bubbles */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/12" />
        <div className="absolute right-10 top-10 h-28 w-28 rounded-full bg-white/10" />
        <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-white/10" />

        <div className="relative flex h-full flex-col items-center justify-center text-white">
          <div className="text-[15px] font-semibold tracking-wide opacity-95">
            {plan.name}
          </div>

          <div className="mt-1 flex flex-col items-center">
            <div className="flex items-end gap-2">
              <span className="text-[52px] font-extrabold leading-none drop-shadow-sm">
                {plan.price}
              </span>
              <span className="mb-2 text-[14px] font-bold opacity-95">
                {plan.cents}
              </span>
            </div>
            <div className="mt-1 text-[12px] font-semibold opacity-95">
              {plan.unit}
            </div>
          </div>
        </div>
      </div>

      {/* White sheet */}
      <div className="relative -mt-7 px-5">
        <div
          className={[
            "rounded-[22px] bg-white",
            "shadow-[0_10px_24px_rgba(15,23,42,0.10)]",
          ].join(" ")}
          style={sheetClip}
        >
          <ul className="divide-y divide-slate-100 px-5 py-6 text-[12px] text-slate-500">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-center gap-3 py-3">
                {f.ok ? (
                  <CheckIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                ) : (
                  <XIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                )}
                <span className={f.ok ? "text-slate-600" : "text-slate-400"}>
                  {f.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom gradient area */}
      <div
        className={["relative mt-[-10px] h-[92px] w-full", plan.bottomGrad].join(
          " "
        )}
      >
        <div className="absolute inset-0 opacity-25 [background:radial-gradient(circle_at_20%_20%,rgba(255,255,255,.35),transparent_55%)]" />
        <div className="flex h-full items-center justify-center">
          <a
            href={makePlanMailto(contactEmail, plan.name)}
            className={[
              "rounded-full bg-white/95 px-10 py-2 text-[12px] font-semibold",
              "shadow-[0_10px_18px_rgba(15,23,42,0.18)]",
              "transition hover:translate-y-[-1px] active:translate-y-[0px]",
              plan.accentText,
            ].join(" ")}
          >
            درخواست مشاوره
          </a>
        </div>
      </div>
    </div>
  );
}

const enterprisePlans: PricingPlan[] = [
  {
    id: "economy",
    name: "اقتصادی",
    price: "۱۹",
    cents: "میلیون",
    unit: "تومان (شروع از)",
    topGrad: "bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-700",
    bottomGrad: "bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500",
    accentText: "text-sky-600",
    features: [
      { label: "نصب و راه‌اندازی آفلاین", ok: true },
      { label: "به‌روزرسانی‌های پایه", ok: true },
      { label: "پشتیبانی استاندارد", ok: true },
      { label: "سفارشی‌سازی واژه‌نامه/شیوه‌نامه", ok: false },
      { label: "به‌روزرسانی ویژه پیکره‌ها", ok: false },
    ],
  },
  {
    id: "org",
    name: "سازمانی",
    price: "۲۷",
    cents: "میلیون",
    unit: "تومان (شروع از)",
    topGrad: "bg-gradient-to-r from-fuchsia-500 via-pink-600 to-rose-600",
    bottomGrad: "bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-500",
    accentText: "text-pink-600",
    featured: true,
    features: [
      { label: "نصب و راه‌اندازی آفلاین", ok: true },
      { label: "به‌روزرسانی‌های کامل‌تر", ok: true },
      { label: "پشتیبانی سریع‌تر", ok: true },
      { label: "سفارشی‌سازی واژه‌نامه/شیوه‌نامه", ok: true },
      { label: "به‌روزرسانی ویژه پیکره‌ها", ok: false },
    ],
  },
  {
    id: "custom",
    name: "سفارشی",
    price: "۴۹",
    cents: "میلیون",
    unit: "تومان (شروع از)",
    topGrad: "bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-700",
    bottomGrad: "bg-gradient-to-r from-slate-700 via-teal-600 to-emerald-600",
    accentText: "text-emerald-600",
    features: [
      { label: "نصب و راه‌اندازی آفلاین", ok: true },
      { label: "به‌روزرسانی‌های کامل‌تر", ok: true },
      { label: "پشتیبانی ویژه + SLA", ok: true },
      { label: "سفارشی‌سازی واژه‌نامه/شیوه‌نامه", ok: true },
      { label: "به‌روزرسانی ویژه پیکره‌ها", ok: true },
    ],
  },
];

export default function EnterprisePage() {
  const contactEmail = "sales@paknevis.ir";

  // ===== Pricing-card style tokens (same as your HTML sample)
  const cardBase =
    "rounded-[18px] bg-white shadow-[0_18px_40px_rgba(17,24,39,0.14)] border-2 border-transparent " +
    "transition-[transform,box-shadow,border-color] duration-200 ease-out " +
    "hover:-translate-y-1 hover:shadow-[0_12px_26px_rgba(17,24,39,0.10)]";

  const cardFeatured =
    "border-[#2f80ed] shadow-[0_18px_45px_rgba(47,128,237,0.18),0_18px_40px_rgba(17,24,39,0.14)]";

  const pillPopular =
    "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#d1fae5] px-3.5 py-1 text-xs font-bold text-[#065f46] " +
    "shadow-[0_10px_22px_rgba(16,185,129,0.18)]";

  const btnOutline =
    "inline-flex h-11 items-center justify-center rounded-xl border-2 border-[#ffd1e3] bg-white px-5 text-sm font-extrabold " +
    "text-[#ff4d8d] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#fff0f6] hover:border-[#ff9fc2]";

  return (
    <main dir="rtl" className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 " />

        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#ffd1e3] bg-white/70 px-3 py-1 text-xs font-bold text-[#ff4d8d] shadow-sm">
                نسخهٔ سازمانی
              </p>

              <h1 className="mt-4 text-3xl font-black leading-[1.25] sm:text-4xl">
                نسخهٔ آفلاین پاک‌نویس برای سازمان‌ها
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
                نسخهٔ آنلاین پاک‌نویس همیشه برای کاربران عادی رایگان خواهد بود؛ اما
                اگر به دلایل امنیتی به‌هیچ‌وجه نمی‌توانید رایانه‌های سازمانتان را
                به اینترنت وصل کنید، خرید نسخهٔ آفلاین تنها راهکار پیش روی شما برای
                ویرایش دقیق و صحیح تمام متن‌های اداری است.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#pricing"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  مشاهدهٔ طرح‌ها
                </a>

                <a href={makeGeneralMailto(contactEmail)} className={btnOutline}>
                  ارتباط با ما (ایمیل)
                </a>
              </div>

              {/* Mini cards */}
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { t: "کاملاً آفلاین", d: "بدون اتصال به اینترنت" },
                  { t: "سفارشی‌سازی", d: "طبق نیاز سازمان شما" },
                  { t: "پشتیبانی واقعی", d: "رفع باگ + به‌روزرسانی" },
                ].map((x) => (
                  <div key={x.t} className={`${cardBase} p-4 text-center`}>
                    <div className="text-sm font-black text-slate-900">{x.t}</div>
                    <div className="mt-1 text-xs leading-6 text-slate-600">
                      {x.d}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* right visual */}
            <div className="relative">
              <div className={`${cardBase} p-6`}>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-black text-slate-900">نمای کلی</div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    مناسب سازمان‌ها
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    { k: "حالت اجرا", v: "آفلاین (بدون اینترنت)" },
                    { k: "استفاده", v: "سازمانی/اداری" },
                    { k: "پشتیبانی", v: "یک‌سال + ساعتی" },
                    { k: "شخصی‌سازی", v: "پیکره/شیوه‌نامه/تنظیمات" },
                  ].map((r) => (
                    <div
                      key={r.k}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      <span className="text-xs font-bold text-slate-600">{r.k}</span>
                      <span className="text-xs font-extrabold text-slate-900">{r.v}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-[#ffd1e3] bg-[#fff0f6]/70 p-4">
                  <div className="text-xs font-extrabold text-slate-900">
                    مسیر پیشنهاد‌شده
                  </div>
                  <ol className="mt-2 space-y-1 text-xs leading-6 text-slate-700">
                    <li>۱) طرح مناسب را انتخاب کنید</li>
                    <li>۲) از داخل کارت‌ها به ما ایمیل بزنید</li>
                    <li>۳) نصب و سفارشی‌سازی طبق نیاز انجام می‌شود</li>
                  </ol>
                </div>
              </div>

              <div className="pointer-events-none absolute -inset-2 -z-10 rounded-[22px] border border-transparent opacity-0 lg:opacity-100" />
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-slate-50" />
      </section>

      {/* PRICING (کارت‌های مورّبِ فارسی‌شده) */}
      <section id="pricing" className="scroll-mt-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#ffd1e3] bg-white px-3 py-1 text-xs font-bold text-[#ff4d8d] shadow-sm">
              پلن‌ها و قیمت‌گذاری
            </p>
            <h2 className="mt-3 text-2xl font-black sm:text-3xl">طرح‌های نسخهٔ آفلاین</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
              یکی از طرح‌ها را انتخاب کنید و از همان کارت، درخواست مشاوره را با ایمیل ارسال کنید.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-8">
            <div className="grid w-full grid-cols-1 place-items-center gap-8 md:grid-cols-3">
              {enterprisePlans.map((p) => (
                <PricingCard key={p.id} plan={p} contactEmail={contactEmail} />
              ))}
            </div>

            {/* سایه زیر کارت‌ها مثل نمونه */}
            <div className="mt-2 h-10 w-full max-w-5xl opacity-30 blur-[2px] [background:radial-gradient(ellipse_at_center,rgba(15,23,42,.45),transparent_65%)]" />
          </div>

          {/* راه تماس سریع زیر کارت‌ها */}
          <div className={`${cardBase} mt-10 p-6 text-center`}>
            <div className="text-sm font-black text-slate-900">
              قیمت‌ها و جزئیات دقیق، بسته به تعداد کاربر و نیاز سفارشی‌سازی متفاوت است.
            </div>
            <p className="mx-auto mt-2 max-w-3xl text-sm leading-8 text-slate-600">
              اگر قیمت دقیق می‌خواهید، همین الان مشخصات را ایمیل کنید تا پیش‌فاکتور ارسال شود.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a href={makeGeneralMailto(contactEmail)} className={btnOutline}>
                ارسال ایمیل برای پیش‌فاکتور
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT / GUIDE */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <div className="text-center">
          <h2 className="text-2xl font-black sm:text-3xl">راهنمای کامل نسخهٔ آفلاین</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
            پس از بررسی دقیق، یکی از طرح‌ها را انتخاب کنید و از طریق ایمیل با ما در ارتباط باشید.
            در ادامه، همه چیز را درباره چرایی نسخهٔ آفلاین، امکانات، مزایا و نحوهٔ نصب می‌خوانید.
          </p>
        </div>

        {/* Quick Features Grid */}
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "خطایابی املایی",
              d: "شناسایی غلط‌های املایی، فاصله‌گذاری و نیم‌فاصله + پیشنهاد اصلاح.",
            },
            {
              t: "خطایابی نشانه‌گذاری",
              d: "اصلاح فاصله قبل/بعد از نشانه‌ها و کمک برای استفاده درست از نقطه، ویرگول و…",
            },
            {
              t: "اصلاح نویسه‌ها",
              d: "تبدیل نویسه‌های عربی/انگلیسی به نسخهٔ فارسی برای متن تمیز و یکدست.",
            },
            {
              t: "تصحیح اعداد",
              d: "شناسایی اعداد عربی/انگلیسی و تبدیل آن‌ها به اعداد فارسی.",
            },
            {
              t: "شیوه‌نامهٔ فرهنگستان",
              d: "کمک به اجرای مو‌به‌موی اصول درست‌نویسی و مصوبات فرهنگستان.",
            },
            {
              t: "پیشنهادهای ویرایشی",
              d: "ارائه پیشنهادهای نگارشی/ویرایشی برای متن روان‌تر و درست‌تر.",
            },
          ].map((x) => (
            <div key={x.t} className={`${cardBase} p-5`}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-900">{x.t}</h3>
                <span className="h-2 w-2 rounded-full bg-[#ff4d8d]" />
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>

        {/* Accordions */}
        <div className="mt-10 space-y-4">
          {[
            {
              s: "چرا پاک‌نویسِ آفلاین ساخته شد؟",
              p: [
                "برخی از سازمان‌ها و ارگان‌ها به دلایل امنیتی و حفظ محرمانگی اطلاعات، امکان و مجوز استفاده از اینترنت روی رایانه‌های سازمانی را ندارند.",
                "با وصل‌شدن حتی یک‌مرتبه‌ای رایانهٔ سازمانی به اینترنت هم ممکن است امنیت سازمان و مدارک آن به خطر بیفتد.",
                "به‌تازگی، استفاده از پاک‌نویس به‌صورت کاملاً آفلاین هم امکان‌پذیر شده است.",
              ],
            },
            {
              s: "نسخهٔ آفلاین و سازمانی چه ویژگی‌های متفاوتی دارد؟",
              p: [
                "نسخهٔ آفلاین سازمانی علاوه بر ویژگی‌های مشترک با نسخهٔ آنلاین و رایگان، امکان شخصی‌سازی و سفارشی‌سازی کامل دارد.",
                "در صورت نیاز شما، نرم‌افزار برای سازمان شما سفارشی می‌شود و پیکره/واژه‌نامه/شیوه‌نامه مدنظر شما به آن اضافه می‌شود.",
              ],
              list: [
                "نصب کامل نسخهٔ آفلاین روی رایانه‌های سازمان",
                "رفع و بهبود باگ‌ها",
                "اجرای سفارشی‌سازی‌های مدنظر شما",
                "پاسخگویی فعالانه به سؤالات و مشکلات",
                "به‌روزرسانی نرم‌افزار و پیکره‌ها",
              ],
              popular: true,
            },
            {
              s: "نسخهٔ آفلاین پاک‌نویس برای چه کسانی مفید است؟",
              p: [
                "برای افراد عادی کاربرد خاصی ندارد، چون نسخهٔ آنلاین رایگان است.",
                "برای سازمان‌ها/ادارات/شرکت‌هایی مفید است که امکان اتصال رایانه به اینترنت را ندارند یا اجازه اتصال نمی‌دهند.",
              ],
            },
            {
              s: "استفاده از نسخهٔ آفلاین چه مزایایی دارد؟",
              p: [
                "افزایش سرعت: زمان نگارش و اصلاح متن برای کارمندان چندین برابر بهتر می‌شود.",
                "دقت بالا: پاک‌نویس با دقت بالا متن را بررسی می‌کند.",
                "افزایش بهره‌وری: صرفه‌جویی در زمان و انرژی و افزایش بهره‌وری سازمان.",
              ],
            },
            {
              s: "نبودن پاک‌نویس چه تأثیری روی سازمان دارد؟",
              p: [
                "اگر از پاک‌نویس استفاده نکنید، سازمان شما موارد زیر را از دست خواهد داد:",
              ],
              list: ["مقدار زیادی زمان", "کیفیت متن فارسی", "منابع مالی و فرصت‌ها"],
              note:
                "مثلاً در مکاتبات، قراردادها، پروپوزال‌ها و… متن پر از غلط می‌تواند باعث از دست رفتن فرصت‌های همکاری شود.",
            },
            {
              s: "نحوهٔ نصب نسخهٔ آفلاین",
              p: [
                "باتوجه‌به تعداد رایانه‌های سازمانتان، طرح مورد نظرتان را انتخاب کنید و از طریق ایمیل درخواستتان را ارسال کنید.",
                "پس از نصب، همه امکانات بدون نیاز به اینترنت در دسترس خواهد بود و برای نصب‌های بعدی هم بسته/افزونه دریافت می‌کنید.",
              ],
            },
          ].map((x) => (
            <details
              key={x.s}
              className={`${cardBase} p-5 ${x.popular ? cardFeatured : ""}`}
            >
              {x.popular ? <div className={pillPopular}>محبوب</div> : null}

              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-sm font-black text-slate-900 sm:text-base">
                  {x.s}
                </span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <div className="mt-4 space-y-3 text-sm leading-8 text-slate-600">
                {x.p?.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}

                {x.list?.length ? (
                  <ul className="mt-2 space-y-1 pr-4">
                    {x.list.map((it) => (
                      <li key={it} className="relative pr-4">
                        <span className="absolute right-0 top-[0.85rem] h-2 w-2 rounded-full bg-[#ff4d8d]" />
                        {it}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {x.note ? (
                  <div className="rounded-2xl border border-[#ffd1e3] bg-[#fff0f6]/70 p-4 text-slate-700">
                    {x.note}
                  </div>
                ) : null}
              </div>
            </details>
          ))}
        </div>

        {/* Steps */}
        <div className={`${cardBase} mt-12 p-6`}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-black">شروع سریع</h3>
              <p className="mt-1 text-sm leading-7 text-slate-600">
                برای خرید و راه‌اندازی نسخهٔ آفلاین، همین مسیر کوتاه را بروید.
              </p>
            </div>

            <a href={makeGeneralMailto(contactEmail)} className={btnOutline}>
              ارسال ایمیل به ما
            </a>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "۱", t: "انتخاب طرح", d: "طبق تعداد کاربر/حجم استفاده" },
              { n: "۲", t: "ارسال درخواست", d: "از داخل کارت‌ها ایمیل بزنید" },
              { n: "۳", t: "نصب و سفارشی‌سازی", d: "طبق نیاز سازمان" },
              { n: "۴", t: "پشتیبانی و به‌روزرسانی", d: "رفع باگ + توسعه" },
            ].map((s) => (
              <div key={s.n} className={`${cardBase} p-5`}>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ff4d8d] text-sm font-black text-white">
                    {s.n}
                  </span>
                  <div className="text-sm font-black text-slate-900">{s.t}</div>
                </div>
                <div className="mt-2 text-sm leading-7 text-slate-600">{s.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className={`${cardBase} mt-10 p-8 text-center`}>
          <h3 className="text-xl font-black sm:text-2xl">
            با پاک‌نویس، هر بار بهتر بنویس.
          </h3>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
            همین حالا طرح مناسب را انتخاب کنید یا برای دریافت مشاوره و پیش‌فاکتور به ما ایمیل بزنید.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="#pricing"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              رفتن به طرح‌ها
            </a>
            <a href={makeGeneralMailto(contactEmail)} className={btnOutline}>
              ارتباط با ما
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
