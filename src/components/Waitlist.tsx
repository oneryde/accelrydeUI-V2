"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement)?.value;
    if (honeypot) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
          details?: string;
        };
        const msg = [data.error, data.details].filter(Boolean).join("\n\n");
        throw new Error(msg || "Something went wrong.");
      }
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="waitlist" ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden scroll-mt-24">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(255,79,0,0.08) 0%, transparent 70%)" }} />

      <div
        className={`relative z-10 w-full px-6 sm:px-8 lg:px-12 xl:px-16 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FF4F00]">
          Early Access
        </span>
        <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] text-metallic">
          Ride with us from day one
        </h2>
        <p className="mt-4 text-[#A1A1AA] text-lg max-w-none">
          Early riders don&apos;t just test features, they shape what we build next.
          Your feedback goes straight into our sprint.
        </p>

        {status === "success" ? (
          <div className="mt-10 p-8 rounded-2xl border border-[#FF4F00]/20 bg-[#FF4F00]/5 backdrop-blur-sm" style={{ animation: "success-scale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}>
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-[#FF4F00]/15 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#FF4F00]">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="30"
                    style={{ animation: "draw-check 0.6s 0.3s ease forwards", strokeDashoffset: 30 }}
                  />
                </svg>
              </div>
            </div>
            <p className="text-white font-semibold text-lg">You&apos;re in. Welcome aboard.</p>
            <p className="text-[#A1A1AA] text-sm mt-2">
              We&apos;ll ping you the moment the beta opens. Until then, keep riding.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                  className="w-full px-5 py-4 rounded-2xl bg-[#141414] border border-white/[0.06] text-white placeholder-[#52525B] focus:outline-none focus:border-[#FF4F00]/50 focus:shadow-[0_0_20px_rgba(255,79,0,0.1)] transition-all duration-300 text-sm"
                />
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true" />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-shimmer px-7 py-4 rounded-2xl text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,79,0,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
                style={{ background: "linear-gradient(135deg, #FF4F00, #FF7F2A)" }}
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Joining...
                  </span>
                ) : (
                  "Get early access"
                )}
              </button>
            </div>

            {status === "error" && errorMsg && (
              <p className="mt-3 text-sm text-red-400">{errorMsg}</p>
            )}

            <p className="mt-4 text-xs text-[#52525B]">
              Zero spam. Just a heads-up when the beta drops.{" "}
              <a href="/privacy" className="underline hover:text-[#A1A1AA] transition-colors">Privacy Policy</a>.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
