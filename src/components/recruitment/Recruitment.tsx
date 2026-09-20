import { Search, MessageSquare, CalendarCheck, Link2, Megaphone, Users2 } from "lucide-react";
import styles from "./Recruitment.module.css";

const RECRUITMENT_ITEMS = [
  { icon: Search, label: "Candidate Sourcing" },
  { icon: MessageSquare, label: "Candidate Outreach & Communication" },
  { icon: Users2, label: "IT Recruitment" },
  { icon: CalendarCheck, label: "Interview Coordination" },
  { icon: Link2, label: "LinkedIn Profile Management" },
  { icon: Megaphone, label: "LinkedIn Job Posting" },
] as const;

export default function Recruitment() {
  return (
    <section id="recruitment" className={styles.section} aria-labelledby="recruitment-heading">
      <div className="container">
        <p className="section-label">People & Talent</p>
        <h2 id="recruitment-heading" className={styles.heading}>
          Connecting people with technology
        </h2>
        <p className={styles.intro}>
          Alongside development and functional work, I've supported IT recruitment pipelines —
          from first outreach to interview coordination.
        </p>

        <div className={styles.grid}>
          {RECRUITMENT_ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className={`${styles.item} glass`}>
              <Icon size={20} strokeWidth={1.75} className={styles.icon} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
