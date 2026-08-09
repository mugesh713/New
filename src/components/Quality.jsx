import { useEffect, useRef } from "react";

function Quality() {
  const stages = [
    {
      number: "01",
      title: "Sourcing",
      text: "We work with trusted Indian suppliers to source quality turmeric.",
    },
    {
      number: "02",
      title: "Selection",
      text: "Turmeric is selected and sorted according to the required specification.",
    },
    {
      number: "03",
      title: "Processing",
      text: "The product is prepared in the required form for international buyers.",
    },
    {
      number: "04",
      title: "Quality",
      text: "Quality parameters are reviewed before the product moves toward export.",
    },
  ];

  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const elements = section.querySelectorAll(
      ".quality-reveal, .quality-image-reveal, .quality-stage"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -70px 0px",
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="quality"
      className="overflow-hidden bg-black px-6 py-28 text-white lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* HEADER */}
        <div className="grid gap-12 lg:grid-cols-12">

          <div className="quality-reveal lg:col-span-8">

            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
              Quality & Processing
            </p>

            <h2 className="mt-6 max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-7xl lg:text-[90px]">
              Quality is not
              <br />
              <span className="text-white/30">
                an afterthought.
              </span>
            </h2>

          </div>

          <div className="quality-reveal quality-delay-1 flex items-end lg:col-span-4">

            <p className="max-w-md text-lg leading-8 text-white/60">
              From sourcing to final preparation, every stage is
              approached with consistency, care and the needs of
              international buyers in mind.
            </p>

          </div>

        </div>

        {/* IMAGE */}
        <div className="quality-image-reveal relative mt-20 overflow-hidden rounded-[2rem]">

          <div className="quality-image-group group relative h-[480px] md:h-[650px]">

            <img
              src="https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=2200&q=90"
              alt="Indian turmeric"
              className="quality-image h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />

            <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">

              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

                <div className="quality-image-text">

                  <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">
                    From source to shipment
                  </p>

                  <h3 className="mt-4 text-4xl font-medium leading-none md:text-6xl">
                    Every stage matters.
                  </h3>

                </div>

                <div className="quality-arrow flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/40 text-2xl">
                  ↓
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PROCESS STAGES */}
        <div className="mt-20 border-t border-white/15">

          {stages.map((stage, index) => (
            <div
              key={stage.number}
              className={`quality-stage quality-stage-${index + 1} group grid gap-5 border-b border-white/15 py-8 transition-colors duration-500 hover:bg-white/[0.03] md:grid-cols-12 md:items-center md:py-10`}
            >

              {/* NUMBER */}
              <div className="md:col-span-2">

                <span className="quality-number text-sm text-yellow-400">
                  {stage.number}
                </span>

              </div>

              {/* TITLE */}
              <div className="md:col-span-4">

                <h3 className="text-3xl font-medium transition-transform duration-300 group-hover:translate-x-2 md:text-4xl">
                  {stage.title}
                </h3>

              </div>

              {/* DESCRIPTION */}
              <div className="md:col-span-5">

                <p className="max-w-lg leading-7 text-white/50 transition-colors duration-300 group-hover:text-white/70">
                  {stage.text}
                </p>

              </div>

              {/* ARROW */}
              <div className="hidden justify-end md:col-span-1 md:flex">

                <span className="quality-stage-arrow flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-yellow-400 group-hover:bg-yellow-400 group-hover:text-black">
                  →
                </span>

              </div>

            </div>
          ))}

        </div>

        {/* BOTTOM STATEMENT */}
        <div className="quality-reveal mt-24 max-w-5xl">

          <p className="text-3xl font-medium leading-tight md:text-5xl">
            Better sourcing.
            <br />
            Better consistency.
            <br />
            <span className="text-yellow-400">
              Better export relationships.
            </span>
          </p>

        </div>

      </div>

      {/* QUALITY ANIMATIONS */}
      <style>{`

        /* General reveal */

        .quality-reveal {
          opacity: 0;
          transform: translateY(70px);
          transition:
            opacity 1000ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1000ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .quality-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .quality-delay-1 {
          transition-delay: 180ms;
        }

        /* Image reveal */

        .quality-image-reveal {
          opacity: 0;
          transform: translateY(80px);
          transition:
            opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1100ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .quality-image-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Image zoom */

        .quality-image {
          transform: scale(1.12);
          transition:
            transform 1600ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .quality-image-reveal.is-visible .quality-image {
          transform: scale(1);
        }

        .quality-image-group:hover .quality-image {
          transform: scale(1.05);
        }

        /* Image text */

        .quality-image-text {
          opacity: 0;
          transform: translateY(40px);
          transition:
            opacity 800ms ease,
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: 350ms;
        }

        .quality-image-reveal.is-visible .quality-image-text {
          opacity: 1;
          transform: translateY(0);
        }

        /* Image arrow */

        .quality-arrow {
          opacity: 0;
          transform: scale(0.6) rotate(-30deg);
          transition:
            opacity 800ms ease,
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: 550ms;
        }

        .quality-image-reveal.is-visible .quality-arrow {
          opacity: 1;
          transform: scale(1) rotate(0);
        }

        .quality-image-reveal.is-visible .quality-arrow {
          animation: qualityArrowFloat 3s 1.4s ease-in-out infinite;
        }

        @keyframes qualityArrowFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        /* Process stages */

        .quality-stage {
          opacity: 0;
          transform: translateX(-50px);
          transition:
            opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1),
            background-color 500ms ease;
        }

        .quality-stage.is-visible {
          opacity: 1;
          transform: translateX(0);
        }

        .quality-stage-1 {
          transition-delay: 100ms;
        }

        .quality-stage-2 {
          transition-delay: 220ms;
        }

        .quality-stage-3 {
          transition-delay: 340ms;
        }

        .quality-stage-4 {
          transition-delay: 460ms;
        }

        /* Number */

        .quality-number {
          display: inline-block;
          transition:
            transform 400ms ease,
            letter-spacing 400ms ease;
        }

        .quality-stage:hover .quality-number {
          transform: translateX(6px);
          letter-spacing: 0.12em;
        }

        /* Arrow */

        .quality-stage-arrow {
          transition:
            transform 300ms ease,
            background-color 300ms ease,
            border-color 300ms ease;
        }

        .quality-stage:hover .quality-stage-arrow {
          transform: translateX(5px);
        }

        /* Reduced motion */

        @media (prefers-reduced-motion: reduce) {

          .quality-reveal,
          .quality-image-reveal,
          .quality-stage,
          .quality-image,
          .quality-image-text,
          .quality-arrow {
            opacity: 1;
            transform: none;
            transition: none;
            animation: none;
          }

        }

      `}</style>
    </section>
  );
}

export default Quality;