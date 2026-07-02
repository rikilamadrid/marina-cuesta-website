import {
  PortableText as SanityPortableText,
  type PortableTextComponents,
} from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";

type Props = {
  value?: PortableTextBlock[];
  className?: string;
};

// Editorial styling for Sanity Portable Text — used by project `body` and
// site settings `longBio`. Typography ports the prototype `.about-body`
// (paragraphs Hanken 300 / line-height 1.72, garnet emphasis, Fraunces heads).
// Page-specific treatments (e.g. About's display `.lead` first paragraph) stay
// at the call site; this renderer is the shared, neutral baseline.
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-[15.5px] font-light leading-[1.72] text-ink last:mb-0">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 font-display text-[clamp(1.5rem,3.5vw,2.2rem)] font-normal leading-[1.15] tracking-[-0.01em] text-ink first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 font-display text-[clamp(1.25rem,2.6vw,1.6rem)] font-normal leading-[1.2] text-ink first:mt-0">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-6 font-display text-[1.15rem] font-medium leading-[1.25] text-ink first:mt-0">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-garnet pl-6 font-display text-[clamp(1.25rem,3vw,1.6rem)] font-normal italic leading-[1.4] text-ink">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-garnet">{children}</em>
    ),
    link: ({ children, value }) => {
      const href: string = value?.href ?? "";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="text-garnet underline decoration-garnet/40 underline-offset-2 transition-colors hover:decoration-garnet focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-garnet"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 list-disc space-y-2 pl-5 text-[15.5px] font-light leading-[1.72] text-ink marker:text-garnet">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 list-decimal space-y-2 pl-5 text-[15.5px] font-light leading-[1.72] text-ink marker:text-garnet">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
};

// Renders nothing (not a crash) when content is empty or undefined.
export default function PortableText({ value, className }: Props) {
  if (!value || value.length === 0) return null;

  const content = <SanityPortableText value={value} components={components} />;
  return className ? <div className={className}>{content}</div> : content;
}
