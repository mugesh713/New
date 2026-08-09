import { useEffect, useRef } from "react";

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) return;

    const elements = footer.querySelectorAll(
      ".footer-reveal, .footer-column, .footer-bottom"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("footer-visible");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
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
    <footer
      ref={footerRef}
      id="contact"
      className="overflow-hidden bg-black px-6 py-20 text-white lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* ==========================================
            TOP
        ========================================== */}

        <div className="grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-12">

          {/* BRAND */}

          <div className="footer-reveal lg:col-span-7">

            <p className="footer-logo text-3xl font-bold tracking-tight">
              YOUR<span className="font-normal">SPICES</span>
            </p>

            <p className="mt-6 max-w-md leading-7 text-white/45">
              Premium Indian turmeric prepared for global
              markets.
            </p>

          </div>

          {/* NAVIGATION */}

          <div className="grid grid-cols-2 gap-10 lg:col-span-5">

            <div className="footer-column">

              <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                Navigate
              </p>

              <div className="mt-6 space-y-4">

                <a
                  href="#about"
                  className="footer-link group block text-sm text-white/60 transition-colors duration-300 hover:text-yellow-400"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                    About
                  </span>
                </a>

                <a
                  href="#products"
                  className="footer-link group block text-sm text-white/60 transition-colors duration-300 hover:text-yellow-400"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                    Products
                  </span>
                </a>

                <a
                  href="#quality"
                  className="footer-link group block text-sm text-white/60 transition-colors duration-300 hover:text-yellow-400"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                    Quality
                  </span>
                </a>

                <a
                  href="#markets"
                  className="footer-link group block text-sm text-white/60 transition-colors duration-300 hover:text-yellow-400"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                    Markets
                  </span>
                </a>

              </div>

            </div>

            {/* CONNECT */}

            <div className="footer-column footer-column-2">

              <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                Connect
              </p>

              <div className="mt-6 space-y-4">

                <a
                  href="#quote"
                  className="footer-link group block text-sm text-white/60 transition-colors duration-300 hover:text-yellow-400"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                    Request a Quote
                  </span>
                </a>

                <a
                  href="#contact"
                  className="footer-link group block text-sm text-white/60 transition-colors duration-300 hover:text-yellow-400"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                    Contact
                  </span>
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* ==========================================
            BOTTOM
        ========================================== */}

        <div className="footer-bottom flex flex-col justify-between gap-5 pt-8 text-xs text-white/30 md:flex-row">

          <p>
            © {new Date().getFullYear()} YOURSPICES. All rights reserved.
          </p>

          <p>
            Indian Turmeric · Global Markets
          </p>

        </div>

      </div>

      {/* ==========================================
          FOOTER ANIMATIONS
      ========================================== */}

      <style>{`

        /* ------------------------------------------
           BRAND REVEAL
        ------------------------------------------ */

        .footer-reveal {
          opacity: 0;
          transform: translateY(60px);

          transition:
            opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .footer-reveal.footer-visible {
          opacity: 1;
          transform: translateY(0);
        }


        /* ------------------------------------------
           NAVIGATION COLUMNS
        ------------------------------------------ */

        .footer-column {
          opacity: 0;
          transform: translateY(45px);

          transition:
            opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .footer-column.footer-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .footer-column-2 {
          transition-delay: 150ms;
        }


        /* ------------------------------------------
           LINKS
        ------------------------------------------ */

        .footer-link {
          position: relative;
        }

        .footer-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -5px;
          width: 0;
          height: 1px;
          background: #facc15;

          transition:
            width 300ms ease;
        }

        .footer-link:hover::after {
          width: 100%;
        }


        /* ------------------------------------------
           BOTTOM
        ------------------------------------------ */

        .footer-bottom {
          opacity: 0;
          transform: translateY(30px);

          transition:
            opacity 800ms 250ms ease,
            transform 800ms 250ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .footer-bottom.footer-visible {
          opacity: 1;
          transform: translateY(0);
        }


        /* ------------------------------------------
           ACCESSIBILITY
        ------------------------------------------ */

        @media (prefers-reduced-motion: reduce) {

          .footer-reveal,
          .footer-column,
          .footer-bottom {
            opacity: 1;
            transform: none;
            transition: none;
          }

        }

      `}</style>

    </footer>
  );
}

export default Footer;