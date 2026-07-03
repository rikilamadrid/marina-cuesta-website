import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { SANITY_TAGS, type SanityTag } from "@/sanity/lib/fetch";

const TAGS_BY_TYPE = {
  siteSettings: SANITY_TAGS.siteSettings,
  project: SANITY_TAGS.project,
  pressMention: SANITY_TAGS.pressMention,
} as const;

type RevalidatePayload = {
  _id?: string;
  _type?: keyof typeof TAGS_BY_TYPE;
  slug?: string | null;
};

type RevalidateTarget = {
  path: string;
  type?: "page" | "layout";
};

const TARGETS_BY_TYPE = {
  siteSettings: [{ path: "/", type: "layout" }],
  project: [{ path: "/" }, { path: "/work" }, { path: "/sitemap.xml" }],
  pressMention: [{ path: "/" }, { path: "/press" }],
} as const;

function targetsForPayload(payload: RevalidatePayload): RevalidateTarget[] {
  const targets: RevalidateTarget[] = [
    ...(TARGETS_BY_TYPE[payload._type ?? "project"] ?? []),
  ];

  if (payload._type === "project" && payload.slug) {
    targets.push({ path: `/work/${payload.slug}` });
  }

  return targets;
}

function revalidateSanityTag(tag: SanityTag) {
  // Webhooks need immediate expiration so the next public request gets fresh
  // content instead of stale-while-revalidate behavior.
  revalidateTag(tag, { expire: 0 });
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return Response.json(
      { revalidated: false, message: "Missing revalidation secret" },
      { status: 500 },
    );
  }

  let body: RevalidatePayload | null;
  let isValidSignature: boolean | null;

  try {
    ({ body, isValidSignature } = await parseBody<RevalidatePayload>(
      request,
      secret,
    ));
  } catch {
    return Response.json(
      { revalidated: false, message: "Invalid webhook payload" },
      { status: 400 },
    );
  }

  if (!isValidSignature) {
    return Response.json(
      { revalidated: false, message: "Invalid webhook signature" },
      { status: 401 },
    );
  }

  if (!body?._type || !(body._type in TAGS_BY_TYPE)) {
    return Response.json(
      {
        revalidated: false,
        message: "Unsupported Sanity document type",
        type: body?._type ?? null,
      },
      { status: 400 },
    );
  }

  const tag = TAGS_BY_TYPE[body._type];
  const targets = targetsForPayload(body);

  revalidateSanityTag(tag);
  for (const target of targets) {
    revalidatePath(target.path, target.type);
  }

  return Response.json({
    revalidated: true,
    type: body._type,
    id: body._id ?? null,
    tag,
    targets,
  });
}
