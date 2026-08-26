import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

// Import images
import TK from "../img/TK.png";
import TR from "../img/TR.jpg";
import TT from "../img/TT.jpg";
import TU from "../img/TU.jpg";
import New from "../img/New.png";

// Product data for each card - 8 products
const productData = [
  {
    id: 1,
    image: TK,
    tag: "Ground Turmeric",
    number: "01",
    name: "Organic Spices",
    headline: "Fine. Consistent. Export ready.",
    description:
      "Turmeric powder prepared for international B2B requirements and suitable for food manufacturers, wholesalers and distributors.",
    form: "Powder",
    supply: "Bulk",
    market: "Worldwide",
    color: "from-amber-600 to-yellow-500",
  },
  {
    id: 2,
    image: TR,
    tag: "Raw Turmeric",
    number: "02",
    name: "Fresh Turmeric Powder",
    headline: "Fresh. Organic. Farm Sourced.",
    description:
      "Carefully selected raw turmeric roots harvested at peak maturity, ideal for extraction, essential oils, and processing.",
    form: "Finger/Root",
    supply: "Bulk Container",
    market: "Global Export",
    color: "from-orange-600 to-amber-500",
  },
  {
    id: 3,
    image: TT,
    tag: "Premium Grade",
    number: "03",
    name: "Organic Ginger",
    headline: "High Curcumin. Pure Quality. Lab Tested.",
    description:
      "Selected high-curcumin turmeric grade optimized for nutraceuticals, health supplements, and cosmetic applications.",
    form: "Whole / Ground",
    supply: "Custom Packaging",
    market: "Worldwide",
    color: "from-yellow-600 to-orange-500",
  },
  {
    id: 4,
    image: TU,
    tag: "Processed Commercial",
    number: "04",
    name: "Processed Spices",
    headline: "Standardized. Refined. High Yield.",
    description:
      "Commercially processed turmeric tailored to specification for culinary blends, industrial food processing, and retail repackaging.",
    form: "Processed",
    supply: "Bulk Sacks",
    market: "Worldwide",
    color: "from-amber-700 to-yellow-600",
  },
  {
    id: 5,
    image: TK,
    tag: "Organic Turmeric",
    number: "05",
    name: "Turmeric Extract",
    headline: "Pure. Potent. Natural.",
    description:
      "High-quality turmeric extract with standardized curcumin content, perfect for supplements and wellness products.",
    form: "Extract/Powder",
    supply: "Bulk & Custom",
    market: "Global",
    color: "from-green-600 to-emerald-500",
  },
  {
    id: 6,
    image: TR,
    tag: "Culinary Grade",
    number: "06",
    name: "Cooking Turmeric",
    headline: "Rich. Aromatic. Premium.",
    description:
      "Premium culinary turmeric with vibrant color and aromatic profile, ideal for food processing and gourmet cooking.",
    form: "Ground/Whole",
    supply: "Bulk Packaging",
    market: "Worldwide",
    color: "from-red-600 to-rose-500",
  },
  {
    id: 7,
    image: TT,
    tag: "Organic Ginger",
    number: "07",
    name: "Fresh Ginger Root",
    headline: "Spicy. Fresh. Organic.",
    description:
      "Premium organic ginger roots with intense flavor and aroma, perfect for food processing and beverage applications.",
    form: "Fresh Root",
    supply: "Bulk Containers",
    market: "Global Export",
    color: "from-yellow-700 to-amber-600",
  },
  {
    id: 8,
    image: TU,
    tag: "Spice Blend",
    number: "08",
    name: "Premium Blend",
    headline: "Balanced. Versatile. Ready.",
    description:
      "Expertly blended spice mix combining premium turmeric with complementary spices for ready-to-use applications.",
    form: "Ground/Blend",
    supply: "Custom Packaging",
    market: "Worldwide",
    color: "from-purple-600 to-indigo-500",
  },
];

// Simple Button Component
function SimpleButton({
  href,
  children,
  className = "",
  variant = "black",
}) {
  const styles = {
    black: {
      btnClass: "bg-black text-white border border-black hover:bg-white hover:text-black hover:border-black",
    },
    white: {
      btnClass: "bg-white text-black border border-white hover:bg-black hover:text-white hover:border-black",
    },
    yellow: {
      btnClass: "bg-black text-white border border-black hover:bg-yellow-400 hover:text-black hover:border-yellow-400",
    },
  };

  const currentStyle = styles[variant] || styles.black;

  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-3 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg ${currentStyle.btnClass} ${className}`}
    >
      <span className="transition-colors duration-300">{children}</span>
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 bg-white/20 group-hover:bg-black/10 text-white group-hover:text-black`}
      >
        →
      </span>
    </a>
  );
}

// Stat Counter
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
    const duration = 2000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeOut * numericTarget;

      let formatted = currentVal.toFixed(decimalPlaces);

      if (hasComma) {
        const parts = formatted.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formatted = parts.join(".");
      }

      if (value.startsWith("0") && numericTarget < 10 && !value.includes(".")) {
        formatted = formatted.padStart(value.length, "0");
      }

      setDisplayValue(formatted);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
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

// Creative Card Component with Book/Card Flip Animation
function ProductCard({ product, isActive, isCenter, onClick, onImageHover }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip when card leaves center
  useEffect(() => {
    if (!isCenter) {
      setIsFlipped(false);
    }
  }, [isCenter]);

  const handleCardClick = (e) => {
    e.stopPropagation();
    if (isCenter) {
      setIsFlipped(!isFlipped);
    }
    if (onClick) onClick();
  };

  const handleLearnMore = (e) => {
    e.stopPropagation();
    if (isCenter) {
      setIsFlipped(true);
    }
  };

  const handleBack = (e) => {
    e.stopPropagation();
    setIsFlipped(false);
  };

  const handleMouseEnter = () => {
    if (onImageHover) onImageHover(true);
  };

  const handleMouseLeave = () => {
    if (onImageHover) onImageHover(false);
  };

  return (
    <div 
      className={`relative h-[400px] w-full cursor-pointer perspective-1000 md:h-[500px] lg:h-[550px] transition-all duration-500 ${
        isCenter ? 'scale-100' : 'scale-90'
      }`}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative h-full w-full transition-all duration-600 transform-style-3d ${
          isFlipped && isCenter ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT OF CARD - Image with overlay */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl bg-white">
          <div className="relative h-full w-full">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-60`} />
            
            {/* Front Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8 text-white">
              <div className="mb-2 md:mb-3">
                <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-wider">
                  {product.tag}
                </span>
              </div>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/80">
                {product.number} / Turmeric
              </p>
              <h3 className="mt-1 md:mt-2 text-xl md:text-3xl lg:text-4xl font-bold">
                {product.name}
              </h3>
              <p className="mt-0.5 md:mt-1 text-sm md:text-lg font-light text-white/90">
                {product.headline}
              </p>
              
              {/* Learn More Button - Only show on center card */}
              {isCenter && (
                <button
                  onClick={handleLearnMore}
                  className="mt-3 md:mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 md:px-5 md:py-2 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white/40 hover:scale-105"
                >
                  Learn More
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* BACK OF CARD - Detailed Information */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-2xl bg-white">
          <div className="flex h-full flex-col p-5 md:p-8">
            {/* Back Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <span className="inline-block rounded-full bg-yellow-100 px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-yellow-800">
                  {product.tag}
                </span>
                <h4 className="mt-1 md:mt-2 text-lg md:text-2xl font-bold text-black">
                  {product.name}
                </h4>
              </div>
              <span className="text-2xl md:text-4xl font-bold text-gray-200">
                {product.number}
              </span>
            </div>

            {/* Back Details - Scrollable */}
            <div className="mt-3 md:mt-4 flex-1 overflow-y-auto">
              <p className="text-xs md:text-sm leading-relaxed text-gray-600">
                {product.description}
              </p>

              <div className="mt-3 md:mt-4 space-y-2 border-t border-gray-100 pt-3 md:pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-gray-400">
                    Form
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-gray-800">
                    {product.form}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-50 pt-2">
                  <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-gray-400">
                    Supply
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-gray-800">
                    {product.supply}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-50 pt-2">
                  <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-gray-400">
                    Market
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-gray-800">
                    {product.market}
                  </span>
                </div>
              </div>
            </div>

            {/* Back Footer with Back Button */}
            <div className="mt-3 md:mt-4 border-t border-gray-100 pt-3 md:pt-4 flex justify-between items-center">
              <button
                onClick={handleBack}
                className="flex items-center gap-1 md:gap-2 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-yellow-600 transition-all duration-300 hover:text-yellow-700 hover:gap-2 md:hover:gap-3"
              >
                ← Back
              </button>
              <button className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-yellow-600 transition-all duration-300 hover:text-yellow-700">
                View Details →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutAndProducts() {
  const containerRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [centerIndex, setCenterIndex] = useState(0);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

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

  const goToSlide = (index) => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    swiper.slideToLoop(index, 400);
    setActiveIndex(index);
    setCenterIndex(index);
  };

  // Handle slide change to track center card
  const handleSlideChange = (swiper) => {
    const realIndex = swiper.realIndex;
    setActiveIndex(realIndex);
    setCenterIndex(realIndex);
  };

  // Handle image hover - pause/resume autoplay
  const handleImageHover = (isHovering) => {
    setIsHoveringImage(isHovering);
    const swiper = swiperRef.current;
    if (!swiper || !swiper.autoplay) return;

    if (isHovering) {
      // Pause autoplay when cursor is on image
      swiper.autoplay.stop();
    } else {
      // Resume autoplay when cursor leaves image
      swiper.autoplay.start();
    }
  };

  return (
    <div ref={containerRef} className="bg-[#f4f3ef] text-black">
      {/* ================= ABOUT SECTION ================= */}
      <section
        id="about"
        className="overflow-hidden px-4 py-16 md:px-6 md:py-28 lg:px-10 lg:py-40"
      >
        <div className="mx-auto max-w-[1400px]">
          {/* TOP CONTENT */}
          <div className="grid gap-10 md:gap-16 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div className="about-label overflow-hidden">
                <p className="about-label-text mb-4 md:mb-7 text-xs font-semibold uppercase tracking-[0.35em] text-yellow-600">
                  About Our Company
                </p>
              </div>

              <div className="overflow-hidden">
                <h2 className="about-heading max-w-5xl text-3xl md:text-5xl lg:text-[92px] font-medium leading-[0.95] tracking-[-0.04em]">
                  We source
                  <br />
                  <span className="text-gray-300">India's finest</span>
                  <br />
                  turmeric.
                </h2>
              </div>
            </div>

            <div className="about-description flex items-end lg:col-span-5">
              <div className="max-w-lg">
                <p className="text-base md:text-lg leading-7 md:leading-8 text-gray-600">
                  We connect trusted Indian turmeric suppliers with
                  international buyers through responsible sourcing, careful
                  handling and dependable export solutions.
                </p>

                <div className="mt-6 md:mt-8">
                  <SimpleButton href="#products" variant="black">
                    Discover our approach
                  </SimpleButton>
                </div>
              </div>
            </div>
          </div>

          {/* LARGE IMAGE GRAPHIC */}
          <div className="about-image-wrapper relative mt-16 md:mt-24 overflow-hidden rounded-[2rem] bg-neutral-100">
            <div className="relative h-[320px] md:h-[520px] lg:h-[650px] overflow-hidden">
              <img
                src={New}
                alt="Fresh turmeric"
                className="about-image h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="about-image-label absolute left-4 top-4 md:left-6 md:top-6 rounded-full border border-white/30 bg-white/10 px-3 py-2 md:px-5 md:py-3 text-[10px] md:text-xs font-medium uppercase tracking-[0.25em] text-white backdrop-blur-md">
                Sourced from India
              </div>

              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-6 md:right-6 lg:bottom-12 lg:left-10 lg:right-10">
                <div className="flex flex-col justify-between gap-6 md:gap-8 lg:flex-row lg:items-end">
                  <div className="about-image-text">
                    <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] text-yellow-400">
                      Our Foundation
                    </p>

                    <h3 className="mt-2 md:mt-3 max-w-3xl text-2xl md:text-4xl lg:text-6xl font-medium leading-none text-white">
                      From trusted sourcing
                      <br />
                      to global supply.
                    </h3>
                  </div>

                  <div className="about-arrow hidden h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full border border-white/40 text-2xl text-white lg:flex">
                    ↓
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STATISTICS */}
          <div className="about-stats mt-12 md:mt-20 grid grid-cols-2 border-t border-gray-200 md:grid-cols-4">
            <div className="about-stat border-b border-gray-200 py-6 md:py-10 md:border-b-0 md:border-r md:pr-8">
              <p className="text-3xl md:text-5xl lg:text-7xl font-normal tracking-tight">
                <StatCounter value="100" suffix="%" />
              </p>
              <p className="mt-2 md:mt-4 text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500">
                Quality Focus
              </p>
            </div>

            <div className="about-stat border-b border-gray-200 py-6 md:py-10 md:border-b-0 md:border-r md:px-8">
              <p className="text-3xl md:text-5xl lg:text-7xl font-normal tracking-tight">
                <StatCounter value="99.5" suffix="%" />
              </p>
              <p className="mt-2 md:mt-4 text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500">
                Purity Standard
              </p>
            </div>

            <div className="about-stat border-b border-gray-200 py-6 md:py-10 md:border-b-0 md:border-r md:px-8">
              <p className="text-3xl md:text-5xl lg:text-7xl font-normal tracking-tight">
                <StatCounter value="24" suffix="/7" />
              </p>
              <p className="mt-2 md:mt-4 text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500">
                Client Support
              </p>
            </div>

            <div className="about-stat py-6 md:py-10 md:pl-8">
              <p className="text-3xl md:text-5xl lg:text-7xl font-normal tracking-tight">
                <StatCounter value="100" suffix="%" />
              </p>
              <p className="mt-2 md:mt-4 text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500">
                Sourcing Transparency
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS SECTION ================= */}
      <section
        id="products"
        className="overflow-hidden px-4 py-16 md:px-6 md:py-28 lg:px-10 lg:py-40"
      >
        <div className="mx-auto max-w-[1400px]">
          {/* SECTION INTRO */}
          <div className="grid gap-6 md:gap-10 lg:grid-cols-12 lg:items-end">
            <div className="product-reveal lg:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-600">
                Our Products
              </p>

              <h2 className="mt-4 md:mt-6 text-3xl md:text-5xl lg:text-[90px] font-medium leading-[0.95] tracking-[-0.04em]">
                One spice.
                <br />
                <span className="text-gray-400">Many possibilities.</span>
              </h2>
            </div>

            <div className="product-reveal product-delay-1 lg:col-span-4">
              <p className="max-w-md text-base md:text-lg leading-7 md:leading-8 text-gray-600">
                Explore our range of premium turmeric products, each with
                unique characteristics and applications for global markets.
              </p>
            </div>
          </div>

          {/* ================= CREATIVE CARD CAROUSEL ================= */}
          <div className="mt-16 md:mt-24">
            <div className="product-image-reveal overflow-visible">
              <Swiper
                modules={[Autoplay, EffectCoverflow]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 200,
                  modifier: 1,
                  slideShadows: true,
                }}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false, // Don't pause on mouse enter
                  waitForTransition: false,
                }}
                loop={true}
                speed={600}
                breakpoints={{
                  480: {
                    slidesPerView: 1.1,
                    spaceBetween: 15,
                  },
                  640: {
                    slidesPerView: 1.3,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 25,
                    coverflowEffect: {
                      rotate: 0,
                      stretch: 0,
                      depth: 150,
                      modifier: 0.8,
                      slideShadows: true,
                    },
                  },
                  1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 30,
                    coverflowEffect: {
                      rotate: 0,
                      stretch: 0,
                      depth: 100,
                      modifier: 0.6,
                      slideShadows: true,
                    },
                  },
                  1280: {
                    slidesPerView: 3.5,
                    spaceBetween: 40,
                    coverflowEffect: {
                      rotate: 0,
                      stretch: 0,
                      depth: 80,
                      modifier: 0.5,
                      slideShadows: true,
                    },
                  },
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onInit={(swiper) => {
                  setActiveIndex(swiper.realIndex);
                  setCenterIndex(swiper.realIndex);
                }}
                onSlideChange={(swiper) => {
                  handleSlideChange(swiper);
                }}
                className="product-carousel"
              >
                {productData.map((product, index) => (
                  <SwiperSlide key={product.id}>
                    {({ isActive }) => (
                      <ProductCard
                        product={product}
                        isActive={isActive}
                        isCenter={index === centerIndex}
                        onClick={() => goToSlide(index)}
                        onImageHover={handleImageHover}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Navigation Dots */}
            <div className="mt-8 md:mt-12 flex justify-center gap-2 flex-wrap">
              {productData.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => goToSlide(index)}
                  className={`h-2 md:h-3 rounded-full transition-all duration-500 ${
                    index === activeIndex
                      ? "w-6 md:w-10 bg-yellow-500"
                      : "w-2 md:w-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Active Product Info */}
            <div className="mt-4 md:mt-6 text-center">
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-gray-400">
                {productData[activeIndex]?.number} / {productData[activeIndex]?.name}
              </p>
              <p className="mt-1 text-sm md:text-base lg:text-lg font-medium text-gray-700">
                {productData[activeIndex]?.headline}
              </p>
            </div>
          </div>

          {/* ================= ORDERED BANNERS ================= */}
          <div className="mt-16 md:mt-28">
            {/* 1. WHITE BANNER */}
            <div className="product-reveal overflow-hidden rounded-[2rem] bg-white text-black">
              <div className="grid gap-6 md:gap-8 p-6 md:p-8 lg:p-14 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-600">
                    01 / Standard Sourcing
                  </p>
                  <h3 className="mt-3 md:mt-4 max-w-4xl text-2xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-[-0.03em]">
                    Your market.
                    <br />
                    Your requirements.
                    <br />
                    Our supply.
                  </h3>
                </div>

                <div className="flex flex-col justify-center lg:col-span-5">
                  <p className="text-sm leading-relaxed text-black/70">
                    Tell us your required quantity, packaging, destination and
                    specifications. We'll work with you to prepare an export
                    solution around your requirements.
                  </p>

                  <div className="mt-4 md:mt-6">
                    <SimpleButton href="#quote" variant="black">
                      Discuss Your Requirements
                    </SimpleButton>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. BLACK BANNER */}
            <div className="product-reveal mt-4 md:mt-6 overflow-hidden rounded-[2rem] bg-zinc-950 text-white">
              <div className="grid gap-6 md:gap-8 p-6 md:p-8 lg:p-14 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-400">
                    02 / Global Logistics
                  </p>
                  <h3 className="mt-3 md:mt-4 max-w-4xl text-2xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-[-0.03em] text-white">
                    Your market.
                    <br />
                    Your requirements.
                    <br />
                    Our supply.
                  </h3>
                </div>

                <div className="flex flex-col justify-center lg:col-span-5">
                  <p className="text-sm leading-relaxed text-zinc-300">
                    Tell us your required quantity, packaging, destination and
                    specifications. We'll work with you to prepare an export
                    solution around your requirements.
                  </p>

                  <div className="mt-4 md:mt-6">
                    <SimpleButton href="#quote" variant="white">
                      Discuss Your Requirements
                    </SimpleButton>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. YELLOW BANNER */}
            <div className="product-reveal mt-4 md:mt-6 overflow-hidden rounded-[2rem] bg-yellow-400 text-black">
              <div className="grid gap-6 md:gap-8 p-6 md:p-8 lg:p-14 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/70">
                    03 / Custom Supply
                  </p>
                  <h3 className="mt-3 md:mt-4 max-w-4xl text-2xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-[-0.03em]">
                    Your market.
                    <br />
                    Your requirements.
                    <br />
                    Our supply.
                  </h3>
                </div>

                <div className="flex flex-col justify-center lg:col-span-5">
                  <p className="text-sm leading-relaxed text-black/70">
                    Tell us your required quantity, packaging, destination and
                    specifications. We'll work with you to prepare an export
                    solution around your requirements.
                  </p>

                  <div className="mt-4 md:mt-6">
                    <SimpleButton href="#quote" variant="yellow">
                      Discuss Your Requirements
                    </SimpleButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STYLES ================= */}
      <style>{`
        /* 3D Card Flip Styles */
        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-style-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }

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

        /* PRODUCT REVEAL STYLES */
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

        /* CAROUSEL CUSTOM STYLES */
        .product-carousel {
          padding: 20px 0;
        }

        .product-carousel .swiper-slide {
          transition: all 400ms ease;
          padding: 10px 5px;
        }

        .product-carousel .swiper-slide-active {
          transform: scale(1.05);
          z-index: 10;
        }

        .product-carousel .swiper-slide-prev,
        .product-carousel .swiper-slide-next {
          transform: scale(0.92);
          opacity: 0.7;
        }

        .product-carousel .swiper-slide-duplicate-prev,
        .product-carousel .swiper-slide-duplicate-next {
          transform: scale(0.85);
          opacity: 0.5;
        }

        /* Image optimization */
        .product-carousel img {
          image-rendering: auto;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        /* Mobile responsive adjustments */
        @media (max-width: 640px) {
          .product-carousel .swiper-slide-active {
            transform: scale(1.02);
          }
          
          .product-carousel .swiper-slide-prev,
          .product-carousel .swiper-slide-next {
            transform: scale(0.9);
          }
        }

        /* Accessibility reduced motion */
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
          .product-image-reveal {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .transform-style-3d {
            transform-style: flat !important;
          }

          .rotate-y-180 {
            transform: none !important;
          }

          .backface-hidden {
            backface-visibility: visible !important;
          }
        }
      `}</style>
    </div>
  );
}

export default AboutAndProducts;