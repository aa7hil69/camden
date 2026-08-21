import React from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";

export const Notfound = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#32348D] text-white flex items-center justify-center px-6 sm:px-8 font-teko">
      <div className="text-center max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-[120px] sm:text-[160px] font-bold tracking-wider leading-none text-white/90 drop-shadow-md"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="mt-2 text-2xl sm:text-3xl md:text-4xl font-light text-white"
        >
          Oops! Page not found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          className="mt-4 text-sm sm:text-base text-white/80 font-light leading-relaxed"
        >
          The page you’re looking for doesn’t exist or has been moved. Don’t
          worry, you can always head back to the home page.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <Button to="/">Back to Home</Button>
        </motion.div>
      </div>
    </section>
  );
};
