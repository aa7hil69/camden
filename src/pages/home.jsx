import React from "react";
import { Navbar } from "../components/Navbar";
import { Description } from "../components/home/desc";
import { Hero } from "../components/home/Hero";
import { Clients } from "../components/home/Clients";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { Gallery } from "../components/home/gallery";


export const Home = ({ appReady }) => {
  return (
    <div className="bg-[#32348D]">
      <div className="min-h-screen text-foreground overflow-x-hidden">
        <Navbar />
        <main>
          {/* Gate Description until boot splash fades out */}
          {appReady && <Description />}
          {appReady && <Hero />}
          {appReady && <Clients />}   
          {appReady && <Gallery />}     
        </main>
      </div>
      <div>
        <Reveal  fade={false} >
          <Footer />
        </Reveal>
      </div>
    </div>
  );
};
