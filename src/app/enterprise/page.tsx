import type { Metadata } from "next";
import OfflinePricingSection from "@/components/OfflinePricingSection";

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
    <main dir="rtl" className="bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_85%_-10%,rgba(255,77,141,0.28),transparent),radial-gradient(800px_500px_at_10%_0%,rgba(47,128,237,0.18),transparent)]" />

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

              {/* Mini cards (apply same pricing-card style) */}
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

            {/* right visual (same card style) */}
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
                      <span className="text-xs font-bold text-slate-600">
                        {r.k}
                      </span>
                      <span className="text-xs font-extrabold text-slate-900">
                        {r.v}
                      </span>
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

              {/* optional: a “featured” hint frame like pricing */}
              <div className="pointer-events-none absolute -inset-2 -z-10 rounded-[22px] border border-transparent opacity-0 lg:opacity-100" />
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-slate-50" />
      </section>

      {/* PRICING */}
      <section id="pricing" className="scroll-mt-24">
        <OfflinePricingSection contactEmail={contactEmail} />
      </section>

      {/* CONTENT / GUIDE */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <div className="text-center">
          <h2 className="text-2xl font-black sm:text-3xl">
            راهنمای کامل نسخهٔ آفلاین
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
            پس از بررسی دقیق، یکی از طرح‌ها را انتخاب کنید و از طریق ایمیل با
            ما پاک‌نویس در ارتباط باشید. در ادامه، همه چیز را درباره چرایی
            نسخهٔ آفلاین، امکانات، مزایا و نحوهٔ نصب می‌خوانید.
          </p>
        </div>

        {/* Quick Features Grid (apply pricing-card style) */}
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

        {/* Accordions (cards with same style) */}
        <div className="mt-10 space-y-4">
          {[
            {
              s: "چرا پاک‌نویسِ آفلاین ساخته شد؟",
              p: [
                "برخی از سازمان‌ها و ارگان‌ها به دلایل امنیتی و حفظ محرمانگی اطلاعات، امکان و مجوز استفاده از اینترنت روی رایانه‌های سازمانی را ندارند؛ یعنی این رایانه‌ها هیچ‌وقت و به‌هیچ‌عنوان نباید به اینترنت وصل شوند.",
                "با وصل‌شدن حتی یک‌مرتبه‌ای رایانهٔ سازمانی به اینترنت هم ممکن است امنیت سازمان و مدارک آن به خطر بیفتد. حالا که نمی‌توانید رایانهٔ سازمانی خود را به اینترنت وصل کنید، چگونه می‌خواهید از پاک‌نویس استفاده کنید؟",
                "به‌تازگی، استفاده از پاک‌نویس به‌صورت کاملاً آفلاین هم امکان‌پذیر شده است. شما باتوجه‌به حد نیازتان، یکی از طرح‌های نسخهٔ آفلاین را انتخاب و تهیه می‌کنید.",
              ],
            },
            {
              s: "نسخهٔ آفلاین و سازمانی چه ویژگی‌های متفاوتی دارد؟",
              p: [
                "نسخهٔ آفلاین سازمانی علاوه بر ویژگی‌های مشترک با نسخهٔ آنلاین و رایگان، امکان شخصی‌سازی و سفارشی‌سازی کامل دارد.",
                "در صورت نیاز شما، نرم‌افزار برای سازمان شما سفارشی می‌شود و پیکره، زبان یا منبع واژگانی مدنظر شما به نرم‌افزار اضافه می‌شود. حتی تنظیمات داخلی هم می‌تواند شخصی‌سازی شود تا کارمندان راحت‌تر کار کنند.",
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
                "برای سازمان‌ها/ادارات/شرکت‌هایی مفید است که امکان اتصال رایانه به اینترنت را ندارند یا به‌دلیل سیاست‌های امنیتی اجازه اتصال نمی‌دهند.",
              ],
            },
            {
              s: "استفاده از نسخهٔ آفلاین چه مزایایی دارد؟",
              p: [
                "افزایش سرعت: زمان نگارش و اصلاح متن برای کارمندان چندین برابر بهتر می‌شود؛ با چند کلیک به متن روان و بی‌غلط می‌رسید.",
                "دقت بالا: حتی افراد حرفه‌ای هم ممکن است خطا کنند، اما پاک‌نویس با دقت بالا متن را بررسی می‌کند.",
                "افزایش بهره‌وری: سرعت و دقت بیشتر یعنی صرفه‌جویی در زمان و انرژی و افزایش بهره‌وری سازمان.",
              ],
            },
            {
              s: "نبودن پاک‌نویس چه تأثیری روی سازمان دارد؟",
              p: [
                "اگر از پاک‌نویس یا هر نرم‌افزار ویرایش متن فارسی استفاده نکنید، سازمان شما موارد زیر را از دست خواهد داد:",
              ],
              list: ["مقدار زیادی زمان", "کیفیت متن فارسی", "منابع مالی و فرصت‌ها"],
              note:
                "مثلاً در مکاتبات، قراردادها، پروپوزال‌ها و… متن پر از غلط می‌تواند باعث از دست رفتن فرصت‌های همکاری شود.",
            },
            {
              s: "نحوهٔ نصب نسخهٔ آفلاین",
              p: [
                "باتوجه‌به تعداد رایانه‌های سازمانتان، طرح مورد نظرتان را از همین صفحه انتخاب کنید و از طریق ایمیل درخواستتان را با کارشناسان پاک‌نویس در میان بگذارید.",
                "پس از نصب روی رایانه‌های سازمان، همه امکانات ویرایشی و نگارشی بدون نیاز به اینترنت در دسترس خواهد بود. همچنین افزونه‌ای دریافت می‌کنید تا در آینده روی رایانه‌های جدید هم نصب کنید.",
              ],
            },
          ].map((x) => (
            <details
              key={x.s}
              className={`${cardBase} p-5 ${x.popular ? cardFeatured : ""}`}
            >
              {/* Optional popular pill like pricing cards */}
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

        {/* Steps (cards with same style) */}
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

        {/* Final CTA (also card style) */}
        <div className={`${cardBase} mt-10 p-8 text-center`}>
          <h3 className="text-xl font-black sm:text-2xl">
            با پاک‌نویس، هر بار بهتر بنویس.
          </h3>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
            همین حالا طرح مناسب را انتخاب کنید یا برای دریافت مشاوره و
            پیش‌فاکتور به ما ایمیل بزنید.
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
