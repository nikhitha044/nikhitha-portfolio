import { skillGroups } from "../../data/skills";
import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-heading">
      <div className="container">
        <p className="section-label">Skills</p>
        <h2 id="skills-heading" className={styles.heading}>
          Toolkit
        </h2>

        <div className={styles.grid}>
          {skillGroups.map((group) => (
            <div key={group.id} className={`${styles.group} glass`}>
              <h3 className={styles.groupTitle}>{group.category}</h3>
              <div className={styles.tagList}>
                {group.skills.map((skill) => (
                  <span key={skill} className={styles.tag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
