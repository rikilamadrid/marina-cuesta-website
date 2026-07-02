import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import type { SiteSettings } from "@/types/sanity";

// Static brand copy — these figures are a fixed statement about Marina's
// career, not content she edits per-project, so they live here (the prototype
// treats them the same way) rather than as Site Settings fields.
const STATS = [
  { n: "20+", l: "Years" },
  { n: "50+", l: "Awards" },
  { n: "3", l: "Markets · US · Hispanic · EU" },
  { n: "Cannes", l: "See It Be It · 2016" },
] as const;

// "Marina Cuesta" → ["Marina", "Cuesta"]. First name roman, last italic garnet
// (matches the typographic monument in the prototype). Falls back gracefully
// for single-word names.
function splitName(name: string): [string, string | null] {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return [name, null];
  const last = parts.pop() as string;
  return [parts.join(" "), last];
}

export default function Hero({ settings }: { settings: SiteSettings }) {
  const { name, jobTitle, shortBio, headshot } = settings;
  const [first, last] = splitName(name);

  // One-photo rule: alt text derives from name + job title, no separate field.
  const alt = `${name}, ${jobTitle}`;

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center py-[80px] pt-[140px]"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 min-[981px]:px-7">
        <div className="mb-[34px] flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-garnet before:inline-block before:h-px before:w-[26px] before:bg-garnet before:content-['']">
          Executive Creative Director · Directora Creativa
        </div>

        <div className="grid items-center gap-[26px] max-[860px]:grid-cols-1 min-[861px]:grid-cols-[minmax(0,1fr)_clamp(232px,25vw,320px)] min-[861px]:gap-[60px]">
          <div className="min-w-0 max-[860px]:order-2">
            <h1 className="font-display text-[clamp(3.2rem,10vw,9rem)] font-normal leading-[0.86] tracking-[-0.02em] [font-optical-sizing:auto]">
              <span className="block">{first}</span>
              {last && <span className="block italic text-garnet">{last}</span>}
            </h1>

            {shortBio && (
              <p className="mt-[42px] max-w-[620px] text-[clamp(1.05rem,2.4vw,1.45rem)] font-light leading-[1.4] text-ink">
                {shortBio}
              </p>
            )}

            <div className="mt-[54px] flex flex-wrap items-baseline gap-x-10 gap-y-7">
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
            </div>
          </div>

          <figure className="relative m-0 aspect-[4/5] w-full max-w-[320px] justify-self-end overflow-hidden rounded-[3px] bg-[linear-gradient(150deg,var(--color-blush),#d9bdb5)] shadow-[var(--shadow)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[3px] after:border after:border-ink/10 after:content-[''] max-[860px]:order-1 max-[860px]:max-w-[172px] max-[860px]:justify-self-start">
            {headshot?.asset ? (
              <Image
                src={urlFor(headshot).width(640).height(800).fit("crop").url()}
                alt={alt}
                fill
                sizes="(max-width: 860px) 172px, 320px"
                className="object-cover [filter:grayscale(0.12)_contrast(1.02)]"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-[22px] text-center text-garnet-deep">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.5"
                  className="mb-3 h-[38px] w-[38px] stroke-garnet-deep"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <p className="text-[11px] font-semibold uppercase leading-[1.6] tracking-[0.14em]">
                  Marina&apos;s
                  <br />
                  headshot
                </p>
              </div>
            )}
          </figure>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 text-[10px] uppercase tracking-[0.3em] text-ink-2 after:h-[46px] after:w-px after:bg-line after:content-['']">
        Selected Work
      </div>
    </section>
  );
}
