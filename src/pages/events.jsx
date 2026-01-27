import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";

/* minimum loader helper */
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchEvents() {
      try {
        setLoading(true);

        const [res] = await Promise.all([
          fetch("/api/events"),
          wait(300), // ⏱️ minimum loader duration
        ]);

        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();

        const mapped = Array.isArray(data.events)
          ? data.events.map((e) => ({
              id: e.id,
              title: e.event_name,
              description: e.event_details,
              image: e.photo1,
              date: e.posted_on,
              link: e.event_url,
            }))
          : [];

        if (!ignore) setEvents(mapped);
      } catch (err) {
        console.error("Events fetch error:", err);
        if (!ignore) setError("Unable to load events");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchEvents();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="bg-[#32348D] min-h-screen overflow-x-hidden">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-teko tracking-wide text-center mb-10">
          Events
        </h1>

        {/* White loading bar */}
        {loading && (
          <div className="flex justify-center py-10">
            <div className="w-56 h-1 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-[#FFFFFF] shadow-[0_0_8px_rgba(201,162,77,0.6)]"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        )}

        {error && (
          <p className="text-center text-red-400">
            {error}
          </p>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="text-center text-white/70">
            No events found.
          </p>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="bg-[#0f224f] rounded-xl overflow-hidden ring-1 ring-white/10 hover:ring-white/20 transition"
              >
                {event.image && (
                  <img
                    src={event.image} 
                    alt={event.title}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                )}

                <div className="p-5">
                  <p className="text-xs text-white/60 mb-1">
                    {event.date}
                  </p>

                  <h2 className="text-base font-semibold mb-2 leading-tight">
                    {event.title}
                  </h2>

                  <p className="text-sm text-white/80 line-clamp-4">
                    {event.description}
                  </p>

                  {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-4 text-[#FFFFFF] hover:underline text-sm"
                    >
                      View Event →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Reveal>
        <Footer />
      </Reveal>
    </div>
  );
};
