# shashvat singh

A full-screen field of images that pans with the mouse. Not a career portfolio:
the images are the index, and a small strip at the bottom says what he does and
where the personal projects live.

```
index.html    shell, hud, about strip
styles.css    board, pieces, rig, mobile grid
script.js     the plate, the camera, the annotation rig
assets/img/   16 pinterest feed images, 6 film posters, 4 album covers
```

## Images

- **Pinterest**: his home feed, not boards (16 images).
- **Letterboxd**: favourites *Past Lives*, *12 Angry Men*, *Babylon*,
  *Trainspotting*, plus recent five-stars *Schindler's List* and *Obsession*.
- **Spotify**: the recent rotation, all 2024–2026 — MGMT *Loss of Life*, Ye
  *Bully*, Gorillaz *The Mountain*, The Strokes *Reality Awaits*.

These are used for a personal, non-commercial page. They are not licensed for
resale or redistribution beyond this site.

## The effect

- The mouse moves a camera across a 2400×1700 plate, with exponential easing
  and a small idle drift. The images on the sides slide in and out of view.
- Every image has an annotation unit: a hairline frame, an anchor dot and a
  numeric label. The three nearest images to the cursor get cyan frames, a
  small scale/brightness lift, scanlines and semi-transparent chromatic edges.
- Lines run from the cursor to those three anchors, plus a triangle between
  them, so the technical web follows the pointer rather than sitting still.
- The readout bottom-left names the nearest piece (film, album or feed image)
  and shows live coordinates. The crosshair carries its own x/y.
- `prefers-reduced-motion` freezes the camera and hides the cursor rig. Below
  900px the plate becomes a two-column image grid with the about strip below.

## Run it

```sh
python3 -m http.server 4173
# http://localhost:4173
```

## Editing

All pieces live in the `items` array in `script.js`: image, label, alt, position
and size in plate coordinates, rotation, and an optional crop position. World
size is `2400 × 1700`. The mobile grid ignores the coordinates.

## Deploy

Static. `og:url`, canonical and the social card point at
`https://shashvat1965.github.io/shashvat-portfolio/`. Update those URLs in
`index.html` and regenerate `assets/og.jpg` (1200×630) if you deploy elsewhere.

No analytics, no cookies. Type is Archivo and Space Mono, from Google Fonts.
