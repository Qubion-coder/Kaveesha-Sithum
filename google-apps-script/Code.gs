/**
 * Kaveesha & Sithum — RSVP & Wishes collector
 *
 * Saves submissions from the invitation website into two sheets:
 *   "RSVP"   → Timestamp | Full Name | Attending | Guests | Dietary Notes | Invited As
 *   "Wishes" → Timestamp | Name | Message | Invited As
 *
 * Setup:
 *   1. Open the spreadsheet → Extensions → Apps Script.
 *   2. Replace everything in Code.gs with this file and save.
 *   3. Run `setup` once (approve permissions) to create both sheets with headers.
 *   4. Deploy → New deployment → Web app
 *        Execute as: Me
 *        Who has access: Anyone
 *   5. Copy the Web app URL (ends with /exec) into src/config.ts → sheetsWebAppUrl.
 *   After editing this script later, use Deploy → Manage deployments → Edit → New version
 *   so the same URL keeps working.
 */

const SPREADSHEET_ID = "11TVcXhkJCmiypEqZ-HtVN3qsiKF6Z1IAKGkU1FtTlvs";

const SHEETS = {
  rsvp: {
    name: "RSVP",
    headers: ["Timestamp", "Full Name", "Attending", "Guests", "Dietary Notes", "Invited As"],
  },
  wish: {
    name: "Wishes",
    headers: ["Timestamp", "Name", "Message", "Invited As"],
  },
};

/** Run once from the editor to create both sheets with styled headers. */
function setup() {
  Object.keys(SHEETS).forEach(function (key) {
    getSheet_(key);
  });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const type = data.type;
    if (!SHEETS[type]) {
      return json_({ ok: false, error: "Unknown form type" });
    }

    const sheet = getSheet_(type);
    const now = new Date();
    let row;

    if (type === "rsvp") {
      const guests = Number(data.guests) || 0;
      row = [
        now,
        clean_(data.name, 120),
        guests > 0 ? "Yes" : "No",
        guests,
        clean_(data.dietary, 300),
        clean_(data.invitedAs, 120),
      ];
    } else {
      row = [
        now,
        clean_(data.name, 120),
        clean_(data.message, 2000),
        clean_(data.invitedAs, 120),
      ];
    }

    if (!row[1]) {
      return json_({ ok: false, error: "Name is required" });
    }

    sheet.appendRow(row);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Lets you open the /exec URL in a browser to confirm the deployment works. */
function doGet() {
  return json_({ ok: true, message: "Kaveesha & Sithum RSVP endpoint is running" });
}

function getSheet_(key) {
  const config = SHEETS[key];
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(config.name);
  if (!sheet) {
    sheet = ss.insertSheet(config.name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(config.headers);
    sheet
      .getRange(1, 1, 1, config.headers.length)
      .setFontWeight("bold")
      .setBackground("#d4a017")
      .setFontColor("#ffffff");
    sheet.setFrozenRows(1);
    sheet.getRange("A:A").setNumberFormat("yyyy-mm-dd hh:mm:ss");
    sheet.autoResizeColumns(1, config.headers.length);
  }
  return sheet;
}

/** Trims input and stops it being read as a spreadsheet formula. */
function clean_(value, maxLength) {
  let text = String(value == null ? "" : value).trim().slice(0, maxLength);
  if (/^[=+\-@]/.test(text)) {
    text = "'" + text;
  }
  return text;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
