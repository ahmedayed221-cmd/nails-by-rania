# Portfolio Site

A single-page, dark-mode-first portfolio gallery built with Tailwind CSS and vanilla JavaScript. No framework, no build step needed to run it — just open `index.html`.

## Structure

```
portfolio/
├── index.html              ← everything lives here: markup, styles, JS, data
├── assets/
│   ├── tailwind.css        ← precompiled Tailwind (no CDN dependency, works offline)
│   └── images/              ← your gallery photos (nail-01.jpg … nail-07.jpg)
├── build/
│   ├── tailwind.config.js  ← color palette, fonts, etc.
│   └── input.css           ← Tailwind entry file
└── package.json
```

## Swapping in your own content

All project data lives in a single array near the bottom of `index.html`, called `PROJECTS`. Each item looks like:

```js
{
  id: "proj-01",
  title: "Sculpted Petals",
  category: "Nail Art",       // must match one of CATEGORY_LIST
  year: "2026",
  client: "Private client",
  date: "August 2026",
  image: "assets/images/nail-07.jpg",
  video: undefined,           // optional — set a path to show a video in the lightbox instead of an image
  description: "…",
  size: "tall",                // "tall" | "normal" | "wide" — controls card aspect ratio
}
```

To add or remove categories, edit the `CATEGORY_LIST` array right above `PROJECTS` — the filter bar is generated from it automatically.

Drop your own photos into `assets/images/`, update the `image` paths, and edit titles/descriptions/metadata to match. No other code changes needed.

## Rebuilding the CSS

The site ships with a precompiled `assets/tailwind.css` so it works with zero network dependency. If you change colors/fonts in `build/tailwind.config.js`, or add new utility classes to `index.html` that aren't already covered, rebuild with:

```bash
cd build && npx tailwindcss@3 -i input.css -o ../assets/tailwind.css --config tailwind.config.js --minify
```

(Requires Node.js. Run from inside `build/` — the config's `content: ["../index.html"]` path is resolved relative to the current working directory, not the config file, so running it from the repo root points at a nonexistent path and silently produces an empty stylesheet. Pin the CLI to `tailwindcss@3`: plain `npx tailwindcss` resolves to v4, which moved the CLI into a separate `@tailwindcss/cli` package and no longer has a bare executable to run — `npx` will download the v3 CLI on first run if it isn't already available.)

## Hosting

This is a static site — drag the whole `portfolio/` folder onto Netlify/Vercel/GitHub Pages, or upload it to any static host. No server-side code required.
