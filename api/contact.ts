// Serverless contact-form handler (Vercel-style `api/` function convention).
//
// ACTIVATION — nothing works until this is done:
//   1. Create a Resend account at https://resend.com.
//   2. Create an API key in the Resend dashboard and set it as the RESEND_API_KEY
//      environment variable in your hosting provider's project settings (Vercel:
//      Project Settings -> Environment Variables). Never commit this key.
//   3. Sending domain: for real production use, verify a sending domain in Resend
//      (Domains -> Add Domain, then add the DNS records it gives you). For quick testing
//      before a domain is verified, Resend provides a shared "onboarding@resend.dev"
//      sender that works out of the box for sending to your own verified account email.
//      Update the `from` address below to match whichever you use.
//   4. Optionally set CONTACT_TO_EMAIL to the inbox that should receive submissions.
//      If unset, it falls back to nikhithajangam04@gmail.com.
//
// Platform notes:
//   - This file follows Vercel's zero-config convention: any file under /api/ exporting
//     a default (req, res) handler becomes a serverless function at /api/<filename>.
//   - To adapt this for Netlify Functions instead: move the validation/Resend logic into
//     a function under netlify/functions/contact.ts, change the handler signature to
//     `export const handler: Handler = async (event) => {...}` (Netlify's format), read
//     the body from `event.body` instead of `req.body`, and return
//     `{ statusCode, body: JSON.stringify(...) }` instead of calling `res.status().json()`.
//     The validation and Resend-calling logic below can be copied over unchanged.
//
// This function does NOT persist anything anywhere — it only forwards the submitted
// fields into a single outbound email via Resend. There is no database involved.

import { Resend } from "resend";

interface ContactRequestBody {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  subject?: unknown;
  message?: unknown;
}

interface VercelLikeRequest {
  method?: string;
  body?: unknown;
}

interface VercelLikeResponse {
  status: (code: number) => VercelLikeResponse;
  json: (body: unknown) => void;
}

const DEFAULT_TO_EMAIL = "nikhithajangam04@gmail.com";
const MAX_SHORT_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface ValidatedContact {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

function validate(body: ContactRequestBody): { ok: true; data: ValidatedContact } | { ok: false; error: string } {
  const { name, email, company, subject, message } = body;

  if (!isNonEmptyString(name) || name.trim().length > MAX_SHORT_FIELD_LENGTH) {
    return { ok: false, error: "Please provide a valid name." };
  }
  if (!isNonEmptyString(email) || !EMAIL_PATTERN.test(email.trim()) || email.trim().length > MAX_SHORT_FIELD_LENGTH) {
    return { ok: false, error: "Please provide a valid email address." };
  }
  if (!isNonEmptyString(subject) || subject.trim().length > MAX_SHORT_FIELD_LENGTH) {
    return { ok: false, error: "Please provide a subject." };
  }
  if (!isNonEmptyString(message) || message.trim().length > MAX_MESSAGE_LENGTH) {
    return { ok: false, error: "Please provide a message (up to 5000 characters)." };
  }
  if (company !== undefined && company !== null) {
    if (typeof company !== "string" || company.length > MAX_SHORT_FIELD_LENGTH) {
      return { ok: false, error: "Company/Organization is too long." };
    }
  }

  return {
    ok: true,
    data: {
      name: name.trim(),
      email: email.trim(),
      company: isNonEmptyString(company) ? company.trim() : "",
      subject: subject.trim(),
      message: message.trim(),
    },
  };
}

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed." });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet — this is expected until the Resend API key is set up.
    res.status(500).json({ ok: false, error: "Contact form is not configured yet. Please email directly instead." });
    return;
  }

  let rawBody: ContactRequestBody;
  try {
    rawBody = typeof req.body === "string" ? JSON.parse(req.body) : ((req.body ?? {}) as ContactRequestBody);
  } catch {
    res.status(400).json({ ok: false, error: "Malformed request body." });
    return;
  }

  const validated = validate(rawBody);
  if (!validated.ok) {
    res.status(400).json({ ok: false, error: validated.error });
    return;
  }

  const { name, email, company, subject, message } = validated.data;
  const toEmail = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: [toEmail],
      reply_to: email,
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${company ? `<p><strong>Company/Organization:</strong> ${escapeHtml(company)}</p>` : ""}
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("contact form submission failed: resend error");
      res.status(502).json({ ok: false, error: "Failed to send your message. Please try again shortly." });
      return;
    }

    console.log("contact form submission received");
    res.status(200).json({ ok: true });
  } catch {
    console.error("contact form submission failed: unexpected error");
    res.status(500).json({ ok: false, error: "Failed to send your message. Please try again shortly." });
  }
}
