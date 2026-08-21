import React from "react";
import { Link } from "react-router-dom";

const base =
  "relative inline-flex items-center justify-center font-teko transition-colors duration-200 " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00acec] focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-[#32348d] disabled:opacity-60 disabled:pointer-events-none";

const variants = {
  primary:
    "rounded-md bg-[#00acec] text-[#040608] hover:text-white overflow-hidden " +
    "px-4 py-2 text-[18px] sm:text-[20px]",
  submit:
    "w-full rounded-md bg-[#00acec] text-black hover:text-white px-3 py-3 text-sm",
  ghost:
    "rounded-md text-[#00acec] hover:underline text-xs font-semibold px-0 py-0 " +
    "focus-visible:ring-offset-0",
  icon:
    "rounded-full bg-[#00acec] text-white h-16 w-16 shadow-lg " +
    "hover:scale-105 active:scale-95",
};

function WipeOverlay() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0
                 [clip-path:polygon(60%_100%,100%_30%,100%_100%)]
                 bg-black/15 translate-x-full translate-y-full
                 group-hover:translate-x-0 group-hover:translate-y-0
                 transition-transform duration-500 ease-out"
    />
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  wipe = variant === "primary" || variant === "submit",
  to,
  href,
  type = "button",
  ...props
}) {
  const classes = ["group", base, variants[variant] || variants.primary, className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {wipe ? <WipeOverlay /> : null}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  );
}
