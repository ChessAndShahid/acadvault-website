
# AcadVault — Phase 1 (Planning + Setup)

**Project:** AcadVault — Secure Certificate Verification  
**Owner:** R.D. & S.H. National College (student project)  
**Phase:** Phase 1 — Planning & Setup (19 Nov – 26 Nov)  
**Prepared by:** [Your Name]

---

## Project summary
AcadVault is a lightweight web front-end to demonstrate issuing, storing and verifying academic certificates using tamper-evident QR codes and role-based access controls. Phase 1 establishes the site structure, design system, and basic client-side interactions so the project can progress to a Firebase-backed prototype in Phase 2.

Key goals for Phase 1:
- Decide pages and information architecture
- Produce HTML skeletons for all pages
- Create a consistent design system (CSS)
- Implement reusable JS helpers (theme, reveal, counters, nav UX)
- Add placeholders for images and map embed
- Produce project documentation for submission

---

## Tech stack
- HTML5
- CSS (custom + Bootstrap 5.3)
- Vanilla JavaScript (no build step)
- Static assets (images in `assets/img/`)
- Optional: Firebase in Phase 2 (not implemented in Phase 1)

---

## Folder structure


project-root/
├─ index.html
├─ about.html
├─ courses.html
├─ faculty.html
├─ gallery.html
├─ contact.html
├─ assets/
│  ├─ css/
│  │  └─ style.css
│  ├─ js/
│  │  └─ main.js
│  └─ img/
│     ├─ logo.png
│     ├─ qr-placeholder.png
│     ├─ team-1.jpg ... team-8.jpg
│     └─ gallery-1.jpg ... gallery-8.jpg
└─ README.md

---

## How to run locally
Open the project folder and:

**Option A — Open directly (quick):**
- Open `index.html` in your browser (double-click).

**Option B — Serve via a simple HTTP server (recommended for consistent behavior):**
- Using Python 3:
  
  python -m http.server 8000
  # then open http://localhost:8000


* Using Node (http-server):

  ```bash
  npx http-server -c-1
  ```

Notes:

* `index.html` and other pages reference `assets/js/main.js` and `assets/css/style.css`. Ensure the `assets` folder is adjacent to the HTML files.
* For the Google Maps iframe to work, you need an internet connection.

---

## What’s included (Phase 1 deliverables)

* Fully structured HTML pages:

  * `index.html` — home / hero / features / counters / CTA
  * `about.html` — mission, values, team preview
  * `courses.html` — course catalogue scaffolding
  * `faculty.html` — faculty grid (placeholder photos)
  * `gallery.html` — responsive gallery + accessible lightbox
  * `contact.html` — contact form + embedded Google Map
* Design system:

  * `assets/css/style.css` — theme variables, hero, cards, reveal animations, dark-mode fixes
* JS helpers:

  * `assets/js/main.js` — contact demo handler, reveal (IntersectionObserver), counters, theme toggle (persisted), mobile nav behaviour, auto-fill copyright year, conservative auto-active nav helper
* Placeholder images for gallery and faculty (kept in `assets/img/`)
* SEO / OpenGraph metadata (non-invasive additions in `<head>`)
* Accessible features: skip links, ARIA roles/labels, keyboard handlers, reduced-motion respect
* Planning and documentation (this README.md and planning.md)

---

## Testing checklist (quick)

* [ ] Open `index.html` and verify hero, features and counters
* [ ] Scroll to trigger reveal animations
* [ ] Toggle light/dark theme (theme persisted across reload)
* [ ] Open `gallery.html` and test lightbox (keyboard arrows, Esc, click outside to close)
* [ ] Submit the demo contact form (client-side alert/validation)
* [ ] Verify map loads on `contact.html` (internet required)
* [ ] Check responsive layout on mobile/tablet sizes

---

## Next steps (Phase 2 suggestions)

* Integrate Firebase backend (Authentication, Firestore, Storage, Cloud Functions)
* Implement certificate issuance flow (signed payload → QR generation)
* Implement certificate verification endpoint (live lookup + revocation)
* Replace placeholders with real faculty/gallery photos
* Add structured data (JSON-LD) and improved Lighthouse perf fixes

---

## License & credits

* Project code by project owner (student). Use/modify for educational purposes.
* Icons / images used in Phase 1 are placeholders; replace with licensed assets before production.

````

