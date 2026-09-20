import { Code2, Network, Users } from "lucide-react";
import styles from "./Dimensions.module.css";

const DIMENSIONS = [
  {
    id: "build",
    icon: Code2,
    title: "Build",
    accent: styles.accentCyan,
    description:
      "Frontend development with React.js and TypeScript — turning requirements and designs into working, animated interfaces.",
  },
  {
    id: "understand",
    icon: Network,
    title: "Understand",
    accent: styles.accentPurple,
    description:
      "Workday HCM functional research — studying tenant process flows and translating business requirements into product documentation.",
  },
  {
    id: "connect",
    icon: Users,
    title: "Connect",
    accent: styles.accentPink,
    description:
      "Technical recruitment — sourcing, screening, and coordinating with candidates to help build the teams behind these systems.",
  },
] as const;

export default function Dimensions() {
  return (
    <section className={styles.section} aria-label="Areas of focus">
      <div className="container">
        <div className={styles.grid}>
          {DIMENSIONS.map(({ id, icon: Icon, title, accent, description }) => (
            <article key={id} className={`${styles.card} ${accent} glass`}>
              <div className={styles.iconWrap}>
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.description}>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
