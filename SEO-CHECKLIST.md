# Marina Cuesta SEO Checklist

This is the post-launch checklist for helping Google understand that `marinacuesta.com` is Marina Cuesta's official home online, and that the correct headshot is the image it should associate with her.

The site already handles the on-page work: metadata, `Person` JSON-LD, Open Graph images, sitemap, robots.txt, and instant Sanity publishing. The steps below are the outside-of-the-site pieces that Marina or an account owner should do after launch.

## 1. Launch With One Official Headshot

Before asking Google to index the site, confirm that the final headshot is uploaded in Sanity Site Settings.

That one image should appear in:

- The homepage hero.
- The About page.
- The site's social preview image.
- The `Person` structured data that search engines read.

Why this matters: Google compares signals from many places. If the site, LinkedIn, Behance, press bios, and agency profiles all use the same current photo, Google has a clearer answer to the question, "Which face is Marina Cuesta?"

Use the same actual photo everywhere. Platform crops are fine, but avoid switching between different shoots, old portraits, or event photos.

## 2. Match Her Public Profiles

Update Marina's profile picture on the places Google is likely to trust:

- LinkedIn.
- Behance.
- Instagram or Vimeo, if used professionally.
- Agency profile pages.
- Speaker, jury, festival, and award profiles.

Use the same name format everywhere: `Marina Cuesta`.

Where possible, add `https://marinacuesta.com` as the official website link on those profiles. This gives Google a clean loop: her profiles point to the site, and the site points back to those profiles.

## 3. Point Outside Bios At The Website

Ask any third-party bio pages to link to `https://marinacuesta.com`, especially:

- Current or past agency bios.
- Cannes Lions, See It Be It, jury, mentor, and speaker pages.
- Festival and award pages.
- Podcast, interview, feature, and press pages.
- Portfolio directories or creative leadership profiles.

The wording does not need to be identical everywhere, but the facts should stay consistent: name, role, current location/market, and the same official website.

## 4. Add The Site To Google Search Console

Use the Google account that should own the site's search presence.

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add a new property for `marinacuesta.com`.
3. Prefer a Domain property if Marina controls DNS, because it covers `http`, `https`, `www`, and non-`www` versions together.
4. Complete Google's ownership verification.
5. Keep the account owner access somewhere safe. Search Console is where Google reports indexing issues.

Official reference: [Add a website property to Search Console](https://support.google.com/webmasters/answer/34592).

## 5. Submit The Sitemap

After the live domain is working, submit:

```text
https://marinacuesta.com/sitemap.xml
```

In Search Console:

1. Open the `marinacuesta.com` property.
2. Go to Sitemaps.
3. Paste `sitemap.xml` into the sitemap field.
4. Submit it.
5. Check back later and confirm the status says `Success`.

Official reference: [Sitemaps report](https://support.google.com/webmasters/answer/7451001).

## 6. Request Indexing For The Main Pages

Use Search Console's URL Inspection tool for the most important pages:

- `https://marinacuesta.com/`
- `https://marinacuesta.com/about`
- `https://marinacuesta.com/work`
- `https://marinacuesta.com/press`
- A few strongest project pages.

For each URL:

1. Paste the full URL into the inspection bar.
2. Run a live test if Google has not seen the page yet.
3. If the page is available, click Request indexing.

This does not guarantee instant ranking, but it tells Google the pages are ready to crawl.

Official reference: [URL Inspection tool](https://support.google.com/webmasters/answer/9012289).

## 7. Watch The Search Result

For the first few weeks, search Google for:

- `Marina Cuesta`
- `Marina Cuesta creative director`
- `Marina Cuesta executive creative director`

Look for:

- Whether `marinacuesta.com` appears near the top.
- Whether the preview title and description look right.
- Whether the image Google associates with Marina is the correct headshot.
- Whether old, incorrect, or duplicate profile pages are outranking the official site.

Google can take time to refresh images and knowledge panels. Consistency matters more than repeated manual changes.

## 8. Claim The Knowledge Panel When It Appears

If Google shows a knowledge panel for Marina, claim it from the Google account that should represent her.

1. Search for `Marina Cuesta` while signed into Google.
2. Find the knowledge panel.
3. Use Google's claim or verification flow.
4. Verify through an official profile if Google asks for one.
5. After verification, suggest corrections only where needed.

Once claimed, the panel can accept suggested edits from the verified representative. Google may still review changes before showing them.

Official reference: [About knowledge panels](https://support.google.com/knowledgepanel/answer/9163198).

## 9. Optional: Add A Wikidata Item And Image

This is optional, but it is the strongest structured-data lever if Marina has enough public references.

Wikidata is used by many systems as a public knowledge graph. A good Wikidata item can reinforce the facts Google already sees on the site and across trusted profiles.

Only do this if there are serious public sources for Marina's work, such as Cannes, agency, festival, award, or press pages. Wikidata items should be backed by public references, not just self-published claims.

If creating or improving a Wikidata item:

- Use the label `Marina Cuesta`.
- Use a plain description like `creative director`.
- Add official website: `https://marinacuesta.com`.
- Add relevant public identifiers or references where available.
- Add the same headshot through Wikidata's image property only if the image is available on Wikimedia Commons.

Important: Wikimedia Commons requires freely licensed media. Do not upload a photographer-owned headshot unless the copyright holder has clearly released it under an accepted free license.

Official references:

- [Wikidata items](https://www.wikidata.org/wiki/Help:Items)
- [Wikidata image property](https://www.wikidata.org/wiki/Property:P18)
- [Wikimedia Commons licensing](https://commons.wikimedia.org/wiki/Commons:Licensing)

## 10. Keep The Signals Clean

When Marina updates her title, headshot, or main bio:

1. Update Sanity Site Settings first.
2. Update LinkedIn and Behance to match.
3. Update agency, festival, speaker, and press bios when practical.
4. Keep pointing everything back to `https://marinacuesta.com`.

The goal is not to chase Google every week. The goal is to make the web agree on the same simple facts: this is Marina Cuesta, this is her official site, and this is her current photo.
