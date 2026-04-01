import { NextRequest, NextResponse } from "next/server";
import { appendWaitlistRow } from "@/lib/waitlistSheet";

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

  try {
    const body = await request.json();
    const { email } = body;

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

    const sheetsJson = process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON?.trim();
    const webappUrl = process.env.WAITLIST_WEBAPP_URL?.trim();

    if (sheetsJson) {
      try {
        await appendWaitlistRow(sanitizedEmail, source);
        return NextResponse.json({ success: true });
      } catch (err) {
        console.error("[waitlist] Google Sheets error:", err);
        return NextResponse.json(
          {
            error:
              "Could not save your signup. Check that the sheet is shared with the service account email and that the Sheets API is enabled.",
          },
          { status: 502 }
        );
      }
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
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
