import { google } from "googleapis";

const DEFAULT_SPREADSHEET_ID = "1kdPDLvupnU6L8ZNEMI9zf0kyoWhPYLbBaHwD8vgRRJU";

/** Matches columns in the “Waiting list” sheet: timestamp, email, source */
export async function appendWaitlistRow(
  email: string,
  source: string = "marketing"
): Promise<void> {
  const raw = process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON;
  if (!raw?.trim()) {
    throw new Error("GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON is not set");
  }

  let credentials: Record<string, unknown>;
  try {
    credentials = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    throw new Error("GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON must be valid JSON");
  }

  const spreadsheetId =
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim() || DEFAULT_SPREADSHEET_ID;
  const tab = process.env.GOOGLE_SHEETS_TAB_NAME?.trim() || "Sheet1";
  const range = `${tab}!A:C`;

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[new Date().toISOString(), email, source]],
    },
  });
}
