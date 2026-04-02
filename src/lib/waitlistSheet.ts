import { google } from "googleapis";

const DEFAULT_SPREADSHEET_ID = "1kdPDLvupnU6L8ZNEMI9zf0kyoWhPYLbBaHwD8vgRRJU";

/** Human-readable detail from googleapis / Gaxios errors */
export function formatGoogleSheetsError(err: unknown): string {
  if (!err || typeof err !== "object") return String(err);
  const e = err as {
    response?: { data?: { error?: { message?: string; status?: string } } };
    message?: string;
  };
  const api = e.response?.data?.error;
  if (api?.message) {
    const code = api.status ? `${api.status}: ` : "";
    return `${code}${api.message}`;
  }
  if (e.message) return e.message;
  try {
    return JSON.stringify(e.response?.data ?? err);
  } catch {
    return "Unknown error";
  }
}

export type AppendWaitlistResult =
  | { ok: true }
  | {
      ok: false;
      /** Service account `client_email` — share the spreadsheet with this address */
      serviceAccountEmail: string;
      detail: string;
    };

type LoadCredsResult =
  | { ok: true; credentials: Record<string, unknown> }
  | { ok: false; detail: string };

/**
 * Loads service account JSON without relying on fragile .env multiline strings.
 * Priority:
 * 1) GOOGLE_SHEETS_SERVICE_ACCOUNT_PATH — absolute or relative path to the downloaded .json file (best for local dev)
 * 2) GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON — raw JSON string (single line) or base64-encoded full JSON (good for Vercel)
 */
async function loadServiceAccountCredentials(): Promise<LoadCredsResult> {
  const filePath = process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_PATH?.trim();
  if (filePath) {
    const { existsSync, readFileSync } = await import("node:fs");
    const path = await import("node:path");
    const absolute = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath);
    if (!existsSync(absolute)) {
      return {
        ok: false,
        detail: `GOOGLE_SHEETS_SERVICE_ACCOUNT_PATH: file not found at ${absolute}`,
      };
    }
    try {
      const raw = readFileSync(absolute, "utf8");
      const credentials = JSON.parse(raw) as Record<string, unknown>;
      return { ok: true, credentials };
    } catch (e) {
      return {
        ok: false,
        detail: `Could not read/parse JSON at GOOGLE_SHEETS_SERVICE_ACCOUNT_PATH: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  const raw = process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON?.trim();
  if (!raw) {
    return {
      ok: false,
      detail:
        "Set GOOGLE_SHEETS_SERVICE_ACCOUNT_PATH to your service account .json file, or set GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON.",
    };
  }

  try {
    return { ok: true, credentials: JSON.parse(raw) as Record<string, unknown> };
  } catch {
    try {
      const decoded = Buffer.from(raw, "base64").toString("utf8");
      const credentials = JSON.parse(decoded) as Record<string, unknown>;
      return { ok: true, credentials };
    } catch {
      return {
        ok: false,
        detail:
          "Credentials are not valid JSON. Prefer GOOGLE_SHEETS_SERVICE_ACCOUNT_PATH=./gen-lang-client-....json (path to the file Google gave you). Or put the entire JSON on one line in GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON, or base64-encode the file and paste that string.",
      };
    }
  }
}

/** True if Sheets signup is configured (path or JSON env). */
export function hasSheetsCredentialsConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_PATH?.trim() ||
      process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON?.trim()
  );
}

/** Matches columns in the “Waiting list” sheet: timestamp, email, source */
export async function appendWaitlistRow(
  email: string,
  source: string = "marketing"
): Promise<AppendWaitlistResult> {
  const loaded = await loadServiceAccountCredentials();
  if (!loaded.ok) {
    return {
      ok: false,
      serviceAccountEmail: "",
      detail: loaded.detail,
    };
  }

  const { credentials } = loaded;

  const serviceAccountEmail =
    typeof credentials.client_email === "string" ? credentials.client_email : "";

  const spreadsheetId =
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim() || DEFAULT_SPREADSHEET_ID;
  const tab = process.env.GOOGLE_SHEETS_TAB_NAME?.trim() || "Sheet1";
  const range = `${tab}!A:C`;

  try {
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
    return { ok: true };
  } catch (err) {
    const detail = formatGoogleSheetsError(err);
    console.error("[waitlistSheet] append failed", {
      spreadsheetId,
      range,
      serviceAccountEmail,
      detail,
    });
    return {
      ok: false,
      serviceAccountEmail,
      detail,
    };
  }
}
