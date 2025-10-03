import React from "react";
import {Navbar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import { Reveal } from "../components/Reveal";


export const Client = () => {
  return (
    
    <div className="bg-[#32348D]">
        <div className="min-h-screen text-foreground overflow-x-hidden ">
        <Navbar />
        <main className="bg-[#32348D] text-black"> 
      
        </main>
        
      </div>
      <div>
        <Reveal  fade={false}>
        <Footer className="bg-[#32348D]"/>
        </Reveal>
      </div>
    </div>
  );
}
