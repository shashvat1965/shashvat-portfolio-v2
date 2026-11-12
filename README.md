# shashvat singh

A single, mouse-panned field of images. Not a career portfolio: the images are the index, and a small strip at the bottom says what he does and where the personal projects live.

```
index.html    shell, hud, status, minimap, about strip
styles.css    board, pieces, scanner, annotation rig, blue accent
script.js     mixed 39-piece layout, camera, proximity rig, scan, map
assets/img/   19 pinterest crops, 14 film posters, 6 spotify covers
```

## Images and the mix

- 19 Pinterest pieces: 16 from the home feed (736px) + 3 alternate crops.
- 14 Letterboxd posters: favourites plus recent five-stars (Past Lives, 12 Angry
  Men, Babylon, Trainspotting, There Will Be Blood, Whiplash, Perfect Blue, In
  the Mood for Love, Oldboy, The Departed, Django Unchained, Project Hail Mary,
  Schindler's List, Obsession).
- 6 Spotify pieces, all 2023–2026: MGMT *Loss of Life*, Gorillaz *The
  Mountain*, Ye *Bully*, The Strokes *Reality Awaits*, and the two 2023 GNR
  singles *Perhaps* and *The General*.

Pieces are placed on a 7-column mosaic by a repeating mixed sequence
(pin / poster / pin / cover / poster / pin), so no part of the grid is
dominated by one source. World: 2576 × 2036.

Every card is a real source link. Posters open Letterboxd, covers open Spotify,
Pinterest pieces open the Pinterest profile (the home feed does not expose
individual pin URLs).

## The motion

- The pointer pans the camera; the minimap (bottom right) can be clicked or
  dragged to jump anywhere in the plate.
- The nearest three pieces get the full annotation rig: corner brackets, ghost
  frame, X diagonals, dimension ticks with W × H, anchor dot and ring, numeric
  id, leader lines.
- Connected images run a scanner: a displaced horizontal slice sweeps the
  image with a glowing blue line, plus dashed ghost frames and a pulsing anchor
  ring.
- Cards are JS links rather than anchors, so the browser's URL preview never
  covers the bottom status bar.
- `prefers-reduced-motion` freezes the camera, scanner, and pulses.
- Below 900px the plate becomes a two-column mixed grid with the about strip.

## Run it

```sh
python3 -m http.server 4173
# http://localhost:4173
```

## Deploy

Static. `og:url`, canonical and social card point at
`https://shashvat1965.github.io/shashvat-portfolio/`. Update those URLs in
`index.html` and regenerate `assets/og.jpg` (1200×630) if the domain changes.

No analytics, no cookies. Type is Archivo + Space Mono; all lowercase, one
letter-spacing value. Favicon is the memoji from nblog-chi.
