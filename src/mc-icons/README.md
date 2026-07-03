# Icons — Drop-in Guide

The mark: an "MC" monogram in a bold italic serif, bone-on-oxblood, with a thin garnet rule underneath — a small echo of the site's vertical nameplate motif. Built directly from the site's tokens (`--oxblood: #3D0D17`, `--bone: #F3ECE3`, `--garnet: #B11E3A`), not a generic template icon.

> Note: Fraunces itself isn't installable in this environment, so the monogram is set in a bold italic serif (DejaVu Serif) as the closest offline equivalent. If you want it re-rendered in true Fraunces later, that's a quick regeneration — flag it and I'll redo it once Fraunces is available to the renderer.

## Files

| File | Size | Use |
| --- | --- | --- |
| `favicon.ico` | 16/32/48 multi-size | Classic browser tab icon |
| `favicon-16x16.png` | 16×16 | Browser tab (modern browsers) |
| `favicon-32x32.png` | 32×32 | Browser tab (retina) |
| `favicon-48x48.png` | 48×48 | Windows taskbar / larger tab contexts |
| `apple-touch-icon.png` | 180×180 | iOS home screen / Safari bookmark |
| `icon-192.png` | 192×192 | PWA manifest icon |
| `icon-512.png` | 512×512 | PWA manifest icon (splash/install) |
| `icon-maskable-192.png` | 192×192 | PWA manifest, `purpose: "maskable"` — safe-zone padded so Android's circular/squircle mask doesn't clip it |
| `icon-maskable-512.png` | 512×512 | Same, larger |
| `icon-master-1024.png` | 1024×1024 | Master file — use to re-export anything else you need later (app store icon, etc.) |
| `icon-social-1200.png` | 1200×1200 | Spare square mark, not required for favicon/PWA — handy if you ever want the monogram itself as an OG fallback image |

## 1. Where these go in the Next.js project

Drop everything except `icon-master-1024.png` and `icon-social-1200.png` into `public/`:

```
public/
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── favicon-48x48.png
├── apple-touch-icon.png
├── icon-192.png
├── icon-512.png
├── icon-maskable-192.png
└── icon-maskable-512.png
```

Keep `icon-master-1024.png` somewhere in `context/` (not `public/`) as the source file for future re-exports — don't ship it to the site.

## 2. Wire it into `app/layout.tsx` metadata

```ts
export const metadata: Metadata = {
  // ...existing metadata
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
};
```

## 3. Create `public/manifest.json` for PWA support

```json
{
  "name": "Marina Cuesta — Executive Creative Director",
  "short_name": "Marina Cuesta",
  "description": "Executive Creative Director. 20+ years of global, multicultural and feminist creative leadership.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FAF7F2",
  "theme_color": "#3D0D17",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "/icon-maskable-192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" },
    { "src": "/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

`theme_color` is set to oxblood so the mobile browser chrome/status bar matches the brand when the site is added to a home screen.

## 4. Add this to `project-overview.md` / `CLAUDE.md`

Both files currently say nothing about the favicon/PWA icons — once these are in `public/`, it's worth a one-line addition to `CLAUDE.md`'s "Hard don'ts": *"Don't regenerate or replace the icon set without checking `icon-master-1024.png` first — it's the source file."* Say the word and I'll add it for you.
