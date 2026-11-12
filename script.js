/* The ruler is navigation: marks are sections, the playhead is scroll
   position, and every timecode on the page is derived from the same mapping. */

(() => {
  const header = document.querySelector(".site-head");
  const scrub = document.querySelector("[data-scrub]");
  const playhead = document.querySelector("[data-playhead]");
  const marks = document.querySelector("[data-marks]");
  const timecodeEls = document.querySelectorAll("[data-timecode]");
  const navLinks = [...document.querySelectorAll(".nav a[href^='#']")];
  const takes = [...document.querySelectorAll("[data-take]")];

  if (!scrub || !playhead || !marks) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  // virtual tape length, purely for the timecode readout
  const TAPE_SECONDS = 372;
  const pad = (n) => String(Math.floor(n)).padStart(2, "0");

  const formatTC = (progress) => {
    const total = progress * TAPE_SECONDS;
    const m = Math.floor(total / 60);
    const s = total % 60;
    const f = Math.floor((s % 1) * 24);
    return `${pad(m)}:${pad(s)}:${pad(f)}`;
  };

  let offsets = new Map();
  let totalScroll = 1;

  const progressAt = (top) =>
    Math.min(1, Math.max(0, top / totalScroll));

  const scrollToOffset = (top) => {
    window.scrollTo({
      top: Math.max(0, top - header.offsetHeight),
      behavior: reduced.matches ? "auto" : "smooth",
    });
  };

  const renderMarks = () => {
    marks.innerHTML = "";
    takes.forEach((section) => {
      if (section.dataset.take === "start") return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = section.dataset.take;
      btn.style.left = `${progressAt(offsets.get(section)) * 100}%`;
      btn.addEventListener("click", () => scrollToOffset(offsets.get(section)));
      marks.appendChild(btn);
    });
  };

  const measure = () => {
    totalScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    offsets = new Map(takes.map((section) => [section, section.offsetTop]));
    renderMarks();
    update();
  };

  let ticking = false;
  const update = () => {
    ticking = false;
    const progress = progressAt(window.scrollY);
    const width = scrub.clientWidth;

    playhead.style.transform = `translateX(${progress * width - 1}px)`;
    header.style.setProperty("--progress", progress.toFixed(4));

    const tc = formatTC(progress);
    timecodeEls.forEach((el) => (el.textContent = tc));

    // section timecodes share the playhead's mapping
    takes.forEach((section) => {
      const el = section.querySelector(".tc");
      if (el) el.textContent = formatTC(progressAt(offsets.get(section)));
    });

    let current = null;
    for (const section of takes) {
      if (window.scrollY + header.offsetHeight + 56 >= offsets.get(section)) {
        current = section;
      }
    }
    navLinks.forEach((a) => {
      const target = document.querySelector(a.getAttribute("href"));
      a.setAttribute("aria-current", target === current ? "true" : "false");
    });
  };

  const requestUpdate = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  // click or drag anywhere on the ruler to scrub
  const scrubTo = (clientX) => {
    const rect = scrub.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    window.scrollTo({ top: pct * totalScroll, behavior: "auto" });
  };

  let dragging = false;
  scrub.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button")) return;
    dragging = true;
    scrub.setPointerCapture(e.pointerId);
    scrubTo(e.clientX);
  });
  scrub.addEventListener("pointermove", (e) => {
    if (dragging && e.buttons === 1) scrubTo(e.clientX);
  });
  ["pointerup", "pointercancel", "lostpointercapture"].forEach((type) =>
    scrub.addEventListener(type, () => (dragging = false))
  );

  if ("ResizeObserver" in window) {
    new ResizeObserver(() => measure()).observe(document.body);
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(measure);
  }
  window.addEventListener("load", measure);
  measure();
})();
