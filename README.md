# Shyam Yadav — Portfolio

Personal portfolio website built with Gatsby, React, and styled-components. Inspired by [Brittany Chiang's v4](https://github.com/bchiang7/v4).

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Gatsby v3 + React 17 |
| Styling | styled-components v5 (CSS-in-JS) |
| Content | Markdown files via gatsby-transformer-remark |
| Data | GraphQL (Gatsby's built-in layer) |
| Animations | ScrollReveal + Anime.js + react-transition-group |
| SEO | react-helmet + gatsby-plugin-manifest + sitemap |
| Deployment | Netlify (static build) |

## 📁 Project Structure

```
shyam-portfolio/
├── content/               ← Markdown "CMS"
│   ├── featured/          ← 3 featured projects
│   ├── jobs/              ← Work experience entries
│   └── projects/          ← All other projects (archive)
├── src/
│   ├── components/
│   │   ├── sections/      ← hero, about, jobs, featured, projects, contact
│   │   ├── icons/         ← SVG icon components
│   │   └── nav, layout, menu, social, email, footer, head
│   ├── hooks/             ← useScrollDirection, usePrefersReducedMotion, useOnClickOutside
│   ├── styles/            ← variables, GlobalStyle, mixins, theme, fonts, TransitionStyles
│   ├── pages/             ← index.js, 404.js, archive.js
│   ├── templates/         ← post.js
│   ├── utils/             ← sr.js (ScrollReveal singleton), index.js helpers
│   └── config.js          ← email, navLinks, socialMedia, srConfig, colors
├── static/                ← resume.pdf, og.png, robots.txt
├── gatsby-config.js
├── gatsby-node.js         ← createPages + Webpack aliases
├── gatsby-browser.js      ← ThemeProvider wrapper
└── gatsby-ssr.js          ← SSR parity
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16 (use `nvm use` to switch automatically)
- npm or yarn

### Install & Run

```bash
# Clone the repo
git clone https://github.com/shyamyadav/portfolio.git
cd shyam-portfolio

# Install dependencies
npm install

# Start the dev server (http://localhost:8000)
npm run develop
```

### Build for Production

```bash
npm run build    # outputs to /public
npm run serve    # preview the production build locally
```

## ✏️ Customisation Guide

### 1. Personal info — `src/config.js`
Update your email, social links, and nav items here.

### 2. Work experience — `content/jobs/<Company>/index.md`
Each folder is one job. Frontmatter fields:
```yaml
---
date: '2023-01-01'
title: 'Job Title'
company: 'Company Name'
location: 'City, Country'
range: 'Jan 2023 — Present'
url: 'https://company.com'
---
- Bullet point accomplishment
```

### 3. Featured projects — `content/featured/<Project>/index.md`
```yaml
---
date: '2024-01-01'
title: 'Project Name'
cover: ./cover.png          # add a screenshot image here
github: 'https://github.com/...'
external: 'https://live-demo.com'
tech:
  - React
  - Node.js
---
Short project description (becomes the description card).
```

### 4. Other projects — `content/projects/<Project>/index.md`
Same as above but also include `showInProjects: true`.

### 5. Your photo — `src/components/sections/about.js`
Replace the `<div className="avatar-box">SY</div>` placeholder with:
```jsx
import { StaticImage } from 'gatsby-plugin-image';

<StaticImage
  src="../../images/me.jpg"
  width={300}
  quality={95}
  formats={['AUTO', 'WEBP', 'AVIF']}
  alt="Shyam Yadav"
/>
```

### 6. Resume — `static/resume.pdf`
Drop your resume PDF here. The nav "Resume ↗" link points to `/resume.pdf`.

### 7. OG image — `static/og.png`
Replace with a 1200×630px image for social sharing previews.

## 🚢 Deployment (Netlify)

1. Push to GitHub
2. Connect the repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `public`
5. Done — Netlify auto-deploys on every push to `main`

## 🎨 Colour Palette

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0d0d0f` | Page background |
| `--bg2` | `#141418` | Cards, panels |
| `--bg3` | `#1c1c22` | Subtle insets |
| `--accent` | `#c8ff57` | Lime green accent |
| `--accent2` | `#57ffd4` | Teal inline links |
| `--text` | `#f0efe8` | Primary text |
| `--muted` | `#888880` | Body / secondary text |

## 📄 License

MIT — feel free to fork and make it your own.
Credit appreciated but not required.
