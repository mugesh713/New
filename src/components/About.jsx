import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animations for text and image
      gsap.fromTo(
        ".reveal-text",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // Stat counters
      statsRef.current.forEach((statEl) => {
        if (!statEl) return;
        const targetValue = parseInt(statEl.dataset.value, 10);
        const obj = { val: 0 };

        gsap.fromTo(
          statEl,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statEl,
              start: "top 85%",
              onEnter: () => {
                if (!isNaN(targetValue)) {
                  gsap.to(obj, {
                    val: targetValue,
                    duration: 1.5,
                    ease: "power1.out",
                    onUpdate: () => {
                      const numSpan = statEl.querySelector(".stat-number");
                      if (numSpan) {
                        numSpan.innerText =
                          Math.floor(obj.val).toLocaleString() +
                          (statEl.dataset.suffix || "");
                      }
                    },
                  });
                }
              },
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-gradient-to-b from-[#8ebdf0] via-[#e2edfa] to-[#f4f3ef] font-sans text-black"
    >
      <section
        id="about"
        className="relative z-10 px-6 pb-24 pt-20 lg:px-16 lg:pb-32"
      >
        <div className="mx-auto max-w-[1400px]">
          {/* MAIN GRID */}
          <div ref={headlineRef} className="relative grid gap-12 lg:grid-cols-12">
            
            {/* LEFT COLUMN: IMAGE TOP + BIG STACKED TEXT BELOW */}
            <div className="flex flex-col justify-between lg:col-span-6">
              {/* TOP SMALL HIGHWAY IMAGE */}
              <div className="reveal-text mb-12 max-w-[280px] overflow-hidden rounded-md shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                  alt="Curved Highway Freight"
                  className="h-[170px] w-full object-cover"
                />
              </div>

              {/* HUGE STACKED HEADING */}
              <h2 className="reveal-text text-5xl font-black uppercase tracking-tight sm:text-6xl md:text-7xl lg:text-[76px] leading-[0.9]">
                <span className="text-gray-400">WE MOVE</span> <br />
                <span className="text-gray-400">FREIGHT.</span> <br />
                <span className="text-black">WE OWN</span> <br />
                <span className="text-black">THE OUTCOME.</span>
              </h2>
            </div>

            {/* CENTER FLOATING DOT DECORATION */}
            <div className="hidden lg:absolute lg:left-1/2 lg:top-1/2 lg:flex lg:-translate-x-1/2 lg:-translate-y-1/2 items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white/60 shadow-sm backdrop-blur-sm">
                <div className="h-2 w-2 rounded-full bg-black" />
              </div>
            </div>

            {/* RIGHT COLUMN: PARAGRAPHS & PILL BUTTON */}
            <div className="flex flex-col justify-center lg:col-span-6 lg:pl-16">
              <div className="max-w-xl space-y-6">
                <p className="reveal-text text-lg font-medium leading-relaxed text-gray-900 md:text-xl">
                  With every service under one roof and one accountable team,
                  your supply chain moves the way your business demands:{" "}
                  <strong>predictably</strong>, <strong>transparently</strong>,
                  and <strong>without excuses</strong>.
                </p>

                <p className="reveal-text text-base leading-relaxed text-gray-700">
                  That means no finger-pointing between vendors. No delays lost
                  in handoffs. Just one team, accountable from origin to
                  destination.
                </p>

                <div className="reveal-text pt-4">
                  <a
                    href="#services"
                    className="inline-flex items-center rounded-full border border-gray-400 bg-white/80 px-7 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-sm transition-all hover:border-black hover:bg-black hover:text-white"
                  >
                    LEARN MORE ABOUT US
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* STATISTICS SECTION */}
          <div className="mt-32 border-t border-gray-300/70 pt-12">
            <p className="reveal-text mb-12 text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
              From countless journeys, clarity emerges
            </p>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
              <div
                ref={(el) => (statsRef.current[0] = el)}
                data-value="2500"
                data-suffix="+"
                className="border-b border-gray-300/60 pb-8 md:border-b-0 md:border-r md:pr-8"
              >
                <p className="stat-number text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
                  0
                </p>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Shipments per month
                </p>
              </div>

              <div
                ref={(el) => (statsRef.current[1] = el)}
                data-value="98"
                data-suffix=".2%"
                className="border-b border-gray-300/60 pb-8 md:border-b-0 md:border-r md:px-8"
              >
                <p className="stat-number text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
                  0
                </p>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  On-time delivery rate
                </p>
              </div>

              <div
                ref={(el) => (statsRef.current[2] = el)}
                data-value="8"
                data-suffix="+"
                className="md:pl-8"
              >
                <p className="stat-number text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
                  0
                </p>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Years in operation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;