# Planning & Progress — Phase 1 (19 Nov – 26 Nov)

**Project:** AcadVault — Secure Certificate Verification  
**Phase 1 window:** 19 Nov 2025 → 26 Nov 2025  
**Status (current):** In progress — Phase 1 core deliverables completed (pages, CSS, JS). Final polishing & documentation done.

---

## Phase 1 goal
Deliver a consistent, responsive, accessible front-end scaffold for AcadVault that demonstrates UI, UX patterns and all required pages so Phase 2 (Firebase integration + business logic) can begin.

### Output by 26 Nov:
- Full project plan + basic file structure (HTML/CSS/JS + assets)

---

## Daily breakdown & completed work

### Day 1 (19 Nov) — Decide pages & IA
- Decided core pages: Home, About, Courses, Faculty, Gallery, Contact. ✅
- Created initial wireframe sketches for site structure. ✅

### Day 2 (20 Nov) — Wireframes & content plan
- Completed wireframe refinements and content placeholders. ✅
- Determined primary UI elements: hero, cards, stats, CTA, gallery lightbox, contact form. ✅

### Day 3 (21 Nov) — HTML skeletons & hero
- Generated HTML skeleton files for all pages (`index.html`, `about.html`, `courses.html`, `faculty.html`, `gallery.html`, `contact.html`). ✅
- Implemented hero section, navbar, footer and initial components. ✅

### Day 4 (22 Nov) — Styling & JS behavior
- Finalized `assets/css/style.css` — theme variables, hero styling, cards, reveal animations, dark-mode fixes. ✅
- Implemented `assets/js/main.js` — reveal observer, counters, theme toggle + persistence, mobile nav close, form demo handler. ✅
- Inserted placeholder images (logo + QR, then expanded to faculty/gallery placeholders). ✅
- Added map iframe to contact page. ✅

### Day 5 (23 Nov) — Polishing & accessibility (ongoing)
- Improved accessibility: skip links, ARIA labels, button semantics, keyboard handlers. ✅
- Added SEO / OpenGraph meta snippet (non-invasive) to page head. ✅
- Appended small non-invasive JS helper (auto-year + conservative auto-active nav). ✅
- Performed visual consistency pass across pages (typography, spacing, button styles). ✅

---

## Remaining minor items (Phase 1 final tidy)
These are small polish tasks to finish Phase 1:

- Optional: compress & standardize placeholder image dimensions. (low effort)  
- Optional: minor CSS refactor to remove any unused rules (for size) — not required.  
- Quick manual QA on actual mobile devices (Chrome/Firefox on Android; Safari on iOS).  
- Prepare submission zip and add `README.md` + `planning.md` (done). ✅

---

## Acceptance criteria (how Phase 1 is judged)
- All pages render properly and link to each other. ✅
- Navigation is consistent across pages and active state is correct. ✅
- Basic interactive features (reveal, counters, theme toggle, lightbox, contact form validation) function. ✅
- Site is responsive and accessible (skip link, alt text placeholders, focusable controls). ✅
- Project documentation included (README.md, planning.md). ✅

---

## Deliverables packaged
- HTML files: `index.html`, `about.html`, `courses.html`, `faculty.html`, `gallery.html`, `contact.html`  
- Assets: `assets/css/style.css`, `assets/js/main.js`, `assets/img/*` (placeholders)  
- Docs: `README.md`, `planning.md` (this file)  

---

## Notes & handover
- All placeholder images are under `assets/img/`. Replace them with real photos when available.  
- Map embed uses a public Google Maps iframe — change the `src` to your college's exact coordinates / API if required.  
- The contact form is a demo-only handler that shows an alert and resets the form. Integrate backend (Firebase function or email API) during Phase 2.

---

## Immediate next steps (Phase 2 preparation)
1. Create a Firebase project (Auth, Firestore, Storage, Functions).  
2. Design certificate data model (fields + QR payload structure).  
3. Build certificate issuance UI + QR generation & signing.  
4. Implement verification endpoint and revocation flags.  
5. Replace placeholders & update privacy statement.

---

**End of Phase 1 planning & summary**  
Prepared: 22 Nov 2025 — progress updated continuously.  
If anything needs rewording or you want this converted into a PDF for submission, tell me and I’ll generate it next.

