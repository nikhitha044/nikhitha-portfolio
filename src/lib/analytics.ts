// Analytics stub — no real provider wired up.
//
// This is intentionally a no-op unless VITE_ANALYTICS_ENABLED="true" is set at build time.
// When disabled (the default), calling trackEvent() does nothing at all — not even a
// console.log — so the app works fully without any analytics configuration.
//
// To wire up a real provider later (Vercel Analytics / Plausible / Umami / etc.), replace
// the body of trackEvent() with the provider's call. Every call site in the app already
// fires the correct event name and metadata shape, so no call sites need to change.

export type AnalyticsEvent =
  | "page_view"
  | "resume_view"
  | "resume_download"
  | "project_opened"
  | "linkedin_click"
  | "github_click"
  | "email_click"
  | "whatsapp_click"
  | "contact_form_opened"
  | "contact_form_submitted";

export type AnalyticsMeta = Record<string, string | number | boolean>;

const isAnalyticsEnabled = import.meta.env.VITE_ANALYTICS_ENABLED === "true";

/**
 * Fire a lightweight, anonymous product analytics event.
 *
 * Do NOT pass PII in `meta` — no email addresses, names, or message content.
 * At most a project title/id or a resume category string.
 */
export function trackEvent(event: AnalyticsEvent, meta?: AnalyticsMeta): void {
  if (!isAnalyticsEnabled) return;

  if (import.meta.env.DEV) {
    console.debug(`[analytics] ${event}`, meta ?? {});
  }

  // Placeholder for a real provider call, e.g.:
  //   window.plausible?.(event, { props: meta });
  //   umami?.track(event, meta);
}
