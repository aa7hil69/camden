import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";

export const Privacy = () => {
  return (
    <div className="bg-[#32348D] min-h-screen text-white">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16 font-teko">
        <h1 className="text-3xl sm:text-5xl font-normal tracking-wide">
          Privacy Policy
        </h1>
        <p className="mt-3 text-white/70 text-sm sm:text-base font-light">
          Last updated: 12 August 2026
        </p>

        <div className="mt-8 space-y-6 text-sm sm:text-base font-light leading-relaxed text-white/90">
          <p>
            Camden Imports &amp; Exports (&quot;we&quot;, &quot;us&quot;) operates this
            website. This policy explains what personal information we collect
            when you use the site and how we use it.
          </p>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl text-white">Information we collect</h2>
            <p>
              If you use the contact form, we collect your name, email address,
              and message content so we can respond to your enquiry.
            </p>
            <p>
              Our hosting and analytics providers may automatically receive
              technical data such as IP address, browser type, and pages
              visited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl text-white">How we use information</h2>
            <p>We use contact details only to reply to your message and to operate this website. We do not sell your personal information.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl text-white">Sharing</h2>
            <p>
              We may share information with service providers who help us host
              the site or deliver email, and when required by law.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl text-white">Retention</h2>
            <p>
              Contact messages are kept as long as needed to handle your
              enquiry and for legitimate business or legal records.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl text-white">Your rights</h2>
            <p>
              Depending on where you live (including Oman and other Gulf
              countries), you may have rights to access, correct, or request
              deletion of personal data we hold about you. Contact us using the
              details on our{" "}
              <Link to="/contact" className="text-[#00acec] hover:underline">
                Contact
              </Link>{" "}
              page.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl text-white">Changes</h2>
            <p>
              We may update this policy from time to time. The &quot;Last
              updated&quot; date above will change when we do.
            </p>
          </section>

          <p className="text-white/60 text-xs sm:text-sm">
            This page is a starting template for launch readiness. Have it
            reviewed by your legal counsel before relying on it commercially.
          </p>
        </div>
      </main>
      <Reveal fade={false}>
        <Footer />
      </Reveal>
    </div>
  );
};
