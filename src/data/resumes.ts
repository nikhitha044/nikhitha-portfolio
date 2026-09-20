// Resume entries. PDF files are referenced by path but must be manually added to
// public/resumes/ — see public/resumes/README.md for the exact filenames required.

export interface ResumeEntry {
  id: string;
  title: string;
  description: string;
  file: string;
}

export const resumes: ResumeEntry[] = [
  {
    id: "frontend",
    title: "Frontend Developer",
    description:
      "React.js, TypeScript, and frontend engineering experience across HRMS, MediaOps, and FlowX products.",
    file: "/resumes/Nikhitha_Jangam_IT_Frontend_Resume_Updated.pdf",
  },
  {
    id: "workday",
    title: "Workday HCM Functional",
    description:
      "Functional research, tenant analysis, and documentation experience across core Workday HCM concepts.",
    file: "/resumes/Nikhitha_Jangam_Workday_HCM_Functional_Resume_Updated.pdf",
  },
  {
    id: "hr",
    title: "HR / Recruitment",
    description:
      "Candidate sourcing, outreach, and interview coordination experience for IT recruitment pipelines.",
    file: "/resumes/Nikhitha_Jangam_Non_IT_HR_Resume_Updated.pdf",
  },
];
