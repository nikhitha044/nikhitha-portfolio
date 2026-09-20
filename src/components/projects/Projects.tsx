import { useState } from "react";
import { projects, type Project } from "../../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import styles from "./Projects.module.css";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
      <div className="container">
        <p className="section-label">Projects</p>
        <h2 id="projects-heading" className={styles.heading}>
          Selected work
        </h2>
        <p className={styles.intro}>
          A mix of professional product work and independent machine learning projects.
        </p>

        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setSelected} />
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
