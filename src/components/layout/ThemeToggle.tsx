"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const THEME_EVENT = "themechange";

// The current theme lives on <html data-theme> (set pre-paint by the inline
// script in layout.tsx). We read it as an external store rather than syncing it
// into effect+state — that keeps SSR/first paint consistent and avoids the
// extra render `react-hooks/set-state-in-effect` warns about.
function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

function getSnapshot(): Theme {
  return (
    (document.documentElement.getAttribute("data-theme") as Theme | null) ??
    "light"
  );
}

// No theme on the server — render the neutral label so SSR and the first client
// render match; useSyncExternalStore swaps in the real value after hydration.
function getServerSnapshot(): Theme | null {
  return null;
}

/**
 * Editorial theme toggle — a "contrast" glyph (half-filled circle), not a
 * generic sun/moon in a rounded box. Uses `text-current` so it inverts with the
 * nav over dark sections.
 */
export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode / storage disabled — the toggle still works for the session.
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  const label =
    theme === null
      ? "Toggle theme"
      : theme === "dark"
        ? "Switch to light mode"
        : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex cursor-pointer items-center justify-center p-1.5 text-current transition-colors duration-[250ms] hover:text-garnet"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="transition-transform duration-[400ms] ease-[var(--ease)]"
        style={{ transform: theme === "dark" ? "rotate(180deg)" : undefined }}
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        {/* Left half filled — the "contrast" mark. */}
        <path d="M12 3a9 9 0 000 18z" fill="currentColor" />
      </svg>
    </button>
  );
}
