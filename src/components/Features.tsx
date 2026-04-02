"use client";

import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import {
  GroupOverviewScreen,
  MembersScreen,
  RidesScreen,
  MapScreen,
  ChatScreen,
  DiscoverGroupsScreen,
  RideDetailsScreen,
} from "./AppScreens";

/* ------------------------------------------------------------------ */
/*  Auto-sliding phone carousel                                       */
/* ------------------------------------------------------------------ */

function PhoneCarousel({
  screens,
  labels,
  accent,
  interval = 4000,
}: {
  screens: ReactNode[];
  labels: string[];
  accent: string;
  interval?: number;
}) {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  const startTimer = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setActive((prev) => (prev + 1) % screens.length);
    }, interval);
  }, [screens.length, interval]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timer.current);
  }, [startTimer]);

  function goTo(idx: number) {
    setActive(idx);
    startTimer();
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Phone frame */}
      <div
        className="relative mx-auto w-full max-w-[280px] aspect-[9/19] rounded-[2rem] border-2 border-[#1C1C1E] bg-[#0E0E10] overflow-hidden"
        style={{
          boxShadow: `0 0 80px ${accent}10, 0 8px 32px rgba(0,0,0,0.4)`,
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#09090B] rounded-b-xl z-20" />

        {/* Screens with crossfade */}
        {screens.map((screen, idx) => (
          <div
            key={idx}
            className="absolute inset-0 pt-5 transition-opacity duration-500"
            style={{ opacity: idx === active ? 1 : 0, pointerEvents: idx === active ? "auto" : "none" }}
          >
            {screen}
          </div>
        ))}

        {/* Home indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#3f3f46] rounded-full z-20" />
      </div>

      {/* Dot indicators + labels */}
      <div className="flex items-center gap-3">
        {labels.map((label, idx) => (
          <button
            key={label}
            onClick={() => goTo(idx)}
            className="flex items-center gap-1.5 group"
            aria-label={`Show ${label}`}
          >
            <span
              className="block w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: idx === active ? accent : "#3f3f46",
                transform: idx === active ? "scale(1.2)" : "scale(1)",
              }}
            />
            <span
              className="text-[10px] font-medium transition-colors duration-300 hidden sm:inline"
              style={{ color: idx === active ? "#FAFAFA" : "#52525B" }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Static phone frame (single screen)                                */
/* ------------------------------------------------------------------ */

function PhoneFrame({ screen, accent }: { screen: ReactNode; accent: string }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[280px] aspect-[9/19] rounded-[2rem] border-2 border-[#1C1C1E] bg-[#0E0E10] overflow-hidden"
      style={{
        boxShadow: `0 0 80px ${accent}10, 0 8px 32px rgba(0,0,0,0.4)`,
      }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#09090B] rounded-b-xl z-20" />
      <div className="absolute inset-0 pt-5 overflow-hidden">{screen}</div>
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#3f3f46] rounded-full z-20" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature data                                                      */
/* ------------------------------------------------------------------ */

interface Feature {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  type: "carousel" | "static";
  // carousel
  screens?: ReactNode[];
  labels?: string[];
  // static
  screen?: ReactNode;
}

const features: Feature[] = [
  {
    number: "01",
    title: "Ride together, stay together",
    subtitle: "Group coordination",
    description:
      "Create a group, drop a pin, and everyone locks in. Live location sharing, ETA countdowns, and regrouping alerts. No more \"where are you?\" texts flying across three apps.",
    accent: "#FF6600",
    type: "carousel",
    screens: [<GroupOverviewScreen key="overview" />, <MembersScreen key="members" />, <RidesScreen key="rides" />, <MapScreen key="map" />],
    labels: ["Overview", "Members", "Rides", "Map"],
  },
  {
    number: "02",
    title: "One route, zero wrong turns",
    subtitle: "Smart routing",
    description:
      "Plan rides with fuel stops, scenic detours, and chai breaks baked in. Share the route once and everyone follows the same path. No screenshots, no voice notes explaining turns.",
    accent: "#3B82F6",
    type: "static",
    screen: <MapScreen />,
  },
  {
    number: "03",
    title: "Find your kind of riders",
    subtitle: "Community & discovery",
    description:
      "Discover local riding groups, join weekend crews, or build your own squad from scratch. Match by route, riding style, or schedule, not just proximity.",
    accent: "#FF6600",
    type: "static",
    screen: <DiscoverGroupsScreen />,
  },
  {
    number: "04",
    title: "Chat that rides with you",
    subtitle: "Group messaging",
    description:
      "Group chat that lives inside your ride, not buried in WhatsApp. Share photos, drop pins, send voice notes. Every conversation stays tied to the ride it belongs to.",
    accent: "#3B82F6",
    type: "static",
    screen: <ChatScreen />,
  },
  {
    number: "05",
    title: "One app. The whole ride.",
    subtitle: "Everything unified",
    description:
      "WhatsApp for chat, Maps for routes, spreadsheets for plans. Sound familiar? AccelRyde replaces all of it. Plus, your complete ride history lives here, so every mile counts.",
    accent: "#FF6600",
    type: "static",
    screen: <RideDetailsScreen />,
  },
];

/* ------------------------------------------------------------------ */
/*  Feature card with scroll reveal                                    */
/* ------------------------------------------------------------------ */

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="grid md:grid-cols-2 gap-12 md:gap-20 items-center py-20 md:py-32"
    >
      {/* Number + content */}
      <div className={`space-y-6 ${isEven ? "" : "md:order-2"} transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="flex items-center gap-4">
          <span
            className="text-7xl md:text-8xl font-black tracking-tighter leading-none transition-all duration-1000"
            style={{
              color: feature.accent,
              opacity: visible ? 0.15 : 0,
              animation: visible ? "count-glow 4s ease-in-out infinite" : "none",
              transform: visible ? "scale(1)" : "scale(0.8)",
            }}
          >
            {feature.number}
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#52525B]">
            {feature.subtitle}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] text-metallic leading-tight">
          {feature.title}
        </h2>
        <p className="text-base sm:text-lg text-[#71717A] leading-relaxed max-w-none">
          {feature.description}
        </p>
      </div>

      {/* Phone: carousel or static */}
      <div
        className={`${isEven ? "" : "md:order-1"} transition-all duration-700 delay-200 ${
          visible
            ? "opacity-100 translate-y-0"
            : `opacity-0 ${isEven ? "translate-x-12" : "-translate-x-12"}`
        }`}
      >
        {feature.type === "carousel" && feature.screens && feature.labels ? (
          <PhoneCarousel
            screens={feature.screens}
            labels={feature.labels}
            accent={feature.accent}
          />
        ) : (
          <PhoneFrame screen={feature.screen} accent={feature.accent} />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Features section                                                   */
/* ------------------------------------------------------------------ */

export default function Features() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

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
    <section id="features" className="relative scroll-mt-24">
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 pt-20">
        <div ref={headerRef} className="text-center mb-8">
          <span className={`text-xs font-semibold uppercase tracking-[0.3em] text-[#FF4F00] transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Deep Dive
          </span>
          <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] text-metallic transition-all duration-700 delay-100 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Everything riders need. Nothing they don&apos;t.
          </h2>
          <p className={`mt-4 text-[#71717A] text-lg max-w-none transition-all duration-700 delay-200 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Five features that replace the five apps you&apos;re juggling today.
          </p>
        </div>

        <div className="divide-y divide-white/[0.04]">
          {features.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
