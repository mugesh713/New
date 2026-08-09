import { useEffect, useRef } from "react";

function Quote() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const elements = section.querySelectorAll(
      ".quote-reveal, .quote-form, .quote-field"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("quote-visible");
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
      id="quote"
      className="overflow-hidden bg-[#f4c20d] px-6 py-28 text-black lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="quote-reveal grid gap-12 lg:grid-cols-12">

          <div className="lg:col-span-8">

            <p className="text-xs font-semibold uppercase tracking-[0.35em]">
              Request a Quote
            </p>

            <h2 className="mt-6 text-5xl font-medium leading-[0.92] tracking-[-0.05em] md:text-7xl lg:text-[92px]">
              Tell us what
              <br />

              <span className="text-black/40">
                you need.
              </span>
            </h2>

          </div>

          <div className="quote-reveal quote-delay-1 flex items-end lg:col-span-4">

            <p className="max-w-md text-lg leading-8 text-black/65">
              Share your turmeric requirements and our team can
              discuss product specifications, quantity, packaging
              and destination.
            </p>

          </div>

        </div>

        {/* ==========================================
            FORM
        ========================================== */}

        <div className="quote-form mt-20 rounded-[2rem] bg-white p-6 md:p-10 lg:p-14">

          <form className="grid gap-8">

            {/* COMPANY + CONTACT */}

            <div className="grid gap-8 md:grid-cols-2">

              <div className="quote-field">

                <label
                  htmlFor="company"
                  className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em]"
                >
                  Company Name
                </label>

                <input
                  id="company"
                  type="text"
                  placeholder="Your company"
                  className="quote-input w-full border-b border-gray-300 bg-transparent px-0 py-4 text-lg outline-none transition"
                />

              </div>

              <div className="quote-field quote-field-2">

                <label
                  htmlFor="contact"
                  className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em]"
                >
                  Contact Person
                </label>

                <input
                  id="contact"
                  type="text"
                  placeholder="Your name"
                  className="quote-input w-full border-b border-gray-300 bg-transparent px-0 py-4 text-lg outline-none transition"
                />

              </div>

            </div>

            {/* EMAIL + PHONE */}

            <div className="grid gap-8 md:grid-cols-2">

              <div className="quote-field quote-field-3">

                <label
                  htmlFor="email"
                  className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em]"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="quote-input w-full border-b border-gray-300 bg-transparent px-0 py-4 text-lg outline-none transition"
                />

              </div>

              <div className="quote-field quote-field-4">

                <label
                  htmlFor="phone"
                  className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em]"
                >
                  Phone / WhatsApp
                </label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="+91"
                  className="quote-input w-full border-b border-gray-300 bg-transparent px-0 py-4 text-lg outline-none transition"
                />

              </div>

            </div>

            {/* PRODUCT + COUNTRY */}

            <div className="grid gap-8 md:grid-cols-2">

              <div className="quote-field quote-field-5">

                <label
                  htmlFor="product"
                  className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em]"
                >
                  Product
                </label>

                <select
                  id="product"
                  defaultValue=""
                  className="quote-input w-full border-b border-gray-300 bg-transparent px-0 py-4 text-lg outline-none"
                >

                  <option value="" disabled>
                    Select product
                  </option>

                  <option value="turmeric-fingers">
                    Turmeric Fingers
                  </option>

                  <option value="turmeric-powder">
                    Turmeric Powder
                  </option>

                  <option value="bulk-turmeric">
                    Bulk Turmeric Supply
                  </option>

                </select>

              </div>

              <div className="quote-field quote-field-6">

                <label
                  htmlFor="country"
                  className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em]"
                >
                  Destination Country
                </label>

                <input
                  id="country"
                  type="text"
                  placeholder="Country"
                  className="quote-input w-full border-b border-gray-300 bg-transparent px-0 py-4 text-lg outline-none transition"
                />

              </div>

            </div>

            {/* QUANTITY + PACKAGING */}

            <div className="grid gap-8 md:grid-cols-2">

              <div className="quote-field quote-field-7">

                <label
                  htmlFor="quantity"
                  className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em]"
                >
                  Required Quantity
                </label>

                <input
                  id="quantity"
                  type="text"
                  placeholder="e.g. 5 MT / 10 MT"
                  className="quote-input w-full border-b border-gray-300 bg-transparent px-0 py-4 text-lg outline-none transition"
                />

              </div>

              <div className="quote-field quote-field-8">

                <label
                  htmlFor="packaging"
                  className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em]"
                >
                  Packaging Requirement
                </label>

                <input
                  id="packaging"
                  type="text"
                  placeholder="e.g. 25 kg / 50 kg bags"
                  className="quote-input w-full border-b border-gray-300 bg-transparent px-0 py-4 text-lg outline-none transition"
                />

              </div>

            </div>

            {/* MESSAGE */}

            <div className="quote-field quote-field-9">

              <label
                htmlFor="message"
                className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em]"
              >
                Your Requirements
              </label>

              <textarea
                id="message"
                rows="5"
                placeholder="Tell us about your requirements..."
                className="quote-input w-full resize-none border-b border-gray-300 bg-transparent px-0 py-4 text-lg outline-none transition"
              />

            </div>

            {/* SUBMIT */}

            <div className="quote-field quote-field-submit flex flex-col justify-between gap-6 pt-4 md:flex-row md:items-center">

              <p className="max-w-md text-sm leading-6 text-gray-500">
                By submitting this enquiry, you are requesting
                information about turmeric supply and export.
              </p>

              <button
                type="submit"
                className="quote-button group flex w-fit items-center gap-5 rounded-full bg-black px-8 py-5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800"
              >
                Send Enquiry

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-black transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

            </div>

          </form>

        </div>

      </div>

      {/* ==========================================
          QUOTE ANIMATIONS
      ========================================== */}

      <style>{`

        /* HEADER */

        .quote-reveal {
          opacity: 0;
          transform: translateY(70px);

          transition:
            opacity 1000ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1000ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .quote-reveal.quote-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .quote-delay-1 {
          transition-delay: 180ms;
        }


        /* FORM */

        .quote-form {
          opacity: 0;
          transform: translateY(80px) scale(0.98);

          transition:
            opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1100ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .quote-form.quote-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }


        /* FIELDS */

        .quote-field {
          opacity: 0;
          transform: translateY(25px);

          transition:
            opacity 650ms ease,
            transform 650ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .quote-form.quote-visible .quote-field {
          opacity: 1;
          transform: translateY(0);
        }


        /* FIELD STAGGER */

        .quote-form.quote-visible .quote-field-2 {
          transition-delay: 80ms;
        }

        .quote-form.quote-visible .quote-field-3 {
          transition-delay: 160ms;
        }

        .quote-form.quote-visible .quote-field-4 {
          transition-delay: 240ms;
        }

        .quote-form.quote-visible .quote-field-5 {
          transition-delay: 320ms;
        }

        .quote-form.quote-visible .quote-field-6 {
          transition-delay: 400ms;
        }

        .quote-form.quote-visible .quote-field-7 {
          transition-delay: 480ms;
        }

        .quote-form.quote-visible .quote-field-8 {
          transition-delay: 560ms;
        }

        .quote-form.quote-visible .quote-field-9 {
          transition-delay: 640ms;
        }

        .quote-form.quote-visible .quote-field-submit {
          transition-delay: 720ms;
        }


        /* INPUT FOCUS */

        .quote-input {
          transition:
            border-color 300ms ease,
            transform 300ms ease;
        }

        .quote-input:focus {
          border-color: #000000;
          transform: translateY(-2px);
        }

        .quote-input::placeholder {
          color: #9ca3af;
          transition: opacity 300ms ease;
        }

        .quote-input:focus::placeholder {
          opacity: 0.45;
        }


        /* BUTTON */

        .quote-button {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }

        .quote-button:hover {
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.14);
        }


        /* ACCESSIBILITY */

        @media (prefers-reduced-motion: reduce) {

          .quote-reveal,
          .quote-form,
          .quote-field {
            opacity: 1;
            transform: none;
            transition: none;
          }

        }

      `}</style>

    </section>
  );
}

export default Quote;