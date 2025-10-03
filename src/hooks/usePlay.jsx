import { useEffect, useRef } from "react";

export function usePlay({
  threshold = 0.15,
  root = null,
  rootMargin = "0px 0px -5% 0px",
  once = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion: render immediately without animation
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("play");
      return;
    }

    let io;

    const setupObserver = () => {
      if (!el) return;

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.classList.add("play");
              if (once && io) io.unobserve(entry.target);
            }
          });
        },
        { threshold, root, rootMargin }
      );

      io.observe(el);
    };

    // Wait until the app is ready before starting IO,
    // but do NOT add 'play' just because app-ready toggled.
    if (!document.body.classList.contains("app-ready")) {
      const id = requestAnimationFrame(() => {
        if (document.body.classList.contains("app-ready")) {
          setupObserver();
        } else {
          // If still not ready next frame, keep checking in a micro-loop
          // to avoid long listeners; alternatively, you can attach a one-time
          // DOMContentLoaded or a custom event if you have one.
          const id2 = requestAnimationFrame(() => {
            if (document.body.classList.contains("app-ready")) {
              setupObserver();
            }
          });
          // Cleanup nested rAF if unmounted quickly
          return () => cancelAnimationFrame(id2);
        }
      });
      return () => {
        cancelAnimationFrame(id);
        if (io) io.disconnect();
      };
    } else {
      setupObserver();
      return () => {
        if (io) io.disconnect();
      };
    }
  }, [threshold, root, rootMargin, once]);

  return { ref };
}
