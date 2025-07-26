import type { Metadata } from "next";
import EnterprisePricingCarousel from "../../components/EnterprisePricingCarousel";
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

  // ===== Theme (Light Purple + Light Blue + White + Black)
  const accentText = "text-indigo-600";
  const accentBgSoft = "bg-indigo-50";
  const accentBorder = "border-indigo-200";
  const accentBorderHover = "hover:border-indigo-300";
  const accentSoftHover = "hover:bg-indigo-50";

  // ===== Card style (same shape/shadow everywhere)
  const cardBase =
    "relative rounded-[18px] bg-white " +
    "shadow-[0_18px_40px_rgba(17,24,39,0.14)] border-2 border-transparent " +
    "transition-[transform,box-shadow,border-color] duration-200 ease-out " +
    " hover:shadow-[0_12px_26px_rgba(17,24,39,0.10)]";

  // Featured = light-blue border like screenshot
  const cardFeatured =
    "border-blue-400 shadow-[0_18px_45px_rgba(96,165,250,0.22),0_18px_40px_rgba(17,24,39,0.14)]";

  // Popular pill (light blue)
  const pillPopular =
    "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-extrabold text-blue-700 " +
    "shadow-[0_10px_22px_rgba(59,130,246,0.16)] whitespace-nowrap border border-blue-100";

  // Buttons
  const btnSolid =
    "inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-extrabold text-white " +
    "shadow-sm transition hover:bg-slate-800";

  const btnOutline =
    "inline-flex h-11 items-center justify-center rounded-xl border-2 bg-white px-5 text-sm font-extrabold " +
    "shadow-sm transition" +
    "text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300";

  // Lines like screenshot
  const titleLine = "mx-auto mt-2 mb-4 h-1 w-10 rounded-full bg-blue-300";
  const divider = "mx-auto my-4 h-[3px] w-14 rounded-full bg-blue-200 opacity-90";

  // Small “row cards” inside overview
  const rowLikeCard =
    "flex items-center justify-between rounded-2xl bg-white px-4 py-3 " +
    "border-2 border-transparent shadow-[0_10px_22px_rgba(17,24,39,0.08)]";

  const noteLikeCard =
    "rounded-2xl border-2 border-indigo-200 bg-indigo-50/60 p-4 " +
    "shadow-[0_10px_22px_rgba(17,24,39,0.08)]";

  return (
    <main dir="rtl" className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative bg-white overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
          {/* برای اینکه چپ/راست ستون‌ها درست و قابل‌کنترل باشه */}
          <div dir="ltr" className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Left Image (on desktop) */}
            <div className="order-2 lg:order-1">
              <div className={`${cardBase} overflow-hidden `}>
                <div className="relative  w-full overflow-hidden rounded-[14px] bg-slate-50">
                  {/* مسیر عکس رو عوض کن */}
                  <img
                    src="/images/Online editor.png"
                    alt="نسخه آفلاین پاک‌نویس برای سازمان‌ها"
                    className="h-full w-full object-cover"
                  />
                </div>


              </div>
            </div>

            {/* Right Content */}
            <div dir="rtl" className="order-1 lg:order-2">
              <p
                className={`inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-bold shadow-sm ${accentBorder} ${accentText}`}
              >
                نسخهٔ سازمانی
              </p>

              <h1 className="mt-4 text-3xl font-black leading-[1.25] sm:text-4xl">
                نسخهٔ آفلاین پاک‌نویس برای سازمان‌ها
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
                نسخهٔ آنلاین پاک‌نویس همیشه برای کاربران عادی رایگان خواهد بود؛ اما اگر به دلایل امنیتی
                به‌هیچ‌وجه نمی‌توانید رایانه‌های سازمانتان را به اینترنت وصل کنید، خرید نسخهٔ آفلاین
                تنها راهکار پیش روی شما برای ویرایش دقیق و صحیح تمام متن‌های اداری است.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#pricing" className={btnSolid}>
                  مشاهدهٔ طرح‌ها
                </a>

                <a href={makeGeneralMailto(contactEmail)} className={btnOutline}>
                  ارتباط با ما
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
                    <div className="mt-1 text-xs leading-6 text-slate-600">{x.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="pricing" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
          <div className="text-center">
            <p
              className={`inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-bold shadow-sm ${accentBorder} ${accentText}`}
            >
              پلن‌ها و قیمت‌گذاری
            </p>
            <h2 className="mt-3 text-2xl font-black sm:text-3xl">کارت‌های قیمت‌گذاری</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
              پلن مناسب تیم و سازمان خود را انتخاب کنید و با خیال راحت شروع کنید.
            </p>
          </div>

          <div className="mt-10">
            <EnterprisePricingCarousel />
          </div>
        </div>
      </section>



      {/* CONTENT / GUIDE */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <div className="text-center">
          <h2 className="text-2xl font-black sm:text-3xl">راهنمای کامل نسخهٔ آفلاین</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
            پس از بررسی دقیق، یکی از طرح‌ها را انتخاب کنید و از طریق ایمیل با
            ما پاک‌نویس در ارتباط باشید. در ادامه، همه چیز را درباره چرایی
            نسخهٔ آفلاین، امکانات، مزایا و نحوهٔ نصب می‌خوانید.
          </p>
        </div>

        {/* Quick Features */}
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
                <span className={`h-2 w-2 rounded-full ${accentBgSoft}`} />
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
          ].map((x) => (
            <details
              key={x.s}
              className={`${cardBase} group p-5 ${x.popular ? cardFeatured : ""}`}
            >
              {x.popular ? <div className={pillPopular}>محبوب</div> : null}

              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <span className="text-sm font-black text-slate-900 sm:text-base">
                  {x.s}
                </span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-transform duration-200 group-open:rotate-45">
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
                        <span className="absolute right-0 top-[0.85rem] h-2 w-2 rounded-full bg-indigo-200" />
                        {it}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </details>
          ))}
        </div>

        {/* Final CTA */}
        <div className={`${cardBase} mt-10 p-8 text-center`}>
          <h3 className="text-xl font-black sm:text-2xl">با پاک‌نویس، هر بار بهتر بنویس.</h3>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
            همین حالا طرح مناسب را انتخاب کنید یا برای دریافت مشاوره و
            پیش‌فاکتور به ما ایمیل بزنید.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="#pricing" className={`${btnSolid} px-6`}>
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
