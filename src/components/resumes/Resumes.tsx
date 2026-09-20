import { FileText, ExternalLink } from "lucide-react";
import { resumes } from "../../data/resumes";
import { trackEvent } from "../../lib/analytics";
import styles from "./Resumes.module.css";

export default function Resumes() {
  return (
    <section id="resumes" className={styles.section} aria-labelledby="resumes-heading">
      <div className="container">
        <p className="section-label">Resumes</p>
        <h2 id="resumes-heading" className={styles.heading}>
          Choose your resume
        </h2>
        <p className={styles.intro}>
          Depending on what you're looking for, pick the resume most relevant to your context.
        </p>

        <div className={styles.grid}>
          {resumes.map((resume) => (
            <div key={resume.id} className={`${styles.card} glass`}>
              <div className={styles.iconWrap}>
                <FileText size={22} strokeWidth={1.75} />
              </div>
              <h3 className={styles.title}>{resume.title}</h3>
              <p className={styles.description}>{resume.description}</p>
              <div className={styles.actions}>
                <a
                  href={resume.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.viewButton}
                  onClick={() => trackEvent("resume_view", { resume: resume.id })}
                >
                  <ExternalLink size={16} />
                  View Resume
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
