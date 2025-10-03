import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

// Variants
const slideInFromLeft = {
  hidden: { opacity: 0, x: -50, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const listItem = {
  hidden: { opacity: 0, x: -10, filter: "blur(4px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 420, damping: 28 },
  },
};

export const Clients = () => {
  const names = [
    "G.C. Anderson Consulting Ltd.",
    "Bank Muscat SAOG",
    "Oman International Bank SAOG",
    "Al Rakaib Training LLC",
    "Centre for British Teachers LLC",
    "Sultan Qaboos Port Authority",
    "Mustafa Sultan Enterprises LLC",
    "Oman LNG",
    "Al Moosa Group",
    "Abu Hani Group",
    "Trust Travel & Tourism Company",
    "Bank Beirut",
    "Spinney’s Dubai LLC",
    "Intech LLC",
  ];

  // Header animation
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { amount: 0.6 });
  const headerControls = useAnimation();
  useEffect(() => {
    headerControls.start(headerInView ? "show" : "exit");
  }, [headerInView, headerControls]);

  return (
    <div
      id="clients"
      className="bg-[#32348D] text-white antialiased px-4 sm:px-6 lg:px-8 py-16"
    >
      {/* Header */}
      <div className="container mx-auto max-w-7xl text-center">
        <div ref={headerRef}>
          <motion.h2
            initial="hidden"
            animate={headerControls}
            variants={slideInFromLeft}
            className="text-white text-2xl sm:text-3xl md:text-4xl font-teko tracking-wide"
          >
            Our Clients
          </motion.h2>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="container mx-auto max-w-5xl mt-10">
        <motion.ul
          variants={listContainer}
          initial="show"   // ✅ Force items visible immediately
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {names.map((name, i) => (
            <motion.li
              key={i}
              variants={listItem}
              className="rounded-lg bg-[#112a63] px-4 py-3 text-sm leading-5 shadow-sm transition-colors hover:bg-[#1a3570]"
            >
              {name}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};
