"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Recognition", href: "/#recognition" },
  { label: "Press", href: "/#press" },
  { label: "Contact", href: "/#contact" },
];

const NAV_HEIGHT = 70;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  // True when the nav sits over a dark (oxblood) section — Manifesto / Contact,
  // tagged with `data-nav-dark`. Over dark, the nav stays transparent and its
  // links invert to bone; over paper it shows the backdrop with ink links.
  const [onDark, setOnDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  const closeMenu = (returnFocus = false) => {
    setMenuOpen(false);
    if (returnFocus) burgerRef.current?.focus();
  };

  // Mobile menu keyboard behavior: Escape closes and returns focus to the
  // burger; opening moves focus to the first link so keyboard users land inside.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu(true);
    };
    document.addEventListener("keydown", onKeyDown);
    mobileNavRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      const probe = window.scrollY + NAV_HEIGHT;
      let dark = false;
      document.querySelectorAll<HTMLElement>("[data-nav-dark]").forEach((el) => {
        const top = el.offsetTop;
        if (probe >= top && probe <= top + el.offsetHeight) dark = true;
      });
      setOnDark(dark);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Backdrop only over light sections; over dark stay transparent so bone reads.
  const showBackdrop = scrolled && !onDark;

  return (
    <header
      data-on-dark={onDark || undefined}
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-end gap-8 border-b transition-[background,padding,border-color,color] duration-[400ms] ease-[var(--ease)] ${
        showBackdrop
          ? "border-line bg-paper/85 px-[34px] py-[14px] backdrop-blur-md"
          : "border-transparent px-[34px] py-[22px]"
      } ${onDark ? "text-bone" : "text-ink"}`}
    >
      {/* Desktop links */}
      <nav
        aria-label="Primary"
        className="hidden items-center gap-7 min-[681px]:flex"
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="relative py-1 text-[12.5px] font-medium tracking-[0.04em] text-current transition-colors duration-[250ms] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-garnet after:transition-[width] after:duration-300 after:ease-[var(--ease)] hover:text-garnet hover:after:w-full"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <StudioButton onDark={onDark} />

      {/* Burger (mobile only) */}
      <button
        ref={burgerRef}
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        onClick={() => setMenuOpen((v) => !v)}
        className="flex flex-col gap-[5px] p-1.5 text-current min-[681px]:hidden"
      >
        <span
          className={`block h-px w-6 bg-current transition-transform duration-300 ${
            menuOpen ? "translate-y-[6px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-px w-6 bg-current transition-opacity duration-300 ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-px w-6 bg-current transition-transform duration-300 ${
            menuOpen ? "-translate-y-[6px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* Mobile menu panel — always its own paper card, so ink links regardless
          of what section sits behind the nav. */}
      {menuOpen && (
        <nav
          ref={mobileNavRef}
          id="mobile-nav"
          aria-label="Mobile"
          // Close when keyboard focus leaves the menu (disclosure pattern) —
          // tabbing past the last link dismisses it without trapping focus.
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) closeMenu();
          }}
          className="absolute right-[18px] top-full flex flex-col gap-4 rounded-xl border border-line bg-paper px-[22px] py-[18px] text-ink shadow-[0_20px_40px_-20px_rgba(61,13,23,0.4)] min-[681px]:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => closeMenu()}
              className="text-[13px] font-medium tracking-[0.04em] text-ink transition-colors duration-[250ms] hover:text-garnet"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function StudioButton({ onDark }: { onDark: boolean }) {
  return (
    <Link
      href="/studio"
      prefetch={false}
      className={`inline-flex items-center gap-[7px] rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-current transition-all duration-[250ms] ease-[var(--ease)] hover:border-garnet hover:bg-garnet hover:text-bone ${
        onDark ? "border-bone/40" : "border-ink"
      }`}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
      Studio
    </Link>
  );
}
