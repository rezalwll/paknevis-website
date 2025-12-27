"use client";

import React, { FC, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export type HeroButton = {
  text: string;
  href: string;
  variant?: "primary" | "secondary" | string;
  className?: string;
};

export interface HeroProps {
  title: React.ReactNode;
  description?: string;
  imageSrc?: string;
  useVideo?: boolean;
  showCards?: boolean;
  videoSrc?: string;
  videoClassName?: string;
  videoType?: string;
  imageAlt?: string;
  buttons?: HeroButton[];
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  buttonsContainerClassName?: string;
  buttonClassName?: string;
}

const Hero: FC<HeroProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  videoSrc,
  videoClassName = "",
  videoType = "video/mp4",
  useVideo = false,
  showCards = false,
  buttons = [],
  className = "",
  imageClassName = "",
  contentClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  buttonsContainerClassName = "",
  buttonClassName = "",
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!useVideo || !videoSrc) return;

    const v = videoRef.current;
    if (!v) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const onEnded = () => {
      timeoutId = setTimeout(() => {
        v.currentTime = 0;
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => { });
      }, 10_000);
    };

    v.addEventListener("ended", onEnded);

    return () => {
      v.removeEventListener("ended", onEnded);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [useVideo, videoSrc]);

  const renderButton = (btn: HeroButton, idx: number) => {
    const base =
      btn.variant === "secondary"
        ? "bg-[color:var(--pn-surface)] text-[color:var(--pn-text)] hover:bg-[color:var(--pn-surface-2)] border border-[color:var(--pn-border)]"
        : "bg-[color:var(--pn-cta-bg)] text-[color:var(--pn-cta-text)] hover:bg-[color:var(--pn-cta-hover)]";

    return (
      <Link
        key={idx}
        href={btn.href}
        className={`inline-block rounded-xl px-6 py-3 transition shadow-sm
          text-sm md:text-base lg:text-[1.05rem] xl:text-[1.1rem] 2xl:text-[1.15rem]
          ${base} ${buttonClassName} ${btn.className ?? ""}`}
      >
        {btn.text}
      </Link>
    );
  };

  const features = [
    { imageSrc: "/images/word-icon.png", title: "دانلود افزونهٔ  وُرد", href: "/download/word", color: "bg-[color:var(--pn-surface)]" },
    { imageSrc: "/images/online editor.png", title: "ویرایشگر برخط (آنلاین)", href: "/download/editor", color: "bg-[color:var(--pn-surface-2)]" },
    { imageSrc: "/images/chrome_icon.png", title: "دانلود افزونهٔ  مرورگر", href: "/download/chrome", color: "bg-[color:var(--pn-surface)]" },
    { imageSrc: "/images/android-icons.png", title: "دانلود کیبورد اندروید", href: "/download/keyboard", color: "bg-[color:var(--pn-surface-2)]" },
  ];

  return (
    <section
      dir="rtl"
      className={`
        relative w-full ltr overflow-hidden
        bg-[color:var(--pn-bg)] text-[color:var(--pn-text)]
        text-[15px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]
        ${className}
      `}
    >
      {/* فقط یک هایلایت خیلی ملایم (پس‌زمینه همچنان سفید) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden

      />

      <div
        className="
          relative mx-auto h-full w-full
          max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-[1400px]
          text-right flex flex-col md:flex-row items-center justify-between
          gap-10 lg:gap-14 2xl:gap-20
          px-4 sm:px-6 lg:px-8
          py-8 lg:py-14
        "
      >
        {/* متن */}
        <div
          className={`
            flex flex-col justify-center items-center md:items-start
            space-y-6
            px-2 md:px-0 md:pr-8 lg:pr-10
            w-full md:w-[52%] lg:w-1/2
            ${contentClassName}
          `}
        >
          <h1
            className={`
              text-2xl md:text-3xl lg:text-4xl xl:text-[2.9rem] 2xl:text-[2.5rem]
              font-bold leading-snug
              text-[color:var(--pn-text)]
              ${titleClassName}
            `}
          >
            {title}
          </h1>

          {description && (
            <p
              className={`
                text-base md:text-lg lg:text-xl xl:text-[1.25rem] 2xl:text-[1.2rem]
                max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
                text-justify text-[color:var(--pn-muted)]
                ${descriptionClassName}
              `}
            >
              {description}
            </p>
          )}

          {buttons.length > 0 && (
            <div
              className={`
                flex flex-wrap justify-center md:justify-start gap-4 mt-2
                ${buttonsContainerClassName}
              `}
            >
              {buttons.map(renderButton)}
            </div>
          )}

          {showCards && (
            <div
              className="
                mt-4 grid grid-cols-2 gap-3 w-full
                max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
              "
            >
              {features.map((f, i) => (
                <Link
                  key={i}
                  href={f.href}
                  className={`
                    ${f.color}
                    h-12 lg:h-14
                    cursor-pointer rounded-xl px-3 py-2
                    flex items-center justify-between
                    border border-[color:var(--pn-border)]
                    shadow-sm transition duration-200
                    hover:border-[color:var(--pn-accent-2)]
                    w-full max-w-[250px] md:max-w-[270px] xl:max-w-[300px]
                  `}
                >
                  <div className="flex-shrink-0 ml-4 flex items-center justify-center">
                    <Image
                      src={f.imageSrc}
                      alt={f.title}
                      width={45}
                      height={45}
                      className="object-contain"
                    />
                  </div>
                  <p
                    className="
                      flex-1
                      text-xs sm:text-sm md:text-[0.95rem]
                      lg:text-[1rem] xl:text-[1.05rem] 2xl:text-[1.1rem]
                      font-medium text-[color:var(--pn-text)] text-right
                    "
                  >
                    {f.title}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* تصویر/ویدیو */}
        <div
          className={`
            w-full md:w-[48%] lg:w-1/2
            max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-[680px]
            mx-auto max-md:mt-20
            ${imageClassName}
          `}
        >
          <div className=" p-2">
            {useVideo && videoSrc ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={`w-full h-auto rounded-xl ${videoClassName}`}
              >
                <source src={videoSrc} type={videoType} />
              </video>
            ) : (
              imageSrc && (
                <Image
                  src={imageSrc}
                  alt={imageAlt ?? title}
                  width={600}
                  height={600}
                  priority
                  className="w-full h-auto object-contain rounded-xl"
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
