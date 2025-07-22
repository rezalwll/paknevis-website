import Image from "next/image";
import Hero from "../../../components/Hero";

export default function Home() {
  return (
    <main dir="rtl" className="">
      <section className=" bg-[#2c3038] text-center fdsfdsfds py-20 px-6 min-h-screen">
        <h1
          className="text-3xl md:text-4xl font-bold text-white leading-tight"
          dir="rtl"
        >
          پاک‌نویس برای Microsoft Word؛ <br />
          <span className="opacity-85">نوشتاری بی‌نقص، با چند کلیک</span>
        </h1>

        <p
          className="mt-6  text-lg text-gray-600 max-w-xl text-white mx-auto"
          dir="rtl"
        >
          اگر بیشتر وقت خود را صرف نگارش در Word می‌کنید، افزونهٔ پاک‌نویس
          بهترین همراه شماست.
        </p>

        <a
          href="#"
          className="inline-block mt-8 bg-gradient-to-r from-[#66C0FF] to-[#61adc4] bg-[length:200%_100%] bg-right hover:bg-left transition-all duration-500 transition px-6 py-3 rounded-md text-white text-lg"
        >
          دانلود
        </a>
      </section>
      <section className=" px-6 text-center -mt-50">
        <div className=" max-w-6xl mx-auto">
          <img
            src="/images/Word.png"
            alt="paknevis App Screenshot"
            className="rounded-lg shadow-2xl mx-auto"
          />
        </div>
      </section>
      <section>
        <Hero
          title="دستیار هوشمند نگارش فارسی"
          description="پاک‌نویس ویرایشگری هوشمند برای نوشته‌های فارسی شما است و به شما کمک می‌کند متن‌های خود را خطایابی و استانداردسازی کنید. همچنین پاک‌نویس در چهار نسخهٔ ویرایشگر برخط، افزونهٔ کروم، افزونهٔ ورد و کیبورد اندروید در دسترس است."
          useVideo={true}
          videoSrc="https://static-web.grammarly.com/1e6ajr2k4140/23h4g1mYtwNqn6ITO66YPH/4dc21be97a0fb1e517a37d5e7ab2ae8c/writing_expert_first_x2.mp4"
          className="min-h-screen pt-5" imageSrc={""}/>
      </section>
      <section className="py-20 px-8 bg-white">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-8">ویژگی‌های افزونه پاکنویس</h2>
    <div className="grid md:grid-cols-2 gap-8 text-right">
      <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-blue-600 mb-3">دسترسی سریع و آسان</h3>
        <p className="text-gray-600 leading-relaxed">
          پاکنویس مستقیماً از نوار ابزار Word در دسترس است و نیازی به باز کردن پنجره یا نرم‌افزار جداگانه ندارد.
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-blue-600 mb-3">تشخیص هوشمند غلط‌ها</h3>
        <p className="text-gray-600 leading-relaxed">
          خطاهای رایج املایی و نگارشی را شناسایی کرده و بهترین پیشنهاد را برای اصلاح ارائه می‌دهد.
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-blue-600 mb-3">استاندارد نگارش فارسی</h3>
        <p className="text-gray-600 leading-relaxed">
          تمام اصلاحات مطابق با اصول تایپ و نشانه‌گذاری استاندارد زبان فارسی انجام می‌شود.
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-blue-600 mb-3">مناسب برای متون حرفه‌ای</h3>
        <p className="text-gray-600 leading-relaxed">
          از پایان‌نامه‌ها تا نامه‌های رسمی و مقالات علمی — پاکنویس متن شما را کاملاً حرفه‌ای می‌سازد.
        </p>
      </div>
    </div>
  </div>
</section>
<section className="flex flex-col md:flex-row items-center justify-between py-20 px-8 bg-white">
  <div className="md:w-1/2 text-right space-y-5">
    <h2 className="text-3xl font-bold text-gray-800">ویژگی‌های افزونه پاکنویس</h2>
    <ul className="text-gray-700 leading-relaxed space-y-2">
      <li>✅ دسترسی سریع و آسان از نوار ابزار Word</li>
      <li>✅ تشخیص خودکار و پیشنهاد اصلاح غلط‌های رایج فارسی</li>
      <li>✅ پشتیبانی از استانداردهای تایپ و نگارش فارسی</li>
      <li>✅ مناسب برای پایان‌نامه‌ها، مقالات و نامه‌های رسمی</li>
      <li>✅ واژهنامه شخصی با قابلیت دسترسی از دستگاه‌های مختلف</li>
    </ul>
  </div>
  <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
    <img
      src="/images/Word.png"
      alt="نوار ابزار پاکنویس در ورد"
      className="max-w-md w-full rounded-2xl shadow-lg"
    />
  </div>
</section>
<section className="flex flex-col md:flex-row items-center justify-between py-24 px-8 bg-gradient-to-br from-blue-50 to-white">
  <div className="md:w-1/2 text-right space-y-6">
    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-snug">
      پاکنویس برای Microsoft Word
      <span className="block text-blue-600">نوشتاری بی‌نقص، با چند کلیک</span>
    </h1>
    <p className="text-lg text-gray-600 leading-relaxed">
      اگر بیشتر وقت خود را صرف نگارش در Word می‌کنید، افزونه پاکنویس بهترین همراه شماست.
      این افزونه مستقیماً در محیط Word فعال می‌شود و تنها با یک کلیک، متن شما را بررسی کرده
      و خطاهای املایی، نگارشی، فاصله‌گذاری و نشانه‌گذاری را اصلاح می‌کند.
    </p>
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl text-lg font-semibold shadow-md transition">
      دانلود افزونه برای Word
    </button>
  </div>
  <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
    <img
      src="/images/Word.png"
      alt="افزونه پاکنویس در Word"
      className="max-w-md w-full rounded-2xl shadow-lg"
    />
  </div>
</section>
<section className="flex flex-col md:flex-row items-center justify-between py-20 px-8 bg-gray-50">
  <div className="md:w-1/2 text-right space-y-5">
    <h2 className="text-3xl font-bold text-gray-800">واژهنامه شخصی و ابری</h2>
    <p className="text-gray-600 leading-relaxed">
      واژگان تخصصی خود را در واژهنامه شخصی ذخیره کنید و از هر دستگاهی به آن دسترسی داشته باشید.
      پاکنویس همه‌چیز را با حساب کاربری شما همگام‌سازی می‌کند تا همیشه با سبک نگارش خودتان بنویسید.
    </p>
  </div>
  <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
    <img
      src="/images/Word.png"
      alt="واژهنامه شخصی در افزونه پاکنویس"
      className="max-w-md w-full rounded-2xl shadow-lg"
    />
  </div>
</section>
<section className="flex flex-col md:flex-row items-center justify-between py-20 px-8 bg-white">
  <div className="md:w-1/2 text-right space-y-5">
    <h2 className="text-3xl font-bold text-gray-800">پیش‌نیازها و سازگاری</h2>
    <p className="text-gray-600 leading-relaxed">
      برای عملکرد بهینه پاکنویس، مطمئن شوید سیستم شما شرایط زیر را دارد:
    </p>
    <ul className="text-gray-700 space-y-2">
      <li>• سیستم‌عامل: ویندوز ۷ یا بالاتر</li>
      <li>• نرم‌افزار: Microsoft Word 2010 و نسخه‌های جدیدتر (۳۲ و ۶۴ بیت)</li>
      <li>• اتصال اینترنت برای استفاده از قابلیت‌های هوشمند الزامی است</li>
    </ul>
  </div>
  <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
    <img
      src="/images/Word.png"
      alt="پشتیبانی از نسخه‌های مختلف Word"
      className="max-w-md w-full rounded-2xl shadow-lg"
    />
  </div>
</section>
<section className="flex flex-col md:flex-row items-center justify-between py-24 px-8 bg-blue-600 text-white">
  <div className="md:w-1/2 text-right space-y-6">
    <h2 className="text-4xl font-bold leading-snug">
      با افزونه پاکنویس، نوشتن حرفه‌ای را از امروز شروع کنید
    </h2>
    <p className="text-blue-100 text-lg leading-relaxed">
      دیگر نیازی به بازخوانی‌های طولانی و خسته‌کننده نیست.  
      فقط با چند کلیک، متن خود را بی‌نقص و آماده‌ی انتشار کنید.
    </p>
    <button className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-3 rounded-xl text-lg font-semibold transition">
      دانلود افزونه Word
    </button>
  </div>
  <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
    <img
      src="/images/Word.png"
      alt="نصب افزونه پاکنویس"
      className="max-w-md w-full rounded-2xl shadow-lg"
    />
  </div>
</section>
<section className="py-24 bg-blue-600 text-white text-center">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-4xl font-bold mb-6">نوشتن حرفه‌ای را از امروز شروع کنید</h2>
    <p className="text-lg text-blue-100 leading-relaxed mb-10">
      با افزونه پاکنویس برای Word، تنها با چند کلیک متن خود را از اشتباهات نگارشی و املایی پاک کنید.  
      دیگر نیازی به بازخوانی‌های طولانی نیست!
    </p>
    <button className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-3 rounded-xl text-lg font-semibold transition">
      دانلود و نصب افزونه
    </button>
  </div>
</section>
<section className="py-20 px-8 bg-white">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-8">پیش‌نیازها و سازگاری</h2>
    <p className="text-gray-600 mb-8">
      برای استفاده بهینه از افزونه پاکنویس، مطمئن شوید سیستم شما شرایط زیر را دارد:
    </p>
    <ul className="text-right inline-block text-gray-700 space-y-3 leading-relaxed">
      <li>• سیستم‌عامل: ویندوز ۷ به بالا</li>
      <li>• نرم‌افزار: Microsoft Word 2010 و نسخه‌های جدیدتر (۳۲ و ۶۴ بیت)</li>
      <li>• اتصال به اینترنت برای عملکرد کامل افزونه الزامی است</li>
    </ul>
  </div>
</section>
<section className="py-20 px-8 bg-gray-50">
  <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
    <div className="md:w-1/2 text-right">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">واژهنامه شخصی و ابری</h2>
      <p className="text-gray-600 leading-relaxed">
        واژگان تخصصی خود را به واژهنامه شخصی اضافه کنید و از هر دستگاه دیگری به آن دسترسی داشته باشید.  
        پاکنویس همه‌چیز را برای شما همگام‌سازی می‌کند تا همیشه مطابق سبک نوشتاری خودتان بنویسید.
      </p>
    </div>
    <div className="md:w-1/2">
      <img
        src="/images/Word.png"
        alt="واژهنامه شخصی پاکنویس"
        className="rounded-2xl shadow-lg"
      />
    </div>
  </div>
</section>
<section className="bg-gradient-to-br from-blue-50 to-white py-24 px-8 text-center">
  <div className="max-w-4xl mx-auto">
    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
      پاکنویس برای Microsoft Word  
      <span className="block text-blue-600 mt-2">نوشتاری بی‌نقص، با چند کلیک</span>
    </h1>
    <p className="mt-6 text-lg text-gray-600 leading-relaxed">
      اگر بیشتر وقت خود را صرف نگارش در Word می‌کنید، افزونه پاکنویس بهترین همراه شماست.  
      این افزونه به‌صورت مستقیم در محیط Word فعال می‌شود و تنها با یک کلیک، متن شما را بررسی کرده و  
      خطاهای املایی، نگارشی، فاصله‌گذاری و نشانه‌گذاری را اصلاح می‌کند.
    </p>
    <div className="mt-10">
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl text-lg font-semibold shadow-md transition">
        نصب افزونه پاکنویس برای Word
      </button>
    </div>
  </div>
</section>

    </main>
  );
}
