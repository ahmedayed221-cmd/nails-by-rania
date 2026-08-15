# Portfolio Site

A single-page, dark-mode-first portfolio gallery built with Tailwind CSS and vanilla JavaScript, with a Three.js hero centerpiece. No framework, no bundler — just open `index.html` (see the note on local preview below).

## Structure

```
portfolio/
├── index.html              ← everything lives here: markup, styles, gallery/lightbox JS, data
├── assets/
│   ├── tailwind.css        ← precompiled Tailwind (no CDN dependency, works offline)
│   ├── i18n.js               ← UI text in French/English/Arabic (nav, hero, about, contact, lightbox labels)
│   ├── hero3d.js            ← the 3D hero: builds/lights the flower + particles, drag/scroll rotation
│   ├── vendor/
│   │   ├── three.module.min.js  ← Three.js, vendored locally (no CDN dependency)
│   │   └── three.core.min.js    ← Three.js's own internal dependency of the file above
│   └── images/              ← your gallery photos (nail-01.jpg … nail-07.jpg)
├── build/
│   ├── tailwind.config.js  ← color palette, fonts, etc.
│   └── input.css           ← Tailwind entry file
└── package.json
```

## The 3D hero

`assets/hero3d.js` builds a 3D extrusion of the flower logo mark (five gold `MeshPhysicalMaterial` petals + a glass-like center gem, no external model file) and drops it into the `#hero3d` container in the hero section. It:

- Rotates slowly on its own, responds to click-and-drag (mouse or touch, via Pointer Events), and gets a small inertial spin from scroll velocity
- Only renders while the hero is actually on screen and the tab is visible (`IntersectionObserver` + `visibilitychange`) — no wasted GPU/battery once you've scrolled past it
- Respects `prefers-reduced-motion` (disables auto-rotate and scroll-spin, leaves drag-to-rotate available)
- Fails silently if WebGL isn't available — the container just stays empty and the CSS glow behind it still reads as atmosphere; nothing breaks

**Local preview note:** `assets/hero3d.js` is loaded as an ES module (`<script type="module">`), and browsers block ES module `import`s over `file://` for CORS reasons. Opening `index.html` by double-clicking it will show everything *except* the 3D hero. To see it locally, serve the folder instead:

```bash
npx serve .
# or: python3 -m http.server
```

This isn't a concern for the deployed site (Vercel serves it over HTTPS, where module imports work normally).

## Languages (French / English / Arabic)

French is the default (both in the cookie fallback *and* baked into the raw HTML, so it's correct even before JS runs — no framework, so there's no server-side rendering to do this for us). The switcher lives in the header nav and the mobile menu; the choice is stored in a `lang` cookie (1-year expiry) and re-applied on every visit.

- **UI chrome** (nav, hero, about, contact, lightbox labels, aria-labels) lives in `assets/i18n.js`, in `UI_STRINGS`. Add a key there and a matching `data-i18n="section.key"` attribute on the element in `index.html` (or `data-i18n-html` if it needs nested markup, or `data-i18n-aria` for an aria-label) — `applyStaticTranslations()` in the inline script walks all three automatically.
- **Project content** (title, description, client, date) is translated inline in the `PROJECTS` array in `index.html` — each field is `{ fr, en, ar }` instead of a plain string. `category` is no longer free text: every project has a stable `categoryKey` (matching a key in `CATEGORIES` in `i18n.js`) so filtering and language-switching never interfere with each other.
- **Arabic gets real RTL**, not just mirrored text: `<html dir="rtl">` is set on switch, which auto-mirrors every flex/grid layout in the page for free. The handful of physically-positioned elements (carousel arrows, lightbox controls, hero glow blobs) use Tailwind's logical-property utilities (`start-*`/`end-*`/`ms-*`/`border-s`) instead of `left-*`/`right-*`, and directional chevron icons get a `.rtl-flip` class. The gallery carousel's scroll math (drag, arrow buttons, "scroll to start") is routed through a small RTL-aware helper, since `scrollLeft`'s sign convention under `dir="rtl"` differs by browser engine — see the comments above `isRTL()`/`detectRtlScrollType()` in `index.html` if you're touching that code.
- Arabic also gets its own webfont (**Tajawal**, loaded alongside Inter/Playfair Display) — neither of the site's Latin fonts has Arabic glyph coverage, so without this Arabic text would silently fall back to the browser's default system font.

**Adding a 4th language:** add it to `LANGUAGES` and every language object in `UI_STRINGS`/`CATEGORIES` in `assets/i18n.js`, add the matching `{ ... }` field to each `PROJECTS` entry in `index.html`, and if it's also RTL, add its code to the `dir` check in `setLanguage()`.

## Swapping in your own content

All project data lives in a single array near the bottom of `index.html`, called `PROJECTS`. Each item looks like:

```js
{
  id: "proj-01",
  categoryKey: "nail-art",     // must match a key in CATEGORIES (assets/i18n.js) — drives the filters
  year: "2026",
  image: "assets/images/nail-07.jpg",
  video: undefined,            // optional — set a path to show a video in the lightbox instead of an image
  size: "tall",                 // unused by the current carousel layout (all cards render at a fixed 4:5 ratio) — kept for future layouts
  title: { fr: "…", en: "Sculpted Petals", ar: "…" },
  client: { fr: "…", en: "Private client", ar: "…" },
  date: { fr: "…", en: "August 2026", ar: "…" },
  description: { fr: "…", en: "…", ar: "…" },
}
```

To add or remove categories, edit `CATEGORIES`/`CATEGORY_KEYS` in `assets/i18n.js` — the filter bar is generated from it automatically.

Drop your own photos into `assets/images/`, update the `image` paths, and edit titles/descriptions/metadata (all three languages) to match. No other code changes needed.

## Rebuilding the CSS

The site ships with a precompiled `assets/tailwind.css` so it works with zero network dependency. If you change colors/fonts in `build/tailwind.config.js`, or add new utility classes to `index.html` that aren't already covered, rebuild with:

```bash
cd build && npx tailwindcss@3 -i input.css -o ../assets/tailwind.css --config tailwind.config.js --minify
```

(Requires Node.js. Run from inside `build/` — the config's `content: ["../index.html"]` path is resolved relative to the current working directory, not the config file, so running it from the repo root points at a nonexistent path and silently produces an empty stylesheet. Pin the CLI to `tailwindcss@3`: plain `npx tailwindcss` resolves to v4, which moved the CLI into a separate `@tailwindcss/cli` package and no longer has a bare executable to run — `npx` will download the v3 CLI on first run if it isn't already available.)

## Hosting

This is a static site — drag the whole `portfolio/` folder onto Netlify/Vercel/GitHub Pages, or upload it to any static host. No server-side code required.
