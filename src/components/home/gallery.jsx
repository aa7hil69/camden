import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import { GallerySkeleton } from "../ui/Skeleton";

const slideInFromRight = {
  hidden: { opacity: 0, x: 50, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const textStagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(null);
  const closeBtnRef = useRef(null);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { amount: 0.6 });
  const headerControls = useAnimation();

  useEffect(() => {
    headerControls.start(headerInView ? "show" : "hidden");
  }, [headerInView, headerControls]);

  useEffect(() => {
    let ignore = false;

    async function fetchGallery() {
      try {
        const res = await fetch("/api/gallery");
        if (!res.ok) throw new Error("Failed to fetch gallery");

        const data = await res.json();

        const mapped = Array.isArray(data.gallery)
          ? data.gallery.map((g) => ({
              id: g.id,
              src: g.image_path,
              title: g.title,
              description: g.description,
            }))
          : [];

        if (!ignore) {
          setItems(mapped);
          setError(null);
        }
      } catch (err) {
        console.error("Gallery fetch error:", err);
        if (!ignore) {
          setItems([]);
          setError("Unable to load gallery images right now.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchGallery();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <section className="bg-[#32348d] pt-4 pb-14 md:pb-20" id="gallery">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            ref={headerRef}
            variants={textStagger}
            initial="hidden"
            animate={headerControls}
            className="text-center"
          >
            <motion.h2
              variants={slideInFromRight}
              className="text-white text-3xl sm:text-4xl md:text-5xl font-teko tracking-wide"
            >
              Gallery
            </motion.h2>
          </motion.div>
        </div>

        <div className="mx-auto max-w-7xl px-4 mt-8">
          {loading ? (
            <GallerySkeleton count={4} />
          ) : error ? (
            <p className="text-center text-rose-300">{error}</p>
          ) : items.length ? (
            <AnimatedGrid
              items={items}
              onOpen={setActive}
              pausedExternally={!!active}
            />
          ) : (
            <p className="text-center text-white/80">
              No gallery images are available yet.
            </p>
          )}
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md
                       flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title || "Gallery image"}
          >
            <motion.div
              className="relative max-w-5xl w-full bg-[#0b1d3a]
                         rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close gallery preview"
                className="absolute top-4 right-4 z-10 text-white/80
                           hover:text-white text-2xl rounded
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00acec]"
              >
                ✕
              </button>

              <div className="max-h-[70vh] bg-black flex items-center justify-center">
                <img
                  src={active.src}
                  alt={active.title}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="font-teko text-2xl sm:text-3xl text-white mb-4">
                  {active.title}
                </h3>
                <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                  {active.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SPEED = 40;

const AnimatedGrid = ({ items, onOpen, pausedExternally }) => {
  const trackRef = useRef(null);
  const x = useMotionValue(0);

  const [width, setWidth] = useState(0);
  const [paused, setPaused] = useState(false);

  const loopItems = [...items, ...items];

  useEffect(() => {
    if (!trackRef.current) return;
    setWidth(trackRef.current.scrollWidth / 2);
  }, [items]);

  useAnimationFrame((_, delta) => {
    if (paused || pausedExternally || !width) return;

    const move = (SPEED * delta) / 1000;
    const next = x.get() - move;
    x.set(next <= -width ? 0 : next);
  });

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        ref={trackRef}
        className="flex gap-6 w-max cursor-grab active:cursor-grabbing"
        style={{ x }}
        drag="x"
        dragMomentum={false}
        dragElastic={0.06}
        dragConstraints={{ left: -width, right: 0 }}
        onDragStart={() => setPaused(true)}
        onDragEnd={() => setPaused(false)}
      >
        {loopItems.map((img, i) => (
          <article
            key={`${img.id}-${i}`}
            className="w-72 flex-shrink-0
                       rounded-xl overflow-hidden
                       bg-[#112a63]
                       ring-1 ring-white/10"
          >
            <div
              className="h-48 overflow-hidden cursor-pointer"
              onClick={() => onOpen(img)}
            >
              <img
                src={img.src}
                alt={img.title}
                className="h-full w-full object-cover
                           transition-transform duration-500
                           hover:scale-105"
                draggable={false}
                loading="lazy"
              />
            </div>

            <div className="px-4 py-3">
              <h3 className="text-white text-sm font-semibold">
                {img.title}
              </h3>
              <p className="text-white/70 text-xs line-clamp-3">
                {img.description}
              </p>

              <button
                type="button"
                onClick={() => onOpen(img)}
                className="mt-2 text-xs font-semibold
                           text-[#00acec] hover:underline
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00acec] rounded"
              >
                Read more →
              </button>
            </div>
          </article>
        ))}
      </motion.div>
    </div>
  );
};
