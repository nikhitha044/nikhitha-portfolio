// Skills grouped by category. Tag/pill lists only — no percentages or proficiency bars.

export interface SkillGroup {
  id: string;
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    category: "Frontend",
    skills: [
      "React.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Web Animations",
      "3D Animation Concepts",
      "Interactive UI",
    ],
  },
  {
    id: "api-backend",
    category: "API / Backend",
    skills: ["REST APIs", "Python", "SQL", "MySQL", "DBMS"],
  },
  {
    id: "functional",
    category: "Functional",
    skills: [
      "Workday HCM Functional Experience",
      "Requirements Analysis",
      "Tenant Research",
      "Functional Testing Support",
      "BRD / PRD Documentation",
      "Business Process Understanding",
      "Product Requirement Mapping",
    ],
  },
  {
    id: "design-experience",
    category: "Design / Experience",
    skills: ["Figma-to-UI Implementation", "Interactive Design Concepts", "Animation Design"],
  },
  {
    id: "recruitment",
    category: "Recruitment",
    skills: [
      "Candidate Sourcing",
      "Candidate Outreach",
      "IT Recruitment",
      "Interview Coordination",
      "Candidate Communication",
      "Profile Screening Support",
      "Job Posting",
      "LinkedIn Profile Management",
    ],
  },
  {
    id: "tools",
    category: "Tools",
    skills: ["Git", "GitHub", "VS Code"],
  },
];
