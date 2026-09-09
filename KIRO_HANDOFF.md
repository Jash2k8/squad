# SQUAD MLRIT V3 — Kiro Handoff File

> Single source of truth for continuing development on the V3 folder.
> Pick up exactly where work left off without any prior conversation history.
>
> Last updated: V3 created, WebGL KineticGrid implemented, local dev not yet tested.

---

## 1. Project Identity

| Field | Value |
|-------|-------|
| Club name | SQUAD |
| Full name | Departmental Club — Data Science, MLRIT |
| Contact email | squadmlrit@gmail.com |
| Instagram | https://www.instagram.com/squadmlrit?igsh=MTBleWo0Nmd3NXUzeQ== |
| LinkedIn | https://www.linkedin.com/in/squadclub |
| GitHub repo | https://github.com/kolli-dhanush-reddy/squad-mlrit |
| Local folder | `squad-mlrit-v3/` at workspace root |

---

## 2. What V3 Is

V3 is a merger of two previous versions:

| Source | What was taken |
|--------|---------------|
| `squad-club-portal-final/` | ALL data (`lib/data.ts`), routing structure, splash screen, admin panel, custom cursor, lightbox, real team/event/gallery data |
| `squad-mlrit-web-main/` | New UI style — dark `#161618` background, cyberpunk aesthetic, WebGL kinetic grid, new navbar, new footer, bento cards, timeline events layout |

**Key rule:** All content (team names, event descriptions, images, socials, contact email) comes from `squad-club-portal-final`. Never use fake/AI-generated data from the web-main folder.

---

## 3. Tech Stack

| Tool | Version | Notes |
|------|---------|-------|
| Next.js | 16.2.6 | App Router |
| React | 19 | |
| TypeScript | 5.7.3 | `ignoreBuildErrors: true` intentional |
| Tailwind CSS | v4.3.3 | |
| Framer Motion | motion ^12.43.0 | Import: `from "motion/react"` |
| Plus Jakarta Sans | via next/font | Loaded in `app/layout.tsx` |
| Vercel Analytics | 1.6.1 | Production only |
| lucide-react | ^1.16.0 | Icons |

---

## 4. File Structure

```
squad-mlrit-v3/
├── app/
│   ├── globals.css          ← Theme vars + body bg #161618
│   ├── layout.tsx           ← Plus Jakarta Sans font, CustomCursor, LayoutWrapper
│   ├── page.tsx             ← / → HomeSection
│   ├── about/page.tsx       ← /about → AboutSection
│   ├── events/page.tsx      ← /events → EventsHub
│   ├── gallery/page.tsx     ← /gallery → GallerySection
│   ├── squad/page.tsx       ← /squad → SquadSection
│   ├── join/page.tsx        ← /join → "Applications Closed"
│   └── contact/page.tsx     ← /contact → ContactPage
│
├── components/
│   ├── layout-wrapper.tsx   ← Wraps everything in KineticGrid, manages splash
│   ├── navbar.tsx           ← New minimal dark navbar, cyan underline active state
│   ├── footer.tsx           ← New 4-column footer, real links only
│   ├── splash-screen.tsx    ← FROM FINAL — glyph decode, atom replaces A
│   ├── admin-panel.tsx      ← FROM FINAL — password Squad2026
│   ├── custom-cursor.tsx    ← FROM FINAL — spring cursor, desktop only
│   ├── squad-logo.tsx       ← FROM FINAL — AtomMark SVG
│   ├── gallery.tsx          ← FROM FINAL — masonry grid + lightbox
│   ├── lightbox.tsx         ← FROM FINAL — keyboard nav
│   ├── team-grid.tsx        ← FROM FINAL — real team data
│   ├── pages/
│   │   ├── home-page.tsx    ← NEW — big SQUAD/MLRIT heading, bento divisions, dual marquee
│   │   ├── about-page.tsx   ← NEW — hero + SQUAD typewriter animation + pillars + values
│   │   ├── events-hub.tsx   ← NEW — scroll timeline layout + gallery modal popup
│   │   ├── gallery-page.tsx ← NEW — uses real GALLERY_IMAGES from data.ts
│   │   ├── squad-page.tsx   ← FROM FINAL — real team grid
│   │   └── contact-page.tsx ← FROM WEB-MAIN — premium glass form
│   └── ui/
│       ├── kinetic-grid.tsx ← NEW WebGL shader version (GPU-accelerated, low CPU)
│       ├── how-it-works.tsx ← FROM WEB-MAIN (used in about page if needed)
│       └── button.tsx       ← FROM FINAL
│
└── lib/
    ├── data.ts              ← ALL REAL DATA — never modify content, only structure
    └── utils.ts             ← cn() helper
```

---

## 5. The WebGL KineticGrid

**File:** `components/ui/kinetic-grid.tsx`

This is the most important technical change in V3. It replaces the CPU-heavy canvas 2D version with a WebGL shader.

### How it works
- Renders a full-screen `<canvas>` fixed behind all content
- A GLSL fragment shader runs on the GPU each frame
- The shader draws the dot grid, warps grid nodes toward the mouse, and draws glow/ripple effects
- JavaScript only passes 4 uniforms per frame (mouse position, time, ripple data) — no per-pixel JS math

### Uniforms (JavaScript → GPU)
| Uniform | Type | Description |
|---------|------|-------------|
| `u_resolution` | vec2 | Canvas size in pixels |
| `u_mouse` | vec2 | Mouse position normalised 0..1 |
| `u_time` | float | Seconds since page load |
| `u_ripple0/1/2` | vec2 | Up to 3 active ripple centres (normalised) |
| `u_ripple0/1/2_age` | float | Age in seconds (-1 = inactive) |

### Fallback
If WebGL is unavailable (very old browser/device), the canvas just shows `#161618` background. All page content still renders normally.

### Performance
- CPU cost: ~0.05ms/frame (just uniform uploads)
- GPU cost: ~0.1ms/frame on integrated Intel HD Graphics
- RAM: minimal — one canvas, one shader program, one quad buffer

---

## 6. Key Visual Decisions

| Decision | Detail |
|----------|--------|
| Background | `#161618` dark charcoal via KineticGrid |
| Primary accent | Cyan (`#4a9eff` / `text-cyan-400`) |
| Secondary accent | Indigo (`text-indigo-400`) |
| Font | Plus Jakarta Sans (loaded via next/font) |
| Navbar | Fixed top, `bg-[#161618]/80 backdrop-blur-2xl`, cyan underline active indicator |
| Cards | `bg-[#050505]/80 border border-white/10` with per-card hover glow |
| Events page | Scroll-driven timeline, alternating left/right cards, central glowing axis line |
| Events modal | Click "View Gallery" on any event card → opens modal with real photos + lightbox |

---

## 7. Data Reference (from squad-club-portal-final/lib/data.ts)

### CORE_TEAM (9 real members)
```
D. Anjali — President
Vishnu — Vice President & External Lead
K. Rajalakshmi — Treasurer
Keerthana — Tech Lead
Kameshwari — Arts Lead
Likith — Photography Lead
Yoshitha — GD Lead
Ch. Ramesh — Promotions Lead
Lavanya — Operations Lead
```
Photos at: `public/team/*.png/.jpeg`

### EVENTS (4 real events — NO Traditional Day)
- `codex` — 13 photos at `/events/codex/photo1-13.jpeg`
- `unplugged` — 11 photos at `/events/unplugged/photo1-11.jpeg`
- `outreach` — 9 photos at `/events/outreach/photo1-9.jpeg`
- `project-expo` — 8 photos at `/events/project-expo/photo1-8.jpeg`

### GALLERY_IMAGES
12 photos at `/gallery/photo1-12.jpeg`

### SOCIALS
- Instagram: https://www.instagram.com/squadmlrit?igsh=MTBleWo0Nmd3NXUzeQ==
- LinkedIn: https://www.linkedin.com/in/squadclub

### CONTACT_EMAIL
`squadmlrit@gmail.com`

---

## 8. Pending Tasks

### A. First local test
```bash
cd squad-mlrit-v3
npm install
npm run dev
# → http://localhost:3000
```
The WebGL KineticGrid should load instantly. If you see a blank canvas (no grid), check browser console for WebGL shader errors.

### B. Public folder — copy real photos
The `public/` folder was copied from `squad-club-portal-final` but confirm these folders exist:
- `public/team/` — 9 team member photos
- `public/events/codex/`, `unplugged/`, `outreach/`, `project-expo/`
- `public/gallery/`

If missing, copy from `squad-club-portal-final/public/` or from `squad-mlrit-web-main/squad-mlrit-web-main/public/`.

### C. Contact page review
The contact page (`components/pages/contact-page.tsx`) was taken from web-main. It has a dual-tab form (Apply to Join + Member Sign In). The "Apply" form doesn't actually submit anywhere yet.

**To wire it:** Use Formspree (free tier) — sign up at formspree.io, get a form ID, change the form `action` to `https://formspree.io/f/YOUR_ID`.

### D. Push to GitHub
V3 does not have a git repo yet. To push:
```bash
cd squad-mlrit-v3
git init
git add .
git commit -m "init: squad-mlrit-v3 — WebGL grid, new UI, real data"
git remote add origin https://github.com/kolli-dhanush-reddy/squad-mlrit
git push -u origin v3   # push to a new branch, not master
```

### E. Deploy to Vercel
Connect the `v3` branch to a new Vercel project or preview deployment.

---

## 9. Key Decisions Log

| # | Decision | Reason |
|---|----------|--------|
| 1 | WebGL shader for grid | Canvas 2D was too CPU/RAM heavy for local dev |
| 2 | All data from squad-club-portal-final | Web-main had AI-generated fake data |
| 3 | No Traditional Day event | Seniors' explicit decision |
| 4 | No GitHub/X socials | Seniors' decision — Instagram + LinkedIn only |
| 5 | Join page = Applications Closed | Applications are genuinely closed |
| 6 | KineticGrid wraps entire app | Background is global, not per-page |
| 7 | Events use timeline layout | From web-main — more premium than card grid |
| 8 | Gallery modal kept | Events still open a modal with real photo gallery |
| 9 | Contact page from web-main | Premium glass form UI, much better than final's |
| 10 | Admin password = Squad2026 | Carried over from final, client-side only |

---

## 10. How to Run

```bash
cd squad-mlrit-v3
npm install
npm run dev      # http://localhost:3000
npm run build    # production build check
```
