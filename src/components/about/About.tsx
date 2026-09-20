import { profile } from "../../data/profile";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className="container">
        <p className="section-label">About</p>
        <h2 id="about-heading" className={styles.heading}>
          A blend of building, understanding, and connecting.
        </h2>

        <div className={styles.grid}>
          <div className={styles.copy}>
            <p>
              I work at the intersection of three disciplines that don't usually sit in one
              profile: frontend development, Workday HCM functional research, and technical
              recruitment. That combination means I don't just build interfaces — I understand
              the business processes and systems those interfaces are meant to represent, and I
              understand the people side of hiring for the roles that build them.
            </p>
            <p>
              On the engineering side, I develop interfaces with React.js and TypeScript, and
              have spent time exploring interactive and 3D animation concepts to make products
              feel more considered. On the functional side, I've spent time inside a Workday
              tenant environment studying HCM process flows — Compensation, Security,
              Supervisory Organizations, Companies, Cost Centers, and Locations — and
              translating that understanding into product requirements and documentation. On
              the people side, I've supported IT recruitment pipelines end-to-end, from
              sourcing to interview coordination.
            </p>
            <p>
              I see these as one skill set, not three separate ones: understanding a system
              well enough to document it, build it, or hire for it.
            </p>
          </div>

          <div className={`${styles.stat} glass`}>
            <span className={styles.statNumber}>{profile.experienceLength}</span>
            <span className={styles.statLabel}>Professional Experience</span>
            <span className={styles.statSub}>{profile.company}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
