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

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <span
          className={`text-xs font-semibold uppercase tracking-[0.3em] text-[#FF4F00] block mb-4 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          The Product
        </span>
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05] mb-6 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="text-metallic">Ride together,</span>{" "}
          <span className="text-gradient-orange">in sync</span>
        </h2>
        <p
          className={`text-[#A1A1AA] text-lg max-w-xl mb-16 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          Real-time tracking, group coordination, and messaging — built for
          riders who refuse to ride scattered.
        </p>

        {/* Split: image + phones */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: cinematic image with tracking dots overlay */}
          <div
            className={`relative w-full max-w-lg mx-auto lg:mx-0 aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <Image
              src="/riders/product-pass.png"
              alt="Seven adventure motorcycles lined up on a high-altitude pass overlooking a green valley"
              fill
              className="object-cover object-center cinematic-img"
              sizes="(max-width: 1024px) 100vw, 50vw"
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

          {/* Right: phone mockups */}
          <div
            className={`relative flex gap-4 justify-center transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
          >
            {/* Main phone */}
            <div className="relative w-[200px] aspect-[9/19] rounded-[1.5rem] border-2 border-[#1C1C1E] bg-[#0A0A0A] overflow-hidden shadow-[0_0_60px_rgba(255,79,0,0.08)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#0A0A0A] rounded-b-lg z-20" />
              <div className="absolute inset-0 pt-4 overflow-hidden">
                <MapScreen />
              </div>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#333] rounded-full z-20" />
            </div>

            {/* Secondary phone (overlapping) */}
            <div className="relative w-[180px] aspect-[9/19] rounded-[1.5rem] border-2 border-[#1C1C1E] bg-[#0A0A0A] overflow-hidden shadow-[0_0_60px_rgba(255,79,0,0.06)] -ml-8 mt-12 hidden sm:block">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#0A0A0A] rounded-b-lg z-20" />
              <div className="absolute inset-0 pt-4 overflow-hidden">
                <ChatScreen />
              </div>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#333] rounded-full z-20" />
            </div>

            {/* Third phone peek */}
            <div className="relative w-[160px] aspect-[9/19] rounded-[1.5rem] border-2 border-[#1C1C1E] bg-[#0A0A0A] overflow-hidden shadow-[0_0_60px_rgba(255,79,0,0.04)] -ml-6 mt-24 hidden md:block opacity-60">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-4 bg-[#0A0A0A] rounded-b-lg z-20" />
              <div className="absolute inset-0 pt-4 overflow-hidden">
                <GroupOverviewScreen />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
