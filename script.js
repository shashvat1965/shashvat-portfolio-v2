/* billboarded card field: one focal point, depth-scaled cards, locked
   annotation rig. the pointer moves the vanishing point and the scale. */

(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)");

  /* ---------- cursor readout ---------- */
  const cursor = document.querySelector(".cursor");
  const label = document.querySelector(".cursor__label");
  let cx = 0;
  let cy = 0;
  let tx = 0;
  let ty = 0;
  let cursorSeen = false;

  /* ---------- field ---------- */
  const field = document.querySelector("[data-field]");
  const floats = field ? [...field.querySelectorAll(".float")] : [];
  const wires = document.querySelector("[data-wires]");
  const NS = "http://www.w3.org/2000/svg";

  const K = 0.85;
  const TILT = 0.18;
  const DRIFT = 2.2;

  let W = 0;
  let H = 0;

  const cards = floats.map((el, i) => {
    const depth = parseFloat(el.dataset.depth || "1");
    return {
      el,
      depth,
      sBase: 0.8 + (depth / 1.6) * 0.55,
      rot: 0,
      cx0: 0,
      cy0: 0,
      w: 0,
      h: 0,
      tx: 0,
      ty: 0,
      s: 0.8 + (depth / 1.6) * 0.55,
      bx: 0,
      by: 0,
      bw: 0,
      bh: 0,
      phase: (i * 1.7) % 6.283,
      annotated: el.hasAttribute("data-annotate"),
    };
  });

  const overlay = cards.map((card) => {
    if (!wires) return null;
    const parts = {};
    const g = document.createElementNS(NS, "g");
    wires.append(g);
    parts.g = g;
    if (card.annotated) {
      parts.frame = document.createElementNS(NS, "rect");
      parts.diag1 = document.createElementNS(NS, "line");
      parts.diag2 = document.createElementNS(NS, "line");
      g.append(parts.frame, parts.diag1, parts.diag2);
    }
    parts.dot = document.createElementNS(NS, "circle");
    parts.dot.setAttribute("r", "2.6");
    parts.text = document.createElementNS(NS, "text");
    parts.text.setAttribute("text-anchor", "middle");
    g.append(parts.dot, parts.text);
    return parts;
  });

  const connectors = [
    [0, 3],
    [2, 4],
  ]
    .map(([a, b]) => {
      if (!wires || !cards[a] || !cards[b]) return null;
      const line = document.createElementNS(NS, "line");
      wires.append(line);
      return { a, b, line };
    })
    .filter(Boolean);

  const measure = () => {
    if (!field) return;
    W = field.clientWidth;
    H = field.clientHeight;
    cards.forEach((card) => {
      card.w = card.el.offsetWidth;
      card.h = card.el.offsetHeight;
      card.cx0 = card.el.offsetLeft + card.w / 2;
      card.cy0 = card.el.offsetTop + card.h / 2;
      const r = getComputedStyle(card.el).getPropertyValue("--r");
      card.rot = parseFloat(r) || 0;
    });
  };

  const pointer = { x: 0, y: 0 };
  const smooth = { x: 0, y: 0 };

  window.addEventListener(
    "pointermove",
    (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (cursor && !cursorSeen) {
        cursorSeen = true;
        cursor.classList.add("is-on");
        cx = tx;
        cy = ty;
      }
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );

  /* ---------- marquee ---------- */
  const strip = document.querySelector("[data-strip]");
  const track = document.querySelector("[data-track]");
  let offset = 0;
  let hovered = false;
  if (strip) {
    strip.addEventListener("pointerenter", () => (hovered = true));
    strip.addEventListener("pointerleave", () => (hovered = false));
  }

  const moveMarquee = () => {
    if (!track) return;
    const half = track.scrollWidth / 2;
    if (half < 10) return;
    offset += hovered ? 0.12 : 0.55;
    if (offset >= half) offset -= half;
    track.style.transform = `translate3d(${-offset}px, 0, 0)`;
  };

  /* ---------- loop ---------- */
  const canFloat = () =>
    !reduce.matches && fine.matches && window.innerWidth > 900;

  const start = performance.now();
  let last = start;

  const frame = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    if (cursorSeen && cursor) {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      cursor.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(
        2
      )}px, 0) translate(-50%, -50%)`;
      if (label) {
        label.textContent = `x${String(Math.round(tx)).padStart(4, "0")} y${String(
          Math.round(ty)
        ).padStart(4, "0")}`;
      }
    }

    if (canFloat() && W > 0) {
      const k1 = 1 - Math.exp(-dt / 0.13);
      smooth.x += (pointer.x - smooth.x) * k1;
      smooth.y += (pointer.y - smooth.y) * k1;

      const vpX = W / 2 + smooth.x * W * 0.04;
      const vpY = H / 2 + smooth.y * H * 0.04;
      const t = (now - start) / 1000;

      cards.forEach((card, i) => {
        const visible = card.el.offsetWidth > 0 && card.el.offsetParent !== null;
        const o = overlay[i];
        if (o) o.g.style.display = visible ? "" : "none";
        if (!visible) return;

        const k2 = 1 - Math.exp(-dt / (0.16 + 0.14 * (1 - card.depth)));
        card.s +=
          (card.sBase *
            (1 +
              TILT *
                (((card.cx0 - vpX) / W) * 2 * smooth.x +
                  ((card.cy0 - vpY) / H) * 2 * smooth.y)) -
            card.s) *
          k2;

        const s = card.s;
        const k = s - 1;
        const driftX = Math.sin(t * 0.23 + card.phase) * DRIFT;
        const driftY = Math.cos(t * 0.19 + card.phase * 1.3) * DRIFT;
        let targetX =
          vpX + (card.cx0 - vpX) * s + smooth.x * K * k * W * 0.5 + driftX;
        let targetY =
          vpY + (card.cy0 - vpY) * s + smooth.y * K * k * H * 0.5 + driftY;

        const rad = (card.rot * Math.PI) / 180;
        const c = Math.abs(Math.cos(rad));
        const sn = Math.abs(Math.sin(rad));
        card.bw = card.w * s * c + card.h * s * sn;
        card.bh = card.w * s * sn + card.h * s * c;

        const m = 14;
        const minX = m + card.bw / 2;
        const maxX = W - m - card.bw / 2;
        const minY = 40 + m + card.bh / 2;
        const maxY = H - m - card.bh / 2;
        if (minX < maxX) targetX = Math.min(maxX, Math.max(minX, targetX));
        if (minY < maxY) targetY = Math.min(maxY, Math.max(minY, targetY));

        card.tx = targetX - card.cx0;
        card.ty = targetY - card.cy0;

        card.el.style.transform = `translate3d(${card.tx.toFixed(
          2
        )}px, ${card.ty.toFixed(2)}px, 0) scale(${s.toFixed(
          4
        )}) rotate(${card.rot}deg)`;

        card.bx = targetX - card.bw / 2;
        card.by = targetY - card.bh / 2;

        if (!o) return;
        o.dot.setAttribute("cx", card.bx + 1);
        o.dot.setAttribute("cy", card.by + 1);
        o.text.setAttribute("x", card.bx + 1);
        o.text.setAttribute("y", card.by - 6);
        o.text.textContent =
          i === 4 ? (s * 1.0000001).toPrecision(9) : s.toFixed(1);
        if (o.frame) {
          o.frame.setAttribute("x", card.bx);
          o.frame.setAttribute("y", card.by);
          o.frame.setAttribute("width", card.bw);
          o.frame.setAttribute("height", card.bh);
          o.diag1.setAttribute("x1", card.bx);
          o.diag1.setAttribute("y1", card.by);
          o.diag1.setAttribute("x2", card.bx + card.bw);
          o.diag1.setAttribute("y2", card.by + card.bh);
          o.diag2.setAttribute("x1", card.bx + card.bw);
          o.diag2.setAttribute("y1", card.by);
          o.diag2.setAttribute("x2", card.bx);
          o.diag2.setAttribute("y2", card.by + card.bh);
        }
      });

      connectors.forEach(({ a, b, line }) => {
        const on =
          cards[a].el.offsetWidth > 0 &&
          cards[b].el.offsetWidth > 0 &&
          cards[a].el.offsetParent !== null &&
          cards[b].el.offsetParent !== null;
        line.style.display = on ? "" : "none";
        if (!on) return;
        line.setAttribute("x1", cards[a].bx + 1);
        line.setAttribute("y1", cards[a].by + 1);
        line.setAttribute("x2", cards[b].bx + 1);
        line.setAttribute("y2", cards[b].by + 1);
      });
    }

    if (!reduce.matches) moveMarquee();
    requestAnimationFrame(frame);
  };

  const clearTransforms = () => {
    cards.forEach((card) => {
      card.el.style.transform = "";
      card.s = card.sBase;
    });
    if (wires) wires.innerHTML = "";
  };

  if (field) {
    measure();
    if (!canFloat()) clearTransforms();
    window.addEventListener("resize", () => {
      measure();
      if (!canFloat()) clearTransforms();
    });
    window.addEventListener("load", measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  }

  requestAnimationFrame(frame);
})();
