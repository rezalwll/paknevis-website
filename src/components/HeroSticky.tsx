import { heroStickyItems } from "@/content/hero-sticky";
import type { HeroStickyItem } from "@/types/content";

type HeroStickyProps = { items?: HeroStickyItem[] };

export default function HeroSticky({ items: propsItems }: HeroStickyProps = {}) {
  const displayItems = propsItems ?? heroStickyItems;

  return (
    <section
      dir="rtl"
      className="
        relative bg-[color:var(--pn-bg)]
        text-[15px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]
      "
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl md:max-w-5xl lg:max-w-6xl 2xl:max-w-7xl ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 ">
          <div className="order-1">
            {displayItems.map((it, idx) => (
              <div key={idx} className="md:min-h-[95vh] flex items-center">
                <div className="space-y-4 lg:space-y-6">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[36px] font-bold text-[color:var(--pn-text)] leading-snug md:leading-tight">
                    {it.title}
                  </h2>
                  <p className="text-justify text-base sm:text-lg md:text-[1.05rem] lg:text-xl xl:text-[1.15rem] 2xl:text-[1.2rem] text-[color:var(--pn-muted)] leading-relaxed md:leading-8">
                    {it.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-2">
            <div className="flex items-center justify-center md:sticky md:top-0 md:min-h-screen">
              <div className="p-2">
                <video autoPlay loop muted className="w-full h-auto max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl rounded-xl">
                  <source
                    src="https://static-web.grammarly.com/1e6ajr2k4140/4JFqSLq1U3f6TTcWXvrw4y/1b5800ee28a52f7dd60fa52b306850a3/071824_Section_4_Animation_2x.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
