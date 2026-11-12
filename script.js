/* a field of images. the mouse pans the plate and draws the rig. */

(() => {
  const NS = "http://www.w3.org/2000/svg";
  const WORLD_W = 2400;
  const WORLD_H = 1700;

  const items = [
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
  ];

  const world = document.querySelector("[data-world]");
  const worldRig = document.querySelector("[data-world-rig]");
  const cursorRig = document.querySelector("[data-cursor-rig]");
  const cross = document.querySelector("[data-cross]");
  const crossLabel = document.querySelector("[data-cross-label]");
  const readoutIndex = document.querySelector("[data-readout-index]");
  const readoutTitle = document.querySelector("[data-readout-title]");
  const readoutMeta = document.querySelector("[data-readout-meta]");
  const board = document.querySelector(".board");

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
      const fig = document.createElement("figure");
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
      world.appendChild(fig);

      const unit = make("g", { class: "unit" });
      const frame = make("g", {
        transform: `translate(${it.x + it.w / 2} ${it.y + it.h / 2}) rotate(${it.r})`,
      });
      frame.append(make("rect", {
        x: -it.w / 2 - 5,
        y: -it.h / 2 - 5,
        width: it.w + 10,
        height: it.h + 10,
      }));
      frame.append(make("circle", { class: "dot", cx: -it.w / 2 - 5, cy: -it.h / 2 - 5, r: 2.4 }));
      if (i % 3 === 0) {
        frame.append(make("line", {
          class: "diag",
          x1: -it.w / 2 - 5,
          y1: -it.h / 2 - 5,
          x2: it.w / 2 + 5,
          y2: it.h / 2 + 5,
        }));
      }
      unit.append(frame);
      const num = make("text", {
        class: "num",
        x: it.x + 2,
        y: it.y - 8,
      });
      num.textContent = String(i + 1).padStart(3, "0");
      unit.append(num);
      worldRig.append(unit);

      it._fig = fig;
      it._unit = unit;
      units.push(unit);
    });

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
      items[n.i]._fig.classList.add("is-near");
      items[n.i]._unit.classList.add("is-near");
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
    readoutMeta.textContent = `x${pad(pointer.x)} y${pad(pointer.y)} / ${(near[0].d / 100).toFixed(2)}`;
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
    cam.x += (tx - cam.x) * 0.06;
    cam.y += (ty - cam.y) * 0.06;
    world.style.transform = `translate3d(${cam.x.toFixed(2)}px, ${cam.y.toFixed(2)}px, 0)`;

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
