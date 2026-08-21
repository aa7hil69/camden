import React from "react";
import { usePlayOnView } from "../../hooks/usePlayOnView";
import { Button } from "../ui/Button";

export const Hero = () => {
  const { ref: imgRef } = usePlayOnView();
  const { ref: textRef } = usePlayOnView();

  return (
    <section className="relative w-full bg-[#32348d] text-[#FFFFFF]" id="about">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-10 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10">
        <div
          ref={imgRef}
          className="order-1 md:order-1 flex justify-center items-center hero-img-enter"
        >
          <div className="hidden md:block h-[200px] w-1 bg-[#00acec] rounded mr-3 -mt-20" />
          <div className="relative w-full max-w-[320px] h-[360px] sm:h-[400px] md:w-[300px] md:h-[515px] mt-1">
            <img
              src="/picsin/portrait.jpeg"
              alt="Jessy Mathew, Director"
              className="w-full h-full object-cover object-[35%_15%] select-none rounded-lg"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        </div>

        <div
          ref={textRef}
          className="order-2 md:order-2 flex flex-col items-center md:items-start text-center md:text-left hero-text-enter"
        >
          <div className="w-full max-w-[640px]">
            <h2 className="font-teko font-normal text-3xl sm:text-5xl md:text-[80px] leading-tight md:leading-[1.05] mt-4 md:mt-0">
              JESSY MATHEW
            </h2>

            <p className="text-[#00acec] font-teko font-light text-lg sm:text-2xl md:text-[50px] mt-2 md:-mt-3">
              Director
            </p>

            <p className="mt-3 text-[#FFFFFF] font-teko font-light text-sm leading-6 md:mt-1">
              At the heart of JM International SPC’s strategic growth is Jessy
              Mathew, a globally experienced HR leader, entrepreneur, and advisor
              with over 24 years of expertise spanning Oman, India, and the UK.
            </p>

            <p className="mt-2 text-[#FFFFFF] font-teko font-light text-sm leading-6">
              A respected figure in the Middle East’s HR and manpower ecosystem,
              Jessy brings visionary leadership to operations, strategy, and client
              engagements, known for cultural fluency, strategic foresight, and an
              unwavering commitment to ethical, impact‑driven business.
            </p>
          </div>

          <div className="mt-5 md:mt-8 flex items-center justify-center md:justify-start gap-4">
            <Button to="/contact">Contact us</Button>

            <div className="hidden sm:block h-[60px] w-0.5 bg-white/80" aria-hidden="true" />

            <div className="relative flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[#00acec]">
              <div className="relative text-center text-black text-[15px] leading-tight font-teko font-normal">
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
