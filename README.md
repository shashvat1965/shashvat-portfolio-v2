# shashvat singh

A one-page portfolio built as a photocopied zine wall. The pinned posters around
the masthead are on a shallow depth plane: moving the mouse shifts the vanishing
point and each card's scale, so the collage reflows instead of sliding. A locked
SVG annotation rig (hairlines, dots, scale readouts, match lines) measures it.

No framework, no build step, no analytics.

```
index.html    content, poster cards, inline SVG plates
styles.css    print/zine system, type, layout, grain
script.js     depth field, annotation rig, cursor readout, music marquee
assets/       favicon, social card
```

## Run it

```sh
python3 -m http.server 4173
# http://localhost:4173
```

## How the motion works

- Each card has a depth value. `scale = base + depth` and position is derived
  from a single focal point, so near cards grow and get pushed outward while far
  cards pull inward.
- The pointer moves the focal point slightly and modulates scale; two-stage
  damping (pointer, then per-card) plus a 2px idle drift keeps it alive.
- The overlay is recomputed from the transformed geometry every frame: 1px
  frames, anchor dots, raw scale labels and dot-to-dot match lines.
- With `prefers-reduced-motion` the field is frozen at its static composition,
  the marquee stops and the cursor readout is hidden.

## Content

- Films are his Letterboxd favourites and recent five-star watches. Music is
  restricted to 2024–2026 releases from his recent rotation. The playlist line
  is his own: *the thought is better than the act* (3,078 songs).
- Project descriptions are written as outcomes, not stacks. Star and download
  counts are as of November 2026 and will drift.
- Beer appears three times: a bottle cap, the contact headline and the colophon.

## Deploy

Static; point any host at this directory. `og:url`, canonical and the social
card URLs point at
`https://shashvat1965.github.io/shashvat-portfolio/`. If you deploy under a
different repo name or a custom domain, update those four URLs in `index.html`
and regenerate `assets/og.png` at 1200×630.

`shashvatsingh.me` is still the CNAME on the old Pages repo but no longer
resolves; reviving it would give the site the clean URL the last portfolio had.

## Editing

- Section labels are plain `<h2>`s; all caveats about headings apply.
- Hero cards live in `.field`; positions are `--x`, `--y`, tilt `--r`, depth
  `data-depth`. Hidden cards still get cleaned up by the script on resize.
- The type system is Archivo (display/body), Newsreader italic (pull quotes) and
  Space Mono (labels). Colour tokens are at the top of `styles.css`.
