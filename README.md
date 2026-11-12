# shashvat singh

A single, mouse-panned field of images. Not a career portfolio: the images are the index, and a small strip at the bottom says what he does and where the personal projects live.

```
index.html    shell, hud, status, minimap, about strip
styles.css    board, pieces, scanner, annotation rig, blue accent
script.js     mixed 49-piece layout, camera, proximity rig, glitch, leaders
assets/img/   19 pinterest crops, 15 film posters, 15 spotify covers
```

## Images and the mix

- 19 Pinterest pieces: 16 from the home feed (736px) + 3 alternate crops.
- 15 Letterboxd posters: Past Lives, 12 Angry Men, Babylon, Trainspotting,
  Schindler's List, There Will Be Blood, Whiplash, Perfect Blue, In the Mood for
  Love, Oldboy, The Departed, Harakiri, Another Round, The Banshees of
  Inisherin, Django Unchained.
- 15 Spotify albums: The Strokes *The New Abnormal*, Radiohead *OK Computer*,
  Radiohead *In Rainbows*, Frank Ocean *Blonde*, Kanye *Graduation*, The Strokes
  *Is This It*, Kanye *My Beautiful Dark Twisted Fantasy*, The Strokes *Room On
  Fire*, Elliott Smith *Either/Or*, Kanye *808s & Heartbreak*, Black Country,
  New Road *Ants From Up There*, Pink Floyd *The Dark Side of the Moon*, The
  Microphones *The Glow, Pt. 2*, Peter Cat Recording Co. *Bismillah*, The Strokes
  *Reality Awaits*.

Pieces are placed on a 7-column mosaic by a repeating mixed sequence
(pin / poster / cover / poster / cover inside each row and repeated), so no part
of the grid is dominated by one source. World: 2603 × 2603.

Every card is a real source link. Posters open Letterboxd, covers open Spotify,
Pinterest pieces open their exact pin where one was resolvable, otherwise the
profile.

## The motion

- The pointer pans the camera; there is no minimap, the plate itself is the only
  navigation.
- The nearest three pieces get the full annotation rig: corner brackets, ghost
  frame, X diagonals, dimension ticks with W × H, anchor dot and ring, numeric
  id, and a fan of leader lines from the cursor with a distance readout.
- Connected images fragment into overlapping offset crops with hue-shifted,
  scanline-treated patches, and a smooth negative blob that follows the cursor,
  morphs continuously, and is clipped separately into every card near it — so
  it creeps in from the edge and can appear on two close cards at once.
- Cards are JS links rather than anchors, so the browser's URL preview never
  covers the bottom status bar.
- `prefers-reduced-motion` freezes the camera and glitch, and hides the blob.
- Below 900px the plate becomes a two-column mixed grid with the about strip.

## Run it

```sh
python3 -m http.server 4173
# http://localhost:4173
```

## Deploy

Static. `og:url`, canonical and social card point at
`https://shashvat-portfolio-alpha.vercel.app/`. Update those URLs in
`index.html` and regenerate `assets/og.jpg` (1200×630) if the domain changes.

No analytics, no cookies. Type is Archivo + Space Mono; all lowercase, one
letter-spacing value. Favicon is the memoji from nblog-chi.
