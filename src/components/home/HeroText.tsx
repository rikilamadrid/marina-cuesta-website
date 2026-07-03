"use client";

import { motion, useReducedMotion } from "framer-motion";

// Static brand copy — these figures are a fixed statement about Marina's
// career, not content she edits per-project, so they live here (the prototype
// treats them the same way) rather than as Site Settings fields.
const STATS = [
  { n: "20+", l: "Years" },
  { n: "50+", l: "Awards" },
  { n: "3", l: "Markets · US · Hispanic · EU" },
  { n: "Cannes", l: "See It Be It · 2016" },
] as const;

const EASE = [0.22, 0.61, 0.36, 1] as const; // --ease

type Props = {
  first: string;
  last: string | null;
  shortBio?: string;
};

// The hero's on-load choreography, ported from the prototype: each name line
// masks up (translateY 105% → 0 behind an overflow-hidden clip), then the
// statement and stat row rise in. prefers-reduced-motion → everything static.
export default function HeroText({ first, last, shortBio }: Props) {
  const reduceMotion = useReducedMotion();

  // Reduced motion: render the final composition with no animation.
  if (reduceMotion) {
    return (
      <HeroBody
        first={first}
        last={last}
        shortBio={shortBio}
        // no motion wrappers
        line={(child) => <span className="block">{child}</span>}
        rise={(child, className) => <div className={className}>{child}</div>}
      />
    );
  }

  return (
    <HeroBody
      first={first}
      last={last}
      shortBio={shortBio}
      line={(child, i) => (
        <span className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.25 + i * 0.15, ease: EASE }}
          >
            {child}
          </motion.span>
        </span>
      )}
      rise={(child, className, delay) => (
        <motion.div
          className={className}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: delay ?? 0.75, ease: EASE }}
        >
          {child}
        </motion.div>
      )}
    />
  );
}

// Shared markup so the reduced-motion and animated paths can't drift apart.
type LineFn = (child: React.ReactNode, i: number) => React.ReactNode;
type RiseFn = (
  child: React.ReactNode,
  className: string,
  delay?: number,
) => React.ReactNode;

function HeroBody({
  first,
  last,
  shortBio,
  line,
  rise,
}: Props & { line: LineFn; rise: RiseFn }) {
  return (
    <div className="min-w-0 max-[860px]:order-2">
      <h1 className="font-display text-[clamp(3.2rem,10vw,9rem)] font-normal leading-[0.86] tracking-[-0.02em] [font-optical-sizing:auto]">
        {line(first, 0)}
        {last && (
          <span className="italic text-garnet">{line(last, 1)}</span>
        )}
      </h1>

      {shortBio &&
        rise(
          shortBio,
          "mt-[42px] max-w-[620px] text-[clamp(1.05rem,2.4vw,1.45rem)] font-light leading-[1.4] text-ink",
          0.75,
        )}

      {rise(
        <div className="flex flex-wrap items-baseline gap-x-10 gap-y-7">
          {STATS.map((stat) => (
            <div key={stat.l}>
              <span className="block font-display text-[1.9rem] leading-none">
                {stat.n}
              </span>
              <span className="mt-1.5 block text-[11px] uppercase tracking-[0.16em] text-ink-2">
                {stat.l}
              </span>
            </div>
          ))}
        </div>,
        "mt-[54px]",
        0.95,
      )}
    </div>
  );
}
