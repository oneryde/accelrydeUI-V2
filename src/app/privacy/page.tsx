import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Trilyt privacy policy: how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-bold tracking-tight text-[#FAFAFA] mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#52525B] mb-2">
            App Name: Trilyt &nbsp;|&nbsp; Company: Accelryde Technologies LLP
          </p>
          <p className="text-sm text-[#52525B] mb-12">
            Effective Date: June 15, 2026 &nbsp;|&nbsp; Last Updated: June 15, 2026
          </p>

          <div className="space-y-10 text-[#A1A1AA] leading-relaxed text-sm">

            <section>
              <h2 className="text-xl font-semibold text-[#FAFAFA] mb-3">
                1. Introduction
              </h2>
              <p>
                Trilyt is a motorcycle group riding application developed and operated by{" "}
                <strong className="text-[#FAFAFA]">Accelryde Technologies LLP</strong>, a company
                registered in India. This Privacy Policy explains what personal data we collect,
                why we collect it, how we use it, and your rights regarding your data.
              </p>
              <p className="mt-3">
                By using the Trilyt app, you agree to the practices described in this policy.
                If you do not agree, please do not use the app.
              </p>
              <p className="mt-3">
                For questions, contact us at{" "}
                <a href="mailto:privacy@trilyt.app" className="text-[#FF6600] hover:underline">
                  contact@accelryde.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#FAFAFA] mb-3">
                2. Information We Collect
              </h2>

              <h3 className="text-base font-semibold text-[#FAFAFA] mb-2">2.1 Account Information</h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Full name</li>
                <li>Email address</li>
                <li>Password (stored encrypted, never in plain text)</li>
                <li>Profile photo and cover image (optional)</li>
              </ul>

              <h3 className="text-base font-semibold text-[#FAFAFA] mb-2">2.2 Location Data</h3>
              <p className="mb-2">
                Trilyt is a real-time group riding app. To provide its core functionality, we collect:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-3">
                <li>
                  <strong className="text-[#FAFAFA]">Precise GPS location</strong> while you are on an active ride
                </li>
                <li>
                  <strong className="text-[#FAFAFA]">Background location</strong> — your location is tracked
                  even when the app is in the background during an active ride, so your group members
                  can see your position in real time
                </li>
                <li>
                  Location history for completed rides (retained for{" "}
                  <strong className="text-[#FAFAFA]">90 days</strong>, then permanently deleted)
                </li>
              </ul>
              <p>Location data is only collected during active ride sessions. We do not track your location at any other time.</p>

              <h3 className="text-base font-semibold text-[#FAFAFA] mb-2 mt-4">2.3 Ride and Group Data</h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Rides you create or join (start/end points, route, duration, distance)</li>
                <li>Groups you are a member of</li>
                <li>In-app messages sent within groups or during rides</li>
              </ul>

              <h3 className="text-base font-semibold text-[#FAFAFA] mb-2">2.4 Device and Usage Data</h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Device type and operating system</li>
                <li>Firebase Cloud Messaging (FCM) token for push notifications</li>
                <li>Device identifier (generated internally, not linked to hardware ID)</li>
              </ul>

              <h3 className="text-base font-semibold text-[#FAFAFA] mb-2">2.5 Voice Data</h3>
              <p className="mb-4">
                If you use the in-ride voice alert feature, short audio clips are recorded and
                transmitted to your group in real time. These clips are{" "}
                <strong className="text-[#FAFAFA]">not stored</strong> on our servers.
              </p>

              <h3 className="text-base font-semibold text-[#FAFAFA] mb-2">2.6 Photos</h3>
              <p>
                If you upload a profile photo or group cover image, the image is stored securely
                via <strong className="text-[#FAFAFA]">ImageKit</strong> (our image hosting provider).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#FAFAFA] mb-3">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide real-time group ride tracking and navigation</li>
                <li>Show your position to group members during a ride</li>
                <li>Deliver in-ride alerts (fuel, accident, break)</li>
                <li>Enable group chat and messaging</li>
                <li>Send push notifications (ride invites, messages, alerts)</li>
                <li>Display your profile within groups</li>
                <li>Generate ride history and statistics</li>
                <li>Ensure app security and prevent fraud</li>
              </ul>
              <p className="mt-3">
                We <strong className="text-[#FAFAFA]">do not</strong> use your data for advertising.
                We <strong className="text-[#FAFAFA]">do not</strong> sell your data to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#FAFAFA] mb-3">
                4. Data Sharing
              </h2>
              <p className="mb-3">We share your data only in the following circumstances:</p>

              <p className="mb-2">
                <strong className="text-[#FAFAFA]">With other riders in your group</strong> — Your
                real-time location, name, and profile photo are visible to members of your active
                ride group. You control who is in your group.
              </p>

              <p className="mb-3">
                <strong className="text-[#FAFAFA]">With service providers</strong> — We use the
                following third-party services to operate the app:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-3">
                <li><strong className="text-[#FAFAFA]">MongoDB Atlas</strong> — Database storage</li>
                <li><strong className="text-[#FAFAFA]">Redis (Upstash)</strong> — Real-time caching</li>
                <li><strong className="text-[#FAFAFA]">Firebase (Google)</strong> — Push notifications</li>
                <li><strong className="text-[#FAFAFA]">ImageKit</strong> — Image storage and delivery</li>
                <li><strong className="text-[#FAFAFA]">Google Maps Platform</strong> — Maps and navigation</li>
                <li><strong className="text-[#FAFAFA]">Fly.io</strong> — App hosting (Mumbai, India)</li>
              </ul>
              <p className="mb-3">
                All providers are contractually required to protect your data and use it only
                for the specified purpose.
              </p>
              <p>
                <strong className="text-[#FAFAFA]">Legal requirements</strong> — We may disclose
                your data if required by Indian law, court order, or government authority, including
                under the Information Technology Act, 2000 and its rules.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#FAFAFA] mb-3">
                5. Data Retention
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-[#FAFAFA]">Account data</strong> — Until account deletion</li>
                <li><strong className="text-[#FAFAFA]">Location history</strong> — 90 days from ride completion, then permanently deleted</li>
                <li><strong className="text-[#FAFAFA]">Ride data</strong> — Until account deletion</li>
                <li><strong className="text-[#FAFAFA]">Group messages</strong> — Until account or group deletion</li>
                <li><strong className="text-[#FAFAFA]">Push notification tokens</strong> — Until you log out or uninstall</li>
                <li><strong className="text-[#FAFAFA]">Voice clips</strong> — Not stored, real-time transmission only</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#FAFAFA] mb-3">
                6. Your Rights
              </h2>
              <p className="mb-3">
                Under the{" "}
                <strong className="text-[#FAFAFA]">
                  Digital Personal Data Protection Act, 2023 (DPDP Act)
                </strong>{" "}
                and applicable Indian law, you have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-3">
                <li><strong className="text-[#FAFAFA]">Access</strong> — Request a copy of the personal data we hold about you</li>
                <li><strong className="text-[#FAFAFA]">Correction</strong> — Request correction of inaccurate personal data</li>
                <li><strong className="text-[#FAFAFA]">Deletion</strong> — Request deletion of your account and all associated personal data</li>
                <li><strong className="text-[#FAFAFA]">Withdrawal of consent</strong> — Withdraw consent for data processing at any time</li>
                <li><strong className="text-[#FAFAFA]">Grievance redressal</strong> — Raise a complaint with our grievance officer</li>
              </ul>
              <p>
                To exercise any of these rights, email{" "}
                <a href="mailto:privacy@trilyt.app" className="text-[#FF6600] hover:underline">
                  privacy@trilyt.app
                </a>
                . We will respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#FAFAFA] mb-3">
                7. Data Security
              </h2>
              <p className="mb-2">We implement industry-standard security measures including:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>JWT-based authentication with secure token expiry</li>
                <li>HTTPS/TLS encryption for all data in transit</li>
                <li>Encrypted password storage (bcrypt)</li>
                <li>Rate limiting on all API endpoints to prevent abuse</li>
                <li>Server infrastructure hosted in Mumbai, India</li>
              </ul>
              <p className="mt-3">
                Despite these measures, no system is completely secure. Please use a strong
                password and keep your account credentials private.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#FAFAFA] mb-3">
                8. Children&apos;s Privacy
              </h2>
              <p>
                Trilyt is not intended for children under the age of 18. We do not knowingly
                collect personal data from minors. If you believe a minor has created an account,
                please contact us at{" "}
                <a href="mailto:privacy@trilyt.app" className="text-[#FF6600] hover:underline">
                  privacy@trilyt.app
                </a>{" "}
                and we will delete the account promptly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#FAFAFA] mb-3">
                9. Location Permission — Special Notice
              </h2>
              <p className="mb-3">
                Trilyt requests <strong className="text-[#FAFAFA]">&quot;Allow Always&quot;</strong>{" "}
                location permission on your device. This is required so your group members can see
                your location when you switch to another app mid-ride (for example, when using a
                payment app at a fuel stop).
              </p>
              <p>
                We <strong className="text-[#FAFAFA]">only</strong> use background location during
                an active ride session. We do not access your location at any other time. You can
                revoke location permission at any time in your device settings, but this will
                prevent core riding features from working.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#FAFAFA] mb-3">
                10. Push Notifications
              </h2>
              <p className="mb-2">We send push notifications for:</p>
              <ul className="list-disc list-inside space-y-2 mb-3">
                <li>Ride invitations from group members</li>
                <li>In-ride alerts (fuel stop, accident, break requested)</li>
                <li>Group chat messages</li>
              </ul>
              <p>
                You can disable notifications at any time in your device settings or within the
                Trilyt app under <strong className="text-[#FAFAFA]">Settings → Notifications</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#FAFAFA] mb-3">
                11. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. When we make material changes,
                we will notify you via the app or email. Continued use of the app after changes are
                posted constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#FAFAFA] mb-3">
                12. Grievance Officer
              </h2>
              <p className="mb-2">
                In accordance with the Information Technology Act, 2000 and the DPDP Act, 2023:
              </p>
              <ul className="list-none space-y-1">
                <li><strong className="text-[#FAFAFA]">Company:</strong> Accelryde Technologies LLP</li>
                <li>
                  <strong className="text-[#FAFAFA]">Email:</strong>{" "}
                  <a href="mailto:privacy@trilyt.app" className="text-[#FF6600] hover:underline">
                    privacy@trilyt.app
                  </a>
                </li>
                <li><strong className="text-[#FAFAFA]">Response time:</strong> Within 30 days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#FAFAFA] mb-3">
                13. Contact Us
              </h2>
              <p>
                For any privacy-related questions, requests, or concerns:
              </p>
              <ul className="list-none space-y-1 mt-2">
                <li><strong className="text-[#FAFAFA]">Accelryde Technologies LLP</strong></li>
                <li>
                  Email:{" "}
                  <a href="mailto:privacy@trilyt.app" className="text-[#FF6600] hover:underline">
                    privacy@trilyt.app
                  </a>
                </li>
                <li>
                  Website:{" "}
                  <a href="https://trilyt.app" className="text-[#FF6600] hover:underline">
                    https://trilyt.app
                  </a>
                </li>
              </ul>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
