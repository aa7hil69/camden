import React from "react";
import { motion, MotionConfig } from "framer-motion";

export function Skeleton({ className = "" }) {
  return (
    <MotionConfig reducedMotion="never">
      <div
        className={["relative overflow-hidden rounded-md bg-white/15", className]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      >
        <motion.div
          className="pointer-events-none absolute inset-y-0 w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.12) 60%, transparent 100%)",
          }}
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.15,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.15,
          }}
        />
      </div>
    </MotionConfig>
  );
}

export function EventsListSkeleton({ count = 2 }) {
  return (
    <div className="space-y-20" role="status" aria-label="Loading events">
      {Array.from({ length: count }, (_, i) => (
        <article
          key={i}
          className="border border-white/10 rounded-2xl p-8 bg-[#292B7A]"
          aria-hidden="true"
        >
          <div className="flex flex-wrap gap-6 mb-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-64 max-w-full" />
          </div>
          <Skeleton className="h-10 w-3/4 max-w-xl mb-6" />
          <div className="space-y-2 max-w-5xl">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl hidden sm:block" />
            <Skeleton className="h-64 w-full rounded-xl hidden lg:block" />
          </div>
        </article>
      ))}
      <span className="sr-only">Loading events…</span>
    </div>
  );
}

export function ClientsSkeleton() {
  // Match one loaded grid row: 3 panels × 12 names (same as chunkArray size)
  const panels = 3;
  const rows = 12;

  return (
    <div
      className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-3"
      role="status"
      aria-label="Loading clients"
    >
      {Array.from({ length: panels }, (_, p) => (
        <section
          key={p}
          className="rounded-2xl bg-[#112a63] p-4 text-white"
          aria-hidden="true"
        >
          <ul className="space-y-2 text-sm">
            {Array.from({ length: rows }, (_, i) => (
              <li key={i}>
                <Skeleton className="h-[2.375rem] w-full rounded bg-[#1a3570]/40" />
              </li>
            ))}
          </ul>
        </section>
      ))}
      <span className="sr-only">Loading clients…</span>
    </div>
  );
}

export function GallerySkeleton({ count = 4 }) {
  return (
    <div
      className="flex gap-6 overflow-hidden"
      role="status"
      aria-label="Loading gallery"
    >
      {Array.from({ length: count }, (_, i) => (
        <article
          key={i}
          className="w-72 flex-shrink-0 rounded-xl overflow-hidden bg-[#112a63] ring-1 ring-white/10"
          aria-hidden="true"
        >
          <Skeleton className="h-48 w-full rounded-none" />
          <div className="px-4 py-3 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-24 mt-2" />
          </div>
        </article>
      ))}
      <span className="sr-only">Loading gallery…</span>
    </div>
  );
}
