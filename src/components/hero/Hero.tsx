import { lazy, Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { profile, heroCtas } from "../../data/profile";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import HeroFallback from "../3d/HeroFallback";
import styles from "./Hero.module.css";

const GeometricShards = lazy(() => import("../3d/GeometricShards"));

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    if (reducedMotion) {
      gsap.set(
        rootRef.current.querySelectorAll(`.${styles.animate}`),
        { opacity: 1, y: 0 },
      );
      return;
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          `.${styles.eyebrow}`,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
        )
        .fromTo(
          `.${styles.name}`,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.35",
        )
        .fromTo(
          `.${styles.roles}`,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          `.${styles.tagline}`,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.35",
        )
        .fromTo(
          `.${styles.ctas}`,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.35",
        );
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="home" ref={rootRef} className={styles.hero} aria-label="Introduction">
      <div className={styles.sceneLayer}>
        <Suspense fallback={<HeroFallback />}>
          <GeometricShards />
        </Suspense>
      </div>

      <div className={`container ${styles.content}`}>
        <p className={`${styles.eyebrow} ${styles.animate} section-label`}>{profile.eyebrow}</p>
        <h1 className={`${styles.name} ${styles.animate}`}>{profile.nameUpper}</h1>
        <p className={`${styles.roles} ${styles.animate}`}>{profile.rolesLine}</p>
        <p className={`${styles.tagline} ${styles.animate}`}>{profile.tagline}</p>

        <div className={`${styles.ctas} ${styles.animate}`}>
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
  );
}
