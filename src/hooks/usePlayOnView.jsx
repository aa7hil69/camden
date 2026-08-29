import { useEffect, useRef } from "react";

/** Adds `.play` only when the element scrolls into view (after boot splash). */
export function usePlayOnView({
  threshold = 0.2,
  root = null,
  rootMargin = "0px 0px -12% 0px",
  once = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("play");
      return;
    }

    let io;
    let mo;
    let cancelled = false;

    const setupObserver = () => {
      if (cancelled || !el || io) return;

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            el.classList.add("play");
            if (once) io.unobserve(entry.target);
          });
        },
        { threshold, root, rootMargin }
      );

      io.observe(el);
    };

    if (document.body.classList.contains("app-ready")) {
      setupObserver();
    } else {
      mo = new MutationObserver(() => {
        if (document.body.classList.contains("app-ready")) {
          mo.disconnect();
          setupObserver();
        }
      });
      mo.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => {
      cancelled = true;
      mo?.disconnect();
      io?.disconnect();
    };
  }, [threshold, root, rootMargin, once]);

  return { ref };
}
