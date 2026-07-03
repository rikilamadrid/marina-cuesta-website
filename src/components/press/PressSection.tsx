import PressList from "@/components/press/PressList";
import Reveal from "@/components/ui/Reveal";
import type { PressMention } from "@/types/sanity";

type Props = {
  press: PressMention[];
  as?: "h1" | "h2";
};

export default function PressSection({ press, as: Heading = "h2" }: Props) {
  return (
    <section id="press" className="bg-paper py-[110px] max-[720px]:py-24">
      <Reveal className="mx-auto w-full max-w-[1240px] px-5 min-[981px]:pl-[72px] min-[981px]:pr-7">
        <header className="mb-[78px] max-[720px]:mb-12">
          <Heading className="font-display text-[clamp(2.6rem,7vw,5.2rem)] font-normal leading-none tracking-[-0.015em] text-ink">
            <span className="mr-3 align-super font-body text-[0.45em] font-semibold leading-none text-garnet">
              04
            </span>
            Press &amp; Mentions
          </Heading>
        </header>

        <PressList press={press} />
      </Reveal>
    </section>
  );
}
