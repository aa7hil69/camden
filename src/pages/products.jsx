import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/ui/Button";

export const Products = () => {
  return (
    <div className="bg-[#32348D] min-h-screen text-white">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24 text-center font-teko">
        <p className="text-[#00acec] text-sm sm:text-base tracking-wide uppercase">
          Products
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-normal tracking-wide">
          Coming soon
        </h1>
        <p className="mt-5 text-white/85 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
          We are preparing our product catalogue for Camden Imports &amp;
          Exports. In the meantime, reach out and we will share current
          offerings and availability.
        </p>
        <div className="mt-8 flex justify-center">
          <Button to="/contact">Contact us</Button>
        </div>
      </main>
      <Reveal fade={false}>
        <Footer />
      </Reveal>
    </div>
  );
};
