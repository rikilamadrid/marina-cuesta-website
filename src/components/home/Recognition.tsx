import { Fragment } from "react";

import Reveal from "@/components/ui/Reveal";

// Fixed brand facts — recognition and the agencies/clients roster are Marina's
// track record, not editable CMS content (same precedent as the Hero stat row
// and Manifesto credo). Kept static per feature 16 spec.
const STATS = [
  { n: "50+", l: "International advertising awards" },
  { n: "2016", l: "Cannes Lions See It Be It" },
  { n: "Jury", l: "International festival juries" },
  { n: "Mentor", l: "Speaker & coach for women in creative" },
] as const;

// Two groups (agencies, then clients) rendered as one wordmark line, joined by
// "·" within a group and "—" between the groups (mirrors the prototype marquee).
const AGENCIES = [
  "TBWA",
  "CHINA",
  "Dieste",
  "The Marketing Arm",
  "Creyentes / We Believers",
] as const;

const CLIENTS = [
  "Apple",
  "McDonald's",
  "GOYA Foods",
  "Chevrolet",
  "FritoLay",
  "KFC",
  "Schweppes",
  "Dunkin'",
  "P&G",
  "Gillette",
  "Lululemon",
  "Levi's",
  "Sony",
  "Inter Miami CF",
] as const;

function Sep({ children }: { children: string }) {
  return <span className="text-ink-2">{children}</span>;
}

// Interleave names with "·" separators; caller supplies the group.
function roster(names: readonly string[]) {
  return names.map((name, i) => (
    <Fragment key={name}>
      {i > 0 && <Sep> · </Sep>}
      {name}
    </Fragment>
  ));
}

export default function Recognition() {
  return (
    <section id="recognition" className="py-[110px] max-[720px]:py-20">
      {/* Shared .wrap + 72px spine-gutter left-inset (see FeaturedWork, Manifesto). */}
      <Reveal className="mx-auto w-full max-w-[1240px] px-5 min-[981px]:pl-[72px] min-[981px]:pr-7">
        <div className="mb-12">
          <h2 className="font-display text-[clamp(2rem,5vw,3.4rem)] font-normal leading-none tracking-[-0.015em]">
            <span className="mr-1.5 align-super font-body text-[0.5em] font-semibold tracking-normal text-garnet">
              03
            </span>
            Recognition
          </h2>
        </div>

        <div className="mb-16 grid gap-6 max-[720px]:grid-cols-2 min-[721px]:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="border-t-2 border-garnet pt-[18px]">
              <div className="font-display text-[clamp(2rem,4vw,3rem)] leading-none">
                {s.n}
              </div>
              <div className="mt-2 text-xs leading-[1.4] text-ink-2">{s.l}</div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="mb-4 text-[11px] font-normal uppercase tracking-[0.2em] text-ink-2">
            Agencies &amp; Clients
          </h3>
          <p className="font-display text-[clamp(1.1rem,2.4vw,1.7rem)] font-normal leading-[1.7] text-ink">
            {roster(AGENCIES)}
            <Sep> — </Sep>
            {roster(CLIENTS)}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
