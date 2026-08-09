import { useEffect, useRef } from "react";

function ExportProcess() {
  const steps = [
    {
      number: "01",
      title: "Source",
      text: "Turmeric is sourced through trusted Indian supply networks.",
    },
    {
      number: "02",
      title: "Inspect",
      text: "The product is reviewed against the buyer's required specifications.",
    },
    {
      number: "03",
      title: "Prepare",
      text: "Turmeric is cleaned, processed and prepared in the required format.",
    },
    {
      number: "04",
      title: "Package",
      text: "Export-ready packaging is arranged according to the order requirements.",
    },
    {
      number: "05",
      title: "Ship",
      text: "Documentation and logistics are coordinated for international shipment.",
    },
    {
      number: "06",
      title: "Deliver",
      text: "The shipment moves toward the agreed destination and buyer.",
    },
  ];

  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const elements = section.querySelectorAll(
      ".process-reveal, .process-step, .process-cta"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("process-visible");
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
      id="process"
      className="overflow-hidden bg-white px-6 py-28 text-black lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="process-reveal grid gap-12 lg:grid-cols-12">

          <div className="lg:col-span-8">

            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-600">
              Export Process
            </p>

            <h2 className="mt-6 text-5xl font-medium leading-[0.92] tracking-[-0.05em] md:text-7xl lg:text-[92px]">
              From source
              <br />

              <span className="text-gray-300">
                to shipment.
              </span>
            </h2>

          </div>

          <div className="process-reveal process-delay-1 flex items-end lg:col-span-4">

            <p className="max-w-md text-lg leading-8 text-gray-600">
              A clear export journey designed around product
              requirements, communication and dependable delivery.
            </p>

          </div>

        </div>

        {/* ==========================================
            VISUAL PROCESS
        ========================================== */}

        <div className="relative mt-24">

          {/* CONNECTING LINE */}

          <div className="process-line absolute left-[23px] top-8 hidden h-[calc(100%-64px)] w-px bg-gray-200 md:block" />

          <div className="space-y-0">

            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`process-step process-step-${index + 1} group relative grid gap-6 border-t border-gray-200 py-10 transition-all duration-500 hover:bg-[#f5f3ed] md:grid-cols-12 md:gap-8 md:px-6`}
              >

                {/* NUMBER */}

                <div className="relative z-10 md:col-span-2">

                  <div className="process-number flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-medium transition-all duration-500 group-hover:border-yellow-400 group-hover:bg-yellow-400 group-hover:scale-110">
                    {step.number}
                  </div>

                </div>

                {/* TITLE */}

                <div className="md:col-span-4">

                  <h3 className="text-4xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:text-5xl">
                    {step.title}
                  </h3>

                </div>

                {/* DESCRIPTION */}

                <div className="md:col-span-4">

                  <p className="max-w-lg text-base leading-7 text-gray-500 transition-colors duration-300 group-hover:text-gray-800 md:text-lg">
                    {step.text}
                  </p>

                </div>

                {/* ARROW */}

                <div className="flex items-center md:col-span-2 md:justify-end">

                  <div className="process-arrow flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-lg transition-all duration-500 group-hover:translate-x-2 group-hover:border-black group-hover:bg-black group-hover:text-white">
                    →
                  </div>

                </div>

              </div>
            ))}

            <div className="border-t border-gray-200" />

          </div>

        </div>

        {/* ==========================================
            BOTTOM CTA
        ========================================== */}

        <div className="process-cta mt-20 grid gap-8 rounded-[2rem] bg-black p-8 text-white md:p-12 lg:grid-cols-12 lg:p-16">

          <div className="lg:col-span-8">

            <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">
              Ready to source?
            </p>

            <h3 className="mt-5 max-w-4xl text-4xl font-medium leading-tight md:text-6xl">
              Tell us what you need.
              <br />
              We'll discuss the next step.
            </h3>

          </div>

          <div className="flex items-end lg:col-span-4 lg:justify-end">

            <a
              href="#quote"
              className="process-quote group flex w-fit items-center gap-5 rounded-full bg-yellow-400 px-7 py-4 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Request a Quote

              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

          </div>

        </div>

      </div>

      {/* ==========================================
          ANIMATION CSS
      ========================================== */}

      <style>{`

        /* ------------------------------------------
           GENERAL REVEAL
        ------------------------------------------ */

        .process-reveal {
          opacity: 0;
          transform: translateY(70px);

          transition:
            opacity 1000ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1000ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .process-reveal.process-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .process-delay-1 {
          transition-delay: 180ms;
        }


        /* ------------------------------------------
           PROCESS STEPS
        ------------------------------------------ */

        .process-step {
          opacity: 0;
          transform: translateX(-60px);

          transition-property:
            opacity,
            transform,
            background-color;

          transition-duration:
            800ms,
            800ms,
            500ms;

          transition-timing-function:
            cubic-bezier(0.22, 1, 0.36, 1),
            cubic-bezier(0.22, 1, 0.36, 1),
            ease;
        }

        .process-step.process-visible {
          opacity: 1;
          transform: translateX(0);
        }


        /* STAGGER */

        .process-step-1 {
          transition-delay: 100ms;
        }

        .process-step-2 {
          transition-delay: 200ms;
        }

        .process-step-3 {
          transition-delay: 300ms;
        }

        .process-step-4 {
          transition-delay: 400ms;
        }

        .process-step-5 {
          transition-delay: 500ms;
        }

        .process-step-6 {
          transition-delay: 600ms;
        }


        /* ------------------------------------------
           CONNECTING LINE
        ------------------------------------------ */

        .process-line {
          transform-origin: top;
          transform: scaleY(0);

          transition:
            transform 1800ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .process-step.process-visible
        ~ .process-line {
          transform: scaleY(1);
        }


        /* ------------------------------------------
           NUMBER
        ------------------------------------------ */

        .process-number {
          transition:
            transform 400ms ease,
            border-color 400ms ease,
            background-color 400ms ease;
        }

        .process-step:hover .process-number {
          transform: scale(1.1);
        }


        /* ------------------------------------------
           ARROW
        ------------------------------------------ */

        .process-arrow {
          transition:
            transform 400ms ease,
            background-color 400ms ease,
            color 400ms ease,
            border-color 400ms ease;
        }


        /* ------------------------------------------
           CTA
        ------------------------------------------ */

        .process-cta {
          opacity: 0;
          transform: translateY(70px) scale(0.98);

          transition:
            opacity 1000ms 300ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1000ms 300ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .process-cta.process-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }


        /* ------------------------------------------
           ACCESSIBILITY
        ------------------------------------------ */

        @media (prefers-reduced-motion: reduce) {

          .process-reveal,
          .process-step,
          .process-cta,
          .process-line {
            opacity: 1;
            transform: none;
            transition: none;
          }

        }

      `}</style>

    </section>
  );
}

export default ExportProcess;