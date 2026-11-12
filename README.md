# shashvat singh — portfolio

A single-page portfolio built like a capture session: the header ruler is both
navigation and scroll progress, sections are takes, and timecode runs
underneath it all. No framework, no build step, no tracking.

```
index.html    markup, content, inline SVG poster art
styles.css    design tokens and layout
script.js     ruler scrubber, timecode, active nav
assets/       favicon, social card
```

## Run it

```sh
python3 -m http.server 4173
# http://localhost:4173
```

## Deploy

The site is fully static. Point any host at this directory; `index.html` is the
entry point. For GitHub Pages, push the folder to a repo and enable Pages on
the default branch.

`shashvatsingh.me` is still set as the CNAME on the old `shashvat1965.github.io`
repo but the domain no longer resolves. Reviving it would give this site the
clean URL his old portfolio had — DNS plus one deploy, no content changes.

Before deploying to a real domain, make the social card absolute:
`og:image` and `twitter:image` should become
`https://<domain>/assets/og.png`.

## Editing

- Section content lives in `index.html`; each section carries `data-take="…"`,
  which is the label that appears on the ruler.
- Timecodes in `.section-head` and the contact bar are display only; the live
  timecode is driven by scroll in `script.js`.
- Palette, type, spacing in `:root` at the top of `styles.css`.
- Project poster art is inline SVG, one per tile, drawn in the tile's own
  palette. Keep the key shapes inside the top ~70% of the 400×500 viewBox —
  the caption block sits over the bottom.

## Notes on the content

- Facts were researched from his LinkedIn/GitHub profiles, his own old
  portfolio copy (`shashvat.vercel.app`, Feb 2025), and the repos on this
  machine. Star and download counts for SlideSense are as of November 2026 and
  will drift.
- Reports of his role come from the Clueso co-founder's "founding engineer"
  post and his LinkedIn headline; his exact current title is not public.
- No analytics, no cookie banner, no fonts beyond Google Fonts (with system
  fallbacks).
