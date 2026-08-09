import { useEffect, useRef } from "react";

function WhyUs() {
  const reasons = [
    {
      number: "01",
      title: "Trusted Sourcing",
      text: "We focus on reliable Indian sourcing networks and consistent product requirements.",
    },
    {
      number: "02",
      title: "Quality Focus",
      text: "We keep product quality and buyer specifications at the centre of the export process.",
    },
    {
      number: "03",
      title: "Flexible Supply",
      text: "We can work around bulk quantities, formats and packaging requirements.",
    },
    {
      number: "04",
      title: "Export Support",
      text: "We coordinate the key stages involved in preparing products for international buyers.",
    },
  ];

  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const elements = section.querySelectorAll(
      ".why-reveal, .why-card, .why-statement"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("why-visible");
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
      id="why-us"
      className="overflow-hidden bg-[#f3f1eb] px-6 py-28 text-black lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* HEADER */}

        <div className="why-reveal grid gap-12 lg:grid-cols-12">

          <div className="lg:col-span-7">

            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-600">
              Why Choose Us
            </p>

            <h2 className="mt-6 text-5xl font-medium leading-[0.92] tracking-[-0.05em] md:text-7xl lg:text-[92px]">
              Built around
              <br />

              <span className="text-gray-400">
                your requirements.
              </span>
            </h2>

          </div>

          <div className="why-reveal why-delay-1 flex items-end lg:col-span-5">

            <p className="max-w-lg text-lg leading-8 text-gray-600">
              International buyers need more than a product.
              They need consistency, communication and a supply
              partner they can rely on.
            </p>

          </div>

        </div>

        {/* FEATURE GRID */}

        <div className="mt-24 grid gap-4 md:grid-cols-2">

          {reasons.map((reason, index) => (
            <div
              key={reason.number}
              className={`why-card why-card-${index + 1} group relative min-h-[330px] overflow-hidden rounded-[2rem] bg-white p-8 text-black transition-all duration-500 hover:-translate-y-1 hover:bg-black hover:text-white md:p-10`}
            >

              {/* NUMBER */}

              <div className="flex items-center justify-between">

                <span className="why-number text-xs font-semibold uppercase tracking-[0.3em] text-yellow-600">
                  {reason.number}
                </span>

                <span className="why-card-arrow flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 transition-all duration-500 group-hover:border-yellow-400 group-hover:bg-yellow-400 group-hover:text-black">
                  →
                </span>

              </div>

              {/* CONTENT */}

              <div className="absolute bottom-8 left-8 right-8 md:bottom-10 md:left-10 md:right-10">

                <h3 className="why-card-title text-4xl font-medium tracking-tight md:text-5xl">
                  {reason.title}
                </h3>

                <p className="mt-5 max-w-lg leading-7 text-gray-500 transition-colors duration-500 group-hover:text-white/60">
                  {reason.text}
                </p>

              </div>

            </div>
          ))}

        </div>

        {/* LARGE STATEMENT */}

        <div className="why-statement mt-24 border-t border-black/10 pt-16">

          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">

            <div className="lg:col-span-8">

              <p className="text-4xl font-medium leading-tight tracking-tight md:text-6xl">
                Quality products.
                <br />
                Clear communication.
                <br />

                <span className="text-yellow-600">
                  Long-term relationships.
                </span>
              </p>

            </div>

            <div className="lg:col-span-4">

              <p className="leading-7 text-gray-500">
                Our goal is simple: build dependable relationships
                with buyers who value quality Indian agricultural
                products and reliable supply.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* WHY US ANIMATIONS */}

      <style>{`

        /* ------------------------------------------
           HEADER REVEAL
        ------------------------------------------ */

        .why-reveal {
          opacity: 0;
          transform: translateY(70px);

          transition:
            opacity 1000ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1000ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .why-reveal.why-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .why-delay-1 {
          transition-delay: 180ms;
        }


        /* ------------------------------------------
           CARDS
        ------------------------------------------ */

        .why-card {
          opacity: 0;
          transform: translateY(70px) scale(0.97);

          transition-property:
            opacity,
            transform,
            background-color,
            color;

          transition-duration:
            850ms,
            850ms,
            500ms,
            500ms;

          transition-timing-function:
            cubic-bezier(0.22, 1, 0.36, 1),
            cubic-bezier(0.22, 1, 0.36, 1),
            ease,
            ease;
        }

        .why-card.why-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }


        /* STAGGER */

        .why-card-1 {
          transition-delay: 100ms;
        }

        .why-card-2 {
          transition-delay: 220ms;
        }

        .why-card-3 {
          transition-delay: 340ms;
        }

        .why-card-4 {
          transition-delay: 460ms;
        }


        /* ------------------------------------------
           CARD HOVER
        ------------------------------------------ */

        .why-card-arrow {
          transition:
            transform 400ms ease,
            background-color 400ms ease,
            border-color 400ms ease,
            color 400ms ease;
        }

        .why-card:hover .why-card-arrow {
          transform: translateX(5px) rotate(-5deg);
        }

        .why-card:hover .why-number {
          letter-spacing: 0.4em;
        }

        .why-card-title {
          transition:
            transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .why-card:hover .why-card-title {
          transform: translateX(5px);
        }


        /* ------------------------------------------
           LARGE STATEMENT
        ------------------------------------------ */

        .why-statement {
          opacity: 0;
          transform: translateY(70px);

          transition:
            opacity 1000ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1000ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .why-statement.why-visible {
          opacity: 1;
          transform: translateY(0);
        }


        /* ------------------------------------------
           ACCESSIBILITY
        ------------------------------------------ */

        @media (prefers-reduced-motion: reduce) {

          .why-reveal,
          .why-card,
          .why-statement {
            opacity: 1;
            transform: none;
            transition: none;
          }

        }

      `}</style>

    </section>
  );
}

export default WhyUs;