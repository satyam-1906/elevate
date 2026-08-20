# Elevate — Official Technical Community Platform

The digital platform for **Elevate**, empowering student developers, researchers, and engineers. Built with a premium, high-performance tech stack focused on smooth interactions and modern developer aesthetics.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: React 18 + Vite (Fast HMR & Optimized Build)
- **Styling**: Vanilla CSS (CSS Variables for tokens, Glassmorphism, Responsive Grid/Flex)
- **Smooth Scroll**: **Lenis** (by Studio Freight) — buttery smooth inertia scrolling synced with GSAP.
- **Animations**: **GSAP** (GreenSock Animation Platform) + ScrollTrigger for scroll-based reveals.
- **3D / WebGL**: **Three.js** (Used for interactive shader backgrounds).
- **Icons**: Lucide React.

### Typography
- **Plus Jakarta Sans**: Primary UI font for headings, body, and UI components.
- **Space Grotesk**: Bold, geometric font used for numbers, stats, and scores.
- **JetBrains Mono**: Monospace font used for code blocks and the interactive terminal.

---

## ✨ Features & React Bits Components

- **FloatingLines WebGL Background (Hero)**: Interactive 3D waving ribbons powered by Three.js. Bends and reacts dynamically to the user's cursor.
- **Lenis Smooth Scroll**: Replaced native scrolling with fluid, high-performance inertia scrolling.
- **StaggeredText**: Character-by-character reveal animation used in the Hero title.
- **ScrollReveal**: GSAP-powered blur-and-fade text reveal for all major section headings (About, Legacy, Knowledge, Challenges, Sponsors).
- **SpeedingText**: Animated number counters for statistics, years, and leaderboard points.
- **Infinite LogoLoop**: High-speed, seamless infinite marquee for technical domains (`Web2`, `Web3`, `AI/ML`, `CyberSec`, `AppDev`, `OpenSource`).
- **Interactive Terminal**: Code studio in the About section with multi-file tabs, live code execution simulation, and copy functionality.
- **Social Proof Marquee**: 3-column vertical infinite scrolling layout in the Sponsors section featuring glassmorphism testimonial cards.
- **Navigation**: Centered glassmorphic pill navbar with a live top ambient gradient bloom, interactive dropdown cards, and Dark/Light theme switch.

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
