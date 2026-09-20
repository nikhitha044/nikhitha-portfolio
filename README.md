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
- **Three.js** + **@react-three/fiber** + **@react-three/drei** — interactive 3D hero scene (Geometric Shards)
- **GSAP** + **ScrollTrigger** — scroll-driven and entrance animation
- **Resend** — transactional email for the contact form, called from a Vercel serverless function (`api/contact.ts`)
- **lucide-react** — icon set
- **CSS Modules** — component-scoped styling on top of a shared design-token system (`src/styles/tokens.css`)

No CSS framework (e.g. Tailwind) is used — styling is hand-built against the Aurora design tokens for full control over the glassmorphism look.

## Features

- Cinematic full-screen hero with an interactive Three.js scene — a cluster of translucent glass "shards" with pointer-parallax and scroll-driven drift/rotation/fade — with a static CSS fallback for `prefers-reduced-motion` or no WebGL support
- Floating glass navbar with scroll-spy active-section highlighting and an animated mobile menu
- Three-dimension storytelling (Build / Understand / Connect) tying frontend, Workday HCM, and recruitment work together
- Interactive experience timeline for the 1 year at Lakkshions IT Private Limited, split into Frontend, Workday HCM, and Recruitment tracks
- Project showcase (HRMS, MediaOps, FlowX, and two ML projects) with accessible modals — no fabricated links; unlisted/private work is labeled "Private / Professional Project"
- Dedicated Workday HCM functional-flow section (Business Requirement → Functional Analysis → Workday Concept → Product Requirement → Testing/Validation) with a scroll-triggered animated connector line
- Grouped skills display (no invented proficiency percentages)
- Resume center with three role-specific resumes (View only — opens the PDF in a new tab)
- Functional contact form (name, email, company, subject, message) that emails submissions via a Resend-backed serverless function, plus direct Email / LinkedIn / GitHub / WhatsApp CTAs — no database, no stored submissions
- Privacy-conscious analytics event stubs (`src/lib/analytics.ts`), fully disabled by default and a no-op unless `VITE_ANALYTICS_ENABLED=true` is set
- No authentication, no user accounts, no database — all content lives in typed TypeScript files under `src/data/`
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

## Resume Files

The Resume Center reads three PDFs from `public/resumes/`, already present in this repo:

- `Nikhitha_Jangam_IT_Frontend_Resume_Updated.pdf`
- `Nikhitha_Jangam_Workday_HCM_Functional_Resume_Updated.pdf`
- `Nikhitha_Jangam_Non_IT_HR_Resume_Updated.pdf`

## Contact Form Setup

The contact form sends email through [Resend](https://resend.com) via the serverless function at `api/contact.ts`. Copy `.env.example` to `.env.local` (for `vercel dev`, or configure these directly in your hosting provider's dashboard):

- `RESEND_API_KEY` — **required** for the form to send email. Without it, the form shows a friendly "not configured yet" message instead of failing.
- `CONTACT_TO_EMAIL` — optional, the inbox that receives submissions. Defaults to `nikhithajangam04@gmail.com` if unset.
- `VITE_ANALYTICS_ENABLED` — optional, enables the analytics event stub. Defaults to disabled.

To test the contact form locally with the serverless function actually running, use the Vercel CLI instead of plain `vite`:

```bash
npx vercel dev
```

Plain `npm run dev` only serves the frontend — `/api/contact` will 404 under it, since there's no serverless runtime to execute the function. This is expected, not a bug.

No database or persistent storage is used anywhere in the contact flow — submitted messages pass straight through to a single outbound email and are not stored.

## Project Structure

```
api/
  contact.ts      serverless function — validates input, sends email via Resend
src/
  components/
    navigation/   about/   dimensions/   experience/
    projects/     workday/ skills/       recruitment/
    resumes/      contact/ footer/       3d/
  data/           profile, experience, projects, skills, resumes
  hooks/          useReducedMotion, useMediaQuery, useScrollProgress,
                  useActiveSection, usePageVisible, useWebGLSupport
  lib/            contact.ts (form submit client), analytics.ts (event stub)
  styles/         globals.css, tokens.css (design system source of truth)
public/
  resumes/        resume PDFs
```

Content lives in `src/data/*.ts` as typed constants — not hardcoded inside components — so copy changes don't require touching component code.

## Source Control & Deployment

Source code lives on **GitHub** (personal account). It has no connection to any company GitLab or internal infrastructure, and none should be added.

The deployment target is **Vercel**, chosen specifically because the contact form relies on Vercel's serverless function convention (`api/*.ts`) paired with Resend for email delivery. Deployment flow:

1. Push this repository to GitHub.
2. Import the GitHub repository into Vercel.
3. Add `RESEND_API_KEY` (and optionally `CONTACT_TO_EMAIL`) as environment variables in the Vercel project settings.
4. Deploy — Vercel auto-detects the Vite build and the `api/` serverless function with no extra config.
5. Verify the live contact form, resume links, navigation, and 3D hero animation on the deployed URL before pointing a custom domain at it.

GitHub Pages is not used, since it cannot run the serverless contact-form function.

## Notes

- Experience is stated as exactly **1 Year** at **Lakkshions IT Private Limited** throughout the site — this figure should not be changed without an explicit update to `src/data/profile.ts` and `src/data/experience.ts`.
- No confidential company information (internal URLs, APIs, credentials, tenant screenshots, client names, or proprietary architecture) is present anywhere in this codebase or content.
- Backend/database implementation is a separate, later phase and intentionally out of scope for this repository at this stage.
