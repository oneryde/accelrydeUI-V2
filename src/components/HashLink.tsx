"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type HashLinkProps = {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: () => void;
};

/**
 * Same-page hash links with Next.js <Link> often do not scroll to the target.
 * When already on "/", we scroll manually and sync the URL without a full reload.
 */
export default function HashLink({ href, className, style, children, onClick }: HashLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.();
    const hashIdx = href.indexOf("#");
    if (hashIdx === -1) return;
    const id = href.slice(hashIdx + 1);
    if (!id || pathname !== "/") return;
    e.preventDefault();
    router.replace(href, { scroll: false });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  return (
    <Link href={href} className={className} style={style} onClick={handleClick} scroll={false}>
      {children}
    </Link>
  );
}
