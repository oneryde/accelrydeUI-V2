"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * After client navigation to "/" with a hash (e.g. from /privacy), scroll to the target id.
 */
export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    const id = window.location.hash.slice(1);
    if (!id) return;

    const run = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(run);
    });

    const t = window.setTimeout(run, 100);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
