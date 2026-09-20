import { Link2, GitFork, Mail, MessageCircle } from "lucide-react";
import { profile } from "../../data/profile";
import { trackEvent } from "../../lib/analytics";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.name}>{profile.name}</p>
          <p className={styles.role}>{profile.rolesLine}</p>
          <p className={styles.location}>{profile.location}</p>
        </div>

        <div className={styles.links}>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            onClick={() => trackEvent("email_click")}
          >
            <Mail size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            onClick={() => trackEvent("linkedin_click")}
          >
            <Link2 size={18} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            onClick={() => trackEvent("github_click")}
          >
            <GitFork size={18} />
          </a>
          <a
            href={profile.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            onClick={() => trackEvent("whatsapp_click")}
          >
            <MessageCircle size={18} />
          </a>
        </div>

        <p className={styles.copyright}>© {year} {profile.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
