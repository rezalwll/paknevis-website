// Landing – Story Scroll for Chrome Extension (RTL)
export default function ChromeStoryLanding() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#eef3ff] text-slate-800">
      {/* bg dots moving */}
      <div
        className="fixed inset-0 -z-10 opacity-30 animate-[dots_16s_linear_infinite]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(37,99,235,0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* header */}
      <header className="bg-white/70 backdrop-blur border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* chrome logo */}
            <div className="h-8 w-8 rounded-2xl grid place-items-center bg-[conic-gradient(from_180deg_at_50%_50%,#ea4335_0deg,#fbbc05_120deg,#34a853_240deg,#ea4335_360deg)]">
              <div className="h-3.5 w-3.5 rounded-full bg-white" />
            </div>
            <div>
              <div className="text-sm font-semibold">پاکنویس برای Chrome</div>
              <div className="text-[11px] text-slate-500">
                ویرایش فارسی در خودِ مرورگر
              </div>
            </div>
          </div>
          <a
            href="#install"
            className="rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold px-4 py-2"
          >
            افزودن به Chrome
          </a>
        </div>
      </header>

      {/* hero */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#e0ebff] via-white to-[#fff5d7] rounded-3xl border border-white/60 shadow-sm">
          <div className="p-8 md:p-10 space-y-4">
            <p className="inline-flex items-center gap-2 bg-white/60 border border-slate-200 rounded-full px-4 py-1 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
              مخصوص متن‌های فارسی در وب
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              بنویس، همون‌جا اصلاح کن
            </h1>
            <p className="text-slate-600 leading-7 max-w-2xl">
              افزونه کروم پاکنویس وقتی داری توی جیمیل، گوگل‌شیت، شبکه‌های اجتماعی
              یا فرم‌های آنلاین می‌نویسی، هم‌زمان غلط‌های املایی، نگارشی و
              فاصله‌گذاری رو پیشنهاد می‌ده. دیگه لازم نیست متن رو ببری جای دیگه.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#install"
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-xl font-semibold text-sm"
              >
                افزودن به Chrome
              </a>
              <a
                href="#stories"
                className="bg-white/70 border border-slate-200 px-6 py-3 rounded-xl font-semibold text-sm"
              >
                ببین کجاها کار می‌کنه
              </a>
            </div>
          </div>

          {/* floating CTA badge */}
          <div className="absolute -bottom-6 left-6 bg-white rounded-2xl shadow-md border border-slate-100 px-4 py-3 text-xs flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-[#eef3ff] grid place-items-center">
              <div className="h-5 w-5 rounded-full bg-[#2563eb] opacity-90" />
            </div>
            <div>
              <div className="font-semibold text-slate-700">
                اجرای مستقیم در مرورگر
              </div>
              <div className="text-slate-400">بدون نرم‌افزار جانبی</div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY BLOCKS (کاملا متفاوت از چیدمان‌های قبلی) */}
      <section id="stories" className="max-w-6xl mx-auto px-4 space-y-6 pb-12 mt-8">
        {/* story 1 */}
        <article className="grid md:grid-cols-[.5fr_1fr] gap-6 items-stretch">
          <div className="bg-[#fff] rounded-2xl border border-slate-200 p-4 text-sm">
            <h2 className="text-base font-bold mb-1">۱. وقتی توی Gmail می‌نویسی</h2>
            <p className="text-slate-600 leading-6">
              همون لحظه که متن ایمیل رو تایپ می‌کنی، پاکنویس زیر کلمه‌های مشکوک
              هایلایت می‌ذاره و شکل درست رو میاره.
            </p>
            <ul className="mt-3 space-y-1 text-slate-500 text-xs">
              <li>• مناسب برای ایمیل‌های رسمی</li>
              <li>• اصلاح نشانه‌گذاری</li>
              <li>• حفظ نیم‌فاصله</li>
            </ul>
          </div>
          <div className="relative rounded-2xl bg-white overflow-hidden border border-slate-200">
            <div className="h-9 bg-slate-50 flex items-center gap-2 px-4 text-[11px] text-slate-500">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-auto">mail.google.com</span>
            </div>
            <div className="p-4 text-sm leading-7">
              امروز در مورد <mark className="bg-rose-100 px-1 rounded">فاصله گذاری</mark> می‌نویسم و
              می‌خوام <mark className="bg-amber-100 px-1 rounded">نشانه گذاری</mark> هم درست باشه.
              {/* suggestion bubble */}
              <div className="mt-3 inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-xs">
                پیشنهاد: «فاصله‌گذاری» → <button className="text-[#2563eb]">اعمال</button>
              </div>
            </div>
          </div>
        </article>

        {/* story 2 */}
        <article className="grid md:grid-cols-[.5fr_1fr] gap-6 items-stretch">
          <div className="bg-[#fffef4] rounded-2xl border border-amber-100 p-4 text-sm">
            <h2 className="text-base font-bold mb-1">۲. وقتی توی Google Docs سند داری</h2>
            <p className="text-slate-600 leading-6">
              متن‌های طولانی وب معمولا غلط‌های ریز دارن: نیم‌فاصله، همزه، نشانه‌گذاری.
              پاکنویس روی همین ادیتور فعال میشه.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              مخصوص پایان‌نامه، گزارش، سندهای اشتراکی
            </p>
          </div>
          <div className="relative rounded-2xl bg-white overflow-hidden border border-slate-200">
            <div className="h-9 bg-slate-50 flex items-center gap-2 px-4 text-[11px] text-slate-500">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-auto">docs.google.com</span>
            </div>
            <div className="p-4 text-sm leading-7">
              «نشانه گذاری» → <span className="font-semibold">نشانه‌گذاری</span>
              <div className="mt-2">
                «ميكنم» → <span className="font-semibold">می‌کنم</span>
              </div>
              <div className="mt-4 bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs text-slate-500">
                ۵ پیشنهاد در این پاراگراف پیدا شد.
              </div>
            </div>
          </div>
        </article>

        {/* story 3 */}
        <article className="grid md:grid-cols-[.5fr_1fr] gap-6 items-stretch">
          <div className="bg-[#ecfdf3] rounded-2xl border border-emerald-100 p-4 text-sm">
            <h2 className="text-base font-bold mb-1">۳. وقتی پست شبکه اجتماعی می‌زنی</h2>
            <p className="text-slate-600 leading-6">
              توی X / LinkedIn متن کوتاهه، اما اشتباه خیلی تو چشم میاد. پاکنویس
              قبل انتشار نشونت می‌ده چی رو درست کنی.
            </p>
          </div>
          <div className="relative rounded-2xl bg-white overflow-hidden border border-slate-200">
            <div className="h-9 bg-slate-50 flex items-center gap-2 px-4 text-[11px] text-slate-500">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-auto">x.com/compose</span>
            </div>
            <div className="p-4 text-sm leading-7">
              امروز یه پست در مورد <mark className="bg-emerald-100 px-1 rounded">نوشتار فارسی</mark> می‌نویسم…
              <div className="mt-3 inline-flex gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full text-xs">
                ۲ غلط پیدا شد → <button className="text-emerald-700">اصلاح کن</button>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* install bar */}
      <section
        id="install"
        className="sticky bottom-4 z-30 max-w-4xl mx-auto px-4"
      >
        <div className="bg-white shadow-lg rounded-2xl border border-slate-200 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-[conic-gradient(from_180deg_at_50%_50%,#ea4335_0deg,#fbbc05_120deg,#34a853_240deg,#ea4335_360deg)] grid place-items-center">
              <div className="h-3.5 w-3.5 rounded-full bg-white" />
            </div>
            <div>
              <div className="text-sm font-semibold">افزودن به Chrome</div>
              <div className="text-[11px] text-slate-400">
                Chrome 49+ · اینترنت لازم
              </div>
            </div>
          </div>
          <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-xl px-5 py-2 text-sm font-semibold transition">
            نصب افزونه
          </button>
        </div>
      </section>

      <footer className="py-10 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} پاکنویس – افزونه کروم
      </footer>
    </div>
  );
}
