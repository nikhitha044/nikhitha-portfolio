import { lazy, Suspense, useState } from "react";
import { profile, heroCtas } from "../../data/profile";
import HeroFallback from "../3d/HeroFallback";
import styles from "./HeroPreviewPage.module.css";

const AuroraWaves = lazy(() => import("../3d/previews/AuroraWaves"));
const Constellation = lazy(() => import("../3d/previews/Constellation"));
const GeometricShards = lazy(() => import("../3d/GeometricShards"));

type ConceptId = "waves" | "constellation" | "shards";

const CONCEPTS: { id: ConceptId; label: string }[] = [
  { id: "waves", label: "Aurora Waves" },
  { id: "constellation", label: "Constellation" },
  { id: "shards", label: "Shards" },
];

/**
 * Standalone comparison page for candidate hero-animation replacements.
 *
 * Not linked from the site nav — reached only via the `?preview=hero` query
 * param (see App.tsx). Reuses the exact hero copy/layout from
 * `components/hero/Hero.tsx` so the only variable being judged is the
 * background animation, not the text. Only the selected concept is
 * mounted at a time (each is React.lazy + Suspense), so switching tabs
 * doesn't leave inactive concepts running in the background.
 *
 * This scaffolding (tab state, layout) is intentionally separate from the
 * concept components themselves — each concept's default export takes no
 * props and renders full-bleed, so whichever one is chosen can be dropped
 * into Hero.tsx's `.sceneLayer` in place of `HeroScene` with no changes to
 * the concept file itself.
 */
export default function HeroPreviewPage() {
  const [active, setActive] = useState<ConceptId>("waves");

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={styles.page}>
      <div className={styles.notice} role="note">
        Internal preview — hero animation concepts. Not part of the live site.
      </div>

      <nav className={styles.tabs} aria-label="Hero animation concept selector">
        {CONCEPTS.map((concept) => (
          <button
            key={concept.id}
            type="button"
            className={`${styles.tab} ${active === concept.id ? styles.tabActive : ""}`}
            onClick={() => setActive(concept.id)}
            aria-pressed={active === concept.id}
          >
            {concept.label}
          </button>
        ))}
      </nav>

      <section className={styles.hero} aria-label="Introduction (preview)">
        <div className={styles.sceneLayer}>
          <Suspense fallback={<HeroFallback />}>
            {active === "waves" && <AuroraWaves />}
            {active === "constellation" && <Constellation />}
            {active === "shards" && <GeometricShards />}
          </Suspense>
        </div>

        <div className={`container ${styles.content}`}>
          <p className={`${styles.eyebrow} section-label`}>{profile.eyebrow}</p>
          <h1 className={styles.name}>{profile.nameUpper}</h1>
          <p className={styles.roles}>{profile.rolesLine}</p>
          <p className={styles.tagline}>{profile.tagline}</p>

          <div className={styles.ctas}>
            {heroCtas.map((cta, index) => (
              <button
                key={cta.target}
                type="button"
                className={index === 0 ? styles.ctaPrimary : styles.ctaSecondary}
                onClick={() => scrollToSection(cta.target)}
              >
                {cta.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
