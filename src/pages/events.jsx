// import React, { useEffect, useState } from "react";
// import { Navbar } from "../components/Navbar";
// import { Footer } from "../components/Footer";
// import { CalendarDays, User } from "lucide-react";

// export const Events = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let ignore = false;

//     async function loadEvents() {
//       try {
//         const res = await fetch("/api/events");
//         const data = await res.json();

//         if (!ignore && Array.isArray(data.events)) {
//           setEvents(
//             data.events.map((e) => ({
//               id: e.id,
//               title: e.event_name,
//               description: e.event_details,
//               date: e.posted_on,
//               link: e.event_url,
//               images: [e.photo1, e.photo2, e.photo3].filter(Boolean),
//             }))
//           );
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         if (!ignore) setLoading(false);
//       }
//     }

//     loadEvents();
//     return () => (ignore = true);
//   }, []);

//   return (
//     <div className="bg-black min-h-screen text-white">
//       <Navbar />

//       <main className="max-w-7xl mx-auto px-4 py-16">
//         <h1 className="text-4xl md:text-5xl font-teko tracking-wide text-center mb-16">
//           Events
//         </h1>

//         {loading && (
//           <p className="text-center text-white/60">Loading events…</p>
//         )}

//         <div className="space-y-24">
//           {events.map((event) => (
//             <article key={event.id}>
//               {/* META */}
//               <div className="flex flex-wrap items-center gap-6 text-sm text-[#C9A24D] mb-4">
//                 <div className="flex items-center gap-2">
//                   <CalendarDays size={16} />
//                   <span>Posted On {event.date}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <User size={16} />
//                   <span>Posted by Jessy Mathew International SPC</span>
//                 </div>
//               </div>

//               {/* TITLE */}
//               <h2 className="text-3xl md:text-4xl font-teko mb-6">
//                 {event.title}
//               </h2>

//               {/* DESCRIPTION */}
//               <p className="text-white/80 leading-relaxed text-justify max-w-5xl">
//                 {event.description}
//               </p>

//               {/* MORE INFO */}
//               {event.link && (
//                 <a
//                   href={event.link}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="inline-block mt-4 text-[#C9A24D] hover:underline"
//                 >
//                   More Info…
//                 </a>
//               )}

//               {/* IMAGE ROW (JMI STYLE) */}
//               {event.images.length > 0 && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
//                   {event.images.map((img, i) => (
//                     <div
//                       key={i}
//                       className="overflow-hidden rounded-xl"
//                     >
//                       <img
//                         src={img}
//                         alt={event.title}
//                         className="h-64 w-full object-cover"
//                         loading="lazy"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </article>
//           ))}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CalendarDays, User } from "lucide-react";

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadEvents() {
      try {
        const res = await fetch("/api/events");
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
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadEvents();
    return () => (ignore = true);
  }, []);

  return (
    <div className="bg-[#32348D] min-h-screen text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-teko tracking-wide text-center mb-16">
          Events
        </h1>

        {loading && (
          <p className="text-center text-white/60">Loading events…</p>
        )}

        <div className="space-y-20">
          {events.map((event) => (
            <article
              key={event.id}
              className="
                border border-white/10
                rounded-2xl
                p-8
                bg-[#292B7A]
                hover:border-white/20
                transition-colors
              "
            >
              {/* META */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-blue-300 mb-4">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} color="white" />
                  <span>Posted On {event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} color="white" />
                  <span>Posted by Jessy Mathew International SPC</span>
                </div>
              </div>

              {/* TITLE */}
              <h2 className="text-3xl md:text-4xl font-teko mb-6">
                {event.title}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-[#E5E5E5]/80 leading-relaxed text-justify max-w-5xl">
                {event.description}
              </p>

              {/* MORE INFO */}
              {event.link && (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-4 text-blue-300  hover:underline"
                >
                  More Info…
                </a>
              )}

              {/* IMAGE ROW */}
              {event.images.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                  {event.images.map((img, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-xl"
                    >
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
      </main>

      <Footer />
    </div>
  );
};