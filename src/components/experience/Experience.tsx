import { useState } from "react";
import { experienceMeta, experienceTracks } from "../../data/experience";
import styles from "./Experience.module.css";

const ACCENT_CLASS: Record<string, string> = {
  cyan: styles.accentCyan,
  purple: styles.accentPurple,
  pink: styles.accentPink,
};

export default function Experience() {
  const [activeId, setActiveId] = useState(experienceTracks[0].id);
  const activeTrack = experienceTracks.find((track) => track.id === activeId) ?? experienceTracks[0];

  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-heading">
      <div className="container">
        <p className="section-label">Experience</p>
        <h2 id="experience-heading" className={styles.heading}>
          {experienceMeta.company}
        </h2>
        <p className={styles.meta}>
          {experienceMeta.duration} · {experienceMeta.location}
        </p>

        <div className={styles.tabList} role="tablist" aria-label="Experience tracks">
          {experienceTracks.map((track) => (
            <button
              key={track.id}
              type="button"
              role="tab"
              id={`tab-${track.id}`}
              aria-selected={activeId === track.id}
              aria-controls={`panel-${track.id}`}
              className={`${styles.tab} ${activeId === track.id ? styles.tabActive : ""} ${ACCENT_CLASS[track.accent]}`}
              onClick={() => setActiveId(track.id)}
            >
              <span className={styles.tabIndex}>{track.index}</span>
              {track.title}
            </button>
          ))}
        </div>

        <div
          key={activeTrack.id}
          role="tabpanel"
          id={`panel-${activeTrack.id}`}
          aria-labelledby={`tab-${activeTrack.id}`}
          className={`${styles.panel} glass ${styles.panelEnter}`}
        >
          <p className={styles.summary}>{activeTrack.summary}</p>
          <ul className={styles.bulletList}>
            {activeTrack.bullets.map((bullet) => (
              <li key={bullet} className={styles.bulletItem}>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
