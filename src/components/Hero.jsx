import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import spiceCollection from "../assets/export/spice-collection.png";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const spiceRef = useRef(null);
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
          }
        )
        .fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.5"
        )
        .fromTo(
          spiceRef.current,
          {
            opacity: 0,
            y: 80,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
          },
          "-=0.4"
        )
        .fromTo(
          scrollRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.5,
          },
          "-=0.3"
        );

      /*
       * Scroll animation
       *
       * The spice image moves upward and scales slightly
       * when the user starts scrolling.
       */

      gsap.to(spiceRef.current, {
        y: -120,
        scale: 1.08,
        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(titleRef.current, {
        y: -80,
        opacity: 0,
        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "45% top",
          scrub: 1,
        },
      });

      gsap.to(subtitleRef.current, {
        y: -60,
        opacity: 0,
        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "40% top",
          scrub: 1,
        },
      });

      gsap.to(scrollRef.current, {
        opacity: 0,
        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "20% top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#080808] text-[#F5F1E8]"
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 bg-[#080808]" />

      {/* GOLD AMBIENT GLOW */}

      <div className="pointer-events-none absolute left-1/2 top-[55%] h-[650px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A62A]/[0.07] blur-[140px]" />

      {/* SECONDARY GLOW */}

      <div className="pointer-events-none absolute left-[15%] top-[35%] h-[300px] w-[300px] rounded-full bg-[#D4A62A]/[0.025] blur-[100px]" />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col items-center px-6 pt-32 md:px-10 lg:pt-36">

        {/* =====================================================
            HEADING
        ====================================================== */}

        <div
          ref={titleRef}
          className="w-full max-w-6xl text-center"
        >
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A62A] md:text-xs">
            Premium Indian Spices
          </p>

          <h1 className="text-[52px] font-medium leading-[0.88] tracking-[-0.055em] text-[#F5F1E8] sm:text-6xl md:text-7xl lg:text-[92px] xl:text-[108px]">
            From India.
            <br />

            <span className="text-[#D4A62A]">
              To the World.
            </span>
          </h1>
        </div>

        {/* =====================================================
            SUBTITLE
        ====================================================== */}

        <div
          ref={subtitleRef}
          className="mt-7 max-w-xl text-center"
        >
          <p className="text-sm leading-7 text-[#F5F1E8]/55 md:text-base md:leading-8">
            Premium Indian spices, carefully sourced and
            prepared for wholesalers, distributors and
            international markets.
          </p>
        </div>

        {/* =====================================================
            SPICE COLLECTION
        ====================================================== */}

        <div
          ref={spiceRef}
          className="relative mt-8 flex w-full flex-1 items-start justify-center md:mt-10"
        >
          <img
            src={spiceCollection}
            alt="Premium Indian spices"
            className="w-[390px] max-w-[92vw] object-contain sm:w-[480px] md:w-[620px] lg:w-[760px] xl:w-[850px]"
          />
        </div>

        {/* =====================================================
            SCROLL INDICATOR
        ====================================================== */}

        <div
          ref={scrollRef}
          className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center"
        >
          <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#F5F1E8]/35">
            Scroll to explore
          </p>

          <div className="mt-3 flex h-11 w-7 items-start justify-center rounded-full border border-[#F5F1E8]/20 p-1.5">
            <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#D4A62A]" />
          </div>
        </div>

      </div>

      {/* =====================================================
          BOTTOM FADE
      ====================================================== */}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent" />
    </section>
  );
}

export default Hero;