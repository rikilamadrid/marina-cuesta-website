"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// A template (unlike a layout) re-mounts on every navigation, so this gives a
// soft cross-page fade between home and /work/[slug], /about, /press, etc.
// Nav / Spine / Footer live in layout.tsx (outside this), so chrome stays put
// while only the page body fades. prefers-reduced-motion → no animation.
export default function SiteTemplate({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
