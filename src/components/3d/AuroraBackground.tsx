import styles from "./AuroraBackground.module.css";

/**
 * Fixed full-viewport ambient background: slow-moving CSS radial-gradient
 * blobs sitting behind every section. Pure CSS (no WebGL) for performance.
 * Animation is disabled globally via prefers-reduced-motion in globals.css'
 * scoped duration tokens, plus an explicit override here.
 */
export default function AuroraBackground() {
  return (
    <div className={styles.background} aria-hidden="true">
      <div className={`${styles.blob} ${styles.blobPurple}`} />
      <div className={`${styles.blob} ${styles.blobCyan}`} />
      <div className={`${styles.blob} ${styles.blobTeal}`} />
      <div className={`${styles.blob} ${styles.blobPink}`} />
      <div className={styles.grain} />
    </div>
  );
}
