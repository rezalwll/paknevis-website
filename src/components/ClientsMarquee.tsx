"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export type Client = {
  name: string;
  logoSrc: string;
};

const clients: Client[] = [
  { name: "دانشگاه آزاد اسلامی", logoSrc: "/images/azaduni.png" },
  { name: "بانک توسعه صادرات", logoSrc: "/images/banktoseesaderat.png" },
  { name: "سازمان هواپیمایی کشوری", logoSrc: "/images/CAO-IRI-Logo.svg.png" },
  { name: "مجلس شورای اسلامی", logoSrc: "/images/majles.jpg" },
  {
    name: "مرکز پژوهش های مجلس شورای اسلامی",
    logoSrc: "/images/mpajooheshha.jpg",
  },
  { name: "فرماندهی نیروی انتظامی", logoSrc: "/images/NAJA.svg.png" },
  { name: "شرکت ملی صنایع مس ایران", logoSrc: "/images/NCopper.webp" },
  { name: "سازمان بازرسی کل کشور", logoSrc: "/images/sazmanbazresi.png" },
];

export default function ClientsMarquee() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const isPausedRef = useRef(false);

  const speed = 0.5;

  const REPEATS = 6;
  const marqueeClients = Array.from({ length: REPEATS }, () => clients).flat();

  useEffect(() => {
    const step = () => {
      const track = trackRef.current;
      if (track && !isPausedRef.current) {
        positionRef.current -= speed;

        const firstChild = track.firstElementChild as HTMLElement | null;

        if (firstChild) {
          const firstChildWidth = firstChild.offsetWidth;

          if (-positionRef.current >= firstChildWidth) {
            positionRef.current += firstChildWidth;
            track.style.transform = `translateX(${positionRef.current}px)`;

            track.appendChild(firstChild);
          } else {
            track.style.transform = `translateX(${positionRef.current}px)`;
          }
        }
      }

      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden py-10">
      <div
        ref={trackRef}
        className="flex"
        style={{ willChange: "transform" }}
        onMouseEnter={() => {
          isPausedRef.current = true;
        }}
        onMouseLeave={() => {
          isPausedRef.current = false;
        }}
      >
        {marqueeClients.map((client, idx) => (
          <div
            key={`${client.name}-${idx}`}
            className="flex flex-col flex-shrink-0 items-center justify-center px-6 group"
          >
            <Image
              src={client.logoSrc}
              alt={client.name}
              width={128}
              height={128}
              className="
                w-24 h-24 
                object-contain 
                filter grayscale 
                group-hover:grayscale-0 
                transition duration-200
              "
            />
            <span className="mt-2 text-sm text-center whitespace-nowrap">
              {client.name}
            </span>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[color:var(--pn-bg)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[color:var(--pn-bg)] to-transparent" />

    </div>
  );
}
