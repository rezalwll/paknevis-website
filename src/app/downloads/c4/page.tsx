export default function ChromeExtensionDownloadPage() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-white text-gray-800 [--brand:#0ea5e9]"
    >
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute -left-20 -top-20 h-72 w-72 rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, var(--brand), transparent 60%)",
          }}
        />
        <div
          className="absolute -right-40 top-40 h-96 w-96 rounded-full blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(circle at 70% 70%, #22c55e, transparent 60%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text (right) */}
          <div className="order-2 md:order-1 text-right">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.2]">
              پاکنویس برای Chrome
              <span className="block text-[color:var(--brand)] mt-2">
                متنِ بی‌خطا، هنگام نوشتن در وب
              </span>
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              افزونهٔ کروم پاکنویس، ابزار هوشمند ویرایش متن فارسی است که
              مستقیماً داخل مرورگر فعال می‌شود. هنگام نوشتن در وب‌سایت‌ها،
              جیمیل، گوگل‌شیت، شبکه‌های اجتماعی و سایر محیط‌های مبتنی بر وب،
              خطاهای املایی، نگارشی، فاصله‌گذاری و نشانه‌گذاری را به‌صورت خودکار
              پیشنهاد و اصلاح می‌کند.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-end">
              <a
                href="#"
                className="rounded-xl px-6 py-3 text-white font-semibold shadow-md transition bg-[color:var(--brand)] hover:brightness-110"
              >
                افزودن به Chrome
              </a>
              <a
                href="#how-it-works"
                className="rounded-xl px-6 py-3 font-semibold border border-gray-300 hover:bg-gray-50 transition"
              >
                نحوهٔ کار
              </a>
            </div>
            <ul className="mt-8 space-y-2 text-gray-700 text-sm">
              <li>• اجرای مستقیم در مرورگر؛ بدون نیاز به نرم‌افزار جانبی</li>
              <li>
                • مناسب برای نوشتار حرفه‌ای، مقالات، ایمیل‌ها و شبکه‌های اجتماعی
              </li>
              <li>• تجربه‌ای روان و سریع در محیط وب</li>
              <li>• سازگار با Google Chrome نسخهٔ 49 به بالا</li>
            </ul>
          </div>

          {/* Visual (left) */}
          <div className="order-1 md:order-2">
            <div className="relative mx-auto max-w-xl">
              <div className="rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden bg-white">
                {/* Browser chrome mock */}
                <div className="h-10 bg-gray-100 flex items-center gap-2 px-4">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                  <div className="ml-auto text-xs text-gray-500">
                    example.com/editor
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="text-sm text-gray-500 mb-2">ویرایشگر متن</div>
                  <div className="relative border rounded-xl p-4 md:p-6 leading-8">
                    <p>
                      امروز <mark className="rounded bg-red-100 px-1">متن</mark>{" "}
                      خود را در وب می‌نویسید و
                      <mark className="rounded bg-yellow-100 px-1">
                        فاصله گذاری
                      </mark>{" "}
                      را فراموش می‌کنید؛ پاکنویس فوراً پیشنهاد اصلاح می‌دهد.
                    </p>
                    <div className="absolute -bottom-3 left-3 bg-white border rounded-full px-3 py-1 text-xs shadow flex items-center gap-2">
                      <span className="i-lucide-wand2" />
                      پیشنهاد: «فاصله‌گذاری» → اعمال
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <span className="i-lucide-spell-check" />
                      پاکنویس فعال است
                    </div>
                    <button className="text-sm text-[color:var(--brand)] hover:underline">
                      نمایش همهٔ پیشنهادها
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg border p-4 text-right w-56">
                <div className="text-xs text-gray-500">پیشرفت متن</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-semibold">خوانایی</span>
                  <span className="text-sm text-green-600 font-semibold">
                    +18%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded mt-2 overflow-hidden">
                  <div
                    className="h-full bg-[color:var(--brand)]"
                    style={{ width: "72%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 text-right">
            <h2 className="text-3xl font-bold">چرا پاکنویس در وب؟</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              هنگام نوشتن در فرم‌ها، ایمیل‌ها و اسناد آنلاین، پاکنویس به‌صورت
              بلادرنگ خطاها را شناسایی و اصلاح می‌کند تا روی ایده‌های خلاقانه
              تمرکز کنید، نه روی جزئیات خسته‌کنندهٔ تایپ.
            </p>
            <ul className="mt-6 space-y-3 text-gray-700">
              <li>🔹 تشخیص خودکار غلط‌های رایج فارسی و پیشنهاد جایگزین</li>
              <li>🔹 تطابق با استانداردهای نگارش فارسی و نشانه‌گذاری</li>
              <li>
                🔹 کار در جیمیل، گوگل‌شیت، شبکه‌های اجتماعی و اغلب ابزارهای وب
              </li>
              <li>🔹 تجربهٔ سریع و روان؛ سبک و کم‌مصرف</li>
            </ul>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-6">
              <div className="text-sm text-gray-500 mb-3">نمونهٔ پیشنهادها</div>
              <div className="space-y-4">
                {[
                  {
                    bad: "فاصله گذاری",
                    good: "فاصله‌گذاری",
                    type: "فاصله‌گذاری",
                  },
                  { bad: "ميكنم", good: "می‌کنم", type: "املایی" },
                  {
                    bad: "نشانه گذاری",
                    good: "نشانه‌گذاری",
                    type: "نشانه‌گذاری",
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border rounded-xl p-3"
                  >
                    <div className="text-sm">
                      <div className="text-gray-500">پیشنهاد ({s.type})</div>
                      <div className="font-semibold">
                        «{s.bad}» ← «
                        <span className="text-[color:var(--brand)]">
                          {s.good}
                        </span>
                        »
                      </div>
                    </div>
                    <button className="text-sm font-semibold text-[color:var(--brand)] hover:underline">
                      اعمال
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 text-right">
            <h2 className="text-3xl font-bold">چطور کار می‌کند؟</h2>
            <ol className="mt-6 space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-6 w-6 rounded-full bg-[color:var(--brand)] text-white flex items-center justify-center text-sm">
                  1
                </span>
                <div>
                  <div className="font-semibold">افزودن به Chrome</div>
                  <div className="text-gray-600">
                    از فروشگاه کروم افزونه را نصب کنید و آیکون پاکنویس را در
                    نوار ابزار ببینید.
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-6 w-6 rounded-full bg-[color:var(--brand)] text-white flex items-center justify-center text-sm">
                  2
                </span>
                <div>
                  <div className="font-semibold">فعال‌سازی در صفحهٔ وب</div>
                  <div className="text-gray-600">
                    روی هر فیلد نوشتاری بروید؛ پاکنویس به‌صورت خودکار فعال و
                    پیشنهادها را نشان می‌دهد.
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-6 w-6 rounded-full bg-[color:var(--brand)] text-white flex items-center justify-center text-sm">
                  3
                </span>
                <div>
                  <div className="font-semibold">اعمال با یک کلیک</div>
                  <div className="text-gray-600">
                    پیشنهادها را بررسی و با یک کلیک اعمال کنید؛ متن شما بی‌نقص
                    می‌شود.
                  </div>
                </div>
              </li>
            </ol>
            <div className="mt-8 flex gap-3 justify-end">
              <a
                href="#"
                className="px-6 py-3 rounded-xl text-white bg-[color:var(--brand)] hover:brightness-110 font-semibold"
              >
                نصب سریع
              </a>
              <a
                href="#faq"
                className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 font-semibold"
              >
                سؤالات متداول
              </a>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="w-full max-w-md bg-gray-50 rounded-2xl shadow-inner border p-6">
              <div className="text-sm text-gray-500 mb-3">سازگاری</div>
              <ul className="space-y-2 text-gray-700">
                <li>• Chrome 49 به بالا</li>
                <li>
                  • پشتیبانی از محیط‌های نوشتاری محبوب (Gmail, Google
                  Docs/Sheets, Twitter/X, LinkedIn و…)
                </li>
                <li>• نیازمند اتصال اینترنت برای پیشنهادهای هوشمند</li>
              </ul>
              <div className="mt-6 text-sm text-gray-500">حریم خصوصی</div>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                متن شما فقط برای تحلیل زبانی ارسال می‌شود؛ دادهٔ حساس ذخیره
                نمی‌گردد. می‌توانید دامنه‌های خاص را در تنظیمات افزونه مستثنی
                کنید.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-right">سؤالات متداول</h2>
          <div className="mt-8 divide-y">
            {[
              {
                q: "آیا برای کار کردن افزونه همیشه اینترنت لازم است؟",
                a: "برای پیشنهادهای هوشمند بله؛ اما برخی اصلاحات پایه‌ای می‌تواند به‌صورت محلی انجام شود (بسته به تنظیمات نسخه).",
              },
              {
                q: "آیا در تمام وب‌سایت‌ها کار می‌کند؟",
                a: "در اغلب محیط‌های نوشتاری وب فعال است. در صورت نیاز می‌توانید دامنه‌هایی را در تنظیمات افزونه غیرفعال کنید.",
              },
              {
                q: "آیا اطلاعات من ذخیره می‌شود؟",
                a: "خیر؛ متن فقط برای پردازش زبانی ارسال و نگهداری دائمی نمی‌شود. برای متون حساس می‌توانید حالت «لوکال/خصوصی» را فعال کنید.",
              },
            ].map((item, i) => (
              <details key={i} className="group py-4">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-semibold text-right">{item.q}</span>
                  <span className="transition group-open:rotate-180">▾</span>
                </summary>
                <p className="mt-2 text-gray-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[color:var(--brand)] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center md:text-right">
          <h2 className="text-4xl font-extrabold">
            ویرایش فارسی در وب، همین حالا
          </h2>
          <p className="mt-4 text-blue-100 text-lg leading-relaxed">
            پاکنویس به شما کمک می‌کند تا متون خود را دقیق و سریع ویرایش کنید؛
            اشتباهات نگارشی و املایی را اصلاح و انرژی بیشتری برای ایده‌های
            خلاقانه داشته باشید.
          </p>
          <div className="mt-10 flex gap-4 justify-center md:justify-end">
            <a
              href="#"
              className="rounded-xl px-8 py-3 bg-white text-[color:var(--brand)] font-semibold hover:bg-blue-50"
            >
              افزودن به Chrome
            </a>
            <a
              href="#how-it-works"
              className="rounded-xl px-8 py-3 border border-white/40 font-semibold hover:bg-white/10"
            >
              نحوهٔ کار
            </a>
          </div>
        </div>
        
      </section>
      
    </div>
  );
}
