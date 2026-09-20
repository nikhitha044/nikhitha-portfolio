import { useReducedMotion } from "../../../hooks/useReducedMotion";
import styles from "./AuroraWaves.module.css";

/**
 * Concept A — Flowing Aurora Waves.
 *
 * Pure CSS/SVG hero backdrop: layered translucent ribbons in purple, cyan
 * and teal that drift slowly across the frame with soft blur, like slow
 * northern-lights bands. No 3D object, no sphere — just atmosphere.
 *
 * Animation is driven entirely by CSS `@keyframes` (cheap, compositor-only
 * transforms) rather than canvas redraws, so there is no per-frame JS work.
 * `prefers-reduced-motion` freezes every ribbon to its resting frame via the
 * shared `useReducedMotion` hook (belt) plus a CSS media query (suspenders,
 * in case this component is ever rendered outside React).
 */
export default function AuroraWaves() {
  const reducedMotion = useReducedMotion();

  return (
    <div className={styles.wrap} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <linearGradient id="ribbonPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--aurora-purple)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--aurora-blue)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="ribbonCyan" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--aurora-cyan)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--aurora-teal)" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="ribbonTeal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--aurora-teal)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--aurora-purple)" stopOpacity="0.06" />
          </linearGradient>
          <filter id="softBlurLg" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="38" />
          </filter>
          <filter id="softBlurMd" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="24" />
          </filter>
        </defs>

        <g
          className={reducedMotion ? undefined : styles.ribbonDriftSlow}
          filter="url(#softBlurLg)"
        >
          <path
            d="M -200 260 C 250 120, 550 420, 900 260 S 1500 100, 1900 300 L 1900 900 L -200 900 Z"
            fill="url(#ribbonPurple)"
          />
        </g>

        <g
          className={reducedMotion ? undefined : styles.ribbonDriftMed}
          filter="url(#softBlurLg)"
        >
          <path
            d="M -200 520 C 200 380, 600 620, 1000 480 S 1500 340, 1900 540 L 1900 900 L -200 900 Z"
            fill="url(#ribbonCyan)"
          />
        </g>

        <g
          className={reducedMotion ? undefined : styles.ribbonDriftFast}
          filter="url(#softBlurMd)"
        >
          <path
            d="M -200 680 C 300 600, 700 760, 1100 660 S 1600 560, 1900 700 L 1900 900 L -200 900 Z"
            fill="url(#ribbonTeal)"
          />
        </g>

        <g
          className={reducedMotion ? undefined : styles.ribbonDriftSlow}
          filter="url(#softBlurMd)"
          opacity="0.6"
        >
          <path
            d="M -200 120 C 250 40, 500 180, 850 90 S 1400 10, 1900 140 L 1900 0 L -200 0 Z"
            fill="url(#ribbonPurple)"
          />
        </g>
      </svg>

      <div className={styles.vignette} />
    </div>
  );
}
