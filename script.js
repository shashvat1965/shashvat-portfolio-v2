/* a field of images. the mouse pans the plate and draws the rig. */

(() => {
  const NS = "http://www.w3.org/2000/svg";
  const MAP_H = 79;
  const WORLD_W = 2576;
  const WORLD_H = 2036;

  const rawItems = [
    { src: "pin-01", label: "pinterest feed / 01", alt: "green tree swirling into a spiral", x: 40, y: 60, w: 280, h: 380, r: -2 },
    { src: "poster-past-lives", label: "past lives / 2023", alt: "past lives film poster", x: 340, y: 90, w: 230, h: 345, r: 1.5 },
    { src: "pin-03", label: "pinterest feed / 03", alt: "power line drawn in white on blue", x: 590, y: 40, w: 300, h: 400, r: -1 },
    { src: "cover-loss-of-life", label: "loss of life / mgmt / 2024", alt: "mgmt, loss of life album cover", x: 910, y: 120, w: 250, h: 250, r: -2.5 },
    { src: "pin-05", label: "pinterest feed / 05", alt: "purple glitched figure in the dark", x: 1190, y: 60, w: 310, h: 370, r: 2 },
    { src: "poster-babylon", label: "babylon / 2022", alt: "babylon film poster", x: 1520, y: 70, w: 230, h: 345, r: -1 },
    { src: "pin-06", label: "pinterest feed / 06", alt: "radiohead ok computer collage", x: 1780, y: 40, w: 330, h: 420, r: 1.5 },
    { src: "pin-08", label: "pinterest feed / 08", alt: "neon pink flowers on black", x: 2140, y: 90, w: 220, h: 330, r: -2 },
    { src: "pin-07", label: "pinterest feed / 07", alt: "chessboard seen from above", x: 60, y: 480, w: 290, h: 330, r: 2 },
    { src: "cover-bully", label: "bully / ye / 2026", alt: "ye, bully album cover", x: 380, y: 500, w: 250, h: 250, r: -1.5 },
    { src: "pin-09", label: "pinterest feed / 09", alt: "rainbow glitch collage", x: 660, y: 450, w: 330, h: 330, r: 1 },
    { src: "poster-12-angry-men", label: "12 angry men / 1957", alt: "12 angry men film poster", x: 1030, y: 460, w: 230, h: 345, r: -2 },
    { src: "pin-10", label: "pinterest feed / 10", alt: "jellyfish in dark water", x: 1290, y: 440, w: 290, h: 390, r: 2 },
    { src: "pin-12", label: "pinterest feed / 12", alt: "neon tokyo street at night", x: 1620, y: 470, w: 310, h: 380, r: -1 },
    { src: "cover-the-mountain", label: "the mountain / gorillaz / 2026", alt: "gorillaz, the mountain album cover", x: 1970, y: 500, w: 250, h: 250, r: 2 },
    { src: "pin-11", label: "pinterest feed / 11", alt: "torn paper collage with type", x: 40, y: 880, w: 330, h: 310, r: -1 },
    { src: "poster-trainspotting", label: "trainspotting / 1996", alt: "trainspotting film poster", x: 400, y: 870, w: 230, h: 345, r: 2 },
    { src: "pin-13", label: "pinterest feed / 13", alt: "black and white flowers", x: 660, y: 890, w: 290, h: 370, r: 1 },
    { src: "cover-reality-awaits", label: "reality awaits / the strokes / 2026", alt: "the strokes, reality awaits album cover", x: 1000, y: 920, w: 250, h: 250, r: -2.5 },
    { src: "pin-14", label: "pinterest feed / 14", alt: "two figures with burning eyes", x: 1290, y: 870, w: 290, h: 370, r: -1.5 },
    { src: "pin-15", label: "pinterest feed / 15", alt: "vertical glitch bands", x: 1620, y: 890, w: 330, h: 300, r: 2 },
    { src: "pin-16", label: "pinterest feed / 16", alt: "wired earbuds on a dark surface", x: 1990, y: 870, w: 290, h: 350, r: -1 },
    { src: "pin-02", label: "pinterest feed / 02", alt: "bare tree against a sunset", x: 80, y: 1260, w: 290, h: 300, r: 1 },
    { src: "pin-04", label: "pinterest feed / 04", alt: "orange cosmic web", x: 400, y: 1240, w: 330, h: 330, r: -2 },
    { src: "poster-schindlers-list", label: "schindler's list / 1993", alt: "schindler's list film poster", x: 770, y: 1240, w: 230, h: 345, r: 1.5 },
    { src: "poster-obsession", label: "obsession / 2025", alt: "obsession film poster", x: 1040, y: 1260, w: 230, h: 345, r: -1 },
    { src: "pin-03", label: "pinterest feed / 03b", alt: "power line, second crop", x: 1330, y: 1250, w: 290, h: 370, r: 2, pos: "20% 60%" },
    { src: "pin-08", label: "pinterest feed / 08b", alt: "neon flowers, second crop", x: 1670, y: 1270, w: 310, h: 300, r: -2, pos: "80% 40%" },
    { src: "pin-05", label: "pinterest feed / 05b", alt: "purple figure, second crop", x: 2020, y: 1240, w: 290, h: 340, r: 1, pos: "70% 30%" },
    { src: "poster-there-will-be-blood", label: "there will be blood / 2007", alt: "there will be blood film poster", x: 2450, y: 80, w: 230, h: 345, r: -1.5 },
    { src: "poster-whiplash", label: "whiplash / 2014", alt: "whiplash film poster", x: 2750, y: 60, w: 230, h: 345, r: 2 },
    { src: "poster-perfect-blue", label: "perfect blue / 1997", alt: "perfect blue film poster", x: 3050, y: 100, w: 230, h: 345, r: -2.5 },
    { src: "poster-in-the-mood-for-love", label: "in the mood for love / 2000", alt: "in the mood for love film poster", x: 2450, y: 470, w: 230, h: 345, r: 1.5 },
    { src: "poster-oldboy", label: "oldboy / 2003", alt: "oldboy film poster", x: 2750, y: 450, w: 230, h: 345, r: -1 },
    { src: "poster-project-hail-mary", label: "project hail mary / 2026", alt: "project hail mary film poster", x: 3050, y: 500, w: 230, h: 345, r: 2 },
    { src: "poster-the-departed", label: "the departed / 2006", alt: "the departed film poster", x: 2450, y: 860, w: 230, h: 345, r: -2 },
    { src: "poster-django-unchained", label: "django unchained / 2012", alt: "django unchained film poster", x: 2750, y: 840, w: 230, h: 345, r: 1 },
    { src: "cover-perhaps", label: "perhaps / guns n' roses / 2023", alt: "guns n' roses, perhaps single cover", x: 3050, y: 120, w: 250, h: 250, r: -1.5 },
    { src: "cover-the-general", label: "the general / guns n' roses / 2023", alt: "guns n' roses, the general single cover", x: 3050, y: 420, w: 250, h: 250, r: 2 },
  ];
  const typeOf = (src) =>
    src.startsWith("poster") ? "poster" : src.startsWith("cover") ? "cover" : "pin";

  const queues = { pin: [], poster: [], cover: [] };
  rawItems.forEach((it) => queues[typeOf(it.src)].push(it));

  const pattern = [];
  for (let i = 0; i < 6; i++) pattern.push("pin", "poster", "pin", "cover", "poster", "pin");
  pattern.push("poster", "pin", "poster");

  const items = pattern.map((t) => queues[t].shift()).filter(Boolean);

  const COLS = 7;
  const CELL_W = 360;
  const CELL_H = 330;
  const MARGIN = 28;
  let col = 0;
  let row = 0;
  items.forEach((it, i) => {
    const type = typeOf(it.src);
    if (type === "poster") {
      it.w = 230;
      it.h = 345;
    } else if (type === "cover") {
      it.w = 250;
      it.h = 250;
    } else {
      const variants = [
        [300, 340],
        [330, 290],
        [290, 360],
        [310, 320],
      ];
      [it.w, it.h] = variants[i % variants.length];
    }
    const jx = ((i * 37) % 25) - 12;
    const jy = ((i * 53) % 23) - 11;
    it.x = MARGIN + col * CELL_W + (CELL_W - it.w) / 2 + jx;
    it.y = MARGIN + row * CELL_H + (CELL_H - it.h) / 2 + jy;
    it.r = 0;
    col += 1;
    if (col >= COLS) {
      col = 0;
      row += 1;
    }
  });


  const LINKS = {
    "pin-01": "https://www.pinterest.com/pin/855754366738322019/",
    "pin-02": "https://www.pinterest.com/pin/616922849003760651/",
    "pin-03": "https://in.pinterest.com/shashvat1965/",
    "pin-04": "https://in.pinterest.com/shashvat1965/",
    "pin-05": "https://www.pinterest.com/pin/292171094601126035/",
    "pin-06": "https://in.pinterest.com/shashvat1965/",
    "pin-07": "https://www.pinterest.com/pin/13721973862464087/",
    "pin-08": "https://www.pinterest.com/pin/1148347605035844974/",
    "pin-09": "https://www.pinterest.com/pin/422634746304679582/",
    "pin-10": "https://www.pinterest.com/pin/731975745734443917/",
    "pin-11": "https://in.pinterest.com/shashvat1965/",
    "pin-12": "https://www.pinterest.com/pin/326933254224935417/",
    "pin-13": "https://in.pinterest.com/shashvat1965/",
    "pin-14": "https://in.pinterest.com/shashvat1965/",
    "pin-15": "https://www.pinterest.com/pin/419327415328887391/",
    "pin-16": "https://in.pinterest.com/shashvat1965/",
    "pin-03b": "https://in.pinterest.com/shashvat1965/",
    "pin-05b": "https://www.pinterest.com/pin/292171094601126035/",
    "pin-08b": "https://www.pinterest.com/pin/1148347605035844974/",
    "poster-past-lives": "https://letterboxd.com/film/past-lives/",
    "poster-12-angry-men": "https://letterboxd.com/film/12-angry-men/",
    "poster-babylon": "https://letterboxd.com/film/babylon-2022/",
    "poster-trainspotting": "https://letterboxd.com/film/trainspotting/",
    "poster-schindlers-list": "https://letterboxd.com/film/schindlers-list/",
    "poster-obsession": "https://letterboxd.com/film/obsession-2025/",
    "poster-there-will-be-blood": "https://letterboxd.com/film/there-will-be-blood/",
    "poster-whiplash": "https://letterboxd.com/film/whiplash-2014/",
    "poster-perfect-blue": "https://letterboxd.com/film/perfect-blue/",
    "poster-in-the-mood-for-love": "https://letterboxd.com/film/in-the-mood-for-love/",
    "poster-oldboy": "https://letterboxd.com/film/oldboy/",
    "poster-the-departed": "https://letterboxd.com/film/the-departed/",
    "poster-django-unchained": "https://letterboxd.com/film/django-unchained/",
    "poster-project-hail-mary": "https://letterboxd.com/film/project-hail-mary/",
    "cover-loss-of-life": "https://open.spotify.com/album/4436CQF7pmjxkHCaJCGjmt",
    "cover-the-mountain": "https://open.spotify.com/album/1RvJmGd47lKS4XMXs9j8hD",
    "cover-bully": "https://open.spotify.com/album/5poA9SAx0Xiz1cf17fWBLS",
    "cover-reality-awaits": "https://open.spotify.com/album/6x0nmCMjHeuN3rYBmI5Bor",
    "cover-perhaps": "https://open.spotify.com/album/2CoWZzMwNzNI49Ip5IvSbb",
    "cover-the-general": "https://open.spotify.com/album/1n3udjedXeuxUh8vU46giM",
  };

  const world = document.querySelector("[data-world]");
  const worldRig = document.querySelector("[data-world-rig]");
  const cursorRig = document.querySelector("[data-cursor-rig]");
  const cross = document.querySelector("[data-cross]");
  const crossLabel = document.querySelector("[data-cross-label]");
  const readoutIndex = document.querySelector("[data-readout-index]");
  const readoutTitle = document.querySelector("[data-readout-title]");
  const readoutMeta = document.querySelector("[data-readout-meta]");
  const board = document.querySelector(".board");
  const mapEl = document.querySelector("[data-map]");
  const mapSvg = document.querySelector("[data-map-svg]");
  const mapDots = document.querySelector("[data-map-dots]");
  const mapView = document.querySelector("[data-map-view]");
  let manual = null;
  let mapDrag = false;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)");

  let units = [];
  let near = [];
  let signature = "";
  let pointer = { x: 0, y: 0, seen: false };
  let mouse = { x: 0.5, y: 0.5 };
  const cam = { x: 0, y: 0 };
  let target = { x: 0, y: 0 };
  let lastLabel = "";

  const pad = (n, len = 4) => String(Math.round(n)).padStart(len, "0");

  const make = (name, attrs = {}) => {
    const el = document.createElementNS(NS, name);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    return el;
  };

  const build = () => {
    if (!world || !worldRig) return;
    worldRig.innerHTML = "";
    items.forEach((it, i) => {
      const link = LINKS[it.src];
      const fig = document.createElement("figure");
      if (link) {
        fig.setAttribute("role", "link");
        fig.tabIndex = 0;
        fig.setAttribute("aria-label", `${it.label}, opens source`);
        fig.dataset.href = link;
        fig.addEventListener("click", () => {
          window.open(link, "_blank", "noopener,noreferrer");
        });
        fig.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            window.open(link, "_blank", "noopener,noreferrer");
          }
        });
      }
      fig.className = "piece";
      fig.classList.add(
        it.src.startsWith("poster")
          ? "piece--poster"
          : it.src.startsWith("cover")
          ? "piece--cover"
          : "piece--pin"
      );
      fig.style.left = `${it.x}px`;
      fig.style.top = `${it.y}px`;
      fig.style.width = `${it.w}px`;
      fig.style.height = `${it.h}px`;
      fig.style.setProperty("--r", `${it.r}deg`);

      const img = document.createElement("img");
      img.alt = it.alt;
      img.loading = it.y > 500 ? "lazy" : "eager";
      if (it.pos) img.style.objectPosition = it.pos;
      img.addEventListener("load", () => fig.classList.add("is-loaded"));
      img.addEventListener("error", () => fig.classList.add("is-loaded"));
      img.src = `assets/img/${it.src}.jpg`;
      if (img.complete) fig.classList.add("is-loaded");
      fig.appendChild(img);
      const glitch = document.createElement("span");
      glitch.className = "glitch";
      fig.appendChild(glitch);
      world.appendChild(fig);

      const unit = make("g", {
        class: "unit",
        transform: `translate(${it.x + it.w / 2} ${it.y + it.h / 2})`,
      });
      const full = make("g", { class: "full-art" });

      full.append(make("rect", {
        class: "ghost",
        x: -it.w / 2 + 4,
        y: -it.h / 2 - 4,
        width: it.w,
        height: it.h,
      }));

      const dimY = -it.h / 2 - 22;
      full.append(
        make("line", { class: "dim-ext", x1: -it.w / 2, y1: -it.h / 2 - 4, x2: -it.w / 2, y2: -it.h / 2 - 27 }),
        make("line", { class: "dim-ext", x1: it.w / 2, y1: -it.h / 2 - 4, x2: it.w / 2, y2: -it.h / 2 - 27 }),
        make("line", { class: "dim", x1: -it.w / 2, y1: dimY, x2: it.w / 2, y2: dimY }),
        make("line", { class: "dim", x1: -it.w / 2, y1: dimY - 4, x2: -it.w / 2, y2: dimY + 4 }),
        make("line", { class: "dim", x1: it.w / 2, y1: dimY - 4, x2: it.w / 2, y2: dimY + 4 })
      );
      const dimLabel = make("text", { class: "dim-label", x: 0, y: dimY - 6, "text-anchor": "middle" });
      dimLabel.textContent = `${Math.round(it.w)} × ${Math.round(it.h)}`;
      full.append(dimLabel);

      full.append(
        make("line", { class: "diag", x1: -it.w / 2 + 1, y1: -it.h / 2 + 1, x2: it.w / 2 - 1, y2: it.h / 2 - 1 }),
        make("line", { class: "diag", x1: it.w / 2 - 1, y1: -it.h / 2 + 1, x2: -it.w / 2 + 1, y2: it.h / 2 - 1 })
      );

      const arm = 20;
      const out = 3;
      [
        `M${-it.w / 2 - out} ${-it.h / 2 + arm} V${-it.h / 2 - out} H${-it.w / 2 + arm}`,
        `M${it.w / 2 - arm} ${-it.h / 2 - out} H${it.w / 2 + out} V${-it.h / 2 + arm}`,
        `M${it.w / 2 + out} ${it.h / 2 - arm} V${it.h / 2 + out} H${it.w / 2 - arm}`,
        `M${-it.w / 2 + arm} ${it.h / 2 + out} H${-it.w / 2 - out} V${it.h / 2 - arm}`,
      ].forEach((d) => full.append(make("path", { class: "bracket", d })));

      unit.append(full);
      unit.append(
        make("rect", { class: "frame", x: -it.w / 2, y: -it.h / 2, width: it.w, height: it.h }),
        make("circle", { class: "anchor-ring", cx: -it.w / 2, cy: -it.h / 2, r: 5.5 }),
        make("circle", { class: "anchor-dot", cx: -it.w / 2, cy: -it.h / 2, r: 2.1 })
      );

      const idText = make("text", { class: "id", x: -it.w / 2 + 9, y: -it.h / 2 - 9 });
      idText.textContent = String(i + 1).padStart(3, "0");
      unit.append(idText);
      worldRig.append(unit);

      it._fig = fig;
      it._unit = unit;
      units.push(unit);
    });

    if (mapDots) {
      mapDots.innerHTML = "";
      items.forEach((it) => {
        const r = make("rect", {
          x: ((it.x / WORLD_W) * 100).toFixed(2),
          y: ((it.y / WORLD_H) * MAP_H).toFixed(2),
          width: Math.max(0.5, ((it.w / WORLD_W) * 100)).toFixed(2),
          height: Math.max(0.5, ((it.h / WORLD_H) * MAP_H)).toFixed(2),
          fill: it.src.startsWith("poster")
            ? "rgba(237,228,211,.48)"
            : it.src.startsWith("cover")
            ? "rgba(143,227,220,.5)"
            : "rgba(237,228,211,.2)",
        });
        mapDots.append(r);
      });
    }

    [
      { cx: 520, cy: 360, r: 110 },
      { cx: 1560, cy: 980, r: 150 },
      { cx: 980, cy: 1420, r: 90 },
    ].forEach((ring) => {
      worldRig.append(make("circle", { class: "ring", ...ring }));
    });
  };

  const setNear = (list) => {
    const sig = list.map((n) => n.i).join(",");
    if (sig === signature) return;
    signature = sig;
    items.forEach((it) => {
      it._fig.classList.remove("is-near");
      it._unit.classList.remove("is-near");
    });
    list.forEach((n) => {
      const it = items[n.i];
      it._fig.classList.add("is-near");
      it._unit.classList.add("is-near");
      const glitch = it._fig.querySelector(".glitch");
      if (glitch && !glitch.childElementCount) {
        const regions = [
          [0, 0, 58, 36],
          [42, 0, 58, 44],
          [0, 32, 46, 50],
          [34, 46, 66, 54],
          [18, 16, 40, 32],
        ];
        regions.forEach((r, j) => {
          const box = document.createElement("span");
          box.className = "gbox";
          box.style.left = `${r[0]}%`;
          box.style.top = `${r[1]}%`;
          box.style.width = `${r[2]}%`;
          box.style.height = `${r[3]}%`;
          box.style.setProperty("--d", j);
          if (j === 1) box.classList.add("tint-a");
          if (j === 2) box.classList.add("tint-b");
          if (j === 3) box.classList.add("tint-invert");
          if (j === 4) box.classList.add("tint-c");
          if (j % 2 === 0) {
            box.classList.add("is-lined");
            box.dataset.code = String(j + 1).padStart(2, "0");
          }
          const img = document.createElement("span");
          img.className = "gimg";
          img.style.width = `${it.w}px`;
          img.style.height = `${it.h}px`;
          img.style.left = `${-(r[0] / 100) * it.w + (j % 3 - 1) * 7}px`;
          img.style.top = `${-(r[1] / 100) * it.h + (j % 2 ? -5 : 5)}px`;
          img.style.backgroundImage = `url(assets/img/${it.src}.jpg)`;
          img.style.backgroundSize = `${it.w}px ${it.h}px`;
          box.appendChild(img);
          glitch.appendChild(box);
        });
      }
    });
  };

  const nearest = () => {
    const out = [];
    items.forEach((it, i) => {
      const cx = it.x + it.w / 2 + cam.x;
      const cy = it.y + it.h / 2 + cam.y;
      const dx = pointer.x - cx;
      const dy = pointer.y - cy;
      out.push({ i, d: Math.hypot(dx, dy), cx, cy });
    });
    out.sort((a, b) => a.d - b.d);
    return out.slice(0, 3).filter((n) => n.d < 560);
  };

  const updateReadout = () => {
    if (!near.length) {
      if (lastLabel !== "none") {
        lastLabel = "none";
        readoutIndex.textContent = "field / 000";
        readoutTitle.textContent = reduce.matches ? "a field of images" : "move the mouse";
        readoutMeta.textContent = reduce.matches ? "static by request" : "the field follows";
      }
      return;
    }
    const top = items[near[0].i];
    const label = `${near[0].i + 1}`;
    if (lastLabel !== label) {
      lastLabel = label;
      readoutIndex.textContent = `fig / ${String(near[0].i + 1).padStart(3, "0")}`;
      readoutTitle.textContent = top.label;
    }
    const src = items[near[0].i].src;
    const openHint = LINKS[src] ? " · click to open" : "";
    readoutMeta.textContent = `x${pad(pointer.x)} y${pad(pointer.y)} / ${(near[0].d / 100).toFixed(2)}${openHint}`;
  };

  let lines = [];
  const buildLines = () => {
    if (!cursorRig) return;
    cursorRig.innerHTML = "";
    lines = Array.from({ length: 6 }, (_, i) => {
      const line = make("line", { class: i < 3 ? "is-hot" : "" });
      cursorRig.append(line);
      return line;
    });
  };

  const layout = () => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    target.x = -(WORLD_W - W) / 2;
    target.y = -(WORLD_H - H) / 2;
    cam.x = target.x;
    cam.y = target.y;
  };

  const onMove = (e) => {
    if (window.scrollY > board.offsetHeight * 0.6) return;
    if (!(e.target && e.target.closest && e.target.closest(".map"))) manual = null;
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.seen = true;
    mouse.x = e.clientX / window.innerWidth;
    mouse.y = e.clientY / window.innerHeight;
    if (cross) {
      cross.classList.add("is-on");
      cross.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }
    const label = `x${pad(e.clientX)} y${pad(e.clientY)}`;
    if (crossLabel && label !== crossLabel.textContent) crossLabel.textContent = label;
  };

  const frame = (now) => {
    if (window.innerWidth <= 900 || reduce.matches) {
      requestAnimationFrame(frame);
      return;
    }
    const t = now / 1000;
    const rangeX = WORLD_W - window.innerWidth;
    const rangeY = WORLD_H - window.innerHeight;
    const driftX = Math.sin(t * 0.21) * 8;
    const driftY = Math.cos(t * 0.18) * 7;
    const tx = -(rangeX / 2) - (mouse.x - 0.5) * rangeX * 0.94 + driftX;
    const ty = -(rangeY / 2) - (mouse.y - 0.5) * rangeY * 0.94 + driftY;
    if (manual) {
      cam.x += (manual.x - cam.x) * 0.13;
      cam.y += (manual.y - cam.y) * 0.13;
    } else {
      cam.x += (tx - cam.x) * 0.06;
      cam.y += (ty - cam.y) * 0.06;
    }
    world.style.transform = `translate3d(${cam.x.toFixed(2)}px, ${cam.y.toFixed(2)}px, 0)`;

    if (mapView) {
      const vw = (window.innerWidth / WORLD_W) * 100;
      const vh = (window.innerHeight / WORLD_H) * MAP_H;
      mapView.setAttribute("x", ((-cam.x / WORLD_W) * 100).toFixed(2));
      mapView.setAttribute("y", ((-cam.y / WORLD_H) * MAP_H).toFixed(2));
      mapView.setAttribute("width", vw.toFixed(2));
      mapView.setAttribute("height", vh.toFixed(2));
    }

    if (pointer.seen && window.scrollY < board.offsetHeight * 0.6) {
      near = nearest();
      setNear(near);
      updateReadout();

      const dot = near.map((n) => ({
        x: items[n.i].x + cam.x + 2,
        y: items[n.i].y + cam.y + 2,
      }));
      lines.forEach((line, i) => {
        if (i < 3) {
          if (dot[i]) {
            line.setAttribute("x1", pointer.x);
            line.setAttribute("y1", pointer.y);
            line.setAttribute("x2", dot[i].x);
            line.setAttribute("y2", dot[i].y);
            line.style.display = "";
          } else line.style.display = "none";
        } else {
          const a = dot[i - 3];
          const b = dot[(i - 2) % Math.max(1, dot.length)];
          if (a && b) {
            line.setAttribute("x1", a.x);
            line.setAttribute("y1", a.y);
            line.setAttribute("x2", b.x);
            line.setAttribute("y2", b.y);
            line.style.display = "";
          } else line.style.display = "none";
        }
      });

      if (cross) cross.style.opacity = "";
    } else if (cross) {
      cross.classList.remove("is-on");
      lines.forEach((l) => (l.style.display = "none"));
    }

    requestAnimationFrame(frame);
  };

  const mapTo = (e) => {
    if (!mapSvg) return;
    const rect = mapSvg.getBoundingClientRect();
    const wx = ((e.clientX - rect.left) / rect.width) * WORLD_W;
    const wy = ((e.clientY - rect.top) / rect.height) * WORLD_H;
    manual = {
      x: Math.min(0, Math.max(-(WORLD_W - window.innerWidth), -(wx - window.innerWidth / 2))),
      y: Math.min(0, Math.max(-(WORLD_H - window.innerHeight), -(wy - window.innerHeight / 2))),
    };
  };

  if (mapSvg) {
    mapSvg.addEventListener("pointerdown", (e) => {
      mapDrag = true;
      mapSvg.setPointerCapture(e.pointerId);
      mapTo(e);
    });
    mapSvg.addEventListener("pointermove", (e) => {
      if (mapDrag) mapTo(e);
    });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach((type) =>
      mapSvg.addEventListener(type, () => (mapDrag = false))
    );
  }

  const hideOnScroll = () => {
    if (!cross) return;
    if (window.scrollY > board.offsetHeight * 0.6) cross.classList.remove("is-on");
  };

  build();
  buildLines();
  layout();

  if (reduce.matches && window.innerWidth > 900) {
    world.style.transform = `translate3d(${cam.x}px, ${cam.y}px, 0)`;
  }

  if (window.innerWidth <= 900 || reduce.matches) {
    if (window.innerWidth <= 900) world.style.transform = "";
    if (cross) cross.style.display = "none";
    items.forEach((it) => it._fig.classList.remove("is-loaded"));
  } else {
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", hideOnScroll, { passive: true });
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 900) {
        world.style.transform = "";
      }
    });
    requestAnimationFrame(frame);
  }
})();
