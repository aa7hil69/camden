import React, { useEffect, useMemo, useState } from "react";
import { ClientsSkeleton } from "../ui/Skeleton";
import { SectionTitle } from "../ui/SectionTitle";
import { withMinSkeletonTime } from "../../utils/withMinSkeletonTime";
import { usePlayOnView } from "../../hooks/usePlayOnView";

const chunkArray = (arr, size) => {
  if (!Array.isArray(arr) || size <= 0) return [];
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
};

function Panel({ items = [], error }) {
  return (
    <section className="rounded-2xl bg-[#112a63] p-4 text-white">
      {error && <p className="text-sm text-red-300">Failed to load clients</p>}

      {!error && (
        <ul className="space-y-2 text-sm">
          {items.map((name, i) => (
            <li key={i} className="rounded bg-[#1a3570] px-3 py-2">
              {name}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ref: blurbRef } = usePlayOnView({ threshold: 0.25 });

  useEffect(() => {
    let ignore = false;

    async function fetchClients() {
      const startedAt = Date.now();
      try {
        const res = await fetch("/api/clients");
        if (!res.ok) throw new Error("Failed to fetch clients");

        const data = await res.json();

        const mapped = Array.isArray(data.clients)
          ? data.clients.map((c) => c.clientname)
          : [];

        if (!ignore) setClients(mapped);
      } catch (err) {
        console.error("Clients error:", err);
        if (!ignore) setError("Unable to load clients");
      } finally {
        await withMinSkeletonTime(startedAt, 2000);
        if (!ignore) setLoading(false);
      }
    }

    fetchClients();
    return () => {
      ignore = true;
    };
  }, []);

  const chunks = useMemo(() => chunkArray(clients, 12), [clients]);

  return (
    <div id="clients" className="min-h-screen bg-[#32348d] text-white px-4">
      <div className="py-16 max-w-7xl mx-auto">
        <div className="text-center">
          <SectionTitle className="text-2xl sm:text-3xl md:text-4xl font-teko">
            Our Clients
          </SectionTitle>

          <p
            ref={blurbRef}
            className="mt-4 text-sm sm:text-base text-slate-200 max-w-2xl mx-auto slide-in-left slide-delay-2"
          >
            Over the years, we have partnered with leading organizations,
            corporations, and institutions across the region. Here are some of
            the esteemed clients and associates who have trusted our services.
          </p>
        </div>

        {loading && <ClientsSkeleton />}

        {error && (
          <p className="text-center text-red-400 mt-10">{error}</p>
        )}

        {!loading && !error && clients.length === 0 && (
          <p className="text-center text-white/70 mt-10">No clients found.</p>
        )}

        {!loading && !error && clients.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {chunks.map((chunk, idx) => (
              <Panel key={idx} items={chunk} error={error} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
