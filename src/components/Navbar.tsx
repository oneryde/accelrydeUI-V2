"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import HashLink from "./HashLink";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0A0A]/80 backdrop-blur-2xl border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.svg"
            alt="AccelRyde"
            width={28}
            height={28}
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-base font-semibold tracking-tight text-white">
            AccelRyde
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <HashLink href="/#product" className="text-sm text-[#A1A1AA] hover:text-white transition-colors duration-300">
            Product
          </HashLink>
          <HashLink href="/#story" className="text-sm text-[#A1A1AA] hover:text-white transition-colors duration-300">
            Story
          </HashLink>
          <HashLink href="/#waitlist" className="text-sm text-[#A1A1AA] hover:text-white transition-colors duration-300">
            Beta
          </HashLink>
          <Link href="/privacy" className="text-sm text-[#A1A1AA] hover:text-white transition-colors duration-300">
            Privacy
          </Link>
          <a
            href="https://qafuavp1bg.zite.so"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold px-5 py-2 rounded-xl text-white transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,79,0,0.3)]"
            style={{ background: "linear-gradient(135deg, #FF4F00, #FF7F2A)" }}
          >
            Join our founding team
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#A1A1AA] hover:text-white"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l10 10M6 16L16 6" />
            ) : (
              <path d="M4 6h14M4 11h14M4 16h14" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-2xl border-b border-white/[0.04] px-6 pb-6 space-y-3">
          {[
            { href: "/#product", label: "Product" },
            { href: "/#story", label: "Story" },
            { href: "/#waitlist", label: "Beta" },
            { href: "/privacy", label: "Privacy" },
          ].map((link) =>
            link.href.startsWith("/#") ? (
              <HashLink
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-[#A1A1AA] hover:text-white transition-colors py-2"
              >
                {link.label}
              </HashLink>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-[#A1A1AA] hover:text-white transition-colors py-2"
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href="https://qafuavp1bg.zite.so"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-semibold px-6 py-2.5 rounded-xl text-white"
            style={{ background: "linear-gradient(135deg, #FF4F00, #FF7F2A)" }}
          >
            Join our founding team
          </a>
        </div>
      )}
    </nav>
  );
}
