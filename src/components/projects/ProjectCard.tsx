import { useRef, useState, type MouseEvent } from "react";
import type { Project } from "../../data/projects";
import { trackEvent } from "../../lib/analytics";
import styles from "./Projects.module.css";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 8 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const handleOpen = () => {
    trackEvent("project_opened", { project: project.id });
    onOpen(project);
  };

  return (
    <article
      ref={cardRef}
      className={`${styles.card} glass`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
    >
      <div className={styles.cardHeader}>
        <span className={styles.category}>{project.category}</span>
        <span className={styles.badge}>Private / Professional Project</span>
      </div>
      <h3 className={styles.cardTitle}>{project.title}</h3>
      <p className={styles.cardRole}>{project.role}</p>
      <p className={styles.cardDescription}>{project.description}</p>
      <div className={styles.tagList}>
        {project.tech.slice(0, 4).map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
      <button type="button" className={styles.detailsButton} onClick={handleOpen}>
        View details
      </button>
    </article>
  );
}
