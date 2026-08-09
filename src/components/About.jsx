function About() {
    return (
      <section
        id="about"
        className="overflow-hidden bg-[#f4f3ef] px-6 py-28 text-black lg:px-10 lg:py-40"
      >
        <div className="mx-auto max-w-[1400px]">
  
          {/* TOP CONTENT */}
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
  
            {/* LEFT */}
            <div className="lg:col-span-7">
  
              <div className="about-label overflow-hidden">
                <p className="about-label-text mb-7 text-xs font-semibold uppercase tracking-[0.35em] text-yellow-600">
                  About Our Company
                </p>
              </div>
  
              <div className="overflow-hidden">
  
                <h2 className="about-heading max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-7xl lg:text-[92px]">
                  We source
                  <br />
                  <span className="text-gray-300">
                    India's finest
                  </span>
                  <br />
                  turmeric.
                </h2>
  
              </div>
  
            </div>
  
            {/* RIGHT */}
            <div className="about-description flex items-end lg:col-span-5">
  
              <div className="max-w-lg">
  
                <p className="text-lg leading-8 text-gray-600">
                  We connect trusted Indian turmeric suppliers with
                  international buyers through responsible sourcing,
                  careful handling and dependable export solutions.
                </p>
  
                <a
                  href="#quality"
                  className="about-link group mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider"
                >
                  Discover our approach
  
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-all duration-300 group-hover:translate-x-2 group-hover:bg-yellow-400 group-hover:text-black">
                    →
                  </span>
                </a>
  
              </div>
  
            </div>
  
          </div>
  
          {/* LARGE IMAGE GRAPHIC */}
          <div className="about-image-wrapper relative mt-24 overflow-hidden rounded-[2rem] bg-neutral-100">
  
            <div className="relative h-[520px] overflow-hidden md:h-[650px]">
  
              {/* IMAGE */}
              <img
                src="https://images.unsplash.com/photo-1615485500834-bc10199bc727?auto=format&fit=crop&w=2200&q=90"
                alt="Fresh turmeric"
                className="about-image h-full w-full object-cover"
              />
  
              {/* DARK GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
  
              {/* FLOATING LABEL */}
              <div className="about-image-label absolute left-6 top-6 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-xs font-medium uppercase tracking-[0.25em] text-white backdrop-blur-md md:left-10 md:top-10">
                Sourced from India
              </div>
  
              {/* BOTTOM TEXT */}
              <div className="absolute bottom-8 left-6 right-6 md:bottom-12 md:left-10 md:right-10">
  
                <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
  
                  <div className="about-image-text">
  
                    <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
                      Our Foundation
                    </p>
  
                    <h3 className="mt-3 max-w-3xl text-4xl font-medium leading-none text-white md:text-6xl">
                      From trusted sourcing
                      <br />
                      to global supply.
                    </h3>
  
                  </div>
  
                  <div className="about-arrow hidden h-20 w-20 items-center justify-center rounded-full border border-white/40 text-2xl text-white md:flex">
                    ↓
                  </div>
  
                </div>
  
              </div>
  
            </div>
  
          </div>
  
          {/* STATISTICS */}
          <div className="about-stats mt-20 grid grid-cols-2 border-t border-gray-200 md:grid-cols-4">
  
            <div className="about-stat border-b border-gray-200 py-10 md:border-b-0 md:border-r md:pr-8">
              <p className="text-5xl font-medium tracking-tight md:text-7xl">
                01
              </p>
  
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gray-500">
                Core Product
              </p>
            </div>
  
            <div className="about-stat border-b border-gray-200 py-10 md:border-b-0 md:border-r md:px-8">
              <p className="text-5xl font-medium tracking-tight md:text-7xl">
                100%
              </p>
  
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gray-500">
                Quality Focus
              </p>
            </div>
  
            <div className="about-stat border-b border-gray-200 py-10 md:border-b-0 md:border-r md:px-8">
              <p className="text-5xl font-medium tracking-tight md:text-7xl">
                B2B
              </p>
  
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gray-500">
                Global Supply
              </p>
            </div>
  
            <div className="about-stat py-10 md:pl-8">
              <p className="text-5xl font-medium tracking-tight md:text-7xl">
                ∞
              </p>
  
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gray-500">
                Global Potential
              </p>
            </div>
  
          </div>
  
        </div>
  
        {/* ABOUT ANIMATIONS */}
        <style>{`
  
          /* Label */
          .about-label {
            opacity: 0;
            transform: translateY(35px);
            animation: aboutReveal 0.9s 0.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
  
          /* Main heading */
          .about-heading {
            opacity: 0;
            transform: translateY(100%);
            animation: aboutHeading 1.1s 0.25s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
  
          /* Description */
          .about-description {
            opacity: 0;
            transform: translateY(50px);
            animation: aboutReveal 0.9s 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
  
          /* Image */
          .about-image-wrapper {
            opacity: 0;
            transform: translateY(70px);
            animation: aboutImageWrapper 1.2s 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
  
          .about-image {
            transform: scale(1.08);
            animation: aboutImageZoom 2s 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
  
          /* Image label */
          .about-image-label {
            opacity: 0;
            transform: translateY(-20px);
            animation: aboutLabelIn 0.8s 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
  
          /* Image bottom text */
          .about-image-text {
            opacity: 0;
            transform: translateY(40px);
            animation: aboutReveal 0.9s 1.15s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
  
          /* Arrow */
          .about-arrow {
            opacity: 0;
            animation:
              aboutArrowIn 0.8s 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards,
              aboutArrowFloat 3s 2.2s ease-in-out infinite;
          }
  
          /* Statistics */
          .about-stat {
            opacity: 0;
            transform: translateY(35px);
          }
  
          .about-stat:nth-child(1) {
            animation: aboutStatIn 0.7s 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
  
          .about-stat:nth-child(2) {
            animation: aboutStatIn 0.7s 1.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
  
          .about-stat:nth-child(3) {
            animation: aboutStatIn 0.7s 1.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
  
          .about-stat:nth-child(4) {
            animation: aboutStatIn 0.7s 1.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
  
          /* Keyframes */
  
          @keyframes aboutReveal {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
  
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
  
          @keyframes aboutHeading {
            from {
              opacity: 0;
              transform: translateY(100%);
            }
  
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
  
          @keyframes aboutImageWrapper {
            from {
              opacity: 0;
              transform: translateY(70px);
            }
  
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
  
          @keyframes aboutImageZoom {
            from {
              transform: scale(1.08);
            }
  
            to {
              transform: scale(1);
            }
          }
  
          @keyframes aboutLabelIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
  
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
  
          @keyframes aboutArrowIn {
            from {
              opacity: 0;
              transform: scale(0.5) rotate(-45deg);
            }
  
            to {
              opacity: 1;
              transform: scale(1) rotate(0);
            }
          }
  
          @keyframes aboutArrowFloat {
            0%,
            100% {
              transform: translateY(0);
            }
  
            50% {
              transform: translateY(-8px);
            }
          }
  
          @keyframes aboutStatIn {
            from {
              opacity: 0;
              transform: translateY(35px);
            }
  
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
  
          /* Accessibility */
          @media (prefers-reduced-motion: reduce) {
            .about-label,
            .about-heading,
            .about-description,
            .about-image-wrapper,
            .about-image,
            .about-image-label,
            .about-image-text,
            .about-arrow,
            .about-stat {
              animation: none;
              opacity: 1;
              transform: none;
            }
          }
  
        `}</style>
      </section>
    );
  }
  
  export default About;