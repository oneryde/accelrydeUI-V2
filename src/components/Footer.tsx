import Image from "next/image";
import HashLink from "@/components/HashLink";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.04] bg-[#0A0A0A]">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-[#FF4F00]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* About */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.svg" alt="AccelRyde" width={28} height={28} />
              <span className="text-base font-semibold tracking-tight text-white">AccelRyde</span>
            </div>
            <p className="text-sm text-[#71717A] max-w-md leading-relaxed">
              We&apos;re three friends from college who never stopped riding
              together. We live together, roam together, and somewhere along the
              way we realized the tools we were using to coordinate rides were
              broken — scattered across five different apps, half the group
              always lost. So we started building AccelRyde: one place for your
              group, your routes, and the ride itself. We&apos;re not a big
              company with a boardroom roadmap. We&apos;re riders building for
              riders, and we are building to the end — until the product feels
              as effortless as heading out with your crew.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#52525B]">Links</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/#product", label: "Product" },
                { href: "/#waitlist", label: "Join the Beta" },
                { href: "https://qafuavp1bg.zite.so", label: "Join our founding team", external: true },
                { href: "/privacy", label: "Privacy Policy" },
              ].map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#71717A] hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  ) : link.href.startsWith("/#") ? (
                    <HashLink
                      href={link.href}
                      className="text-sm text-[#71717A] hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </HashLink>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-[#71717A] hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#3f3f46]">
            &copy; {currentYear} AccelRyde. All rights reserved.
          </p>
          <a href="mailto:contact@accelryde.com" className="text-xs text-[#3f3f46] hover:text-[#71717A] transition-colors">
            contact@accelryde.com
          </a>
        </div>
      </div>
    </footer>
  );
}
