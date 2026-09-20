// Core identity data — single source of truth for name, roles, contact links, and hero copy.

export const YEARS_OF_EXPERIENCE = "1 Year" as const;

/** Raw WhatsApp number (with country code, as typed on the resume). */
export const whatsappNumber: string = "+91 6300654243";

/** wa.me deep link — international format, digits only, no spaces/symbols. */
export const whatsappLink: string = "https://wa.me/916300654243";

export const profile = {
  name: "Jangam Nikhitha",
  nameUpper: "JANGAM NIKHITHA",
  location: "Hyderabad, India",
  email: "nikhithajangam04@gmail.com",
  linkedin: "https://www.linkedin.com/in/nikhitha-jangam-856201246/",
  github: "https://github.com/nikhitha044",
  whatsappNumber,
  whatsappLink,
  roles: ["Frontend Developer", "Workday HCM Functional", "Recruitment"],
  rolesLine: "FRONTEND DEVELOPER · WORKDAY HCM FUNCTIONAL · RECRUITMENT",
  eyebrow: "AVAILABLE FOR OPPORTUNITIES",
  tagline:
    "Building digital products, understanding business systems, and connecting people with technology.",
  company: "Lakkshions IT Private Limited",
  experienceLength: YEARS_OF_EXPERIENCE,
} as const;

export const heroCtas = [
  { label: "Explore My Work", target: "projects" },
  { label: "View Resumes", target: "resumes" },
  { label: "Contact Me", target: "contact" },
] as const;

export const education = {
  degree: "B.Tech, Artificial Intelligence & Data Science",
  institution: "Seshadri Rao Gudlavalleru Engineering College (JNTU Kakinada)",
  duration: "2021 – 2025",
  cgpa: "8.3 / 10",
} as const;

export const certifications = [
  "Machine Learning with Python — EDX",
  "Programming Essentials in Python — Cisco",
  "Java Full Stack Development — Wipro Talent Next",
  "Accenture North America Data Analytics and Visualization Job Simulation — Forage (2025)",
  "AI & Cyber Security — Medical & Engineering Researchers Society",
  "TensorFlow Machine Learning Bootcamp — GDSC TFUG HYD",
  "Data Science using Python — Brainovision Solutions",
] as const;
