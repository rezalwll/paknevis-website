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
  title: string;
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
  // ✅ برای سناریو 2: بعد از پایان ویدیو، 10 ثانیه مکث، سپس دوباره پخش
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!useVideo || !videoSrc) return;

    const v = videoRef.current;
    if (!v) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const onEnded = () => {
      timeoutId = setTimeout(() => {
        // از اول و دوباره پلی
        v.currentTime = 0;
        const p = v.play();
        // اگر مرورگر autoplay را بلاک کرد
        if (p && typeof p.catch === "function") p.catch(() => {});
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
        ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
        : "bg-primary-400 text-highlight-800 hover:bg-primary-500";

    return (
      <Link
        key={idx}
        href={btn.href}
        className={`inline-block rounded px-6 py-3 transition text-sm md:text-base lg:text-[1.05rem] ${base} ${buttonClassName} ${
          btn.className ?? ""
        }`}
      >
        {btn.text}
      </Link>
    );
  };

  const features = [
    {
      imageSrc: "/images/word-icon.png",
      title: "دانلود افزونه ورد",
      href: "/download/word",
      color: "bg-primary-200",
    },
    {
      imageSrc: "/images/online editor.png",
      title: "ویرایشگر برخط",
      href: "/download/editor",
      color: "bg-primary-100",
    },
    {
      imageSrc: "/images/chrome_icon.png",
      title: "دانلود افزونه کروم",
      href: "/download/chrome",
      color: "bg-primary-200",
    },
    {
      imageSrc: "/images/android-icons.png",
      title: "دانلود کیبورد اندروید",
      href: "/download/keyboard",
      color: "bg-primary-100",
    },
  ];

  return (
    <section
      dir="rtl"
      className={`
        w-full ltr bg-white text-slate-800
        text-[15px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]
        ${className}
      `}
    >
      <div
        className="
          mx-auto h-full w-full
          max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl
          text-right flex flex-col md:flex-row items-center justify-between
          gap-10 lg:gap-14
          px-4 sm:px-6 lg:px-8
        "
      >
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
              text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-[3.1rem]
              text-gray-800 font-bold leading-snug
              ${titleClassName}
            `}
          >
            {title}
          </h1>

          {description && (
            <p
              className={`
                text-base md:text-lg lg:text-xl xl:text-[1.1rem] 2xl:text-[1.2rem]
                max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
                text-justify text-gray-600
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
                    h-12 cursor-pointer rounded-xl px-2 py-1
                    flex items-center justify-between
                    shadow-md transition duration-300
                    hover:bg-primary-300
                    max-w-[240px]
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
                  <p className="flex-1 text-xs sm:text-sm md:text-[0.95rem] font-medium text-gray-700 text-right">
                    {f.title}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div
          className={`
            w-full md:w-[48%] lg:w-1/2
            max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
            mx-auto max-md:mt-20
            ${imageClassName}
          `}
        >
          {useVideo && videoSrc ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              // ✅ loop حذف شد چون می‌خوایم تأخیر داشته باشیم
              className={`w-full h-auto ${videoClassName}`}
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
                className="w-full h-auto object-contain"
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
