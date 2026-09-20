// Experience data for the single role at Lakkshions IT Private Limited, split into
// three professional tracks. Language is intentionally hedged to reflect functional
// exposure / support work rather than independent ownership of entire systems.

export interface ExperienceTrack {
  id: string;
  index: string;
  title: string;
  accent: "cyan" | "purple" | "pink";
  summary: string;
  bullets: string[];
}

export const experienceMeta = {
  company: "Lakkshions IT Private Limited",
  duration: "1 Year",
  location: "Hyderabad, India",
} as const;

export const experienceTracks: ExperienceTrack[] = [
  {
    id: "frontend",
    index: "01",
    title: "Frontend / Software Development",
    accent: "cyan",
    summary:
      "Built and maintained user-facing interfaces across internal products, working closely with functional and backend teams.",
    bullets: [
      "Developed and maintained UI features using React.js, TypeScript, HTML5, and CSS3 for the HRMS/illumiLIT HRMS and MediaOps/illumiLIT MediaOps products.",
      "Integrated frontend views with REST APIs, coordinating with Python backend services for data exchange.",
      "Contributed to functional requirement analysis and BRD/functional documentation to translate business needs into UI behaviour.",
      "Researched and implemented interactive and 3D animation concepts for the MediaOps and FlowX web experiences.",
      "Worked with SQL/MySQL for data-related debugging and support during feature development.",
      "Applied Figma-to-UI implementation practices to translate design mockups into working interfaces.",
    ],
  },
  {
    id: "workday",
    index: "02",
    title: "Workday HCM Functional",
    accent: "purple",
    summary:
      "Supported Workday HCM functional research and documentation efforts within a tenant environment, contributing to product requirement mapping for an HRMS initiative.",
    bullets: [
      "Conducted functional research within a Workday tenant environment to understand end-to-end HCM process flows.",
      "Explored core Workday HCM concepts including Compensation, Security, Supervisory Organizations, Companies, Cost Centers, and Locations.",
      "Supported functional testing efforts by validating business-process outcomes against expected behaviour.",
      "Contributed to PRD/BRD documentation and product requirement mapping for an HRMS product built around Workday-oriented requirements.",
      "Acted as a functional point of contact for Workday-related queries within the team.",
      "Helped train internal team members on foundational Workday HCM concepts.",
    ],
  },
  {
    id: "recruitment",
    index: "03",
    title: "Recruitment / HR",
    accent: "pink",
    summary:
      "Supported IT recruitment efforts end-to-end, from sourcing to interview coordination, in a fast-moving startup environment.",
    bullets: [
      "Handled candidate sourcing and outreach for IT roles using LinkedIn and other channels.",
      "Conducted initial candidate communication and high-volume recruitment calls.",
      "Supported profile screening and coordinated interview scheduling with hiring stakeholders.",
      "Managed LinkedIn profile activity and job postings to support active hiring pipelines.",
      "Worked cross-functionally with technical and functional teams to align on hiring requirements.",
    ],
  },
];
