import Image from "next/image";

const items = [
  {
    title: "فارسی را درست بنویس",
    body: "پاک‌نویس ویرایشگری هوشمند برای نوشته‌های فارسی شما است. با نصب افزونهٔ وُرد پاک‌نویس می‌توانید متن‌های خود را استانداردسازی کنید و اشتباهات املایی آن را اصلاح کنید. پاک‌نویس به شما کمک می‌کند که اصول درست‌نویسی را رعایت کنید و در نتیجه هم متن زیباتر و خواناتری بنویسید و هم سهمی در پاسداشت زبان فارسی داشته باشید.",
  },
  {
    title: "ویرایش سریع و دقیق",
    body: "با پیوستن به جمع بیش از ۹۰ هزار نفری کاربران پاک‌نویس، متن‌های خود را در کمترین زمان ویرایش کنید و مطمئن باشید که هیچ خطایی از قلم نیفتاده است. قابلیت‌هایی مثل اصلاح انواع خطاهای املایی و نگارشی، استانداردسازی نویسه‌ها، اصلاح نشانه‌گذاری و انواع غلط‌‌های فاصله‌‌گذاری، تبدیل ارقام انگلیسی و عربی به فارسی، اصلاح یک‌بارهٔ خطا در کل سند و ... را با نصب پاک‌نویس تجربه کنید.",
  },
  {
    title: "به‌روز، مثل پاک‌نویس",
    body: "پاک‌نویس روی جدیدترین نسخه‌های ورد (۲۰۱۰ تا ۲۰۲۱) نصب می‌شود. واژه‌نامهٔ پاک‌نویس روزبه‌روز غنی‌تر می‌شود و از واژه‌های جدید پشتیبانی می‌کند. الگوریتم‌های خطایابی پاک‌نویس هم مرتباً بهبود پیدا می‌کنند تا سرعت و دقت بهتری را در ویرایش تجربه کنید. در ضمن، هر جا هم با مشکلی مواجه شدید روی پشتیبانی برخط پاک‌نویس حساب کنید.",
  },
];

type HeroItem = {
  title: string;
  body: string;
};

type HeroStickyProps = {
  imageSrc: string;
  imageAlt?: string;
  items: HeroItem[];
};

export default function HeroSticky({}: HeroStickyProps) {
  return (
    <section dir="rtl" className="relative my-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="order-1 md:order-1">
            {items.map((it, idx) => (
              <div
                key={idx}
                className="py-12 md:min-h-screen flex items-center"
              >
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                    {it.title}
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600">
                    {it.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-2 md:order-2">
            <div className="flex items-center justify-center md:sticky md:top-0 md:min-h-screen">
              <video
                autoPlay
                loop
                muted
                className="w-full h-auto rounded-lg"
              >
                <source
                  src="https://static-web.grammarly.com/1e6ajr2k4140/4JFqSLq1U3f6TTcWXvrw4y/1b5800ee28a52f7dd60fa52b306850a3/071824_Section_4_Animation_2x.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
