import { useEffect, useRef } from "react";

function BulkSupply() {
  const options = [
    {
      number: "01",
      title: "Bulk Supply",
      text: "Large-volume turmeric supply for wholesalers, distributors and commercial buyers.",
    },
    {
      number: "02",
      title: "Custom Packaging",
      text: "Packaging formats can be discussed according to product, quantity and destination requirements.",
    },
    {
      number: "03",
      title: "Private Label",
      text: "For suitable orders, discuss your own branding and packaging requirements with our export team.",
    },
  ];

  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const elements = section.querySelectorAll(
      ".bulk-reveal, .bulk-image, .bulk-option, .bulk-statement"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("bulk-visible");
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
      id="bulk"
      className="overflow-hidden bg-black px-6 py-28 text-white lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="bulk-reveal grid gap-12 lg:grid-cols-12">

          <div className="lg:col-span-8">

            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
              Bulk & Private Label
            </p>

            <h2 className="mt-6 text-5xl font-medium leading-[0.92] tracking-[-0.05em] md:text-7xl lg:text-[92px]">
              Built around
              <br />

              <span className="text-white/30">
                your market.
              </span>
            </h2>

          </div>

          <div className="bulk-reveal bulk-delay-1 flex items-end lg:col-span-4">

            <p className="max-w-lg text-lg leading-8 text-white/55">
              Whether you need bulk turmeric for distribution or
              a product prepared around your own market requirements,
              let's discuss the possibilities.
            </p>

          </div>

        </div>

        {/* ==========================================
            LARGE VISUAL
        ========================================== */}

        <div className="bulk-image relative mt-20 overflow-hidden rounded-[2rem]">

          <div className="bulk-image-group group relative h-[500px] md:h-[650px]">

            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=2200&q=90"
              alt="Indian spices prepared for export"
              className="bulk-image-photo h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">

              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

                <div className="bulk-image-text">

                  <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">
                    Flexible supply
                  </p>

                  <h3 className="mt-4 max-w-3xl text-4xl font-medium leading-none md:text-6xl">
                    One product.
                    <br />
                    Different possibilities.
                  </h3>

                </div>

                <a
                  href="#quote"
                  className="bulk-image-button group/button flex h-16 w-fit items-center gap-4 rounded-full bg-yellow-400 px-7 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  Discuss Your Requirements

                  <span className="text-lg transition-transform duration-300 group-hover/button:translate-x-1">
                    →
                  </span>
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* ==========================================
            OPTIONS
        ========================================== */}

        <div className="mt-8 grid gap-4 md:grid-cols-3">

          {options.map((option, index) => (
            <div
              key={option.number}
              className={`bulk-option bulk-option-${index + 1} group min-h-[320px] rounded-[2rem] border border-white/10 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-yellow-400/50 hover:bg-white/[0.04] md:p-10`}
            >

              <div className="flex items-center justify-between">

                <span className="bulk-number text-xs uppercase tracking-[0.3em] text-yellow-400">
                  {option.number}
                </span>

                <span className="bulk-arrow flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:translate-x-1 group-hover:border-yellow-400 group-hover:bg-yellow-400 group-hover:text-black">
                  →
                </span>

              </div>

              <div className="mt-24">

                <h3 className="bulk-option-title text-3xl font-medium transition-transform duration-500 group-hover:translate-x-1 md:text-4xl">
                  {option.title}
                </h3>

                <p className="mt-5 leading-7 text-white/45 transition-colors duration-500 group-hover:text-white/70">
                  {option.text}
                </p>

              </div>

            </div>
          ))}

        </div>

        {/* ==========================================
            BOTTOM STATEMENT
        ========================================== */}

        <div className="bulk-statement mt-24 border-t border-white/10 pt-16">

          <p className="max-w-5xl text-3xl font-medium leading-tight md:text-5xl">
            Tell us your quantity,
            <br />
            destination and packaging needs.
            <br />

            <span className="text-yellow-400">
              We'll start from there.
            </span>
          </p>

        </div>

      </div>

      {/* ==========================================
          ANIMATIONS
      ========================================== */}

      <style>{`

        /* ------------------------------------------
           HEADER REVEAL
        ------------------------------------------ */

        .bulk-reveal {
          opacity: 0;
          transform: translateY(70px);

          transition:
            opacity 1000ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1000ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .bulk-reveal.bulk-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .bulk-delay-1 {
          transition-delay: 180ms;
        }


        /* ------------------------------------------
           LARGE IMAGE
        ------------------------------------------ */

        .bulk-image {
          opacity: 0;
          transform: translateY(80px) scale(0.97);

          transition:
            opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1200ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .bulk-image.bulk-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }


        /* IMAGE ZOOM */

        .bulk-image-photo {
          transform: scale(1.12);

          transition:
            transform 1600ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .bulk-image.bulk-visible .bulk-image-photo {
          transform: scale(1);
        }

        .bulk-image-group:hover .bulk-image-photo {
          transform: scale(1.05);
        }


        /* IMAGE TEXT */

        .bulk-image-text {
          opacity: 0;
          transform: translateY(40px);

          transition:
            opacity 800ms ease,
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1);

          transition-delay: 300ms;
        }

        .bulk-image.bulk-visible .bulk-image-text {
          opacity: 1;
          transform: translateY(0);
        }


        /* IMAGE BUTTON */

        .bulk-image-button {
          opacity: 0;
          transform: translateY(30px);

          transition:
            opacity 800ms ease,
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1),
            background-color 300ms ease;

          transition-delay: 500ms;
        }

        .bulk-image.bulk-visible .bulk-image-button {
          opacity: 1;
          transform: translateY(0);
        }


        /* ------------------------------------------
           OPTIONS
        ------------------------------------------ */

        .bulk-option {
          opacity: 0;
          transform: translateY(60px) scale(0.97);

          transition-property:
            opacity,
            transform,
            border-color,
            background-color;

          transition-duration:
            800ms,
            800ms,
            500ms,
            500ms;

          transition-timing-function:
            cubic-bezier(0.22, 1, 0.36, 1),
            cubic-bezier(0.22, 1, 0.36, 1),
            ease,
            ease;
        }

        .bulk-option.bulk-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }


        /* STAGGER */

        .bulk-option-1 {
          transition-delay: 100ms;
        }

        .bulk-option-2 {
          transition-delay: 220ms;
        }

        .bulk-option-3 {
          transition-delay: 340ms;
        }


        /* ------------------------------------------
           OPTION HOVER
        ------------------------------------------ */

        .bulk-arrow {
          transition:
            transform 400ms ease,
            background-color 400ms ease,
            border-color 400ms ease;
        }

        .bulk-option:hover .bulk-arrow {
          transform: translateX(5px);
        }

        .bulk-option:hover .bulk-number {
          letter-spacing: 0.45em;
        }


        /* ------------------------------------------
           BOTTOM STATEMENT
        ------------------------------------------ */

        .bulk-statement {
          opacity: 0;
          transform: translateY(70px);

          transition:
            opacity 1000ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1000ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .bulk-statement.bulk-visible {
          opacity: 1;
          transform: translateY(0);
        }


        /* ------------------------------------------
           ACCESSIBILITY
        ------------------------------------------ */

        @media (prefers-reduced-motion: reduce) {

          .bulk-reveal,
          .bulk-image,
          .bulk-option,
          .bulk-statement,
          .bulk-image-photo,
          .bulk-image-text,
          .bulk-image-button {
            opacity: 1;
            transform: none;
            transition: none;
          }

        }

      `}</style>

    </section>
  );
}

export default BulkSupply;