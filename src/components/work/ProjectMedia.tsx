import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import type { GalleryItem, SanityImage, VideoEmbed } from "@/types/sanity";

type Props = {
  items?: GalleryItem[];
  projectTitle: string;
  client: string;
};

type ParsedVideo = {
  provider: "YouTube" | "Vimeo";
  src: string;
};

function isVideo(item: GalleryItem): item is VideoEmbed {
  return item._type === "videoEmbed";
}

function isGalleryImage(item: GalleryItem): item is SanityImage & { _key: string } {
  return item._type === "image" && Boolean(item.asset);
}

function parseYouTubeUrl(url: URL): ParsedVideo | null {
  const host = url.hostname.replace(/^www\./, "");
  let id = "";

  if (host === "youtu.be") {
    id = url.pathname.split("/").filter(Boolean)[0] ?? "";
  } else if (host === "youtube.com" || host === "m.youtube.com") {
    const parts = url.pathname.split("/").filter(Boolean);
    if (url.pathname === "/watch") id = url.searchParams.get("v") ?? "";
    if (parts[0] === "embed" || parts[0] === "shorts") id = parts[1] ?? "";
  }

  if (!id) return null;

  return {
    provider: "YouTube",
    src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0`,
  };
}

function parseVimeoUrl(url: URL): ParsedVideo | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host !== "vimeo.com" && host !== "player.vimeo.com") return null;

  const id = url.pathname
    .split("/")
    .filter(Boolean)
    .find((part) => /^\d+$/.test(part));

  if (!id) return null;

  return {
    provider: "Vimeo",
    src: `https://player.vimeo.com/video/${id}?dnt=1`,
  };
}

function parseVideoUrl(videoUrl: string): ParsedVideo | null {
  try {
    const url = new URL(videoUrl);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return parseYouTubeUrl(url) ?? parseVimeoUrl(url);
  } catch {
    return null;
  }
}

function MediaFrame({
  item,
  index,
  projectTitle,
  client,
}: {
  item: GalleryItem;
  index: number;
  projectTitle: string;
  client: string;
}) {
  const spanClass = index % 3 === 0 || isVideo(item) ? "min-[860px]:col-span-2" : "";

  if (isVideo(item)) {
    const video = parseVideoUrl(item.videoUrl);
    if (!video) return null;

    return (
      <div className={spanClass}>
        <div className="relative aspect-video overflow-hidden rounded-[var(--radius)] border border-line bg-ink">
          <iframe
            src={video.src}
            title={`${client} ${projectTitle} ${video.provider} video`}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  if (!isGalleryImage(item)) return null;

  return (
    <figure className={spanClass}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius)] bg-blush">
        <Image
          src={urlFor(item).width(1400).height(875).fit("crop").url()}
          alt={`${client} ${projectTitle} gallery image ${index + 1}`}
          fill
          sizes="(min-width: 981px) 1100px, 100vw"
          className="object-cover"
        />
      </div>
    </figure>
  );
}

export default function ProjectMedia({ items, projectTitle, client }: Props) {
  if (!items?.length) return null;

  const renderableItems = items.filter(
    (item) => isGalleryImage(item) || (isVideo(item) && parseVideoUrl(item.videoUrl)),
  );

  if (!renderableItems.length) return null;

  return (
    <section className="mt-20 border-t border-line pt-10 max-[720px]:mt-14">
      <p className="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-garnet">
        <span aria-hidden="true" className="inline-block h-px w-[26px] bg-garnet" />
        Gallery
      </p>
      <div className="grid gap-5 min-[860px]:grid-cols-2">
        {renderableItems.map((item, index) => (
          <MediaFrame
            key={item._key}
            item={item}
            index={index}
            projectTitle={projectTitle}
            client={client}
          />
        ))}
      </div>
    </section>
  );
}
