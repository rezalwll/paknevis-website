import Hero from "../components/Hero";
import ClientsMarquee from "../components/ClientsMarquee";
import HeroSticky from "../components/HeroSticky";
import StatsSection from "../components/StatsSection";


export default function HomePage() {
  return (
    <>
      <section className="mt-15">
        <Hero
          title="دستیار هوشمند نگارش فارسی"
          description="پاک‌نویس ویرایشگری هوشمند برای نوشته‌های فارسی شما است و به شما کمک می‌کند متن‌های خود را خطایابی و استانداردسازی کنید. همچنین پاک‌نویس در چهار نسخهٔ ویرایشگر برخط، افزونهٔ کروم، افزونهٔ ورد و کیبورد اندروید در دسترس است."
          useVideo={true}
          showCards={true}
          videoSrc="/images/video 1_3.mp4"
          className="min-h-screen pt-5" imageSrc={""}        />
      </section>
      <section className="text-center">
        <h2 className="text-xl font-bold mb-12 text-gray-600 max-md:mt-30">
          مورد اطمینان شرکت‌های معتبر و کاربران در سراسر کشور
        </h2>
        <ClientsMarquee />
      </section>
      <section>
        <HeroSticky />
      </section>
      <section className="mt-50">
        <header className="text-center max-md:pb-30">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            <span className="text-gray-600">
              آمار استفاده از پاک‌نویس
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            مروری سریع بر عملکرد و رشد
          </p>
        </header>
        <StatsSection />
      </section>
      
    </>
  );
}
