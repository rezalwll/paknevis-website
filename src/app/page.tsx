import Hero from "../components/Hero";
import ClientsMarquee from "../components/ClientsMarquee";
import HeroSticky from "../components/HeroSticky";
import StatsSection from "../components/StatsSection";

export default function HomePage() {
  return (
    <>
      {/* HERO اصلی */}
      <section className="-mt-10">
        <Hero
          title="دستیار هوشمند نگارش فارسی"
          description="پاک‌نویس ویرایشگری هوشمند برای نوشته‌های فارسی شما است و به شما کمک می‌کند متن‌های خود را خطایابی و استانداردسازی کنید. همچنین پاک‌نویس در چهار نسخهٔ ویرایشگر برخط، افزونهٔ کروم، افزونهٔ ورد و کیبورد اندروید در دسترس است."
          useVideo={true}
          showCards={true}
          videoSrc="/images/video 1_3.mp4"
          imageClassName="pt-10"
          className="
            min-h-[70vh]
            md:min-h-[75vh]
            lg:min-h-[60vh]
            pt-6 md:pt-8 lg:pt-10
          "
        />
      </section>

      {/* لوگو / مارکی مشتری‌ها */}
      <section className=" text-center px-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8 md:mb-10 text-gray-600">
          مورد اطمینان شرکت‌های معتبر و کاربران در سراسر کشور
        </h2>
        <div className="max-w-7xl mx-auto">
          <ClientsMarquee />
        </div>
      </section>

      {/* سکشن HeroSticky (ویدیو + متن) */}
      <section className="">
        <HeroSticky />
      </section>

      {/* آمار استفاده از پاک‌نویس */}
      <section className="
     mb-16 md:mb-20">
        <header className="text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-700">
            آمار استفاده از پاک‌نویس
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            مروری سریع بر عملکرد و رشد
          </p>
        </header>

        <div className="mt-8">
          <StatsSection />
        </div>
      </section>

      {/* Download banner */}
      <section dir="rtl" className="mt-30 px-4 pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="relative rounded-[18px] bg-[var(--pn-bg)] border border-[var(--pn-border)] p-8 text-center transition-[transform,box-shadow,border-color] duration-200 ease-out hover:border-[var(--pn-accent)]">
            <h3 className="mt-3 text-xl font-black sm:text-2xl">با پاک‌نویس، هر بار بهتر بنویس.</h3>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-8 text-slate-700 sm:text-base">
              افزونه‌ها و ابزارهای پاک‌نویس برای ورد، مرورگر و کیبورد آماده‌اند تا متن‌های شما را سریع‌تر و دقیق‌تر ویرایش کنند. همین حالا نسخه مناسب خودتان را دانلود کنید.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="/downloads/word"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-extrabold text-white shadow-sm transition hover:bg-slate-800"
              >
                دانلود افزونه ورد
              </a>
              <a
                href="/downloads/chrome"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border-2 border-[var(--pn-accent)] bg-[var(--pn-bg)] px-6 text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-[var(--pn-surface)]"
              >
                دانلود افزونه کروم
              </a>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
