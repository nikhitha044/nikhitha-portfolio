import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "../../data/profile";
import { useActiveSection } from "../../hooks/useActiveSection";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "workday", label: "Workday HCM" },
  { id: "resumes", label: "Resumes" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(SECTION_IDS);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <nav className={`${styles.navPill} glass`} aria-label="Primary">
        <button
          type="button"
          className={styles.logo}
          onClick={() => scrollToSection("home")}
          aria-label="Go to top"
        >
          {profile.name}
        </button>

        <ul className={styles.linkList}>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                className={`${styles.navLink} ${activeId === link.id ? styles.navLinkActive : ""}`}
                onClick={() => scrollToSection(link.id)}
                aria-current={activeId === link.id ? "true" : undefined}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={styles.menuToggle}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        id="mobile-nav-panel"
        className={`${styles.mobilePanel} glass ${menuOpen ? styles.mobilePanelOpen : ""}`}
      >
        <ul className={styles.mobileLinkList}>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                className={`${styles.mobileNavLink} ${activeId === link.id ? styles.navLinkActive : ""}`}
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
