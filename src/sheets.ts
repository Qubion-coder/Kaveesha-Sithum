import { sheetsWebAppUrl } from "./config";

export type RsvpPayload = {
  type: "rsvp";
  name: string;
  guests: number;
  dietary: string;
  invitedAs: string;
};

export type WishPayload = {
  type: "wish";
  name: string;
  message: string;
  invitedAs: string;
};

/**
 * Sends a form submission to the Google Apps Script web app.
 * text/plain avoids a CORS preflight, which Apps Script does not answer.
 */
export async function submitToSheet(payload: RsvpPayload | WishPayload) {
  if (!sheetsWebAppUrl) {
    throw new Error("The Google Sheets URL is not set up yet.");
  }

  const response = await fetch(sheetsWebAppUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!response.ok || !result?.ok) {
    throw new Error(result?.error || "Could not save your response.");
  }
}
