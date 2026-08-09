import { useEffect, useRef } from "react";

function Products() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const animatedElements = section.querySelectorAll(
      ".product-reveal, .product-image-reveal, .product-stat-reveal"
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
        rootMargin: "0px 0px -80px 0px",
      }
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="overflow-hidden bg-[#f4f3ef] px-6 py-28 text-black lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* SECTION INTRO */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">

          <div className="product-reveal lg:col-span-8">

            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-600">
              Our Product
            </p>

            <h2 className="mt-6 text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-7xl lg:text-[90px]">
              One spice.
              <br />
              <span className="text-gray-400">
                Many possibilities.
              </span>
            </h2>

          </div>

          <div className="product-reveal product-delay-1 lg:col-span-4">

            <p className="max-w-md text-lg leading-8 text-gray-600">
              We begin with premium Indian turmeric and provide
              export-ready formats for wholesalers, distributors,
              manufacturers and international buyers.
            </p>

          </div>

        </div>

        {/* PRODUCT 01 */}
        <div className="mt-24 grid gap-8 lg:grid-cols-12">

          <div className="product-image-reveal overflow-hidden rounded-[2rem] bg-white lg:col-span-8">

            <div className="product-image-group group relative h-[500px] overflow-hidden md:h-[650px]">

              <img
                src="https://images.unsplash.com/photo-1615485500834-bc10199bc727?auto=format&fit=crop&w=2200&q=90"
                alt="Premium Indian turmeric powder"
                className="product-image h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="product-image-caption absolute bottom-8 left-8 right-8 md:bottom-10 md:left-10">

                <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">
                  01 / Turmeric
                </p>

                <h3 className="mt-3 text-4xl font-medium text-white md:text-6xl">
                  Turmeric Powder
                </h3>

              </div>

            </div>

          </div>

          <div className="product-reveal product-delay-1 flex flex-col justify-between rounded-[2rem] bg-white p-8 lg:col-span-4 lg:p-10">

            <div>

              <span className="inline-flex rounded-full bg-[#f4f3ef] px-4 py-2 text-xs uppercase tracking-widest text-gray-500">
                Ground Turmeric
              </span>

              <h3 className="mt-8 text-4xl font-medium leading-tight">
                Fine.
                <br />
                Consistent.
                <br />
                Export ready.
              </h3>

              <p className="mt-6 leading-7 text-gray-600">
                Turmeric powder prepared for international B2B
                requirements and suitable for food manufacturers,
                wholesalers and distributors.
              </p>

            </div>

            <div className="mt-10 border-t border-gray-200 pt-6">

              <div className="product-stat-reveal flex justify-between py-3">
                <span className="text-sm text-gray-500">
                  Form
                </span>

                <span className="text-sm font-medium">
                  Powder
                </span>
              </div>

              <div className="product-stat-reveal flex justify-between border-t border-gray-100 py-3">
                <span className="text-sm text-gray-500">
                  Supply
                </span>

                <span className="text-sm font-medium">
                  Bulk
                </span>
              </div>

              <div className="product-stat-reveal flex justify-between border-t border-gray-100 py-3">
                <span className="text-sm text-gray-500">
                  Market
                </span>

                <span className="text-sm font-medium">
                  Worldwide
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* PRODUCT 02 */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12">

          <div className="product-reveal flex flex-col justify-between rounded-[2rem] bg-black p-8 text-white lg:col-span-4 lg:p-10">

            <div>

              <span className="inline-flex rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-widest text-white/60">
                Whole Turmeric
              </span>

              <h3 className="mt-8 text-4xl font-medium leading-tight md:text-5xl">
                Turmeric
                <br />
                Fingers.
              </h3>

              <p className="mt-6 leading-7 text-white/60">
                Whole dried turmeric prepared for bulk buyers,
                processors, distributors and spice manufacturers.
              </p>

            </div>

            <a
              href="#quote"
              className="product-link group mt-10 flex items-center justify-between border-t border-white/20 pt-6 text-sm uppercase tracking-widest"
            >
              Request specifications

              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-black transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </a>

          </div>

          <div className="product-image-reveal product-delay-1 overflow-hidden rounded-[2rem] bg-white lg:col-span-8">

            <div className="product-image-group group relative h-[500px] overflow-hidden md:h-[650px]">

              <img
                src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=2200&q=90"
                alt="Indian turmeric"
                className="product-image h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="product-image-caption absolute bottom-8 left-8 md:bottom-10 md:left-10">

                <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">
                  02 / Turmeric
                </p>

                <h3 className="mt-3 text-4xl font-medium text-white md:text-6xl">
                  Turmeric Fingers
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* CUSTOM SUPPLY */}
        <div className="product-reveal mt-8 overflow-hidden rounded-[2rem] bg-yellow-400">

          <div className="grid gap-10 p-8 md:p-12 lg:grid-cols-12 lg:p-16">

            <div className="lg:col-span-8">

              <p className="text-xs font-semibold uppercase tracking-[0.35em]">
                03 / Custom Supply
              </p>

              <h3 className="mt-6 max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-7xl">
                Your market.
                <br />
                Your requirements.
                <br />
                Our supply.
              </h3>

            </div>

            <div className="flex flex-col justify-end lg:col-span-4">

              <p className="leading-7 text-black/70">
                Tell us your required quantity, packaging,
                destination and specifications. We'll work with
                you to prepare an export solution around your
                requirements.
              </p>

              <a
                href="#quote"
                className="group mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
              >
                Discuss Your Requirements

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* PRODUCT ANIMATIONS */}
      <style>{`

        .product-reveal,
        .product-image-reveal {
          opacity: 0;
          transform: translateY(70px);
          transition:
            opacity 1000ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1000ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .product-reveal.is-visible,
        .product-image-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .product-delay-1 {
          transition-delay: 180ms;
        }

        /* Image reveal */
        .product-image-reveal {
          overflow: hidden;
        }

        .product-image {
          transform: scale(1.12);
          transition:
            transform 1400ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .product-image-reveal.is-visible .product-image {
          transform: scale(1);
        }

        .product-image-group:hover .product-image {
          transform: scale(1.06);
        }

        /* Image captions */
        .product-image-caption {
          opacity: 0;
          transform: translateY(35px);
          transition:
            opacity 800ms ease,
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: 350ms;
        }

        .product-image-reveal.is-visible .product-image-caption {
          opacity: 1;
          transform: translateY(0);
        }

        /* Stats */
        .product-stat-reveal {
          opacity: 0;
          transform: translateX(-20px);
          transition:
            opacity 600ms ease,
            transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .product-image-reveal.is-visible
        ~ .product-reveal
        .product-stat-reveal:nth-child(1) {
          transition-delay: 500ms;
          opacity: 1;
          transform: translateX(0);
        }

        .product-image-reveal.is-visible
        ~ .product-reveal
        .product-stat-reveal:nth-child(2) {
          transition-delay: 650ms;
          opacity: 1;
          transform: translateX(0);
        }

        .product-image-reveal.is-visible
        ~ .product-reveal
        .product-stat-reveal:nth-child(3) {
          transition-delay: 800ms;
          opacity: 1;
          transform: translateX(0);
        }

        /* Buttons */
        .product-link {
          transition:
            color 300ms ease,
            transform 300ms ease;
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {

          .product-reveal,
          .product-image-reveal,
          .product-image,
          .product-image-caption,
          .product-stat-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }

        }

      `}</style>
    </section>
  );
}

export default Products;