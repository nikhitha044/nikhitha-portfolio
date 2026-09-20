// Project data. `link` is intentionally always null — no public URLs exist for the
// professional projects, and no fake/placeholder links should ever be invented.

export interface Project {
  id: string;
  title: string;
  role: string;
  category: "Professional" | "Machine Learning";
  description: string;
  details: string;
  tech: string[];
  link: null;
}

export const projects: Project[] = [
  {
    id: "hrms",
    title: "HRMS · illumiLIT HRMS",
    role: "Frontend Developer / Functional Contributor",
    category: "Professional",
    description:
      "An HRMS product built around Workday-oriented HCM requirements, combining frontend development with functional research.",
    details:
      "Contributed to the frontend build of an HRMS/LMS product using React.js, TypeScript, HTML, and CSS, alongside functional analysis and BRD documentation. Supported product requirement mapping informed by Workday HCM concepts such as Supervisory Organizations, Compensation, and Security, helping bridge functional understanding with UI implementation.",
    tech: ["React.js", "TypeScript", "HTML5", "CSS3", "Functional Analysis", "BRD Documentation"],
    link: null,
  },
  {
    id: "mediaops",
    title: "MediaOps · illumiLIT MediaOps",
    role: "Frontend Developer",
    category: "Professional",
    description:
      "A media operations product with a React-based frontend integrated with Python backend services via REST APIs.",
    details:
      "Built frontend interfaces using React.js, HTML, and CSS, integrating with REST APIs backed by Python services. Researched and implemented interactive animation concepts, including 3D animation experiences, to enhance the product's web interface.",
    tech: ["React.js", "HTML5", "CSS3", "REST APIs", "Web Animation"],
    link: null,
  },
  {
    id: "flowx",
    title: "FlowX",
    role: "Frontend Developer",
    category: "Professional",
    description:
      "A web product where interactive and 3D animation concepts were explored to create a more engaging interface experience.",
    details:
      "Contributed to FlowX's web pages by researching and implementing interactive UI and 3D animation concepts, focused on creating an engaging, modern user experience within the constraints of the product's frontend stack.",
    tech: ["React.js", "JavaScript", "3D Animation Concepts", "Interactive UI"],
    link: null,
  },
  {
    id: "water-potability",
    title: "Water Potability Prediction Using Voting Classifier",
    role: "Machine Learning Project",
    category: "Machine Learning",
    description:
      "A Voting Classifier combining Gradient Boosting and Random Forest to predict water potability, reaching 91% accuracy.",
    details:
      "Built a Voting Classifier combining Gradient Boosting and Random Forest to predict water potability, achieving 91% accuracy. Applied Explainable AI techniques to interpret model predictions and improve transparency of the decision-making process.",
    tech: ["Python", "Gradient Boosting", "Random Forest", "Voting Classifier", "Explainable AI"],
    link: null,
  },
  {
    id: "churn-prediction",
    title: "Customer Churn Prediction – Telecom Sector",
    role: "Machine Learning Project",
    category: "Machine Learning",
    description:
      "A Stacking Classifier combining Random Forest, XGBoost, and SVM to predict telecom customer churn with 80% accuracy.",
    details:
      "Combined Random Forest, XGBoost, and SVM through a Stacking Classifier to predict customer churn in the telecom sector, achieving 80% accuracy. Built a real-time prediction interface using Gradio to make the model accessible for interactive testing.",
    tech: ["Python", "Random Forest", "XGBoost", "SVM", "Stacking Classifier", "Gradio"],
    link: null,
  },
];
