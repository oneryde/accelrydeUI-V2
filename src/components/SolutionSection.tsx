"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GroupOverviewScreen, MapScreen, ChatScreen } from "./AppScreens";

/** Percent positions over `/riders/product-pass.png` (portrait): bikes L→R, one marker per bike. */
const PRODUCT_PASS_RIDERS: { x: string; y: string; label: string; delay: string }[] = [
  { x: "12%", y: "71%", label: "Rider 1", delay: "0s" },
  { x: "25%", y: "69%", label: "Rider 2", delay: "0.15s" },
  { x: "38%", y: "71%", label: "Rider 3", delay: "0.3s" },
  { x: "50%", y: "71%", label: "Rider 4", delay: "0.45s" },
  { x: "62%", y: "71%", label: "Rider 5", delay: "0.6s" },
  { x: "74%", y: "71%", label: "Rider 6", delay: "0.75s" },
  { x: "87%", y: "71%", label: "Rider 7", delay: "0.9s" },
];

export default function SolutionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="product" className="relative py-24 md:py-32 overflow-hidden scroll-mt-24">
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#FF4F00]/4 rounded-full blur-[200px] -translate-y-1/2 pointer-events-none" />

      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section label */}
        <span
          className={`text-xs font-semibold uppercase tracking-[0.3em] text-[#FF4F00] block mb-4 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          The Product
        </span>
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05] mb-6 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="text-metallic">See everyone.</span>{" "}
          <span className="text-gradient-orange">Lose no one.</span>
        </h2>
        <p
          className={`text-[#A1A1AA] text-lg max-w-none mb-16 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          Live tracking, instant regrouping, and built-in chat. Everything
          your riding group actually needs, in one place.
        </p>

        {/* Split: ~45% photo / ~55% phones (reference ratio), not 50/50 */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[minmax(0,9fr)_minmax(0,11fr)] lg:gap-x-10 xl:gap-x-12 lg:gap-y-0">
          {/* Left: cinematic image with tracking dots overlay */}
          <div
            className={`relative mx-auto w-full max-w-[520px] aspect-[3/4] min-h-[min(88vw,520px)] rounded-2xl overflow-hidden transition-all duration-700 delay-200 sm:max-w-none lg:mx-0 lg:min-h-0 lg:max-w-none ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <Image
              src="/riders/product-pass.png"
              alt="Seven adventure motorcycles lined up on a high-altitude pass overlooking a green valley"
              fill
              className="object-cover object-center cinematic-img"
              sizes="(max-width: 1024px) 100vw, 42vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/40 to-transparent z-[1]" />
            <div className="absolute inset-0 grain-overlay z-[1] opacity-60" />

            {/* One marker per motorcycle — left to right */}
            <div className="absolute inset-0 pointer-events-none z-[2]">
              {PRODUCT_PASS_RIDERS.map((dot) => (
                <div
                  key={dot.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
                  style={{ left: dot.x, top: dot.y }}
                >
                  <span className="order-2 px-1.5 py-0.5 rounded-md bg-black/55 backdrop-blur-sm text-[8px] sm:text-[9px] font-medium text-white/95 tabular-nums tracking-tight border border-white/10">
                    {dot.label}
                  </span>
                  <span
                    className="order-1 block size-2 rounded-full bg-[#FF4F00] ring-2 ring-black/40 shadow-[0_0_12px_rgba(255,79,0,0.45)]"
                    style={{ animation: `float-dot 5s ease-in-out infinite`, animationDelay: dot.delay }}
                  />
                </div>
              ))}

              <svg className="absolute inset-0 w-full h-full" aria-hidden style={{ opacity: 0.12 }}>
                {PRODUCT_PASS_RIDERS.slice(0, -1).map((dot, i) => {
                  const next = PRODUCT_PASS_RIDERS[i + 1];
                  return (
                    <line
                      key={`line-${i}`}
                      x1={dot.x}
                      y1={dot.y}
                      x2={next.x}
                      y2={next.y}
                      stroke="#FF4F00"
                      strokeWidth="1"
                      strokeDasharray="3 4"
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Right: three phones — width-based so they never overflow the grid column */}
          <div
            className={`relative flex w-full min-w-0 flex-col justify-center overflow-hidden transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
          >
            <div className="flex items-end justify-center gap-[3%] py-4 w-full min-w-0">
              {/* Main phone (Map) — tallest, ~32% of container width */}
              <div className="relative z-30 w-[60%] sm:w-[34%] lg:w-[32%] aspect-[9/19] rounded-[1.5rem] border-2 border-[#1C1C1E] bg-[#0A0A0A] shadow-[0_0_60px_rgba(255,79,0,0.10)] sm:rounded-[1.75rem]">
                <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                  <div className="absolute top-0 left-1/2 z-20 h-3.5 w-14 -translate-x-1/2 rounded-b-lg bg-[#0A0A0A] sm:h-4 sm:w-16" />
                  <div className="absolute inset-0 overflow-hidden pt-3.5 sm:pt-4">
                    <MapScreen />
                  </div>
                  <div className="absolute bottom-1 left-1/2 z-20 h-0.5 w-12 -translate-x-1/2 rounded-full bg-[#333]" />
                </div>
              </div>

              {/* Secondary phone (Chat) — ~92% height of main */}
              <div className="relative z-20 hidden sm:block w-[31%] lg:w-[29%] aspect-[9/19] self-end mb-0 rounded-[1.5rem] border-2 border-[#1C1C1E] bg-[#0A0A0A] shadow-[0_0_50px_rgba(255,79,0,0.08)] sm:rounded-[1.75rem]">
                <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                  <div className="absolute top-0 left-1/2 z-20 h-3.5 w-14 -translate-x-1/2 rounded-b-lg bg-[#0A0A0A] sm:h-4 sm:w-16" />
                  <div className="absolute inset-0 overflow-hidden pt-3.5 sm:pt-4">
                    <ChatScreen />
                  </div>
                  <div className="absolute bottom-1 left-1/2 z-20 h-0.5 w-11 -translate-x-1/2 rounded-full bg-[#333]" />
                </div>
              </div>

              {/* Third phone (Group Overview) — ~85% height of main */}
              <div className="relative z-10 hidden md:block w-[28%] lg:w-[27%] aspect-[9/19] self-end mb-0 rounded-[1.5rem] border-2 border-[#1C1C1E] bg-[#0A0A0A] shadow-[0_0_40px_rgba(255,79,0,0.06)] sm:rounded-[1.75rem]">
                <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                  <div className="absolute top-0 left-1/2 z-20 h-3.5 w-12 -translate-x-1/2 rounded-b-lg bg-[#0A0A0A] sm:w-14" />
                  <div className="absolute inset-0 overflow-hidden pt-3.5 sm:pt-4">
                    <GroupOverviewScreen />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
