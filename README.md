# Elevate — Official Club Website

The official website of **Elevate**, our college's student-run technical community club — built by and for student developers, researchers, and engineers. Built with a premium, high-performance tech stack focused on smooth interactions and modern developer aesthetics.

> **Vision:** When someone visits Elevate, they should be able to **Discover → Explore → Learn → Participate → Connect**. The site preserves the club's history, showcases what current members are building, and keeps growing with every future Elevate batch.

---

## 🧭 Core Product Principle

> Do not design every page as a separate page. Design the **connections** between them.

Two ecosystems drive every page decision:

```
DOMAIN → EVENT → LEARN → CHALLENGE → PARTICIPATE
LEADERSHIP → CONTRIBUTIONS → EVENTS → CLUB LEGACY
```

An event should never become a dead page after it ends — it links forward into resources, challenges, and results. A Legacy leader connects to what they built, and what happened during their tenure. The site should feel like **one connected platform**, not a stack of unrelated pages.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: React 18 + Vite (Fast HMR & Optimized Build)
- **Styling**: Vanilla CSS (CSS Variables for tokens, Glassmorphism, Responsive Grid/Flex)
- **Smooth Scroll**: **Lenis** (by Studio Freight) — buttery smooth inertia scrolling synced with GSAP.
- **Animations**: **GSAP** (GreenSock Animation Platform) + ScrollTrigger for scroll-based reveals.
- **3D / WebGL**: **Three.js** (interactive shader backgrounds).
- **Icons**: Lucide React.
- **Admin data**: content (events, resources, challenges, legacy, sponsors, announcements) must be manageable from `/admin` without touching frontend code — see [Admin Panel](#-admin-panel).

### Typography

- **Plus Jakarta Sans** — primary UI font for headings, body, and UI components.
- **Space Grotesk** — bold, geometric font for numbers, stats, and scores.
- **JetBrains Mono** — monospace font for code blocks and the interactive terminal.

---

## ✨ Features & React Bits Components

- **FloatingLines WebGL Background (Hero)**: Interactive 3D waving ribbons powered by Three.js, reacting dynamically to cursor movement.
- **Lenis Smooth Scroll**: Fluid, high-performance inertia scrolling across the whole site.
- **StaggeredText**: Character-by-character reveal animation used in the Hero title.
- **ScrollReveal**: GSAP-powered blur-and-fade text reveal for major section headings (About, Legacy, Knowledge, Challenges, Sponsors).
- **SpeedingText**: Animated number counters for statistics, years, and leaderboard points.
- **Infinite LogoLoop**: Seamless infinite marquee for technical domains (`Web2`, `Web3`, `AI/ML`, `CyberSec`, `AppDev`, `OpenSource`).
- **Interactive Terminal**: Code studio in the About section — multi-file tabs, live code execution simulation, copy functionality.
- **Social Proof Marquee**: 3-column vertical infinite scroll in Sponsors, glassmorphism testimonial cards.
- **Navigation**: Centered glassmorphic pill navbar, live top ambient gradient bloom, interactive dropdown cards, Dark/Light theme switch.

---

## 🎨 Color Palette System

### Dark Theme (Default)

| Token | Hex / Value | Usage |
| :--- | :--- | :--- |
| **Primary** | `#2563EB` | Active buttons, primary actions, highlights |
| **Primary Gradient** | `#2563EB` → `#60A5FA` | Gradients, key metrics, active badges |
| **Accent** | `#38BDF8` | Cyan highlights, icons, active tab borders |
| **Secondary** | `#1E3A8A` | Deep blue accents, gradient base |
| **Background** | `#0B0F19` | Main page background (deep tech navy) |
| **Surface** | `#111827` | Glassmorphic cards, dialogs, dropdowns |
| **Text Primary** | `#F8FAFC` | Headings, high-contrast text |
| **Text Secondary** | `#94A3B8` | Paragraphs, descriptions, subtitles |
| **Success / Warning / Error** | `#22C55E` / `#F59E0B` / `#EF4444` | Status chips & terminal output |

### Light Theme

| Token | Hex / Value | Usage |
| :--- | :--- | :--- |
| **Primary** | `#2563EB` | Buttons, CTAs, interactive states |
| **Primary Gradient** | `#2563EB` → `#60A5FA` | Header gradients, accent text |
| **Accent** | `#0EA5E9` | Sky blue accents, icons, links |
| **Secondary** | `#3B82F6` | Secondary buttons, subtle borders |
| **Background** | `#F4F7FB` | Crisp, ultra-clean tech background |
| **Surface** | `#FFFFFF` | Elevated white glassmorphic cards |
| **Text Primary** | `#0F172A` | Crisp slate headings, main text |
| **Text Secondary** | `#475569` | Subtitles, body copy |

Dark mode is the primary experience; light mode is fully supported, not an afterthought.

---

## 🗺️ Site Structure

```
ELEVATE
│
├── 🏠 Home
├── 💻 Domains
│   ├── Web2
│   ├── Web3
│   ├── AI/ML
│   ├── Cyber Security
│   ├── App Development
│   └── Open Source
├── 🏛 Legacy
├── 📅 Events
│   ├── Upcoming
│   ├── Ongoing
│   └── Past
├── 🤝 Sponsors
├── 📚 Knowledge Hub
│   ├── Courses │ YouTube │ Documentation │ Articles
│   └── Books │ Roadmaps │ Projects │ Tools
├── 🏆 Challenges
│   ├── Active
│   ├── Upcoming
│   └── Past
├── 🚀 Join Elevate
└── 🔐 Admin
    ├── Dashboard
    ├── Events
    ├── Resources
    ├── Challenges
    ├── Legacy
    ├── Sponsors
    └── Media
```

**Main navbar**: `Home | Domains | Legacy | Events | Sponsors | Knowledge Hub | Challenges` + `Join Elevate` CTA. Collapses to a hamburger menu on mobile.

---

## 📄 Page Overviews

### Home
Hero (logo, headline, description, `Explore Elevate` / `Explore Domains`) → About Elevate → Domains → Upcoming Events → Legacy Preview → Knowledge Hub Preview → Challenges Preview → Sponsors → Join Elevate CTA → Footer. First impression should be strong without feeling overwhelming.

### Domains
Six domain cards (name, icon, short description, technologies, `Explore Domain →`). Each domain has a detail page at `/domains/:slug` containing intro, technologies/topics, projects, related events, learning resources, optional domain team, and related challenges — reinforcing `Domain → Events → Resources → Challenges`.

### Legacy
Represents ELEVATE's evolution over time, not just a list of past club members. Year-range navigation (`2026–27 → 2025–26 → 2024–25 → 2023–24 → Founding Era`). Each entry: leader name, position, tenure, profile image, bio, technical background, contributions, projects, achievements, major events during their tenure. **Desktop**: immersive scroll-based timeline. **Mobile**: simple vertical timeline. Must work fully with animations disabled.

### Events
Split into Upcoming / Ongoing / Past, filterable by domain, year, type, and status. Detail page (`/events/:slug`) includes poster, schedule/venue, domain, description, speaker, registration, resources, recording, GitHub link, gallery, and related challenge — event pages stay alive after the event ends (`Register Now →` becomes `View Resources →`).

### Sponsors
Current sponsors, sponsor tiers, community partners, optional previous sponsors. Each sponsor: logo, name, tier, description, website, associated event/initiative.

### Knowledge Hub
ELEVATE's curated learning library — Courses, YouTube, Documentation, Articles, Books, Roadmaps, Projects, Tools. Filterable by domain and difficulty (Beginner/Intermediate/Advanced). Resource card: title, thumbnail, description, domain, type, difficulty, author, tags, external link.

### Challenges
Active / Upcoming / Past. Detail page: name, domain, description, dates, rules, eligibility, prize, registration, submission, resources, leaderboard, results. CTA changes with status (`Register Now →`, `Submit Solution →`, `View Leaderboard →`, `View Results →`).

### Admin (`/admin`, dashboard at `/admin/dashboard`)
Lets the club team update events, resources, challenges, legacy, sponsors, media, and (future) announcements — **without touching frontend code**. Dashboard shows upcoming events, active challenges, totals, and recent updates. Content published in admin appears automatically on the public site.

---

## 🎬 Animation Intensity by Page

Animation should serve the content, never block access to it.

| Page | Intensity |
| :--- | :--- |
| Homepage | High |
| Legacy | High / scroll storytelling |
| Domains | Medium |
| Events | Medium |
| Challenges | Medium |
| Knowledge Hub | Low |
| Admin | Minimal |

---

## 📱 Responsive Design

Layouts are **adapted**, not shrunk. Must work correctly on Desktop, Tablet, and Mobile.

| Desktop | Mobile |
| :--- | :--- |
| Legacy: immersive scroll timeline | Legacy: simple vertical timeline |
| Domains: interactive grid | Domains: stacked/swipeable cards |
| Navbar: full menu | Navbar: hamburger menu |

---

## 🚧 Development Phases

**Phase 1 — Public Website**: Home, Domains + detail pages, Legacy, Events + detail, Sponsors, Knowledge Hub, Challenges + detail, Join Elevate, mobile responsiveness, dark/light mode.

**Phase 2 — Admin**: authentication, dashboard, event/resource/challenge/legacy/sponsor/media management.

**Phase 3 — Advanced Features**: global search, advanced filters, leaderboards, event galleries, announcements, member showcase, project showcase.

### MVP checklist (v1 complete when...)
- [ ] Visitors understand what Elevate is
- [ ] All six domains available, each with its own page
- [ ] Legacy timeline works
- [ ] Events explorable, individual event pages work
- [ ] Sponsors displayed
- [ ] Knowledge Hub works, resources filterable
- [ ] Challenges explorable
- [ ] Admin can manage events, resources, challenges, legacy, sponsors
- [ ] Site works properly on mobile
- [ ] Content updatable without changing frontend code

---

## ✅ Open Decisions (finalize before/during build)

Final logo/brand assets · final colors (confirm against WhatsApp palette) · homepage headline · About Elevate copy · domain descriptions · current & previous leadership data · existing event data · Knowledge Hub starter resources · sponsor info · challenge system requirements · Join Elevate process · social links · contact email · admin access list · post-launch content ownership.

---

## 🚀 Quick Start

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run local development server
npm run dev

# Build for production
npm run build
```