// Renders a JSON-LD structured-data block. Kept as a server component so the
// script is present in the initial HTML for crawlers. `data` is a schema.org
// object built by the helpers in `src/lib/seo.ts`.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is server-authored (never user input), so this is safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
