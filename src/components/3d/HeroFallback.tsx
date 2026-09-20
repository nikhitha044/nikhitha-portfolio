import styles from "./HeroFallback.module.css";

/**
 * CSS-only static Aurora glow composition, shown when WebGL is unavailable
 * or when the user prefers reduced motion.
 */
export default function HeroFallback() {
  return (
    <div className={styles.fallback} aria-hidden="true">
      <div className={`${styles.orb} ${styles.orbPurple}`} />
      <div className={`${styles.orb} ${styles.orbCyan}`} />
      <div className={`${styles.orb} ${styles.orbTeal}`} />
      <div className={styles.ring} />
    </div>
  );
}
