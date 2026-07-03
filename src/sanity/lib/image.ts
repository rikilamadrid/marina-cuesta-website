import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function optimizedImageUrl({
  source,
  width,
  height,
  quality = 82,
}: {
  source: SanityImageSource;
  width: number;
  height?: number;
  quality?: number;
}) {
  const image = urlFor(source).width(width).quality(quality).auto("format");
  return (height ? image.height(height).fit("crop") : image).url();
}
