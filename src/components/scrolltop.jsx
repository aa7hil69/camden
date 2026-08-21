import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

export function ScrollToTopButton({
  showAfter = 200,
  className = "",
} = {}) {
  const [visible, setVisible] = useState(showAfter === 0);

  useEffect(() => {
    if (showAfter === 0) return;

    let last = 0;
    const onScroll = () => {
      const now = Date.now();
      if (now - last < 80) return;
      last = now;
      const y = window.scrollY || document.documentElement.scrollTop;
      setVisible(y > showAfter);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={[
        "fixed right-6 z-50",
        "bottom-[calc(env(safe-area-inset-bottom,0px)+var(--footer-safe,24px))]",
        "flex items-center justify-center rounded-full",
        "h-16 w-16",
        "bg-[#00acec] text-white shadow-lg",
        "transition-all duration-250 ease-out",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none",
        "hover:scale-105 active:scale-95",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-[#00acec]",
        className,
      ].join(" ")}
    >
      <IoIosArrowUp className="text-white" size={32} aria-hidden="true" />
    </button>
  );
}
