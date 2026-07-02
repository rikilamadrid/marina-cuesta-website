// Fixed editorial brand copy — this is Marina's thesis, not CMS content
// (per feature spec, deliberately hardcoded rather than pulled from Sanity).
const CREDO = [
  {
    k: "Ideas first",
    v: "Concept over format, always. The format is just where the idea goes to live.",
  },
  {
    k: "Empathy as strategy",
    v: "Leading across countries and cultures by listening before directing.",
  },
  {
    k: "Culture, not clichés",
    v: "Multicultural work that's true, not translated. Hispanic by depth, not by accent.",
  },
  {
    k: "Women, leading",
    v: "Mentoring, championing and making room for female creatives to run the room.",
  },
] as const;

export default function Manifesto() {
  return (
    <section
      id="pov"
      className="relative overflow-hidden bg-oxblood py-[120px] text-bone"
    >
      {/* JEFA ghost watermark — decorative, sits behind the content. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[10%] -right-[2%] font-display text-[clamp(8rem,26vw,24rem)] italic leading-none text-[rgba(243,236,227,0.045)]"
      >
        JEFA
      </span>

      {/* Same spine-gutter left-inset as the hero (see Hero.tsx). */}
      <div className="relative z-[1] mx-auto w-full max-w-[1240px] px-5 min-[981px]:pl-[72px] min-[981px]:pr-7">
        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-blush before:inline-block before:h-px before:w-[26px] before:bg-blush before:content-['']">
          The Point of View
        </div>

        <blockquote className="mt-9 max-w-[16ch] font-display text-[clamp(1.7rem,4.6vw,3.4rem)] font-normal leading-[1.18] tracking-[-0.01em]">
          I don&apos;t make ads. I build platforms where culture, craft and{" "}
          <em className="italic text-garnet">conviction</em> meet — and where the
          next woman can see herself at the head of the table.
        </blockquote>

        <div className="mt-[60px] grid max-w-[920px] gap-[30px] max-[720px]:grid-cols-2 min-[721px]:grid-cols-4">
          {CREDO.map((item) => (
            <div key={item.k} className="border-t border-bone/20 pt-[18px]">
              <div className="mb-2 font-display text-[1.25rem]">{item.k}</div>
              <div className="text-[13px] leading-[1.5] text-bone/70">
                {item.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
