import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import spiceCollection from "../assets/export/spice-collection.png";

gsap.registerPlugin(ScrollTrigger);

function ShippingAnimation() {
  const sectionRef = useRef(null);

  const spiceCollectionRef = useRef(null);
  const bagsRef = useRef(null);
  const containerRef = useRef(null);
  const truckRef = useRef(null);
  const craneRef = useRef(null);
  const shipRef = useRef(null);
  const customerRef = useRef(null);

  const indiaTextRef = useRef(null);
  const loadingTextRef = useRef(null);
  const transportTextRef = useRef(null);
  const portTextRef = useRef(null);
  const oceanTextRef = useRef(null);
  const customerTextRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const objects = [
        spiceCollectionRef.current,
        bagsRef.current,
        containerRef.current,
        truckRef.current,
        craneRef.current,
        shipRef.current,
        customerRef.current,
      ];

      const texts = [
        indiaTextRef.current,
        loadingTextRef.current,
        transportTextRef.current,
        portTextRef.current,
        oceanTextRef.current,
        customerTextRef.current,
      ];

      // Initial state
      gsap.set(objects, {
        opacity: 0,
      });

      gsap.set(texts, {
        opacity: 0,
        y: 30,
      });

      // Spice collection starts visible
      gsap.set(spiceCollectionRef.current, {
        opacity: 1,
        scale: 0.8,
        x: -80,
        y: 80,
      });

      gsap.set(indiaTextRef.current, {
        opacity: 1,
        y: 0,
      });

      /*
      ==================================================
      MASTER SCROLL TIMELINE
      ==================================================
      */
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: false,
        },
      });

      /* SCENE 01: ORIGIN */
      timeline
        .to(spiceCollectionRef.current, {
          scale: 1,
          x: 0,
          y: 0,
          duration: 1,
          ease: "power2.out",
        })

        .to(
          indiaTextRef.current,
          {
            opacity: 0,
            y: -30,
            duration: 0.4,
          },
          "<"
        );

      /* SCENE 02: BAGS */
      timeline
        .to(spiceCollectionRef.current, {
          scale: 1.25,
          opacity: 0,
          x: -100,
          duration: 0.7,
          ease: "power3.in",
        })

        .fromTo(
          bagsRef.current,
          {
            opacity: 0,
            scale: 0.7,
            y: 120,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          }
        )

        .to(
          loadingTextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          "<0.25"
        );

      /* SCENE 03: CONTAINER */
      timeline
        .to(bagsRef.current, {
          scale: 1.15,
          x: -120,
          opacity: 0,
          duration: 0.7,
          ease: "power3.in",
        })

        .to(
          loadingTextRef.current,
          {
            opacity: 0,
            y: -30,
            duration: 0.3,
          },
          "<"
        )

        .fromTo(
          containerRef.current,
          {
            opacity: 0,
            scale: 0.6,
            x: 250,
            y: 100,
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power3.out",
          }
        );

      /* SCENE 04: TRUCK */
      timeline
        .to(containerRef.current, {
          scale: 1.15,
          x: -250,
          duration: 0.6,
          ease: "power2.inOut",
        })

        .fromTo(
          truckRef.current,
          {
            opacity: 0,
            x: 300,
            scale: 0.75,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          }
        )

        .to(
          transportTextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          "<0.3"
        );

      /* SCENE 05: PORT */
      timeline
        .to(truckRef.current, {
          x: 500,
          scale: 0.8,
          duration: 1,
          ease: "power2.inOut",
        })

        .to(
          transportTextRef.current,
          {
            opacity: 0,
            y: -30,
            duration: 0.3,
          },
          "<0.2"
        )

        .fromTo(
          craneRef.current,
          {
            opacity: 0,
            scale: 0.65,
            y: 100,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          }
        )

        .to(
          portTextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          "<0.25"
        );

      /* SCENE 06: SHIP */
      timeline
        .to(craneRef.current, {
          scale: 1.25,
          y: -100,
          opacity: 0,
          duration: 0.7,
          ease: "power2.in",
        })

        .to(
          portTextRef.current,
          {
            opacity: 0,
            y: -30,
            duration: 0.3,
          },
          "<"
        )

        .fromTo(
          shipRef.current,
          {
            opacity: 0,
            scale: 0.55,
            y: 150,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          }
        );

      /* SCENE 07: OCEAN */
      timeline
        .to(shipRef.current, {
          scale: 0.65,
          x: 0,
          y: -80,
          duration: 1,
          ease: "power2.inOut",
        })

        .to(
          ".export-ocean",
          {
            opacity: 1,
            scale: 1.2,
            duration: 1,
            ease: "power2.inOut",
          },
          "<"
        )

        .to(
          ".export-route",
          {
            strokeDashoffset: 0,
            duration: 1,
            ease: "none",
          },
          "<"
        )

        .to(
          oceanTextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          "<0.3"
        )

        .to(shipRef.current, {
          x: 450,
          duration: 1.8,
          ease: "none",
        });

      /* SCENE 08: DESTINATION */
      timeline
        .to(shipRef.current, {
          opacity: 0,
          scale: 0.3,
          duration: 0.7,
        })

        .to(
          oceanTextRef.current,
          {
            opacity: 0,
            y: -30,
            duration: 0.3,
          },
          "<"
        )

        .fromTo(
          customerRef.current,
          {
            opacity: 0,
            scale: 0.7,
            y: 100,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          }
        )

        .to(
          customerTextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "<0.3"
        );

      /* FINAL TITLE */
      timeline.to(
        ".export-final-title",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "+=0.2"
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[900vh] bg-[#f6f2e8]">
      {/* STICKY CAMERA */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#f6f2e8]" />

        {/* Ocean background */}
        <div className="export-ocean absolute inset-0 bg-[#163b46] opacity-0 transition-colors">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.15),transparent_45%)]" />
        </div>

        {/* TOP LABEL */}
        <div className="absolute left-6 top-8 z-50 lg:left-12 lg:top-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a9653d]">
            Global Export Journey
          </p>
          <h2 className="mt-4 max-w-2xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-[#17352b] md:text-6xl lg:text-7xl">
            From raw origin
            <br />
            <span className="text-[#17352b]/25">to your market.</span>
          </h2>
        </div>

        {/* SCENE TEXT */}
        <div
          ref={indiaTextRef}
          className="absolute bottom-16 left-6 z-40 lg:left-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#a9653d]">
            01 / Origin
          </p>
          <h3 className="mt-3 text-4xl font-medium text-[#17352b] md:text-6xl">
            Premium spices.
          </h3>
        </div>

        <div
          ref={loadingTextRef}
          className="absolute bottom-16 left-6 z-40 lg:left-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#a9653d]">
            02 / Preparation
          </p>
          <h3 className="mt-3 text-4xl font-medium text-[#17352b] md:text-6xl">
            Prepared for export.
          </h3>
        </div>

        <div
          ref={transportTextRef}
          className="absolute bottom-16 left-6 z-40 lg:left-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#a9653d]">
            03 / Inland Transport
          </p>
          <h3 className="mt-3 text-4xl font-medium text-[#17352b] md:text-6xl">
            Moving toward the port.
          </h3>
        </div>

        <div
          ref={portTextRef}
          className="absolute bottom-16 left-6 z-40 lg:left-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#a9653d]">
            04 / Port
          </p>
          <h3 className="mt-3 text-4xl font-medium text-[#17352b] md:text-6xl">
            Ready for international shipping.
          </h3>
        </div>

        <div
          ref={oceanTextRef}
          className="absolute bottom-16 left-6 z-40 text-white lg:left-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#d9a441]">
            05 / Ocean Freight
          </p>
          <h3 className="mt-3 text-4xl font-medium md:text-6xl">
            Across the world.
          </h3>
        </div>

        <div
          ref={customerTextRef}
          className="absolute bottom-16 left-6 z-40 lg:left-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#a9653d]">
            06 / Destination
          </p>
          <h3 className="mt-3 text-4xl font-medium text-[#17352b] md:text-6xl">
            Delivered to your market.
          </h3>
        </div>

        {/* SPICE COLLECTION */}
        <div
          ref={spiceCollectionRef}
          className="absolute left-1/2 top-[32%] z-30 w-[480px] -translate-x-1/2 -translate-y-1/2 md:w-[720px]"
        >
          <img
            src={spiceCollection}
            alt="Premium spices"
            className="h-auto w-full object-contain drop-shadow-[0_35px_70px_rgba(23,53,43,0.18)]"
          />
        </div>

        {/* BAGS */}
        <div
          ref={bagsRef}
          className="absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 gap-4"
        >
          {[1, 2, 3].map((bag) => (
            <div
              key={bag}
              className="relative h-52 w-36 border border-[#a9653d]/20 bg-[#dfc17d] shadow-2xl"
            >
              <div className="absolute inset-x-4 top-5 border-t border-[#17352b]/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-center text-sm font-bold uppercase tracking-widest text-[#17352b]">
                  Indian
                  <br />
                  Spices
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CONTAINER */}
        <div
          ref={containerRef}
          className="absolute left-1/2 top-1/2 z-30 w-[620px] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative h-[300px] w-full bg-[#66706c] shadow-2xl">
            <div className="absolute inset-0 flex justify-between px-8 opacity-20">
              {Array.from({ length: 14 }).map((_, index) => (
                <span key={index} className="h-full w-px bg-white" />
              ))}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl font-bold text-white">
                YOUR
                <span className="font-normal text-[#d9a441]">SPICES</span>
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.4em] text-white/50">
                Bulk Export
              </p>
            </div>
          </div>
        </div>

        {/* TRUCK */}
        <div
          ref={truckRef}
          className="absolute left-1/2 top-[55%] z-30 w-[720px] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative h-[300px]">
            {/* Trailer */}
            <div className="absolute left-0 top-10 h-44 w-[520px] bg-[#66706c]">
              <div className="absolute inset-0 flex justify-between px-8 opacity-20">
                {Array.from({ length: 12 }).map((_, index) => (
                  <span key={index} className="h-full w-px bg-white" />
                ))}
              </div>
              <p className="absolute left-10 top-16 text-3xl font-bold text-white">
                QUALITY
                <span className="font-normal text-[#d9a441]">SPICES</span>
              </p>
            </div>

            {/* Cabin */}
            <div className="absolute right-0 top-24 h-32 w-48 rounded-r-2xl bg-[#17352b]">
              <div className="absolute right-6 top-6 h-12 w-24 rounded bg-[#dbe2df]" />
            </div>

            {/* Wheels */}
            <div className="absolute bottom-5 left-24 h-16 w-16 rounded-full border-8 border-[#17352b] bg-[#d8d1c2]" />
            <div className="absolute bottom-5 left-80 h-16 w-16 rounded-full border-8 border-[#17352b] bg-[#d8d1c2]" />
            <div className="absolute bottom-5 right-20 h-16 w-16 rounded-full border-8 border-[#17352b] bg-[#d8d1c2]" />
          </div>
        </div>

        {/* CRANE */}
        <div
          ref={craneRef}
          className="absolute left-1/2 top-1/2 z-30 w-[800px] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative h-[500px]">
            <div className="absolute bottom-0 left-24 h-[400px] w-5 bg-[#17352b]" />
            <div className="absolute bottom-0 right-24 h-[400px] w-5 bg-[#17352b]" />
            <div className="absolute left-24 top-10 h-6 w-[650px] bg-[#17352b]" />
            <div className="absolute left-1/2 top-16 h-56 w-1 -translate-x-1/2 bg-[#17352b]" />
            <div className="absolute bottom-20 left-1/2 h-32 w-72 -translate-x-1/2 bg-[#66706c]" />
          </div>
        </div>

        {/* SHIP */}
        <div
          ref={shipRef}
          className="absolute left-1/2 top-1/2 z-30 w-[850px] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative h-[400px]">
            {/* Containers */}
            <div className="absolute left-32 top-10 flex gap-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="h-24 w-24 bg-[#66706c]" />
              ))}
            </div>

            {/* Ship Hull */}
            <div className="absolute bottom-16 left-10 h-36 w-[760px] rounded-b-[40%] bg-[#17352b]" />

            {/* Superstructure */}
            <div className="absolute bottom-32 right-20 h-40 w-32 bg-[#f6f2e8]">
              <div className="absolute left-5 top-8 h-10 w-20 bg-[#17352b]" />
            </div>
          </div>
        </div>

        {/* ROUTE */}
        <svg
          className="absolute inset-0 z-10 h-full w-full"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
        >
          <path
            className="export-route"
            d="M 300 650 C 600 500 800 720 1050 480 C 1250 300 1350 400 1500 250"
            fill="none"
            stroke="#d9a441"
            strokeWidth="4"
            strokeDasharray="1800"
            strokeDashoffset="1800"
          />
        </svg>

        {/* CUSTOMER */}
        <div
          ref={customerRef}
          className="absolute right-[12%] top-1/2 z-30 w-[400px] -translate-y-1/2"
        >
          <div className="relative">
            <div className="h-[260px] w-full rounded-t-2xl bg-[#17352b]">
              <div className="grid h-full grid-cols-4 gap-3 p-8">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="rounded bg-[#d9a441]/80" />
                ))}
              </div>
            </div>
            <div className="h-6 bg-[#a9653d]" />
          </div>
        </div>

        {/* FINAL MESSAGE */}
        <div className="export-final-title absolute left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 scale-90 text-center opacity-0">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d9a441]">
            Delivered
          </p>
          <h3 className="mt-6 text-6xl font-medium leading-none text-white md:text-8xl">
            From origin.
            <br />
            <span className="text-[#d9a441]">To your market.</span>
          </h3>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-8 right-6 z-50 lg:right-12">
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#17352b]/40">
              Scroll to follow
            </span>
            <div className="h-10 w-6 rounded-full border border-[#17352b]/20 p-1">
              <div className="h-2 w-full rounded-full bg-[#d9a441]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShippingAnimation;