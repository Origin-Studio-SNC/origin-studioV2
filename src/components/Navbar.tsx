"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#about", label: "À propos" },
  { href: "#contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
] as const;

function subscribeHash(fn: () => void) {
  window.addEventListener("hashchange", fn);
  window.addEventListener("popstate", fn);
  return () => {
    window.removeEventListener("hashchange", fn);
    window.removeEventListener("popstate", fn);
  };
}

function getHashSnapshot() {
  return window.location.hash;
}

function getServerHashSnapshot() {
  return "";
}

function useHashFragment() {
  return useSyncExternalStore(
    subscribeHash,
    getHashSnapshot,
    getServerHashSnapshot,
  );
}

function navLinkIsActive(href: string, pathname: string, hash: string) {
  if (href.startsWith("#")) {
    if (pathname !== "/") return false;
    return hash === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

const Navbar = () => {
  const pathname = usePathname();
  const hash = useHashFragment();
  const scrolled = useScrolled();

  return (
    <header
      className={cn(
        "fixed top-0 z-50 h-20 w-full border-b transition-[border-color,background-color] duration-300",
        scrolled
          ? "border-border bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-foreground"
        >
          <Image src="/img/logo_origin_full.svg" alt="Origin Studio" width={120} height={120} />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, label }) => (
            <a
              key={`${href}-${label}`}
              className={cn(
                "link-nav",
                navLinkIsActive(href, pathname, hash) && "link-nav-active",
              )}
              href={href}
            >
              <span className="text-[11px] font-semibold uppercase tracking-widest">
                {label}
              </span>
            </a>
          ))}
        </div>

        <Button
          asChild
          size="sm"
          className="rounded-full px-6 text-[11px] font-semibold uppercase tracking-widest"
        >
          <Link href="/contact">Démarrer un projet</Link>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
