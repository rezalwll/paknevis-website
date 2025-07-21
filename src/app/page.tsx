import Hero from "../components/Hero";
import ClientsMarquee from "../components/ClientsMarquee";
import HeroSticky from "../components/HeroSticky";

export default function HomePage() {
  return (
    <>
      <section>
        <Hero
          title="دستیار هوشمند نگارش فارسی"
          description="پاک‌نویس ویرایشگری هوشمند برای نوشته‌های فارسی شما است. با نصب افزونهٔ وُرد پاک‌نویس می‌توانید متن‌های خود را استانداردسازی کنید و اشتباهات املایی آن را اصلاح کنید. پاک‌نویس به شما کمک می‌کند که اصول درست‌نویسی را رعایت کنید و در نتیجه هم متن زیباتر و خواناتری بنویسید و هم سهمی در پاسداشت زبان فارسی داشته باشید."
          useVideo="true"
          videoSrc="https://static-web.grammarly.com/1e6ajr2k4140/23h4g1mYtwNqn6ITO66YPH/4dc21be97a0fb1e517a37d5e7ab2ae8c/writing_expert_first_x2.mp4"
          buttons={[
            { text: "شروع کنید", href: "/get-started", variant: "primary" },
            { text: "نسخه سازمانی", href: "/about", variant: "secondary" },
          ]}
          className="min-h-screen pt-15"
        />
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
    </>
  );
}
