import Reveal from "@/components/ui/Reveal";
import type { SiteSettings } from "@/types/sanity";

type Props = {
  settings: SiteSettings;
};

// Full-bleed oxblood closing field. Email and socials are Sanity-driven
// (Site Settings, one-place rule) — everything else is fixed brand copy.
export default function ContactCTA({ settings }: Props) {
  const { email, socials } = settings;

  return (
    <section
      id="contact"
      data-nav-dark
      className="bg-oxblood py-[130px] text-center text-bone"
    >
      <Reveal className="mx-auto w-full max-w-[1240px] px-5">
        <h2 className="font-display text-[clamp(2.4rem,7vw,5rem)] font-normal leading-[1.02] tracking-[-0.02em]">
          Let&apos;s build something
          <br />
          that <em className="italic text-garnet">matters</em>.
        </h2>

        {email && (
          <a
            href={`mailto:${email}`}
            className="mt-[38px] inline-block border-b border-bone/40 pb-1.5 text-[clamp(1rem,3vw,1.5rem)] transition-colors hover:border-garnet hover:text-garnet"
          >
            {email}
          </a>
        )}

        {socials && socials.length > 0 && (
          <div className="mt-12 flex flex-wrap justify-center gap-[26px]">
            {socials.map((s) => (
              <a
                key={s._key}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.1em] text-bone/70 transition-colors hover:text-bone"
              >
                {s.label}
              </a>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}
