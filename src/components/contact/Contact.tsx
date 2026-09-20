import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Mail, Link2, GitFork, MessageCircle, Loader2, CheckCircle2, TriangleAlert } from "lucide-react";
import { profile } from "../../data/profile";
import { submitContactForm } from "../../lib/contact";
import { trackEvent } from "../../lib/analytics";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import styles from "./Contact.module.css";

type FieldName = "name" | "email" | "company" | "subject" | "message";

interface FormState {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<FieldName, string>>;

type SubmitState = "idle" | "submitting" | "success" | "error";

const INITIAL_FORM_STATE: FormState = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.subject.trim()) {
    errors.subject = "Please enter a subject.";
  }

  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (values.message.trim().length > 5000) {
    errors.message = "Message is too long (max 5000 characters).";
  }

  return errors;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLInputElement | HTMLTextAreaElement>>>({});
  const hasOpenedFormRef = useRef(false);
  const reducedMotion = useReducedMotion();

  const [values, setValues] = useState<FormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Scroll-reveal, matching the IntersectionObserver + reduced-motion pattern used in Workday.
  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealVisible);
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (submitState === "success") {
      successHeadingRef.current?.focus();
    }
  }, [submitState]);

  useEffect(() => {
    if (submitState === "error" && Object.keys(errors).length > 0) {
      const order: FieldName[] = ["name", "email", "company", "subject", "message"];
      const firstInvalidField = order.find((field) => errors[field]);
      if (firstInvalidField) {
        fieldRefs.current[firstInvalidField]?.focus();
      }
    }
  }, [submitState, errors]);

  const handleFieldFocus = () => {
    if (!hasOpenedFormRef.current) {
      hasOpenedFormRef.current = true;
      trackEvent("contact_form_opened");
    }
  };

  const handleChange =
    (field: FieldName) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setValues((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitState("error");
      setSubmitError(null);
      return;
    }

    setSubmitState("submitting");
    setSubmitError(null);

    const result = await submitContactForm({
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim() || undefined,
      subject: values.subject.trim(),
      message: values.message.trim(),
    });

    if (result.ok) {
      setSubmitState("success");
      trackEvent("contact_form_submitted");
    } else {
      setSubmitState("error");
      setSubmitError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  const handleSendAnother = () => {
    setValues(INITIAL_FORM_STATE);
    setErrors({});
    setSubmitError(null);
    setSubmitState("idle");
    hasOpenedFormRef.current = false;
  };

  const isSubmitting = submitState === "submitting";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`${styles.section} ${reducedMotion ? styles.revealVisible : ""}`}
      aria-labelledby="contact-heading"
    >
      <div className={`container ${styles.inner}`}>
        <p className="section-label">Contact</p>
        <h2 id="contact-heading" className={styles.heading}>
          Let's build something meaningful
        </h2>
        <p className={styles.location}>{profile.location}</p>

        <div className={styles.layout}>
          <div className={`${styles.card} glass ${styles.reveal}`}>
            <h3 className={styles.cardHeading}>Direct contact</h3>
            <p className={styles.cardSubtext}>
              Prefer a quicker path? Reach out directly through any of these.
            </p>

            <div className={styles.pillList}>
              <a
                href={`mailto:${profile.email}`}
                className={styles.pill}
                onClick={() => trackEvent("email_click")}
              >
                <Mail size={18} />
                <span>
                  <span className={styles.pillLabel}>Email</span>
                  <span className={styles.pillValue}>{profile.email}</span>
                </span>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.pill}
                onClick={() => trackEvent("linkedin_click")}
              >
                <Link2 size={18} />
                <span>
                  <span className={styles.pillLabel}>LinkedIn</span>
                  <span className={styles.pillValue}>View profile</span>
                </span>
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.pill}
                onClick={() => trackEvent("github_click")}
              >
                <GitFork size={18} />
                <span>
                  <span className={styles.pillLabel}>GitHub</span>
                  <span className={styles.pillValue}>View profile</span>
                </span>
              </a>

              <a
                href={profile.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.pill}
                onClick={() => trackEvent("whatsapp_click")}
              >
                <MessageCircle size={18} />
                <span>
                  <span className={styles.pillLabel}>WhatsApp</span>
                  <span className={styles.pillValue}>{profile.whatsappNumber}</span>
                </span>
              </a>
            </div>
          </div>

          <div className={`${styles.formCard} glass ${styles.reveal}`}>
            {submitState === "success" ? (
              <div className={styles.successPanel} role="status">
                <div className={styles.successIcon} aria-hidden="true">
                  <CheckCircle2 size={40} strokeWidth={1.5} />
                </div>
                <h3
                  ref={successHeadingRef}
                  tabIndex={-1}
                  className={styles.successHeading}
                >
                  Message sent
                </h3>
                <p className={styles.successText}>
                  Thanks for reaching out — I'll get back to you as soon as I can.
                </p>
                <button type="button" className={styles.secondaryAction} onClick={handleSendAnother}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <h3 className={styles.cardHeading}>Send a message</h3>

                {submitState === "error" && submitError && (
                  <div className={styles.errorBanner} role="alert">
                    <TriangleAlert size={18} />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label htmlFor="contact-name" className={styles.label}>
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className={styles.input}
                      value={values.name}
                      onFocus={handleFieldFocus}
                      onChange={handleChange("name")}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      ref={(el) => {
                        fieldRefs.current.name = el ?? undefined;
                      }}
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p id="contact-name-error" className={styles.fieldError}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="contact-email" className={styles.label}>
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className={styles.input}
                      value={values.email}
                      onFocus={handleFieldFocus}
                      onChange={handleChange("email")}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      ref={(el) => {
                        fieldRefs.current.email = el ?? undefined;
                      }}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p id="contact-email-error" className={styles.fieldError}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-company" className={styles.label}>
                    Company / Organization <span className={styles.optional}>(optional)</span>
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    className={styles.input}
                    value={values.company}
                    onFocus={handleFieldFocus}
                    onChange={handleChange("company")}
                    ref={(el) => {
                      fieldRefs.current.company = el ?? undefined;
                    }}
                    disabled={isSubmitting}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-subject" className={styles.label}>
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    className={styles.input}
                    value={values.subject}
                    onFocus={handleFieldFocus}
                    onChange={handleChange("subject")}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                    ref={(el) => {
                      fieldRefs.current.subject = el ?? undefined;
                    }}
                    disabled={isSubmitting}
                  />
                  {errors.subject && (
                    <p id="contact-subject-error" className={styles.fieldError}>
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-message" className={styles.label}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    className={styles.textarea}
                    value={values.message}
                    onFocus={handleFieldFocus}
                    onChange={handleChange("message")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    ref={(el) => {
                      fieldRefs.current.message = el ?? undefined;
                    }}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className={styles.fieldError}>
                      {errors.message}
                    </p>
                  )}
                </div>

                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className={styles.spinner} aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
