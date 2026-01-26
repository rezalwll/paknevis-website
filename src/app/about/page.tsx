import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "درباره پاک‌نویس",
  description:
    "آشنایی با تیم پاک‌نویس، مأموریت ما در بهبود نوشتار فارسی و مسیر رشد از سال ۱۳۹۶ تا امروز.",
};

const aboutBody = `تیم پاک‌نویس در سال ۱۳۹۶ با هدف تولید نرم‌افزاری کاربردی در حوزهٔ خط و زبان فارسی آغاز به کار کرد. دغدغهٔ تیم، کمک به بهبود سطح تعامل میان کاربران با زبان فارسی، در محیط‌های مجازی است. برای این منظور، انتقال پیام میان گوینده (در اینجا نویسنده) و مخاطب باید به‌درستی و با کمترین ابهام صورت گیرد و گاهی دشواریِ این کار سدی بزرگ در مقابل ایجاد تعامل درست میان افراد می‌سازد. تیم پاک‌نویس با انگیزهٔ تقویت اعتمادبه‌نفس کاربران و کم‌کردن نگرانی آن‌ها از صورت‌گرفتن خطاهای احتمالی در نوشتار، تلاش کرده است سامانه‌ای راه‌اندازی کند که خطاهای املایی، نگارشی، معنایی و نحوی را در متن‌ فارسی تشخیص دهد و برای پیرایش آن‌ها تا حد امکان پیشنهادهای کاربردی مطرح کند و درنهایت با تأیید کاربر، متن را ویرایش نماید. تاکنون گروه پاک‌نویس موفق شده است در محیط مایکروسافت وُرد افزونه‌ای تولید کند که قادر است خطاهای املایی، نگارشی و تاحدی معنایی را پوشش دهد. تیم پاک‌نویس امیدوار است با دریافت پیشنهادها و بازخوردهای شما، بهتر از گذشته در این راه گام بردارد و به کاربرانش لذت و سرعت در نوشتن را هدیه کند.`;

const milestones = [
  {
    year: "۱۳۹۶",
    title: "شروع مسیر",
    desc: "تشکیل تیم و تدوین ایدهٔ اولیه برای بهبود نوشتار فارسی.",
  },
  {
    year: "۱۳۹۸",
    title: "افزونه ورد",
    desc: "انتشار نسخه افزونه مایکروسافت ورد و پوشش خطاهای املایی و نگارشی.",
  },
  {
    year: "۱۴۰۱",
    title: "گسترش زیرساخت",
    desc: "تقویت هستهٔ زبانی و آماده‌سازی برای سناریوهای سازمانی و آفلاین.",
  },
  {
    year: "۱۴۰۲",
    title: "نسخه وب و تیمی",
    desc: "راه‌اندازی نسخه وب و ارائه امکانات تیمی و سازمانی برای استفاده گسترده‌تر.",
  },
  {
    year: "امروز",
    title: "همراه شما",
    desc: "دریافت بازخورد، بهبود سرویس و توسعه نسخه‌های تحت وب و سازمانی.",
  },
];

const values = [
  {
    title: "دقت و شفافیت",
    desc: "پیشنهادهایی ارائه می‌کنیم که نویسنده سریع و مطمئن تصمیم بگیرد.",
  },
  {
    title: "اعتماد و امنیت",
    desc: "متن شما امانت است؛ حریم خصوصی و امنیت داده‌ها خط قرمز ماست.",
  },
  {
    title: "یادگیری مداوم",
    desc: "با بازخورد کاربران و پیشرفت‌های زبانی، مدل‌ها را پیوسته به‌روز می‌کنیم.",
  },
  {
    title: "ساده‌بودن",
    desc: "ابزار باید بی‌دردسر باشد؛ رابط کاربری پاک‌نویس برای همه قابل فهم است.",
  },
];

function MilestoneIcon({ index }: { index: number }) {
  // آیکون‌ها فقط برای زیبایی طرح‌اند (ساده و نزدیک به تم)
  const common = "h-14 w-14 text-slate-700";
  switch (index) {
    case 0: // شروع
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2l3 7h7l-5.5 4 2.1 7L12 16l-6.6 4 2.1-7L2 9h7l3-7z" />
        </svg>
      );
    case 1: // ورد/نوشتن
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 19h16" />
          <path d="M7 17l10-10" />
          <path d="M16.5 6.5l1 1" />
          <path d="M6 14l4 4" />
          <path d="M12 6h6" />
          <path d="M12 10h6" />
        </svg>
      );
    case 2: // زیرساخت/سرور
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="4" width="16" height="6" rx="2" />
          <rect x="4" y="14" width="16" height="6" rx="2" />
          <path d="M8 7h.01M8 17h.01" />
          <path d="M12 7h6M12 17h6" />
        </svg>
      );
    case 3: // نسخه وب و تیمی
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18" />
          <path d="M8 7h.01M12 7h.01M16 7h.01" />
          <path d="M8 16h8" />
        </svg>
      );
    default: // همراه شما
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20.8 7.7c-.8-2.3-3.5-3.4-5.6-2-1 .6-1.7 1.5-2.2 2.2-.5-.7-1.2-1.6-2.2-2.2-2.1-1.4-4.8-.3-5.6 2C2.4 10.4 3.5 13 6 15l6 5 6-5c2.5-2 3.6-4.6 2.8-7.3z" />
        </svg>
      );
  }
}

export default function AboutPage() {
  return (
    <main
      dir="rtl"
      className="bg-gradient-to-b from-slate-50/40 via-white to-white text-slate-800"
    >
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-emerald-50/30 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 lg:px-10">
          {/* هیروی اصلی */}
          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-4 text-right">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-relaxed text-slate-900">
                همراه نوشتار فارسی
              </h1>
              <p className="text-sm sm:text-base leading-7 text-slate-600 max-w-3xl">
                پاک‌نویس با هدف افزایش دقت و سرعت نویسندگان فارسی ایجاد شد. هدف
                ما ساده است: نوشتن بی‌دغدغه برای همه، از کاربر شخصی تا
                سازمان‌های بزرگ.
              </p>
            </div>

            <div className="relative">
              <div
                className="absolute -inset-5 rounded-3xl bg-emerald-30 blur-3xl opacity-60"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl shadow-emerald-50/30">
                <img
                  src="/images/Online editor.png"
                  alt="تصویر تیم یا محصول پاک‌نویس"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* هیرو دوم: داستان ما */}
          <section className="mt-14 overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-l from-white via-emerald-50/30 to-white p-6 shadow-lg shadow-emerald-50/30">
            <div className="grid gap-6 lg:grid-cols-[0.5fr_1fr] items-center">
              <div className="space-y-4">
                <div className="text-right space-y-2">
                  <Badge>داستان ما</Badge>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    از ایده تا یک همراه زبانی
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-7">
                    روایت شکل‌گیری پاک‌نویس و تمرکز ما بر بهبود تجربهٔ نوشتن
                    فارسی.
                  </p>
                </div>
                <div className="">
                  <div className="aspect-[4/3] w-full">
                    <img
                      src="/images/Online editor.png"
                      alt="تصویر تیم پاک‌نویس"
                      className="h-full w-full object-cover"
                    />
                    <div className="" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/80 border border-emerald-100 p-5 shadow-inner shadow-emerald-50/30">
                <p className="text-sm sm:text-base leading-7 text-slate-700 whitespace-pre-line">
                  {aboutBody}
                </p>
                <p className="mt-4 text-sm font-semibold text-slate-900">
                  تیم پاک‌نویس
                </p>
              </div>
            </div>
          </section>

          {/* ارزش‌ها */}
          <section className="mt-14">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                مأموریت و ارزش‌ها
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-emerald-200 to-transparent" />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {values.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-6">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ✅ تایم‌لاین جدید (همون طرح کارت‌های اتصال‌دار) */}
          <section className="mt-14">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                مسیر رشد
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-emerald-200 to-transparent" />
            </div>

            {/* عنوان وسط مثل طرح */}
            <div className="mt-8 flex flex-col items-center justify-center">
              <svg
                className="h-12 w-12 text-[#001A4B]"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {/* خط افقی وسط */}
                <path d="M10 22H38" />

                {/* سه شاخه بالا */}
                <path d="M14 22V13" />
                <path d="M24 22V13" />
                <path d="M34 22V13" />

                {/* دو شاخه پایین (بین شاخه‌های بالا) */}
                <path d="M19 22V31" />
                <path d="M29 22V31" />

                {/* دایره‌های بالا */}
                <circle cx="14" cy="10" r="3" />
                <circle cx="24" cy="10" r="3" />
                <circle cx="34" cy="10" r="3" />

                {/* دایره‌های پایین */}
                <circle cx="19" cy="34" r="3" />
                <circle cx="29" cy="34" r="3" />
              </svg>

              <p className="mt-3 text-2xl font-extrabold text-[#001A4B]">
                این تازه یک شروعه
              </p>
            </div>

            <div className="relative mt-10">
              {/* ✅ MOBILE/TABLET (<lg) — عمودی + کارت چسبیده به خط قرمز */}
              <div dir="ltr" className="lg:hidden [--rail:28px] [--conn:42px] [--gutter:calc(var(--rail)+var(--conn)+48px)] ">
                <ol
                  className="
      relative mx-auto max-w-3xl px-4
      before:content-[''] before:absolute
      before:left-[var(--rail)] before:top-0 before:bottom-0
      before:w-[2px] before:bg-[#001A4B]
      space-y-10
    "
                >
                  {/* فلش پایین کنار خط (مثل عکس) */}
                  <div className="pointer-events-none absolute left-[var(--rail)] -top-6 -translate-x-1/2">
                    <svg
                      className="h-6 w-6 text-[#001A4B]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14" />
                      <path d="M7 14l5 5 5-5" />
                    </svg>
                  </div>

                  {milestones.map((item, idx) => (
                    <li
                      key={`${item.year}-${idx}`}
                      className="grid grid-cols-[calc(var(--rail)+var(--conn))_1fr] items-center"
                    >
                      {/* ستون چپ: نقطه + کانکتور + خط قرمز (لبه‌ی ستون) */}
                      <div className="relative h-[240px]">
                        {/* نقطه روی ریل */}
                        <span
                          className="
              absolute left-[var(--rail)] top-1/2
              -translate-x-1/2 -translate-y-1/2
              h-3 w-3 rounded-full bg-[#001A4B]
            "
                        />
                        {/* کانکتور تا مرز ستون */}
                        <span
                          className="
              absolute left-[var(--rail)] top-1/2
              -translate-y-1/2
              h-px w-[calc(100%-var(--rail))] bg-[#001A4B]
            "
                        />
                        {/* خط قرمز دقیقاً روی مرز ستون => کارت می‌چسبه */}
                        <span
                          className="
              absolute right-0 top-1/2
              -translate-y-1/2
              h-10 w-[2px] bg-red-600
            "
                        />
                      </div>

                      {/* ستون راست: کارت (بدون gap => چسبیده به خط قرمز) */}
                      <div className="justify-self-start">
                        <div className="w-[min(340px,calc(100vw-var(--gutter)))]">
                          <div
                            className="
                relative h-[240px] w-full
                rounded-[18px]
                border border-slate-200/80
                bg-gradient-to-b from-slate-50/40 to-white
                shadow-[0_18px_44px_rgba(15,23,42,0.08)]
                px-5 py-4
                flex flex-col items-center justify-between
              "

                          >
                            <div className="w-full text-center">
                              <div className="text-xl font-extrabold text-slate-700">{item.year}</div>
                              <div className="mx-auto mt-2 h-px w-28 bg-red-600" />
                            </div>

                            <div className="flex justify-center">
                              <MilestoneIcon index={idx} />
                            </div>

                            <div className="text-center">
                              <div className="text-[18px] font-extrabold text-[#001A4B] leading-7">
                                {item.title}
                              </div>
                              <div className="mt-2 text-sm text-slate-600 leading-7">
                                {item.desc}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>


              {/* =========================
      ✅ DESKTOP (lg+) — افقی (کد خودت)
     ========================= */}
              <div className="hidden lg:block">
                <div className="pointer-events-none absolute left-0 right-0 bottom-8 h-px bg-[#001A4B]" />

                <div className="pointer-events-none absolute right-0 bottom-8 -translate-y-1/2">
                  <svg
                    className="h-5 w-5 text-[#001A4B]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 12H6" />
                    <path d="M10 8l-4 4 4 4" />
                  </svg>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-end">
                  {milestones.map((item, idx) => (
                    <div key={item.year} className="min-w-0 flex flex-col items-center h-full">
                      <div
                        className="
              relative w-full h-[240px]
              px-4 py-3
              flex flex-col items-center justify-between
              bg-[linear-gradient(180deg,rgba(0,26,75,.05),rgba(0,5,15,0))]
              rounded-lg border border-[#e1e1e1]
              outline-none
            "

                      >
                        <div className="w-full text-center">
                          <div className="text-xl font-extrabold text-slate-700">{item.year}</div>
                          <div className="mx-auto mt-2 h-px w-24 bg-red-600" />
                        </div>

                        <div className="flex justify-center">
                          <MilestoneIcon index={idx} />
                        </div>

                        <div className="text-center">
                          <div className="text-[16px] font-extrabold leading-7 text-[#001A4B]">
                            {item.title}
                          </div>
                          <div className="mt-2 text-xs text-slate-600 leading-6">
                            {item.desc}
                          </div>
                        </div>

                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-px h-px w-16 bg-red-600" />
                      </div>

                      <div className="relative h-[72px] w-full">
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[34px] w-px bg-[#001A4B]" />
                        <div className="absolute left-1/2 top-[34px] -translate-x-1/2 h-3 w-3 rounded-full bg-[#001A4B]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>


          </section>
        </div>
      </div>
    </main>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-50/30 px-3 py-1 text-emerald-700 border border-emerald-100 shadow-sm">
      {children}
    </span>
  );
}
