import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Notfound = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#32348D] text-white flex items-center justify-center px-6 sm:px-8 font-teko">
      <div className="text-center max-w-2xl">
        {/* 404 heading */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-[120px] sm:text-[160px] font-bold tracking-wider leading-none text-white/90 drop-shadow-md"
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="mt-2 text-2xl sm:text-3xl md:text-4xl font-light text-white"
        >
          Oops! Page not found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          className="mt-4 text-sm sm:text-base text-white/80 font-light leading-relaxed"
        >
          The page you’re looking for doesn’t exist or has been moved.  
          Don’t worry, you can always head back to the home page.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
          className="mt-8"
        >
          <Link
            to="/"
            className="group relative inline-block rounded-md overflow-hidden
                       bg-[#00acec] text-black hover:text-white px-6 py-3 
                       text-lg sm:text-xl font-normal transition-colors"
          >
            <span
              className="pointer-events-none absolute inset-0
                         [clip-path:polygon(60%_100%,100%_30%,100%_100%)]
                         bg-black/15 translate-x-full translate-y-full
                         group-hover:translate-x-0 group-hover:translate-y-0
                         transition-transform duration-700 ease-out"
            />
            <span className="relative z-10">Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
