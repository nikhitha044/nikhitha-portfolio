// Provider-agnostic contact form send layer.
//
// This module never talks to Resend (or any email provider) directly — it only knows
// how to POST to a same-origin serverless endpoint at /api/contact. The actual Resend
// integration lives server-side in api/contact.ts, which keeps the API key off the client
// entirely. See api/contact.ts for activation instructions (Resend account + API key).

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

export interface ContactSubmitResult {
  ok: boolean;
  error?: string;
}

const GENERIC_ERROR =
  "Something went wrong sending your message. Please try again, or email me directly.";

/**
 * Submit the contact form to the /api/contact serverless function.
 *
 * Always resolves (never throws) with a { ok, error? } result so the UI can render a
 * friendly message instead of a raw stack trace.
 */
export async function submitContactForm(data: ContactFormData): Promise<ContactSubmitResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    let payload: unknown = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok) {
      const message =
        payload && typeof payload === "object" && "error" in payload && typeof (payload as { error?: unknown }).error === "string"
          ? (payload as { error: string }).error
          : GENERIC_ERROR;
      return { ok: false, error: message };
    }

    if (payload && typeof payload === "object" && "ok" in payload && (payload as { ok: unknown }).ok === true) {
      return { ok: true };
    }

    return { ok: false, error: GENERIC_ERROR };
  } catch {
    // Network failure, offline, CORS issue, endpoint not deployed yet, etc.
    return { ok: false, error: GENERIC_ERROR };
  }
}
