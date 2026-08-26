import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import TK from "../img/TK.png";
import TR from "../img/TR.jpg";
import TT from "../img/TT.jpg";
import TU from "../img/TU.jpg";
import New from "../img/New.png";

// Data mapping for captions and side panel details corresponding to each slide index
const slideCaptions = [
  { number: "01", name: "OrganicSpicies" },
  { number: "02", name: "Fresh Turmeric Powder" },
  { number: "03", name: "Organic Ginger" },
  { number: "04", name: "Processed Spicies" },
];

const productDetails = [
  {
    tag: "Ground Turmeric",
    headline: <>Fine.<br />Consistent.<br />Export ready.</>,
    description: "Turmeric powder prepared for international B2B requirements and suitable for food manufacturers, wholesalers and distributors.",
    form: "Powder",
    supply: "Bulk",
    market: "Worldwide"
  },
  {
    tag: "Raw Turmeric",
    headline: <>Fresh.<br />Organic.<br />Farm Sourced.</>,
    description: "Carefully selected raw turmeric roots harvested at peak maturity, ideal for extraction, essential oils, and processing.",
    form: "Finger/Root",
    supply: "Bulk Container",
    market: "Global Export"
  },
  {
    tag: "Premium Grade",
    headline: <>High Curcumin.<br />Pure Quality.<br />Lab Tested.</>,
    description: "Selected high-curcumin turmeric grade optimized for nutraceuticals, health supplements, and cosmetic applications.",
    form: "Whole / Ground",
    supply: "Custom Packaging",
    market: "Worldwide"
  },
  {
    tag: "Processed Commercial",
    headline: <>Standardized.<br />Refined.<br />High Yield.</>,
    description: "Commercially processed turmeric tailored to specification for culinary blends, industrial food processing, and retail repackaging.",
    form: "Processed",
    supply: "Bulk Sacks",
    market: "Worldwide"
  }
];

// Smooth easing count-up counter matching video reference
function StatCounter({ value, suffix = "" }) {
  const [displayValue, setDisplayValue] = useState("0");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Clean up string to get exact numeric value & decimal precision
    const cleanValue = value.replace(/,/g, "").replace(/[^0-9.]/g, "");
    const numericTarget = parseFloat(cleanValue);

    if (isNaN(numericTarget)) {
      setDisplayValue(value);
      return;
    }

    const hasComma = value.includes(",");
    const decimalPlaces = cleanValue.includes(".")
      ? cleanValue.split(".")[1].length
      : 0;

    let startTime = null;
    const duration = 2000; // 2 seconds animation duration

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic formula for smooth deceleration towards target
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeOut * numericTarget;

      let formatted = currentVal.toFixed(decimalPlaces);

      if (hasComma) {
        const parts = formatted.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formatted = parts.join(".");
      }

      // Maintain leading zeros if initial prop started with 0 (e.g. "01")
      if (value.startsWith("0") && numericTarget < 10 && !value.includes(".")) {
        formatted = formatted.padStart(value.length, "0");
      }

      setDisplayValue(formatted);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value); // Ensure precise target value at end
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

function AboutAndProducts() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animatedElements = container.querySelectorAll(
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
    <div ref={containerRef} className="bg-[#f4f3ef] text-black">
      {/* ================= ABOUT SECTION ================= */}
      <section
        id="about"
        className="overflow-hidden px-6 py-28 lg:px-10 lg:py-40"
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
                  <span className="text-gray-300">India's finest</span>
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
                  international buyers through responsible sourcing, careful
                  handling and dependable export solutions.
                </p>

                <a
                  href="#products"
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

              <img
                src={New}
                alt="Fresh turmeric"
                className="about-image h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="about-image-label absolute left-6 top-6 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-xs font-medium uppercase tracking-[0.25em] text-white backdrop-blur-md md:left-10 md:top-10">
                Sourced from India
              </div>

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

          {/* STATISTICS - FRESHER-FRIENDLY & CREDIBLE METRICS */}
          <div className="about-stats mt-20 grid grid-cols-2 border-t border-gray-200 md:grid-cols-4">

            <div className="about-stat border-b border-gray-200 py-10 md:border-b-0 md:border-r md:pr-8">
              <p className="text-5xl font-normal tracking-tight md:text-7xl">
                <StatCounter value="100" suffix="%" />
              </p>

              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gray-500">
                Quality Focus
              </p>
            </div>

            <div className="about-stat border-b border-gray-200 py-10 md:border-b-0 md:border-r md:px-8">
              <p className="text-5xl font-normal tracking-tight md:text-7xl">
                <StatCounter value="99.5" suffix="%" />
              </p>

              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gray-500">
                Purity Standard
              </p>
            </div>

            <div className="about-stat border-b border-gray-200 py-10 md:border-b-0 md:border-r md:px-8">
              <p className="text-5xl font-normal tracking-tight md:text-7xl">
                <StatCounter value="24" suffix="/7" />
              </p>

              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gray-500">
                Client Support
              </p>
            </div>

            <div className="about-stat py-10 md:pl-8">
              <p className="text-5xl font-normal tracking-tight md:text-7xl">
                <StatCounter value="100" suffix="%" />
              </p>

              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gray-500">
                Sourcing Transparency
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PRODUCTS SECTION ================= */}
      <section
        id="products"
        className="overflow-hidden px-6 py-28 lg:px-10 lg:py-40"
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
                <span className="text-gray-400">Many possibilities.</span>
              </h2>
            </div>

            <div className="product-reveal product-delay-1 lg:col-span-4">
              <p className="max-w-md text-lg leading-8 text-gray-600">
                We begin with premium Indian turmeric and provide export-ready
                formats for wholesalers, distributors, manufacturers and
                international buyers.
              </p>
            </div>

          </div>

          {/* ================= PRODUCT 01 ================= */}
          <div className="mt-24 grid gap-8 lg:grid-cols-12">

            {/* PRODUCT IMAGE */}
            <div className="product-image-reveal overflow-hidden rounded-[2rem] bg-white lg:col-span-6">

              <div className="product-image-group group relative h-[500px] overflow-hidden md:h-[650px]">

                {/* ================= TURMERIC IMAGE CAROUSEL ================= */}
                <Swiper
                  modules={[Autoplay]}
                  initialSlide={0}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                  }}
                  loop={true}
                  speed={900}
                  grabCursor={true}
                  allowTouchMove={true}
                  className="h-full w-full"
                  onInit={(swiper) => {
                    swiper.slideToLoop(0, 0);
                    setActiveIndex(swiper.realIndex);
                  }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                >
                  {/* IMAGE 01 */}
                  <SwiperSlide>
                    <img
                      src={TK}
                      alt="Premium Indian turmeric powder"
                      className="product-image h-full w-full object-cover"
                    />
                  </SwiperSlide>

                  {/* IMAGE 02 */}
                  <SwiperSlide>
                    <img
                      src={TR}
                      alt="Indian turmeric"
                      className="product-image h-full w-full object-cover"
                    />
                  </SwiperSlide>

                  {/* IMAGE 03 */}
                  <SwiperSlide>
                    <img
                      src={TT}
                      alt="Turmeric spice"
                      className="product-image h-full w-full object-cover"
                    />
                  </SwiperSlide>

                  {/* IMAGE 04 */}
                  <SwiperSlide>
                    <img
                      src={TU}
                      alt="Turmeric powder"
                      className="product-image h-full w-full object-cover"
                    />
                  </SwiperSlide>
                </Swiper>
                {/* DARK GRADIENT */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* PRODUCT CAPTION */}
                <div className="product-image-caption pointer-events-none absolute bottom-8 left-8 right-8 z-20 md:bottom-10 md:left-10">

                  <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">
                    {slideCaptions[activeIndex].number} / Turmeric
                  </p>

                  <h3 className="mt-3 text-4xl font-medium text-white md:text-6xl">
                    {slideCaptions[activeIndex].name}
                  </h3>

                </div>

              </div>
            </div>

            {/* PRODUCT INFORMATION */}
            <div className="product-reveal product-delay-1 flex flex-col justify-between rounded-[2rem] bg-white p-8 lg:col-span-6 lg:p-10">

              <div>

                <span className="inline-flex rounded-full bg-[#f4f3ef] px-4 py-2 text-xs uppercase tracking-widest text-gray-500">
                  {productDetails[activeIndex].tag}
                </span>

                <h3 className="mt-8 text-4xl font-medium leading-tight">
                  {productDetails[activeIndex].headline}
                </h3>

                <p className="mt-6 leading-7 text-gray-600">
                  {productDetails[activeIndex].description}
                </p>

              </div>

              <div className="mt-10 border-t border-gray-200 pt-6">

                <div className="product-stat-reveal flex justify-between py-3">
                  <span className="text-sm text-gray-500">
                    Form
                  </span>

                  <span className="text-sm font-medium">
                    {productDetails[activeIndex].form}
                  </span>
                </div>

                <div className="product-stat-reveal flex justify-between border-t border-gray-100 py-3">
                  <span className="text-sm text-gray-500">
                    Supply
                  </span>

                  <span className="text-sm font-medium">
                    {productDetails[activeIndex].supply}
                  </span>
                </div>

                <div className="product-stat-reveal flex justify-between border-t border-gray-100 py-3">
                  <span className="text-sm text-gray-500">
                    Market
                  </span>

                  <span className="text-sm font-medium">
                    {productDetails[activeIndex].market}
                  </span>
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
                  Tell us your required quantity, packaging, destination and
                  specifications. We'll work with you to prepare an export
                  solution around your requirements.
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
      </section>

      {/* ================= STYLES ================= */}
      <style>{`

        /* ABOUT STYLES */

        .about-label {
          opacity: 0;
          transform: translateY(35px);
          animation: aboutReveal 0.9s 0.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .about-heading {
          opacity: 0;
          transform: translateY(100%);
          animation: aboutHeading 1.1s 0.25s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .about-description {
          opacity: 0;
          transform: translateY(50px);
          animation: aboutReveal 0.9s 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .about-image-wrapper {
          opacity: 0;
          transform: translateY(70px);
          animation: aboutImageWrapper 1.2s 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .about-image {
          transform: scale(1.08);
          animation: aboutImageZoom 2s 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .about-image-label {
          opacity: 0;
          transform: translateY(-20px);
          animation: aboutLabelIn 0.8s 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .about-image-text {
          opacity: 0;
          transform: translateY(40px);
          animation: aboutReveal 0.9s 1.15s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .about-arrow {
          opacity: 0;
          animation:
            aboutArrowIn 0.8s 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards,
            aboutArrowFloat 3s 2.2s ease-in-out infinite;
        }

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

        /* ABOUT KEYFRAMES */

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
          0%, 100% {
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

        /* PRODUCT STYLES */

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

        .product-image-reveal {
          overflow: hidden;
        }

        .product-image {
          transform: scale(1.12);
          transition: transform 1400ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .product-image-reveal.is-visible .product-image {
          transform: scale(1);
        }

        .product-image-group:hover .product-image {
          transform: scale(1.06);
        }

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

        .product-stat-reveal {
          opacity: 0;
          transform: translateX(-20px);
          transition:
            opacity 600ms ease,
            transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Fix: Ensure stat reveals work properly */
        .product-reveal.is-visible .product-stat-reveal {
          opacity: 1;
          transform: translateX(0);
        }

        .product-reveal.is-visible .product-stat-reveal:nth-child(1) {
          transition-delay: 500ms;
        }

        .product-reveal.is-visible .product-stat-reveal:nth-child(2) {
          transition-delay: 650ms;
        }

        .product-reveal.is-visible .product-stat-reveal:nth-child(3) {
          transition-delay: 800ms;
        }

        .product-link {
          transition: color 300ms ease, transform 300ms ease;
        }

        /* ================= SWIPER ================= */

        .product-image-group .swiper {
          width: 100%;
          height: 100%;
        }

        .product-image-group .swiper-slide {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .product-image-group .swiper-slide img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        /* ACCESSIBILITY REDUCED MOTION OVERRIDES */

        @media (prefers-reduced-motion: reduce) {
          .about-label,
          .about-heading,
          .about-description,
          .about-image-wrapper,
          .about-image,
          .about-image-label,
          .about-image-text,
          .about-arrow,
          .about-stat,
          .product-reveal,
          .product-image-reveal,
          .product-image,
          .product-image-caption,
          .product-stat-reveal {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }

      `}</style>
    </div>
  );
}

export default AboutAndProducts;