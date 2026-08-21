import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";

export const Terms = () => {
  return (
    <div className="bg-[#32348D] min-h-screen text-white">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16 font-teko">
        <h1 className="text-3xl sm:text-5xl font-normal tracking-wide">
          Terms &amp; Conditions
        </h1>
        <p className="mt-3 text-white/70 text-sm sm:text-base font-light">
          Last updated: 12 August 2026
        </p>

        <div className="mt-8 space-y-6 text-sm sm:text-base font-light leading-relaxed text-white/90">
          <p>
            By using the Camden Imports &amp; Exports website, you agree to
            these terms. If you do not agree, please do not use the site.
          </p>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl text-white">Website use</h2>
            <p>
              Content on this website is provided for general information about
              our business. We may update or remove content at any time without
              notice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl text-white">Enquiries</h2>
            <p>
              Submitting the contact form does not create a contract. Any
              commercial engagement is subject to separate written agreement.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl text-white">Intellectual property</h2>
            <p>
              Logos, text, images, and other materials on this site belong to us
              or our licensors. You may not copy or reuse them without
              permission, except as allowed by law.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl text-white">Disclaimer</h2>
            <p>
              The site is provided &quot;as is&quot;. We do not warrant that it
              will be uninterrupted or error-free. To the fullest extent
              permitted by law, we are not liable for losses arising from use of
              the site.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl text-white">Governing law</h2>
            <p>
              These terms are intended for our Oman-focused launch. Governing
              law and venue should be confirmed with legal counsel for your
              operating entity.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl text-white">Contact</h2>
            <p>
              Questions about these terms: see our{" "}
              <Link to="/contact" className="text-[#00acec] hover:underline">
                Contact
              </Link>{" "}
              page.
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
