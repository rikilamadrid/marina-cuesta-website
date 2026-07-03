import type { PressMention } from "@/types/sanity";

// Small internal helper — only http/https links open in a new tab safely.
function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

// Sanity stores the press date as a YYYY-MM-DD string; display it as "June 2016".
// Parse the parts and format in UTC so US timezones don't roll the day back a month.
function formatDate(date?: string) {
  if (!date) return undefined;
  const [year, month] = date.split("-");
  if (!year || !month) return date;
  return new Date(Date.UTC(Number(year), Number(month) - 1, 1)).toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric", timeZone: "UTC" },
  );
}

export default function PressList({ press }: { press: PressMention[] }) {
  if (press.length === 0) {
    return (
      <p className="border-t border-line py-[22px] text-[15px] leading-[1.6] text-ink-2">
        Press and mentions will appear here soon.
      </p>
    );
  }

  return (
    <div className="border-t border-line">
      {press.map((item) => (
        <PressRow key={item._id} item={item} />
      ))}
    </div>
  );
}

function PressRow({ item }: { item: PressMention }) {
  const { outlet, title, type, date, link } = item;
  const external = isExternal(link);
  const displayDate = formatDate(date);

  return (
    <a
      href={link}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-[22px] border-b border-line py-[22px] transition-[padding] duration-300 ease-[var(--ease)] hover:pl-3 focus-visible:pl-3 max-[600px]:grid-cols-[1fr_auto] max-[600px]:gap-x-4 max-[600px]:gap-y-1.5"
    >
      <span className="min-w-[130px] text-[11px] font-semibold uppercase tracking-[0.16em] text-garnet max-[600px]:col-span-2">
        {outlet}
      </span>

      <span className="min-w-0">
        <span className="font-display text-[1.15rem] leading-[1.2] text-ink">
          {title}
        </span>
        {(type || displayDate) && (
          <span className="mt-1 block text-[11px] uppercase tracking-[0.1em] text-ink-2">
            {[type, displayDate].filter(Boolean).join(" · ")}
          </span>
        )}
      </span>

      <span
        aria-hidden="true"
        className="text-[18px] leading-none text-ink-2 transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-garnet group-focus-visible:translate-x-[3px] group-focus-visible:-translate-y-[3px] group-focus-visible:text-garnet"
      >
        ↗
      </span>
    </a>
  );
}
