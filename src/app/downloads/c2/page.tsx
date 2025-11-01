export default function ChromeExtensionDownloadV3() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#f8fafc] text-slate-800">
      {/* Mesh/Decor */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-40" style={{background:'radial-gradient(40% 40% at 30% 30%, #60a5fa 0%, transparent 70%)'}}/>
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-30" style={{background:'radial-gradient(40% 40% at 70% 70%, #34d399 0%, transparent 70%)'}}/>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.03),_transparent_70%)]"/>
      </div>

      {/* Sticky install card */}
      <div className="sticky top-4 z-30 mx-auto mt-4 w-full max-w-6xl px-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/80 backdrop-blur-xl shadow-sm ring-1 ring-black/5 px-4 py-3">
          <div className="flex items-center gap-3 text-sm">
            <img src="/icons/chrome.svg" alt="Chrome" className="h-6 w-6"/>
            <div>
              <div className="font-bold">افزونهٔ کروم پاکنویس</div>
              <div className="text-slate-500">ویرایش هوشمند فارسی هنگام تایپ در وب</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-1">سازگار با Chrome 49+</span>
            <a href="#install" className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 shadow">افزودن به Chrome</a>
          </div>
        </div>
      </div>

      {/* Hero Split */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Right */}
        <div className="order-2 md:order-1 text-right">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.15]">
            پاکنویس برای Chrome
            <span className="block text-blue-600 mt-2">متنِ بی‌خطا، همان لحظهٔ تایپ</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-8">
            افزونهٔ کروم پاکنویس مستقیماً داخل مرورگر شما فعال می‌شود. هنگام نوشتن در وب‌سایت‌ها، جیمیل، گوگل‌شیت و شبکه‌های اجتماعی، خطاهای املایی، نگارشی و فاصله‌گذاری را به‌صورت خودکار تشخیص می‌دهد و پیشنهاد اصلاح می‌دهد.
          </p>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              'اجرای مستقیم در مرورگر — بدون نرم‌افزار جانبی',
              'تجربه سریع و روان در محیط وب',
              'مناسب برای ایمیل‌ها، مقالات و شبکه‌های اجتماعی',
              'سازگار با Google Chrome 49 به بالا',
            ].map((t,i)=> (
              <li key={i} className="flex items-start gap-2 rounded-xl bg-white/80 backdrop-blur p-3 ring-1 ring-black/5">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500"/>
                <span className="text-slate-700">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap justify-end gap-3">
            <a href="#install" className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 shadow">افزودن به Chrome</a>
            <a href="#how" className="rounded-xl border border-slate-300 hover:bg-white px-6 py-3 font-semibold">نحوهٔ کار</a>
          </div>
        </div>
        {/* Visual Left */}
        <div className="order-1 md:order-2">
          <div className="relative mx-auto max-w-xl">
            <div className="rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 overflow-hidden">
              {/* browser head */}
              <div className="h-10 bg-slate-100 flex items-center gap-2 px-4">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <div className="ml-auto text-xs text-slate-500">docs.google.com</div>
              </div>
              <div className="p-6 md:p-8">
                <div className="text-sm text-slate-500 mb-2">ویرایش متن در وب</div>
                <div className="relative border rounded-xl p-5 leading-8">
                  <p>
                    امروز روی <mark className="rounded bg-rose-100 px-1">املا</mark> و
                    <mark className="rounded bg-amber-100 px-1 mx-1">نشانه گذاری</mark>
                    متن کار می‌کنم؛ پاکنویس پیشنهاد می‌دهد:
                  </p>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl p-3 bg-rose-50 ring-1 ring-rose-200">« ميكنم » → « <span className="font-semibold text-rose-700">می‌کنم</span> »</div>
                    <div className="rounded-xl p-3 bg-amber-50 ring-1 ring-amber-200">« نشانه گذاری » → « <span className="font-semibold text-amber-700">نشانه‌گذاری</span> »</div>
                  </div>
                  <button className="absolute -bottom-3 left-3 rounded-full bg-white shadow px-3 py-1 text-xs ring-1 ring-slate-200">اعمال همه</button>
                </div>
                <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500"/>پاکنویس فعال</div>
                  <button className="text-blue-600 hover:underline">نمایش ۷ پیشنهاد</button>
                </div>
              </div>
            </div>
            {/* floating score */}
            <div className="absolute -bottom-6 -right-6 w-60 rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 p-4">
              <div className="text-xs text-slate-500">پیشرفت متن</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-semibold">خوانایی</span>
                <span className="text-sm text-emerald-600 font-semibold">+20%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded mt-2 overflow-hidden">
                <div className="h-full bg-blue-600" style={{width:'74%'}}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use-cases band */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {t:'ایمیل‌های حرفه‌ای', d:'اشتباهات را پیش از ارسال اصلاح کنید و لحن رسمی نگه دارید.'},
            {t:'فرم‌ها و شبکه‌های اجتماعی', d:'سریع تایپ کنید و اصلاح را به پاکنویس بسپارید.'},
            {t:'اسناد آنلاین', d:'در Docs/Sheets نگارش دقیق‌تر و خواناتر داشته باشید.'},
          ].map((c,i)=>(
            <div key={i} className="rounded-2xl bg-white/80 backdrop-blur p-6 ring-1 ring-black/5">
              <div className="text-sm text-slate-500">موارد استفاده</div>
              <div className="mt-1 text-lg font-bold">{c.t}</div>
              <p className="mt-2 text-slate-600 text-sm leading-7">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1 text-right">
          <h2 className="text-3xl font-bold">سه گام تا شروع</h2>
          <ol className="mt-6 space-y-5 text-slate-700">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center">1</span>
              <div>
                <div className="font-semibold">افزودن به Chrome</div>
                <div className="text-slate-600 text-sm mt-1">از Chrome Web Store نصب کنید و آیکون افزونه را در نوار ابزار ببینید.</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center">2</span>
              <div>
                <div className="font-semibold">نوشتن در هر صفحهٔ وب</div>
                <div className="text-slate-600 text-sm mt-1">روی هر فیلد نوشتاری بروید؛ پاکنویس به‌صورت خودکار فعال می‌شود.</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center">3</span>
              <div>
                <div className="font-semibold">اعمال پیشنهادها</div>
                <div className="text-slate-600 text-sm mt-1">پیشنهادها را بررسی و با یک کلیک اعمال کنید؛ متن شما بی‌نقص می‌شود.</div>
              </div>
            </li>
          </ol>
          <div className="mt-8 flex gap-3 justify-end">
            <a href="#install" className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">نصب سریع</a>
            <a href="#faq" className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-white font-semibold">سؤالات متداول</a>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="rounded-2xl bg-white/80 backdrop-blur p-6 ring-1 ring-black/5">
            <div className="text-sm text-slate-500">سازگاری و نیازمندی‌ها</div>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              <li>• Chrome 49 به بالا</li>
              <li>• فعال در Gmail, Google Docs/Sheets, X/Twitter, LinkedIn و بیشتر</li>
              <li>• اتصال اینترنت برای پیشنهادهای هوشمند</li>
            </ul>
            <div className="mt-4 text-sm text-slate-500">حریم خصوصی</div>
            <p className="text-slate-600 text-sm mt-1 leading-7">متن شما تنها برای پردازش زبانی ارسال می‌شود و ذخیرهٔ پایدار ندارد. می‌توانید دامنه‌های حساس را مستثنی کنید.</p>
          </div>
        </div>
      </section>

      {/* Install anchor */}
      <section id="install" className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 rounded-2xl bg-white shadow ring-1 ring-slate-200 p-6">
            <h3 className="text-xl font-bold">گام آخر: افزونه را نصب کنید</h3>
            <p className="mt-2 text-slate-600 text-sm leading-7">روی دکمهٔ زیر کلیک کنید تا به Chrome Web Store منتقل شوید. پس از نصب، آیکون پاکنویس را از نوار ابزار فعال کنید.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#" className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3">افزودن به Chrome</a>
              <a href="#how" className="rounded-xl border border-slate-300 hover:bg-white px-6 py-3 font-semibold">راهنمای نصب</a>
            </div>
          </div>
          <div className="rounded-2xl bg-white/80 backdrop-blur p-6 ring-1 ring-black/5">
            <div className="text-sm text-slate-500">امتیاز کاربران</div>
            <div className="mt-2 flex items-center gap-2">
              <div className="text-amber-400 text-xl">★★★★★</div>
              <div className="text-xs text-slate-500">(1,284 نظر)</div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>+ پیشنهادهای دقیق و سریع</li>
              <li>+ سبک و کم‌مصرف</li>
              <li>+ بهبود چشمگیر خوانایی متن</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-right">سؤالات متداول</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {q:'آیا همیشه اینترنت لازم است؟', a:'برای پیشنهادهای هوشمند بله؛ برخی قابلیت‌های پایه می‌توانند محلی عمل کنند.'},
            {q:'آیا در همهٔ وب‌سایت‌ها فعال است؟', a:'در اغلب فیلدهای نوشتاری فعال می‌شود؛ دامنه‌های خاص را می‌توانید در تنظیمات غیرفعال کنید.'},
            {q:'آیا متن من ذخیره می‌شود؟', a:'خیر؛ فقط برای پردازش زبانی ارسال و ذخیرهٔ دائمی نمی‌شود.'},
            {q:'چگونه واژگان تخصصی‌ام را اضافه کنم؟', a:'از «واژهنامهٔ شخصی» در تنظیمات افزونه استفاده کنید و بین دستگاه‌ها همگام بمانید.'},
          ].map((f,i)=> (
            <details key={i} className="group rounded-2xl bg-white/80 backdrop-blur p-5 ring-1 ring-black/5">
              <summary className="flex items-center justify-between cursor-pointer list-none font-semibold">
                <span className="pr-1">{f.q}</span>
                <span className="transition group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-2 text-slate-600 leading-7 text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-slate-500 border-t">© {new Date().getFullYear()} پاکنویس — نسخهٔ Chrome</footer>
    </div>
  );
}
