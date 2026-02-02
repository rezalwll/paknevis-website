import Image from "next/image";
import Hero from "../../../components/Hero";

export default function ChromeExtensionDownloadPage() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-white text-gray-800 [--brand:#0ea5e9]"
    >

      <section
        dir="rtl"
        className="
        bg-[color:var(--pn-bg)]
        text-[color:var(--pn-text)]
        
      "
      >
        <div className="mx-auto max-w-5xl lg:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:gap-20 md:grid-cols-2">
            {/* متن – راست */}
            <div className="text-right space-y-5 md:space-y-6">

              <h1
                className="
                text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem]
                font-extrabold leading-snug md:leading-tight
              "
              >
                پاک‌نویس برای اندروید؛{" "}
                <span className="block mt-1">
                  تایپ فارسیِ تمیز، بی‌دردسر
                </span>
              </h1>

              <p
                className="
                text-sm sm:text-base lg:text-lg
                leading-relaxed text-[color:var(--pn-muted)]
                max-w-xl
                text-justify
              "
              >
                کیبورد اندروید پاک‌نویس با اصلاح املایی، نگارشی و نشانه‌گذاری در لحظه، متن‌های شما را در همهٔ اپ‌ها تمیز و حرفه‌ای می‌کند
              </p>

              <div className="mt-6 flex flex-wrap justify-start gap-3">
                <a
                  href="/downloads/word"
                  className=""
                >
                  <Image
                    src="/images/bazar.png"
                    alt="پاک‌نویس"
                    width={200}
                    height={200}
                    className="mt-1  shrink-0"
                  />               </a>

                <a
                  href="/downloads/chrome"
                  className=""
                >
                  <Image
                    src="/images/myket.png"
                    alt="پاک‌نویس"
                    width={207}
                    height={200}
                    className="  shrink-0"
                  />
                </a>
              </div>
            </div>

            {/* تصویر – چپ */}
            <div className="order-first md:order-none ">
              <div
                className="
                relative mx-auto
                w-full 
                
              "
              >
                <Image
                  src="/images/sds.jpg"
                  alt=""
                  fill
                  priority
                  sizes=""
                  className="object-contain scale-[2] pointer-events-none pr-20 pb-16"
                />
                <div className="relative overflow-hidden scale-80 flex items-center justify-center py-10">
                <Image
                  src="/images/iphone.png"
                  alt=""
                  fill
                  priority
                  sizes=""
                  className="object-contain pointer-events-none absolute"
                />
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`w-[60%] h-auto rounded-xl mx-auto  z-10 scale-90 pr-5`}
                  >
                    <source src="/images/android.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-[color:var(--pn-p6)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center ">
          <div className=" order-2 text-right">
            <h2 className="text-3xl font-bold">چرا پاکنویس در وب؟</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              هنگام نوشتن در فرم‌ها، ایمیل‌ها و اسناد آنلاین، پاکنویس به‌صورت
              بلادرنگ خطاها را شناسایی و اصلاح می‌کند تا روی ایده‌های خلاقانه
              تمرکز کنید، نه روی جزئیات خسته‌کنندهٔ تایپ.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-2 text-gray-700">
                <Image
                  src="/mainlogo.png"
                  alt="پاک‌نویس"
                  width={20}
                  height={20}
                  className="mt-0.5 h-5 w-5 shrink-0"
                />
                <span>تشخیص خودکار غلط‌های رایج فارسی و پیشنهاد جایگزین</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <Image
                  src="/mainlogo.png"
                  alt="پاک‌نویس"
                  width={20}
                  height={20}
                  className="mt-0.5 h-5 w-5 shrink-0"
                />
                <span>تطابق با استانداردهای نگارش فارسی و نشانه‌گذاری</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <Image
                  src="/mainlogo.png"
                  alt="پاک‌نویس"
                  width={20}
                  height={20}
                  className="mt-0.5 h-5 w-5 shrink-0"
                />
                <span>کار در جیمیل، گوگل‌شیت، شبکه‌های اجتماعی و اغلب ابزارهای وب</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <Image
                  src="/mainlogo.png"
                  alt="پاک‌نویس"
                  width={20}
                  height={20}
                  className="mt-0.5 h-5 w-5 shrink-0"
                />
                <span>تجربهٔ سریع و روان؛ سبک و کم‌مصرف</span>
              </li>
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-md sm:max-w-lg lg
          :max-w-xl rounded-3xl">
            <div className="relative overflow-hidden ">
              <img
                src="/images/Online editor.png"
                alt="پشتیبانی از نسخه‌های مختلف Word"
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-right">
            <h2 className="text-3xl font-bold">راهنمای نصب و فعال‌سازی</h2>
            <ol className="mt-6 space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-6 w-6 rounded-full bg-[color:var(--color-primary-500)] text-white flex items-center justify-center text-sm">
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
                <span className="mt-1 h-6 w-6 rounded-full bg-[color:var(--color-primary-500)] text-white flex items-center justify-center text-sm">
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
                <span className="mt-1 h-6 w-6 rounded-full bg-[color:var(--color-primary-500)] text-white flex items-center justify-center text-sm">
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

          </div>
          <div className="relative mx-auto w-full max-w-md sm:max-w-lg lg
          :max-w-xl rounded-3xl">
            <div className="relative overflow-hidden ">
              <img
                src="/images/Online editor.png"
                alt="پشتیبانی از نسخه‌های مختلف Word"
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>



      {/* Final CTA */}



      <section
        dir="rtl"
        className="
    mt-16 md:mt-20
    px-4 pb-16 md:pb-24
    bg-[color:var(--pn-bg)]
  "
      >
        <div className="mx-auto max-w-4xl md:max-w-5xl lg:max-w-6xl 2xl:max-w-7xl">
          <div
            className="
        relative
        overflow-hidden
        rounded-[22px]
        border border-[color:var(--pn-border)]
        px-6 py-9
        sm:px-8 sm:py-10
        lg:px-14 lg:py-12
        text-center
        shadow-sm
        transition-[transform,box-shadow,border-color] duration-200 ease-out
        hover:border-[color:var(--pn-accent-2)]
      "
          >
            {/* Chrome watermark (خیلی محو) */}
            <div
              aria-hidden="true"
              className="
          pointer-events-none
          absolute -top-10 -left-10
          h-44 w-44 sm:h-52 sm:w-52
          opacity-[0.20]
          blur-[0.2px]
        "
            >
              <div className="relative h-full w-full">
                <Image
                  src="/images/google-chrome.png"
                  alt=""
                  fill
                  sizes="220px"
                  className="object-contain"
                />
              </div>
            </div>
            <div
              aria-hidden="true"
              className="
          pointer-events-none
          absolute -bottom-10 -right-10
          h-44 w-44 sm:h-52 sm:w-52
          opacity-[0.20]
          blur-[0.2px]
        "
            >
              <div className="relative h-full w-full">
                <Image
                  src="/images/Firefox_logo.png"
                  alt=""
                  fill
                  sizes="220px"
                  className="object-contain"
                />
              </div>
            </div>
            <div
              aria-hidden="true"
              className="
          pointer-events-none
          absolute -bottom-10 -left-10
          h-44 w-44 sm:h-52 sm:w-52
          opacity-[0.20]
          blur-[0.2px]
        "
            >
              <div className="relative h-full w-full">
                <Image
                  src="/images/Edge_logo.png"
                  alt=""
                  fill
                  sizes="220px"
                  className="object-contain"
                />
              </div>
            </div>

            <h3
              className="
          text-xl sm:text-2xl md:text-[1.7rem] lg:text-[2.1rem]
          font-black
          text-[color:var(--pn-text)]
        "
            >
              ویرایش فارسی در وب، همین حالا
            </h3>

            <p
              className="
          mx-auto mt-3
          max-w-2xl md:max-w-3xl lg:max-w-4xl
          text-sm sm:text-base lg:text-[1.05rem]
          leading-8
          text-[color:var(--pn-muted)]
        "
            >
              پاکنویس به شما کمک می‌کند تا متون خود را دقیق و سریع ویرایش کنید؛
              اشتباهات نگارشی و املایی را اصلاح و انرژی بیشتری برای ایده‌های خلاقانه
              داشته باشید.
            </p>

            <div className="mt-7 lg:mt-8 flex justify-center">
              <a
                href="/downloads/word"
                className="
            pn-btn pn-btn-primary
            text-sm sm:text-base lg:text-[1.05rem]
            px-8 lg:px-10 lg:h-12
            inline-flex items-center gap-2 flex-row-reverse
          "
              >

                <span>افزودن به Chrome</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
