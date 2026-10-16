export const coupleConfig = {
  groomName: "Sithum",
  brideName: "Kaveesha",
};

/**
 * Google Apps Script web app URL (ends with /exec) that saves RSVPs and wishes
 * to the spreadsheet. See google-apps-script/Code.gs for setup steps.
 */
export const sheetsWebAppUrl = "https://script.google.com/macros/s/AKfycbzWWjTMZEI_oI8eLGLEWjZrdvgsS0TO6h4NsMg-d1Z39DePVbIDVfJZR-Xx-GgLZErZvA/exec";

export const guestPrefixes = ["Mr.", "Mrs.", "Miss", "Mr. & Mrs.", "Family", "Dear"] as const;

export type GuestPrefix = (typeof guestPrefixes)[number];

/**
 * Combines prefix and name into the name shown to the guest.
 * "Dear" is a greeting style, not a title, so it adds nothing here —
 * the greeting itself already starts with "Dear".
 */
export function buildDisplayName(prefix: GuestPrefix, rawName: string) {
  const name = rawName.trim().replace(/\s+/g, " ");
  if (!name) return "";

  switch (prefix) {
    case "Family":
      return `${name} and Family`;
    case "Dear":
      return name;
    default:
      return `${prefix} ${name}`;
  }
}

// Dots are dropped from the path so hosts don't mistake it for a file (e.g. "Mr." → "Mr").
export function buildInviteLink(baseUrl: string, displayName: string) {
  return `${baseUrl.replace(/\/+$/, "")}/${encodeURIComponent(displayName.replace(/\./g, ""))}`;
}

function restorePrefixDots(name: string) {
  return name
    .replace(/^Mr & Mrs(?=\s)/i, "Mr. & Mrs.")
    .replace(/^(Mrs|Mr)(?=\s)/i, (m) => `${m}.`);
}

export function buildInviteMessage(displayName: string, link: string) {
  const { groomName, brideName } = coupleConfig;
  return `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our engagement invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${groomName} & ${brideName}`;
}

/** Reads the guest display name from the URL path, e.g. "/Mr%20Sanjaya" → "Mr. Sanjaya". */
export function readGuestNameFromPath(pathname: string) {
  const segment = pathname.replace(/^\/+|\/+$/g, "");
  if (!segment || segment.includes("/")) return "";
  try {
    return restorePrefixDots(decodeURIComponent(segment).trim().replace(/\s+/g, " ")).slice(0, 80);
  } catch {
    return "";
  }
}
