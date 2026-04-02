"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * - If the URL has a hash, scroll to that element (for in-page nav links).
 * - If no hash, always start at the top (prevents browser scroll restoration
 *   from landing mid-page on refresh).
 */
export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    const id = window.location.hash.slice(1);

    if (!id) {
      // Force scroll to top on load / refresh when there's no hash
      window.scrollTo(0, 0);
      return;
    }

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
