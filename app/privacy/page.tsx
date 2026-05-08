import type { Metadata } from "next";
import { generateMetadata as gen } from "@/lib/metadata";

export const metadata: Metadata = gen({
  title: "Privacy Policy",
  description:
    "Privacy policy for Oneword web design and development services, including how enquiry information is handled.",
  slug: "/privacy",
  keywords: ["privacy policy", "website studio privacy", "client enquiry privacy"],
});

export default function PrivacyPage() {
  return (
    <main className="hero-surface min-h-screen pt-20 pb-20 md:pt-24 md:pb-24">
      <section className="container-xl max-w-3xl">
        <h1 className="text-on-dark">Privacy Policy</h1>
        <p className="mt-6 text-lg text-on-dark-muted">
          When you contact Oneword through this website, the information you provide is used only to respond to your enquiry, discuss your project, and deliver requested services.
        </p>
        <div className="mt-10 space-y-8 text-on-dark-muted">
          <section>
            <h2 className="text-on-dark">What information may be collected</h2>
            <p className="mt-3">
              This may include your name, email address, phone number, project details, and any information you choose to send when requesting a quote or starting a conversation.
            </p>
          </section>
          <section>
            <h2 className="text-on-dark">How it is used</h2>
            <p className="mt-3">
              Your information is used to communicate about your project, prepare proposals, deliver services, and improve the client experience. It is not sold to third parties.
            </p>
          </section>
          <section>
            <h2 className="text-on-dark">Third-party tools</h2>
            <p className="mt-3">
              This site may use analytics, hosting, and form or email tools that process limited technical or contact information as part of normal website operation.
            </p>
          </section>
          <section>
            <h2 className="text-on-dark">Contact</h2>
            <p className="mt-3">
              For privacy-related questions, contact oneworddevstudio@gmail.com.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}