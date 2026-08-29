import React from "react";
import { usePlayOnView } from "../../hooks/usePlayOnView";

/**
 * Shared section title — same left slide-in on scroll for every page section.
 */
export function SectionTitle({
  as: Tag = "h2",
  children,
  className = "",
  delay = 1,
}) {
  const { ref } = usePlayOnView({ threshold: 0.25 });
  const delayClass = `slide-delay-${delay}`;

  return (
    <Tag
      ref={ref}
      className={["slide-in-left", delayClass, className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
