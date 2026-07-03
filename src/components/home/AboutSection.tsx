import Image from "next/image";

import PortableText from "@/components/ui/PortableText";
import Reveal from "@/components/ui/Reveal";
import { optimizedImageUrl } from "@/sanity/lib/image";
import type { CareerStep, SiteSettings } from "@/types/sanity";

type Props = {
  settings: SiteSettings;
  as?: "h1" | "h2";
  priority?: boolean;
};

export default function AboutSection({
  settings,
  as: Heading = "h2",
  priority = false,
}: Props) {
  return (
    <section id="about" className="bg-surface-alt py-[110px] max-[720px]:py-24">
      <Reveal className="mx-auto w-full max-w-[1240px] px-5 min-[981px]:pl-[72px] min-[981px]:pr-7">
        <header className="mb-[78px] max-[720px]:mb-12">
          <Heading className="font-display text-[clamp(2.6rem,7vw,5.2rem)] font-normal leading-none tracking-[-0.015em] text-ink">
            <span className="mr-3 align-super font-body text-[0.45em] font-semibold leading-none text-garnet">
              02
            </span>
            About
          </Heading>
        </header>

        <div className="grid items-start gap-[70px] max-[900px]:grid-cols-1 max-[900px]:gap-10 min-[901px]:grid-cols-[1.1fr_1fr]">
          <AboutPortrait settings={settings} priority={priority} />

          <div>
            <PortableText
              value={settings.longBio}
              className="[&>p:first-child]:mb-7 [&>p:first-child]:font-display [&>p:first-child]:text-[1.4rem] [&>p:first-child]:font-normal [&>p:first-child]:leading-[1.4] [&>p:first-child]:tracking-[-0.005em]"
            />

            <CareerArc steps={settings.careerArc} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function AboutPortrait({
  settings,
  priority,
}: {
  settings: SiteSettings;
  priority: boolean;
}) {
  const { name, jobTitle, headshot } = settings;
  const alt = `${name}, ${jobTitle}`;

  return (
    <figure className="relative m-0 aspect-[4/5] w-full overflow-hidden rounded-[3px] bg-[linear-gradient(150deg,var(--color-blush),#d9bdb5)] shadow-[var(--shadow)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[3px] after:border after:border-ink/10 after:content-[''] max-[900px]:max-w-[560px]">
      {headshot?.asset ? (
        <Image
          src={optimizedImageUrl({
            source: headshot,
            width: 920,
            height: 1150,
          })}
          alt={alt}
          fill
          sizes="(max-width: 900px) calc(100vw - 40px), 52vw"
          className="object-cover [filter:grayscale(0.12)_contrast(1.02)]"
          priority={priority}
          quality={82}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-garnet-deep">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            className="mb-4 h-[46px] w-[46px] stroke-garnet-deep"
            aria-hidden="true"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <p className="text-[12px] font-semibold uppercase leading-[1.6] tracking-[0.14em]">
            Marina&apos;s headshot
            <br />
            goes here
          </p>
        </div>
      )}
    </figure>
  );
}

function CareerArc({ steps }: { steps?: CareerStep[] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <dl className="mt-[34px] border-t border-line">
      {steps.map((step) => (
        <div
          key={step._key}
          className="grid gap-3 border-b border-line py-[15px] text-[13.5px] max-[560px]:grid-cols-1 min-[561px]:grid-cols-[188px_1fr] min-[561px]:gap-5"
        >
          <dt className="font-semibold leading-[1.45] text-ink">{step.org}</dt>
          {step.note && (
            <dd className="leading-[1.55] text-ink-2">{step.note}</dd>
          )}
        </div>
      ))}
    </dl>
  );
}
