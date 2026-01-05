import Hero from "../components/Hero";
import ClientsMarquee from "../components/ClientsMarquee";
import HeroSticky from "../components/HeroSticky";
import StatsSection from "../components/StatsSection";

export default function HomePage() {
  return (
    <main className="bg-[color:var(--pn-bg)] text-[color:var(--pn-text)]">
      {/* HERO اصلی */}
      <section className="bg-[color:var(--pn-bg)]">
        <Hero
          title={
            <>
              <span className="block">پاک‌نویس</span>
              <span className="block">ویرایش هوشمند متن فارسی</span>
              <span className="block">هر جا که می‌نویسید</span>
            </>
          }
          description="پاک‌نویس ویرایشگری هوشمند برای نوشته‌های فارسی شماست. این ابزار به شما کمک می‌کند متن‌های خود را بدون غلط املایی و نگارشی، استاندارد و حرفه‌ای بنویسید. پاک‌نویس در قالب افزونهٔ وُرد، افزونهٔ مرورگر، کیبورد اندروید و نسخهٔ برخط در دسترس است."
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



      {/* سکشن HeroSticky */}
      <section className="bg-[color:var(--pn-bg)]">
        <HeroSticky />
      </section>


      {/* لوگو / مارکی مشتری‌ها */}
      {/* <section className="text-center px-4 bg-[color:var(--pn-bg)] mt-5">
        <h2 className="text-lg sm:text-xl md:text-xl font-bold mb-6 sm:mb-8 md:mb-10 text-[color:var(--pn-muted-title)]">
          مورد اعتماد سازمان‌ها، نویسندگان و کاربران حرفه‌ای در سراسر کشور
        </h2>
        <div className="max-w-7xl mx-auto">
          <ClientsMarquee />
        </div>
      </section> */}


      {/* آمار */}
      <section className="mb-16 md:mb-20 bg-[color:var(--pn-bg)]">
        <header className="text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--pn-text)]">
            پاک‌نویس در یک نگاه آماری
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[color:var(--pn-muted)]">
            مروری سریع بر عملکرد و رشد
          </p>
        </header>

        <div className="mt-8">
          <StatsSection />
        </div>
      </section>

      {/* Download banner */}
      <section dir="rtl" className="mt-30 px-4 pb-16 md:pb-20 bg-[color:var(--pn-bg)]">
        <div className="mx-auto max-w-6xl">
          <div
            className="
              relative rounded-[18px]
              bg-[color:var(--pn-bg)]
              border border-[color:var(--pn-border)]
              p-8 text-center
              transition-[transform,box-shadow,border-color] duration-200 ease-out
              hover:border-[color:var(--pn-accent-2)]
            "
          >
            <h3 className="mt-3 text-xl font-black sm:text-2xl">
              با پاک‌نویس، هر بار بهتر بنویس
            </h3>

            <p className="mx-auto mt-3 max-w-3xl text-sm leading-8 text-[color:var(--pn-muted)] sm:text-base">
              همین حالا نسخهٔ مناسب خودتان را دانلود کنید و تجربهٔ نوشتن را به سطحی بالاتر ببرید.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="/downloads/word"
                className="pn-btn pn-btn-primary"
              >
                دانلود افزونهٔ وُرد
              </a>

              <a
                href="/downloads/chrome"
                className="pn-btn pn-btn-outline"
              >
                دانلود افزونهٔ  مرورگر
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
