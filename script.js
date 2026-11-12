/* Ruler scrubber + timecode. The ruler is navigation: its marks are
   sections, its playhead tracks scroll position. */

(() => {
  const scrub = document.querySelector("[data-scrub]");
  const playhead = document.querySelector("[data-playhead]");
  const marks = document.querySelector("[data-marks]");
  const timecodeEls = document.querySelectorAll("[data-timecode]");
  const navLinks = [...document.querySelectorAll(".nav a[href^='#']")];
  const takes = [...document.querySelectorAll("[data-take]")];

  if (!scrub || !playhead || !marks) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  const pad = (n) => String(Math.floor(n)).padStart(2, "0");

  // 6-minute virtual tape
  const TAPE_SECONDS = 372;
  const formatTC = (progress) => {
    const total = progress * TAPE_SECONDS;
    const m = Math.floor(total / 60);
    const s = total % 60;
    const f = Math.floor((s % 1) * 24);
    return `${pad(m)}:${pad(s)}:${pad(f)}`;
  };

  const renderMarks = () => {
    marks.innerHTML = "";
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    takes.forEach((section) => {
      if (section.dataset.take === "start") return;
      const top = section.offsetTop;
      const pct = Math.min(96, Math.max(4, (top / docHeight) * 100));
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = section.dataset.take;
      btn.style.left = `${pct}%`;
      btn.addEventListener("click", () => {
        window.scrollTo({
          top: Math.max(0, top - 64),
          behavior: reduced.matches ? "auto" : "smooth",
        });
      });
      marks.appendChild(btn);
    });
  };

  let ticking = false;
  const update = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    playhead.style.left = `${progress * 100}%`;

    const tc = formatTC(progress);
    timecodeEls.forEach((el) => (el.textContent = tc));

    // active nav
    let current = null;
    for (const section of takes) {
      if (window.scrollY + 120 >= section.offsetTop) current = section;
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
  window.addEventListener("resize", () => {
    renderMarks();
    requestUpdate();
  });

  // click / drag anywhere on the ruler to scrub
  const scrubTo = (clientX) => {
    const rect = scrub.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: pct * max, behavior: "auto" });
  };

  let dragging = false;
  scrub.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button")) return;
    dragging = true;
    scrub.setPointerCapture(e.pointerId);
    scrubTo(e.clientX);
  });
  scrub.addEventListener("pointermove", (e) => {
    if (dragging) scrubTo(e.clientX);
  });
  scrub.addEventListener("pointerup", () => (dragging = false));
  scrub.addEventListener("pointercancel", () => (dragging = false));

  renderMarks();
  update();
  window.addEventListener("load", () => {
    renderMarks();
    requestUpdate();
  });
})();
