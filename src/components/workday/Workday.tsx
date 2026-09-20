import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import styles from "./Workday.module.css";

const FLOW_STEPS = [
  { id: "requirement", label: "Business Requirement" },
  { id: "analysis", label: "Functional Analysis" },
  { id: "concept", label: "Workday Concept" },
  { id: "product", label: "Product Requirement" },
  { id: "testing", label: "Testing / Validation" },
] as const;

const CONCEPT_TAGS = [
  "Compensation",
  "Security",
  "Supervisory Organizations",
  "Companies",
  "Cost Centers",
  "Locations",
] as const;

export default function Workday() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const flowRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const steps = Array.from(sectionRef.current.querySelectorAll<HTMLElement>(`.${styles.step}`));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const index = steps.indexOf(target);
            // Stagger each step's reveal, and let its connector "trace" in right after.
            target.style.transitionDelay = `${index * 140}ms`;
            target.classList.add(styles.stepVisible);

            const connector = target.querySelector<HTMLElement>(`.${styles.connector}`);
            if (connector) {
              connector.style.transitionDelay = `${index * 140 + 220}ms`;
              connector.classList.add(styles.connectorVisible);
            }
          }
        });
      },
      { threshold: 0.3 },
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section id="workday" ref={sectionRef} className={styles.section} aria-labelledby="workday-heading">
      <div className="container">
        <p className="section-label">Workday HCM</p>
        <h2 id="workday-heading" className={styles.heading}>
          A functional perspective
        </h2>
        <p className={styles.intro}>
          How a business need moves from a raw requirement to a validated outcome within a
          Workday HCM context.
        </p>

        <ol
          ref={flowRef}
          className={`${styles.flow} ${reducedMotion ? styles.flowStatic : ""}`}
        >
          {FLOW_STEPS.map((step, index) => (
            <li
              key={step.id}
              className={`${styles.step} ${reducedMotion ? styles.stepVisible : ""}`}
            >
              <div className={styles.stepBadge}>{index + 1}</div>
              <span className={styles.stepLabel}>{step.label}</span>
              {index < FLOW_STEPS.length - 1 && (
                <div
                  className={`${styles.connector} ${reducedMotion ? styles.connectorVisible : ""}`}
                  aria-hidden="true"
                >
                  <div className={styles.connectorFill} />
                </div>
              )}
            </li>
          ))}
        </ol>

        <div className={styles.conceptBlock}>
          <h3 className={styles.conceptHeading}>Core concepts explored</h3>
          <div className={styles.tagList}>
            {CONCEPT_TAGS.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
