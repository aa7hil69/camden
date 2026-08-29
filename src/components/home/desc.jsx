import React from "react";
import { usePlayOnView } from "../../hooks/usePlayOnView";

const slides = [
  {
    id: 1,
    alt: "Slide 1",
    title: "CAMDEN",
    subtitle:
      "Camden Importers and Exporters Private Limited is a trusted supplier of high-quality hygiene and sanitation products, committed to serving the hospitality sector with reliability and excellence. Established with a vision to support businesses in maintaining world-class hygiene standards, Camden has built a reputation for timely service, consistent quality, and customer-focused solutions.With a growing footprint in Kerala, we proudly supply a range of hygiene products to some of the region's leading hotels, ensuring their guests enjoy safe, clean, and comfortable stays. ",
  },
];

export const Description = () => {
  const { ref: titleRef } = usePlayOnView({ threshold: 0.2 });
  const { ref: subtitleRef } = usePlayOnView({ threshold: 0.2 });

  return (
    <section
      className="
        relative
        w-full 
        min-h-screen
        flex items-center justify-center
        pt-2 md:pt-0
        overflow-hidden
        text-center
      "
    >
      <div
        className="
          pointer-events-none absolute inset-0 z-0
          bg-center bg-no-repeat bg-contain
          w-full h-full
          blur-[0px]
          opacity-70
          scale-110 
        "
        style={{ backgroundImage: "url('/logopics/logo.png')" }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ backgroundColor: "rgba(50,52,141,0.85)" }}
        aria-hidden="true"
      />

      <div className="relative z-[1] w-full flex -translate-y-4 md:-translate-y-6">
        {slides.map((s) => (
          <div
            key={s.id}
            className="
              min-w-full
              flex items-center justify-center
              px-4 sm:px-6 md:px-10
              text-white font-teko
            "
          >
            <div className="w-full max-w-5xl text-center px-4 sm:px-6 md:px-10 py-6">
              <h1
                ref={titleRef}
                className="text-white text-xl sm:text-4xl md:text-[80px]
                            font-normal tracking-normal
                            leading-tight md:leading-relaxed
                            drop-shadow-sm slide-in-left slide-delay-1"
              >
                {s.title}
              </h1>

              {s.subtitle && (
                <div className="flex justify-center">
                  <p
                    ref={subtitleRef}
                    className="text-sm sm:text-sm md:text-sm
                                font-normal leading-6 sm:leading-7 md:leading-7
                                text-white max-w-[70ch]
                                mt-4 sm:mt-5
                                slide-in-left slide-delay-2"
                  >
                    {s.subtitle}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
