// main.js — FULL STABLE VERSION (Phase 2 Day 2)
// Includes: reveal, counters, navbar, smooth scroll, theme, active link,
// contact form, faculty filtering with DOM reorder

document.addEventListener("DOMContentLoaded", () => {

  /* ======================================================
     1) CONTACT FORM (demo mode)
  ====================================================== */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = (form.name?.value || "").trim();
      const email = (form.email?.value || "").trim();
      const message = (form.message?.value || "").trim();
      const statusEl = document.getElementById("formStatus");

      if (!name || !email || !message) {
        if (statusEl) {
          statusEl.textContent = "Please fill all required fields.";
          statusEl.classList.remove("text-success");
          statusEl.classList.add("text-danger");
        } else {
          alert("Please fill all fields.");
        }
        return;
      }

      if (statusEl) {
        statusEl.textContent = "Message submitted (demo). Thank you!";
        statusEl.classList.remove("text-danger");
        statusEl.classList.add("text-success");
      } else {
        alert("Message submitted (demo).");
      }

      form.reset();
    });
  }

  /* ======================================================
     2) REVEAL ON SCROLL (with stagger)
  ====================================================== */
  (function () {
    const reveals = Array.from(document.querySelectorAll(".reveal"));
    if (!reveals.length) return;

    const seen = new WeakSet();
    const baseDelay = 80;

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          if (seen.has(el)) {
            obs.unobserve(el);
            return;
          }

          const parent = el.closest(".reveal--stagger");
          if (parent) {
            const items = Array.from(parent.querySelectorAll(".reveal"));
            const idx = items.indexOf(el);
            el.style.transitionDelay = `${idx * baseDelay}ms`;
          }

          el.classList.add("revealed");
          seen.add(el);
          obs.unobserve(el);
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach((r) => io.observe(r));
  })();

  /* ======================================================
     3) NAVBAR — close menu on link click (mobile fix)
  ====================================================== */
  const nav = document.getElementById("navMain");
  if (nav) {
    nav.querySelectorAll("a.nav-link").forEach((a) => {
      a.addEventListener("click", () => {
        try {
          const bs =
            bootstrap.Collapse.getInstance(nav) ||
            new bootstrap.Collapse(nav, { toggle: false });
          const toggler = document.querySelector(".navbar-toggler");
          if (toggler && window.getComputedStyle(toggler).display !== "none") {
            bs.hide();
          }
        } catch (e) {}
      });
    });
  }

  /* ======================================================
     4) SMOOTH SCROLL
  ====================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href") || "";
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ======================================================
     5) LOGIN BUTTON — keyboard support
  ====================================================== */
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        loginBtn.click();
      }
    });
  }

  /* ======================================================
     6) NUMBER COUNTERS (IntersectionObserver)
  ====================================================== */
  function runCounterOn(el) {
    const target = Number(el.getAttribute("data-target") || "0");
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1400;

    if (target <= 0) {
      el.textContent = "0" + suffix;
      return;
    }

    let start = 0;
    const stepTime = Math.max(20, Math.floor(duration / target));
    const inc = Math.max(1, Math.ceil(target / (duration / stepTime)));

    const timer = setInterval(() => {
      start += inc;
      if (start >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = start + suffix;
      }
    }, stepTime);
  }

  const statEls = Array.from(document.querySelectorAll(".stat-num"));
  if (statEls.length) {
    const seen = new WeakSet();
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const el = en.target;
            if (!seen.has(el)) {
              runCounterOn(el);
              seen.add(el);
            }
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    statEls.forEach((el) => io.observe(el));
  }

  /* ======================================================
     7) THEME TOGGLE + LOCAL STORAGE
  ====================================================== */
  (function () {
    const toggle = document.getElementById("themeToggle");
    const root = document.documentElement;
    const saved = localStorage.getItem("acadvault-theme");

    if (saved === "dark") root.setAttribute("data-theme", "dark");

    function applyIcon() {
      const isDark = root.getAttribute("data-theme") === "dark";
      if (toggle) {
        toggle.textContent = isDark ? "☀️" : "🌙";
        toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
      }
    }
    applyIcon();

    if (toggle) {
      toggle.addEventListener("click", () => {
        const isDark = root.getAttribute("data-theme") === "dark";
        if (isDark) {
          root.removeAttribute("data-theme");
          localStorage.setItem("acadvault-theme", "light");
        } else {
          root.setAttribute("data-theme", "dark");
          localStorage.setItem("acadvault-theme", "dark");
        }
        applyIcon();
      });
    }
  })();

  /* ======================================================
     8) FOOTER YEAR
  ====================================================== */
  const y = document.getElementById("siteYear");
  if (y) y.textContent = new Date().getFullYear();
});

/* ======================================================
   OUTSIDE DOMContentLoaded:
   ACTIVE NAV LINK + REVEAL FIX
====================================================== */
(function () {
  try {
    const links = document.querySelectorAll("a.nav-link");
    const current = location.pathname.split("/").pop() || "index.html";
    links.forEach((a) => {
      const href = a.getAttribute("href")?.split("/").pop();
      if (href === current) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }
    });
  } catch (e) {}
})();

/* ======================================================
   FACULTY FILTERING (FINAL — WITH PERFECT REORDER)
====================================================== */
(function () {
  try {
    const filterBar = document.querySelector(".filters");
    if (!filterBar) return;

    const buttons = [...filterBar.querySelectorAll(".filter-btn")];
    const grid = document.getElementById("facultyGrid");
    if (!grid) return;

    const getColumns = () =>
      [...grid.querySelectorAll(".col-6, .col-md-3, .col, .col-lg-3")].filter(
        (c) => c.querySelector(".faculty-card")
      );

    function setActive(btn) {
      buttons.forEach((b) => {
        const is = b === btn;
        b.classList.toggle("active", is);
        b.setAttribute("aria-pressed", is);
      });
    }

    function filterBy(filter) {
      const cols = getColumns();
      const matches = [];
      const others = [];

      cols.forEach((col) => {
        const card = col.querySelector(".faculty-card");
        const dept = card.getAttribute("data-dept")?.toLowerCase() || "";
        const ok = filter === "all" || dept === filter;

        if (ok) {
          matches.push(col);
          col.style.display = "";
          card.classList.remove("faculty-card-hidden");
          card.classList.add("faculty-card-visible");
        } else {
          others.push(col);
          col.style.display = "none";
          card.classList.add("faculty-card-hidden");
          card.classList.remove("faculty-card-visible");
        }
      });

      const frag = document.createDocumentFragment();
      matches.forEach((c) => frag.appendChild(c));
      others.forEach((c) => frag.appendChild(c));
      grid.appendChild(frag);
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const f = btn.getAttribute("data-filter") || "all";
        setActive(btn);
        filterBy(f.toLowerCase());
      });

      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          btn.click();
        }
      });
    });

    const initial = buttons.find((b) => b.classList.contains("active")) || buttons[0];
    setActive(initial);
    filterBy(initial.getAttribute("data-filter") || "all");
  } catch (e) {
    console.warn("Faculty filter error", e);
  }
})();
