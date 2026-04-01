"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HashLink from "./HashLink";
import StoreBadges from "./StoreBadges";

export default function CinematicHero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setLoaded(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] max-h-[1100px] overflow-hidden">
      {/* Background image with slow zoom */}
      <div
        className="absolute inset-0"
        style={{
          animation: loaded ? "hero-zoom 20s ease-out forwards" : "none",
        }}
      >
        <Image
          src="/riders/hero.png"
          alt="AccelRyde riders on a mountain road"
          fill
          priority
          className="object-cover cinematic-img"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F0F08]/70 via-[#0A0A0A]/50 to-[#0A0A0A] z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/40 z-[1]" />

      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay z-[2]" />

      {/* Floating tracking dots (simulating rider tracking) */}
      <div className="absolute inset-0 z-[3] pointer-events-none" aria-hidden="true">
        {[
          { x: "25%", y: "35%", delay: "0s" },
          { x: "55%", y: "42%", delay: "1.5s" },
          { x: "70%", y: "38%", delay: "0.8s" },
          { x: "40%", y: "50%", delay: "2.2s" },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute"
            style={{ left: dot.x, top: dot.y, animationDelay: dot.delay }}
          >
            <div
              className="w-2 h-2 rounded-full bg-[#FF4F00]"
              style={{ animation: "float-dot 6s ease-in-out infinite", animationDelay: dot.delay }}
            />
            <div
              className="absolute inset-0 w-2 h-2 rounded-full bg-[#FF4F00]/30"
              style={{ animation: "neon-pulse 3s ease-in-out infinite", animationDelay: dot.delay, transform: "scale(2.5)" }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-6">
        <div className="max-w-7xl mx-auto w-full">
          {/* Pill */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <span className="w-2 h-2 rounded-full bg-[#FF4F00] animate-pulse" />
            <span className="text-xs font-medium text-[#C8C8C8] tracking-widest uppercase">
              Beta launching soon
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.03em] leading-[0.9] mb-6 transition-all duration-700 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-metallic">One place for</span>
            <br />
            <span className="text-gradient-orange">the ride</span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-base sm:text-lg md:text-xl text-[#A1A1AA] max-w-xl leading-relaxed mb-8 transition-all duration-700 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            AccelRyde brings your group, your routes, and your favorite spots into
            one app — so you spend less time coordinating and more time riding.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row items-start gap-4 mb-10 transition-all duration-700 delay-400 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <HashLink
              href="/#product"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,79,0,0.3)]"
              style={{ background: "linear-gradient(135deg, #FF4F00, #FF7F2A)" }}
            >
              <span className="relative z-10">Explore the product</span>
              <svg className="relative z-10 w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF7F2A] to-[#FF4F00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </HashLink>
            <a
              href="https://qafuavp1bg.zite.so"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-[#C8C8C8] border border-white/10 hover:border-[#FF4F00]/40 hover:text-white transition-all duration-300 backdrop-blur-sm"
            >
              Join our founding team
              <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>

          {/* Store badges */}
          <div
            className={`transition-all duration-700 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <StoreBadges />
          </div>
        </div>
      </div>

      {/* Bottom gradient bleed */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent z-[4] pointer-events-none" />
    </section>
  );
}
