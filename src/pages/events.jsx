import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { Button } from "../components/ui/Button";

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadEvents() {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();

        if (!ignore && Array.isArray(data.events)) {
          setEvents(
            data.events.map((e) => ({
              id: e.id,
              title: e.event_name,
              description: e.event_details,
              date: e.posted_on,
              link: e.event_url,
              images: [e.photo1, e.photo2, e.photo3].filter(Boolean),
            }))
          );
          setError(null);
        } else if (!ignore) {
          setEvents([]);
        }
      } catch (err) {
        console.error(err);
        if (!ignore) {
          setEvents([]);
          setError("Unable to load events right now. Please try again later.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadEvents();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="bg-[#32348D] min-h-screen text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-20 md:pt-16 pb-16">
        <h1 className="text-4xl md:text-5xl font-teko tracking-wide text-center mb-16">
          Events
        </h1>

        {loading && (
          <p className="text-center text-white/80" role="status">
            Loading events…
          </p>
        )}

        {!loading && error && (
          <div className="text-center space-y-4 max-w-lg mx-auto">
            <p className="text-rose-300">{error}</p>
            <Button
              type="button"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="text-center space-y-4 max-w-lg mx-auto">
            <p className="text-white/80">
              No events are published at the moment. Check back soon, or get in
              touch for the latest updates.
            </p>
            <Button to="/contact">Contact us</Button>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="space-y-20">
            {events.map((event) => (
              <article
                key={event.id}
                className="border border-white/10 rounded-2xl p-8 bg-[#292B7A] hover:border-white/20 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-6 text-sm text-[#00acec] mb-4">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt size={16} className="text-white" aria-hidden />
                    <span>Posted On {event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUser size={16} className="text-white" aria-hidden />
                    <span>Posted by Jessy Mathew International SPC</span>
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-teko mb-6">
                  {event.title}
                </h2>

                <p className="text-[#E5E5E5]/80 leading-relaxed text-justify max-w-5xl">
                  {event.description}
                </p>

                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-4 text-[#00acec] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00acec] rounded"
                  >
                    More Info…
                  </a>
                )}

                {event.images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    {event.images.map((img, i) => (
                      <div key={i} className="overflow-hidden rounded-xl">
                        <img
                          src={img}
                          alt={event.title}
                          className="h-64 w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
