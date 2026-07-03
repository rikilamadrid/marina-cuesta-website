"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Shared scroll-triggered fade + rise, ported from the prototype `.reveal`
// (opacity 0 / translateY(26px) → settle when it scrolls into view). Wrap the
// inner content of a section in this — never the section itself, so full-bleed
// backgrounds stay put while their content settles. Fires once.
//
// prefers-reduced-motion: renders content in its final state with no transition.
type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger start for sequenced reveals within one view (seconds). */
  delay?: number;
};

export default function Reveal({ children, className, delay = 0 }: Props) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 0.61, 0.36, 1], // --ease
      }}
    >
      {children}
    </motion.div>
  );
}
