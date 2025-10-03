import { useEffect, useRef } from "react";

export function usePlayAfterDelay(delayMs = 10000) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    const t = setTimeout(() => {
      if (!cancelled && el) el.classList.add("play");
    }, delayMs);

    return () => {
      cancelled = true;
      clearTimeout(t);
       
    };
  }, [delayMs]);

  return { ref };
}
