"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const stories = [
  {
    image: "/riders/hero.png",
    caption: "We lost each other 5 times on this road.",
    alt: "Group of riders on mountain highway",
  },
  {
    image: "/riders/group-lake.png",
    caption: "No signal. No coordination. Just vibes.",
    alt: "Rider group at a high-altitude lake",
  },
  {
    image: "/riders/solo.png",
    caption: "Someone always rides ahead.",
    alt: "Solo rider against mountain backdrop",
  },
  {
    image: "/riders/summit.png",
    caption: "Someone always gets left behind.",
    alt: "Group celebrating at the highest motorable pass",
  },
];

function StoryCard({
  story,
  index,
}: {
  story: (typeof stories)[0];
  index: number;
}) {
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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Image */}
      <Image
        src={story.image}
        alt={story.alt}
        fill
        className="object-cover cinematic-img transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 35vw"
        loading="lazy"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/20 to-transparent z-[1]" />

      {/* Grain */}
      <div className="absolute inset-0 grain-overlay z-[2] opacity-50" />

      {/* Tracking dots overlay */}
      <div className="absolute inset-0 z-[3] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#FF4F00]"
            style={{
              left: `${25 + i * 25}%`,
              top: `${35 + (i % 2) * 20}%`,
              animation: `float-dot ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-[4]">
        <p className="text-sm sm:text-base font-medium text-white/90 leading-snug italic">
          &ldquo;{story.caption}&rdquo;
        </p>
        <div className="mt-3 h-px w-12 bg-gradient-to-r from-[#FF4F00] to-transparent" />
      </div>
    </div>
  );
}

export default function StorySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#FF4F00]/5 rounded-full blur-[150px] pointer-events-none" />

      <div ref={headerRef} className="max-w-7xl mx-auto px-6 mb-12">
        <span
          className={`text-xs font-semibold uppercase tracking-[0.3em] text-[#FF4F00] block mb-4 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          The Reality
        </span>
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-metallic leading-[1.05] transition-all duration-700 delay-100 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          Built on real rides,
          <br />
          <span className="text-gradient-orange">not assumptions</span>
        </h2>
        <p
          className={`mt-4 text-[#A1A1AA] text-lg max-w-lg transition-all duration-700 delay-200 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          Every feature in AccelRyde was born from moments like these — real
          chaos on real roads.
        </p>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-5 px-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {stories.map((story, i) => (
          <StoryCard key={i} story={story} index={i} />
        ))}
        {/* Spacer */}
        <div className="flex-shrink-0 w-6" />
      </div>
    </section>
  );
}
