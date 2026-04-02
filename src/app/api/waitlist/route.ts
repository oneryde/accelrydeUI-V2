import { NextRequest, NextResponse } from "next/server";
import { appendWaitlistRow, hasSheetsCredentialsConfigured } from "@/lib/waitlistSheet";

export const runtime = "nodejs";

// Simple in-memory rate limiting (per-instance, resets on deploy)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be JSON with an email field." },
      { status: 400 }
    );
  }

  try {
    const { email } = body as { email?: unknown };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const sanitizedEmail = email.trim().toLowerCase().slice(0, 254);
    const timestamp = new Date().toISOString();
    const source = "marketing";

    const webappUrl = process.env.WAITLIST_WEBAPP_URL?.trim();

    if (hasSheetsCredentialsConfigured()) {
      const result = await appendWaitlistRow(sanitizedEmail, source);
      if (result.ok) {
        return NextResponse.json({ success: true });
      }

      const shareHint = result.serviceAccountEmail
        ? ` In Google Sheets: Share → add ${result.serviceAccountEmail} as Editor.`
        : "";

      const payload: {
        error: string;
        details?: string;
        serviceAccountEmail?: string;
      } = {
        error: `Could not save your signup.${shareHint} Enable the Google Sheets API for the service account’s GCP project, then try again.`,
      };

      payload.details = result.detail;
      if (result.serviceAccountEmail) {
        payload.serviceAccountEmail = result.serviceAccountEmail;
      }

      return NextResponse.json(payload, { status: 502 });
    }

    if (webappUrl) {
      const response = await fetch(webappUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: sanitizedEmail,
          timestamp,
          source,
        }),
      });

      if (!response.ok) {
        console.error("Apps Script error:", response.status, await response.text());
        return NextResponse.json(
          { error: "Failed to add to waitlist. Please try again." },
          { status: 502 }
        );
      }

      return NextResponse.json({ success: true });
    }

    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[waitlist] No GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON or WAITLIST_WEBAPP_URL — accepting signup locally only:",
        sanitizedEmail
      );
      return NextResponse.json({ success: true, dev: true });
    }

    console.error(
      "Waitlist: set GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON (or WAITLIST_WEBAPP_URL)"
    );
    return NextResponse.json(
      { error: "Waitlist is not configured yet. Please try again later." },
      { status: 503 }
    );
  } catch (err) {
    console.error("[waitlist] unexpected error:", err);
    const message =
      err instanceof Error ? err.message : "Something went wrong. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
