# Jangam Nikhitha — Portfolio

Personal portfolio for **Jangam Nikhitha** — Frontend Developer · Workday HCM Functional · Recruitment.
Hyderabad, India.

A premium, dark "Aurora" glassmorphism experience with an interactive 3D hero scene, built to present three connected professional dimensions — **Build** (frontend development), **Understand** (Workday HCM functional), and **Connect** (recruitment / talent acquisition) — as one coherent identity rather than three unrelated resumes.

## Contact

- **Email:** nikhithajangam04@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/nikhitha-jangam-856201246/
- **GitHub:** https://github.com/nikhitha044

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool / dev server
- **Three.js** + **@react-three/fiber** + **@react-three/drei** — interactive 3D hero scene
- **GSAP** — scroll and entrance animation
- **lucide-react** — icon set
- **CSS Modules** — component-scoped styling on top of a shared design-token system (`src/styles/tokens.css`)

No CSS framework (e.g. Tailwind) is used — styling is hand-built against the Aurora design tokens for full control over the glassmorphism look.

## Features

- Cinematic full-screen hero with an interactive Three.js scene (pointer-parallax, auto-rotation, particle field), with a static CSS fallback for `prefers-reduced-motion` or no WebGL support
- Floating glass navbar with scroll-spy active-section highlighting and an animated mobile menu
- Three-dimension storytelling (Build / Understand / Connect) tying frontend, Workday HCM, and recruitment work together
- Interactive experience timeline for the 1 year at Lakkshions IT Private Limited, split into Frontend, Workday HCM, and Recruitment tracks
- Project showcase (HRMS, MediaOps, FlowX, and two ML projects) with accessible modals — no fabricated links; unlisted/private work is labeled "Private / Professional Project"
- Dedicated Workday HCM functional-flow section (Business Requirement → Functional Analysis → Workday Concept → Product Requirement → Testing/Validation)
- Grouped skills display (no invented proficiency percentages)
- Resume center with three role-specific resumes (View + Download)
- Contact section (mailto, LinkedIn, GitHub — no fake contact-form backend)
- Fully responsive (320px–1920px+), keyboard accessible, and respects `prefers-reduced-motion`

## Local Development

Requires Node.js and npm.

```bash
npm install
npm run dev
```

The dev server runs at **http://localhost:5178** (fixed port — configured in `vite.config.ts` with `strictPort: true`, so it will fail rather than silently switch ports if 5178 is already in use).

## Production Build

```bash
npm run build
npm run preview
```

`npm run build` type-checks with `tsc -b` and then builds with Vite. `npm run preview` serves the production build locally on port 5178.

## Resume Files — Action Required

The Resume Center expects three PDFs in `public/resumes/` (see `public/resumes/README.md`):

- `Nikhitha_Jangam_IT_Frontend_Resume_Updated.pdf`
- `Nikhitha_Jangam_Workday_HCM_Functional_Resume_Updated.pdf`
- `Nikhitha_Jangam_Non_IT_HR_Resume_Updated.pdf`

Drop the actual PDF files into that folder using these exact filenames — the View/Download buttons in the Resume Center already point at these paths.

## Project Structure

```
src/
  components/
    navigation/   about/   dimensions/   experience/
    projects/     workday/ skills/       recruitment/
    resumes/      contact/ footer/       3d/
  data/           profile, experience, projects, skills, resumes
  hooks/          useReducedMotion, useMediaQuery, useScrollProgress,
                  useActiveSection, usePageVisible, useWebGLSupport
  styles/         globals.css, tokens.css (design system source of truth)
public/
  resumes/        resume PDFs go here
```

Content lives in `src/data/*.ts` as typed constants — not hardcoded inside components — so copy changes don't require touching component code.

## Deployment

This project deploys to **GitHub** (personal account). It has no connection to any company GitLab or internal infrastructure, and none should be added.

Deployment steps (e.g. GitHub Pages, Vercel, or Netlify) will be set up in a later phase, once the frontend is fully reviewed. A production build is verified working via `npm run build` before any deployment.

## Notes

- Experience is stated as exactly **1 Year** at **Lakkshions IT Private Limited** throughout the site — this figure should not be changed without an explicit update to `src/data/profile.ts` and `src/data/experience.ts`.
- No confidential company information (internal URLs, APIs, credentials, tenant screenshots, client names, or proprietary architecture) is present anywhere in this codebase or content.
- Backend/database implementation is a separate, later phase and intentionally out of scope for this repository at this stage.
