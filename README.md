<div align="center">

<img src="https://raw.githubusercontent.com/aashir-athar/aashir-athar.github.io/master/src/assets/hero.png" alt="aashir-athar.github.io developer portfolio website hero preview" width="640" />

<h1>🪐 aashir-athar.github.io</h1>

<p><strong>A modern, animated developer portfolio website built with React 19, TypeScript, Vite & Tailwind CSS — deployed free on GitHub Pages.</strong></p>

[![Stars](https://img.shields.io/github/stars/aashir-athar/aashir-athar.github.io?style=for-the-badge&logo=github&color=FFD33D)](https://github.com/aashir-athar/aashir-athar.github.io/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/aashir-athar/aashir-athar.github.io?style=for-the-badge&color=8b5cf6)](https://github.com/aashir-athar/aashir-athar.github.io/commits/master)
[![Top language](https://img.shields.io/github/languages/top/aashir-athar/aashir-athar.github.io?style=for-the-badge&logo=typescript&logoColor=white)](https://github.com/aashir-athar/aashir-athar.github.io)
[![Repo size](https://img.shields.io/github/repo-size/aashir-athar/aashir-athar.github.io?style=for-the-badge&color=06b6d4)](https://github.com/aashir-athar/aashir-athar.github.io)
[![Deploy](https://img.shields.io/badge/deploy-GitHub_Pages-222?style=for-the-badge&logo=githubpages&logoColor=white)](https://aashir-athar.github.io)

<a href="https://aashir-athar.github.io"><strong>🌐 Live Website</strong></a> ·
<a href="https://github.com/aashir-athar/aashir-athar.github.io/issues"><strong>Report Bug</strong></a> ·
<a href="https://github.com/aashir-athar/aashir-athar.github.io/issues"><strong>Request Feature</strong></a>

</div>

---

A **modern developer portfolio website** for Aashir Athar — a fast, responsive single-page application built with **React 19, TypeScript, and Vite**, styled with **Tailwind CSS v4**, and brought to life with **Framer Motion** animations and a **Three.js** ambient hero. It ships SEO-ready (sitemap, robots, web manifest, Open Graph preview) and deploys automatically to **GitHub Pages**.

> A clean, content-driven personal portfolio template: smooth scroll storytelling, a command palette, a magnetic cursor, and a theme switcher — zero backend, all static.

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| ⚛️ | **React 19 + React Compiler** | Built on the latest React with the React Compiler enabled for automatic memoization |
| 🎬 | **Framer Motion animations** | Scroll-triggered reveals, marquees, and micro-interactions throughout the page |
| 🌌 | **Three.js ambient hero** | A WebGL ambient scene via `@react-three/fiber` for an immersive landing |
| ⌨️ | **Command palette** | Keyboard-driven navigation to jump between sections instantly |
| 🧲 | **Magnetic cursor & scroll progress** | Tactile pointer interactions and a live reading-progress indicator |
| 🌗 | **Light / dark theme** | Persistent theme switching via a custom `useTheme` hook |
| 🧩 | **Data-driven content** | Projects, resume, and process live in typed `src/data` modules — edit data, not markup |
| 🔍 | **SEO ready** | Sitemap, `robots.txt`, web manifest, favicon, and Open Graph preview image included |

---

## 🔗 Live Demo

Visit the deployed portfolio: **[aashir-athar.github.io](https://aashir-athar.github.io)**

<div align="center">
<img src="https://raw.githubusercontent.com/aashir-athar/aashir-athar.github.io/master/public/og-preview.svg" alt="Open Graph social preview card for the developer portfolio website" width="600" />
</div>

---

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white)

| Layer | Technology |
|---|---|
| **Framework** | React 19 + React Compiler |
| **Language** | TypeScript |
| **Build tool** | Vite 8 |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) |
| **Animation** | Framer Motion |
| **3D / WebGL** | Three.js + `@react-three/fiber` |
| **Icons** | `lucide-react` |
| **Linting** | ESLint + `typescript-eslint` |
| **Deployment** | GitHub Pages (`gh-pages` + GitHub Actions) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20 (required by Vite 8)
- **npm** (this project uses `package-lock.json`)

### Installation

```bash
git clone https://github.com/aashir-athar/aashir-athar.github.io.git
cd aashir-athar.github.io
npm install
```

### Run the dev server

```bash
npm run dev
```

Vite will start a local dev server with hot module replacement. Open the printed `localhost` URL in your browser.

---

## 📖 Usage

Common scripts (defined in `package.json`):

```bash
npm run dev       # Start the Vite dev server with HMR
npm run build     # Type-check (tsc -b) and build for production into /dist
npm run preview   # Preview the production build locally
npm run lint      # Lint the codebase with ESLint
npm run deploy    # Build and publish /dist to GitHub Pages (gh-pages)
```

### Make it your own

The content is fully data-driven — update the typed modules in `src/data/` instead of touching components:

```ts
// src/data/projects.ts — add or edit portfolio projects
// src/data/resume.ts   — experience, skills, and resume content
// src/data/process.ts  — your working process / approach
```

Sections live in `src/sections/` (Hero, About, Experience, Projects, Skills, Process, Contact, Footer) and reusable primitives in `src/components/ui/`.

<details>
<summary><strong>Project structure</strong></summary>

```text
src/
├─ App.tsx              # Root layout + section composition
├─ main.tsx             # App entry
├─ components/          # ChapterRail, CommandPalette, MagneticCursor, NavBar, ...
│  └─ ui/               # Badge, Button, Card, Container, Section, Stat, ...
├─ sections/            # Hero, About, Experience, Projects, Skills, Process, Contact, Footer
├─ data/                # projects.ts, resume.ts, process.ts (typed content)
├─ hooks/               # useInView, useTheme, useWindowSize
├─ types/               # shared TypeScript types
└─ assets/              # hero.png and static images
public/                 # favicon.svg, sitemap.xml, robots.txt, site.webmanifest, og-preview.svg, resume.pdf
.github/workflows/      # deploy.yml — GitHub Pages deployment
```

</details>

---

## 🗺️ Roadmap

- [x] React 19 + TypeScript + Vite foundation
- [x] Tailwind CSS v4 design system
- [x] Framer Motion animations & Three.js ambient hero
- [x] Command palette, magnetic cursor & scroll progress
- [x] SEO assets (sitemap, robots, manifest, OG preview)
- [x] Automated GitHub Pages deployment
- [ ] Expanded project case-study modals
- [ ] Lighthouse performance & accessibility pass

---

## 🤝 Contributing

This is a personal portfolio, but suggestions, bug reports, and improvements are welcome.

1. Fork the repository
2. Create a branch (`git checkout -b feat/your-idea`)
3. Commit your changes and push (`git push origin feat/your-idea`)
4. Open a Pull Request

Please open an issue first to discuss any major changes.

---

## 📄 License

No license file is currently included, so all rights are reserved by the author. Please open an issue if you'd like to reuse any part of this codebase.

---

## 👤 Author

**Aashir Athar**

[![GitHub](https://img.shields.io/badge/GitHub-aashir--athar-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/aashir-athar)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-aashirathar-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aashirathar/)
[![X](https://img.shields.io/badge/X_(Twitter)-aashirathar-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/aashirathar)

---

<div align="center">

<sub>Built with React, TypeScript & Vite by <a href="https://github.com/aashir-athar">@aashir-athar</a> · If this portfolio inspired yours, consider leaving a ⭐</sub>

<br/><br/>

<sub><strong>Keywords:</strong> developer portfolio · portfolio website · personal website · React 19 · TypeScript · Vite · Tailwind CSS · Framer Motion · Three.js · GitHub Pages · responsive single-page application · frontend developer portfolio template</sub>

</div>
