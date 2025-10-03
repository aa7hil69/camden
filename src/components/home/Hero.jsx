import React from "react";
import { usePlayOnView } from "../../hooks/usePlayOnView";

export const Hero = () => {
  const { ref: imgRef } = usePlayOnView();
  const { ref: textRef } = usePlayOnView();

  return (
    <section className="relative w-full bg-[#32348d] text-[#FFFFFF]">
      {/* Mobile-first: single column; switches to 2 cols on md */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-10 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10">
        {/* Image on top (mobile), left on desktop */}
        <div
          ref={imgRef}
          className="order-1 md:order-1 flex justify-center items-center hero-img-enter"
        >
          {/* Gold side bar: hide on mobile to declutter; show on md+ */}
          <div className="hidden md:block h-[200px] w-1 bg-[#2F80ED] rounded mr-3 -mt-76" />
          <div className="relative w-full max-w-[320px] h-[360px] sm:h-[400px] md:w-[300px] md:h-[515px] mt-1">
            <div className="pointer-events-none absolute inset-0 rounded-lg" />
            <img
              src="/picsin/portrait.png"
              alt="Portrait"
              className="w-full h-full object-cover object-[35%_15%] select-none rounded-lg"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              style={{ WebkitUserDrag: "none" }}
            />
          </div>
        </div>

        {/* Text below (mobile), right on desktop */}
        <div
          ref={textRef}
          className="order-2 md:order-2 flex flex-col items-center md:items-start text-center md:text-left hero-text-enter"
        >
          <div className="w-full max-w-[640px]">
            {/* Name */}
            <h1 className="font-teko font-normal text-xl sm:text-xl md:text-[80px] leading-tight md:leading-[1.05] mt-4 md:mt-0">
              JESSY MATHEW
            </h1>

            {/* Director */}
            <p className="text-[#00acec] font-teko font-light text-lg sm:text-lg md:text-[50px] mt-2 md:-mt-3">
              Director
            </p>

            {/* Description */}
            <p className="mt-3 text-[#FFFFFF] font-teko font-light text-sm sm:text-sm leading-6 md:leading-6 md:mt-1">
              At the heart of JM International SPC’s strategic growth is Jessy
              Mathew, a globally experienced HR leader, entrepreneur, and advisor
              with over 24 years of expertise spanning Oman, India, and the UK.
            </p>

            <p className="mt-2 text-[#FFFFFF] font-teko font-light text-sm sm:text-sm leading-6 md:leading-6">
              A respected figure in the Middle East’s HR and manpower ecosystem,
              Jessy brings visionary leadership to operations, strategy, and client
              engagements, known for cultural fluency, strategic foresight, and an
              unwavering commitment to ethical, impact‑driven business.
            </p>
          </div>

          {/* CTA row */}
          <div className="mt-5 md:mt-8 flex items-center justify-center md:justify-start gap-4">
            <div
              className="group relative inline-block rounded-md overflow-hidden
                         bg-[#00acec] text-[#040608] px-4 py-2 text-[18px] sm:text-[20px] font-teko
                         transition-colors duration-200 hover:bg-[#00acec] hover:text-[#FFFFFF]"
            >
              {/* diagonal overlay entering from bottom-right on hover */}
              <span
                className="pointer-events-none absolute inset-0
                           [clip-path:polygon(60%_100%,100%_30%,100%_100%)]
                           bg-black/15 translate-x-full translate-y-full
                           group-hover:translate-x-0 group-hover:translate-y-0
                           transition-transform duration-600 ease-out"
              />
              <button
                className="relative z-10 inline-flex items-center gap-2 rounded-md
                           px-4 py-2 text-current text-[18px] sm:text-[20px] font-teko"
                type="button"
              >
                Read More
              </button>
            </div>

            {/* Divider hidden on mobile to keep layout airy */}
            <div className="hidden block h-[60px] w-0.5 bg-white sm:block h-[60px] w-0.5 text-white md:block h-[60px] w-0.5 text-white" />

            {/* Since 2008 badge */}
            <div className="relative flex items-center justify-center h-15 w-15 sm:h-15 sm:w-15 md:h-15 md:w-15 rounded-full bg-[#00acec]">
              <div className="absolute inset-1 rounded-full" />
              <div className="relative text-center text-black text-[15px] sm:text-[15px] leading-tight font-teko font-normal">
                SINCE
                <br />
                2008
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
