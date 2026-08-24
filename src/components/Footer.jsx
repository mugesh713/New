import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// Character-by-Character Staggered Text Reveal
function MovingText({ text, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: -90,
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block perspective-1000 ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block transform-gpu"
          style={{ transformOrigin: "50% 100%" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function MobileResponsiveFooter() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState("default"); // 'default' | 'hover' | 'dark' | 'orange'
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState("INDUSTRIES");
  const [activeVideo, setActiveVideo] = useState(null);

  const darkSectionRef = useRef(null);
  const canvasRef = useRef(null);

  // Track global mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Responsive Canvas Dot-Matrix Watermark Text Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = window.innerWidth < 640 ? 100 : 180);
    let mouse = { x: width / 2, y: height / 2, radius: window.innerWidth < 640 ? 90 : 160 };

    const handleCanvasMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleCanvasTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = window.innerWidth < 640 ? 100 : 180;
      mouse.radius = window.innerWidth < 640 ? 90 : 160;
      initDots();
    };

    window.addEventListener("mousemove", handleCanvasMouseMove);
    window.addEventListener("touchmove", handleCanvasTouchMove);
    window.addEventListener("resize", handleResize);

    const textCanvas = document.createElement("canvas");
    const textCtx = textCanvas.getContext("2d");
    let dots = [];

    const initDots = () => {
      dots = [];
      textCanvas.width = width;
      textCanvas.height = height;

      const fontSize = window.innerWidth < 640 ? Math.floor(width / 8) : 110;

      textCtx.fillStyle = "black";
      textCtx.fillRect(0, 0, width, height);
      textCtx.fillStyle = "white";
      textCtx.font = `900 ${fontSize}px system-ui, -apple-system, sans-serif`;
      textCtx.textAlign = "center";
      textCtx.textBaseline = "middle";
      textCtx.fillText("UNITED CARRIERS", width / 2, height / 2);

      const imgData = textCtx.getImageData(0, 0, width, height).data;
      const gap = window.innerWidth < 640 ? 3 : 4;

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          if (imgData[index] > 128) {
            dots.push({ x, y, baseAlpha: 0.12 });
          }
        }
      }
    };

    initDots();

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let alpha = dot.baseAlpha;
        let size = window.innerWidth < 640 ? 0.8 : 1.1;

        if (dist < mouse.radius) {
          const factor = 1 - dist / mouse.radius;
          alpha = dot.baseAlpha + factor * 0.88;
          size = (window.innerWidth < 640 ? 0.8 : 1.1) + factor * (window.innerWidth < 640 ? 1.4 : 2.2);
        }

        ctx.fillStyle = cursorState === "dark" || cursorState === "orange" 
          ? `rgba(255, 77, 0, ${alpha})` 
          : `rgba(0, 0, 0, ${alpha})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleCanvasMouseMove);
      window.removeEventListener("touchmove", handleCanvasTouchMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [cursorState]);

  const faqs = [
    {
      id: "01",
      question: "What does United Carriers do?",
      answer: "We provide end-to-end freight forwarding, customs brokerage, and 3PL supply chain logistics across global trade lanes.",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: "02",
      question: "What industries do you specialise in?",
      answer: "We specialize in Energy, Automotive, Mining, Construction, Project Cargo, Engineering, and Commodities.",
      videoUrl: null,
    },
    {
      id: "03",
      question: "What shipping methods do you offer?",
      answer: "Air freight, Ocean freight (FCL & LCL), Road transport, Rail freight, and Specialized heavy haulage.",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: "04",
      question: "Do you provide customs clearance services?",
      answer: "Our in-house customs brokers handle full tariff classifications, compliance, and border documentation.",
      videoUrl: null,
    },
    {
      id: "05",
      question: "How is freight pricing calculated?",
      answer: "Pricing is calculated based on dimensional weight, origin/destination routes, transit speed, and surcharges.",
      videoUrl: null,
    },
    {
      id: "06",
      question: "Do you offer warehousing and 3PL services?",
      answer: "We operate fully integrated fulfillment hubs with dynamic WMS tracking and climate-controlled storage.",
      videoUrl: null,
    },
  ];

  const industryItems = [
    "Energy & Renewables",
    "Automotive & Industrial Equipment",
    "Mining & Resources",
    "Building & Construction",
    "Project Cargo",
    "Engineering & Manufacturing",
  ];

  const serviceItems = [
    "Cross-Docking Services",
    "Customs Clearance Advisory",
    "Supply Chain Optimization",
    "Expedited Air Freight",
    "Ocean Container Shipping",
    "Specialized Transport",
  ];

  const marqueeItems = activeTab === "INDUSTRIES" ? industryItems : serviceItems;

  return (
    <div className="relative w-full overflow-hidden bg-[#f9f9f7] text-black font-mono select-none">
      {/* 1. DYNAMIC ORANGE/BLACK MAGNETIC TRAILING CURSOR (HIDDEN ON TOUCH DEVICES) */}
      <motion.div
        className={`pointer-events-none fixed left-0 top-0 z-50 hidden md:block rounded-full mix-blend-difference transition-colors duration-200 ${
          cursorState === "dark" || cursorState === "orange"
            ? "bg-[#ff4d00] border-transparent"
            : "border border-black/60 bg-black/10"
        }`}
        animate={{
          x: mousePos.x - (cursorState === "hover" ? 32 : cursorState === "dark" ? 28 : 12),
          y: mousePos.y - (cursorState === "hover" ? 32 : cursorState === "dark" ? 28 : 12),
          width: cursorState === "hover" ? 64 : cursorState === "dark" ? 56 : 24,
          height: cursorState === "hover" ? 64 : cursorState === "dark" ? 56 : 24,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 25, mass: 0.1 }}
      />

      {/* 2. FAQ SECTION */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 lg:px-12 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* LEFT HEADLINE */}
          <div className="lg:col-span-4">
            <h2 className="text-5xl font-black uppercase tracking-tight sm:text-7xl lg:text-8xl">
              <MovingText text="F.A.Q" />
            </h2>
            <p className="mt-4 max-w-xs text-xs font-semibold leading-relaxed text-gray-500 sm:mt-6">
              Clear answers, real transparency. Expand any topic or watch quick video insights.
            </p>
          </div>

          {/* ACCORDION CONTAINER */}
          <div className="lg:col-span-6">
            <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {faqs.map((faq) => (
                <div key={faq.id} className="py-4 sm:py-5">
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="flex w-full items-center justify-between text-left transition-colors active:text-[#ff4d00] hover:text-[#ff4d00]"
                    onMouseEnter={() => setCursorState("hover")}
                    onMouseLeave={() => setCursorState("default")}
                  >
                    <span className="text-xs font-bold text-gray-400 mr-4 sm:mr-6">
                      {faq.id}
                    </span>
                    <span className="flex-1 text-xs sm:text-sm font-bold text-black pr-2">
                      {faq.question}
                    </span>
                    <span className="text-sm sm:text-base font-mono text-gray-400">
                      {openFaq === faq.id ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {openFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden pl-7 sm:pl-10 pr-2 pt-3"
                      >
                        <p className="text-xs leading-relaxed text-gray-600 mb-3">
                          {faq.answer}
                        </p>

                        {faq.videoUrl && (
                          <div className="mt-2">
                            <button
                              onClick={() => setActiveVideo(faq.videoUrl)}
                              className="group flex items-center gap-2 rounded bg-black px-3 py-2 sm:py-1.5 text-[10px] font-bold uppercase text-white transition-transform active:scale-95 hover:scale-105"
                              onMouseEnter={() => setCursorState("hover")}
                              onMouseLeave={() => setCursorState("default")}
                            >
                              <span className="inline-block h-2 w-2 rounded-full bg-[#ff4d00] animate-pulse" />
                              Watch Video FAQ
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4 text-xs">
            <p className="font-semibold text-gray-500 leading-relaxed">
              Have specific logistics requirements?
            </p>
            <a
              href="#contact"
              className="inline-block font-extrabold uppercase text-black hover:text-[#ff4d00] underline"
              onMouseEnter={() => setCursorState("hover")}
              onMouseLeave={() => setCursorState("default")}
            >
              Contact Support →
            </a>
          </div>
        </div>
      </section>

      {/* 3. DARK CTA SECTION */}
      <section
        ref={darkSectionRef}
        onMouseEnter={() => setCursorState("dark")}
        onMouseLeave={() => setCursorState("default")}
        className="relative overflow-hidden bg-[#0a0a0a] px-4 py-24 sm:px-6 sm:py-32 lg:py-36 text-center text-white"
      >
        {/* SVG Pulse Rings */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
          {[160, 280, 420, 600, 800, 1000].map((size, idx) => (
            <motion.div
              key={idx}
              className="absolute rounded-full border border-[#ff4d00]"
              style={{ width: size, height: size }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: idx * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          {/* CTA Orb */}
          <motion.div
            className="relative mx-auto mb-8 sm:mb-10 flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <a
              href="#contact"
              className="group relative flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-[#ff4d00] text-center font-bold uppercase text-white shadow-[0_0_40px_rgba(255,77,0,0.5)] transition-all duration-300 hover:shadow-[0_0_70px_rgba(255,77,0,0.8)]"
              onMouseEnter={() => setCursorState("orange")}
              onMouseLeave={() => setCursorState("dark")}
            >
              <span className="text-[9px] sm:text-[11px] leading-tight font-black tracking-widest">
                WORK <br /> WITH US
              </span>
            </a>
          </motion.div>

          <h2 className="text-4xl font-black uppercase tracking-tight sm:text-6xl lg:text-8xl leading-none">
            <MovingText text="READY TO MOVE" />
            <br />
            <span className="text-[#ff4d00]">
              <MovingText text="SMARTER?" delay={0.02} />
            </span>
          </h2>

          <p className="mx-auto mt-6 sm:mt-8 max-w-md text-xs text-gray-400 leading-relaxed px-4">
            No endless call queues. No standard operational delays. Dedicated logistics engineers handling your cargo end-to-end.
          </p>
        </div>
      </section>

      {/* 4. TABBED TICKER & FOOTER DIRECTORY */}
      <footer className="bg-[#f9f9f7] px-4 pt-12 pb-8 sm:px-6 sm:pt-20 lg:px-12 lg:pb-10">
        <div className="mx-auto max-w-[1400px]">
          {/* TAB CONTROLS */}
          <div className="flex gap-6 sm:gap-8 border-b border-gray-200 pb-3 sm:pb-4 text-xs font-black uppercase tracking-widest">
            <button
              onClick={() => setActiveTab("INDUSTRIES")}
              className={`transition-colors duration-200 ${
                activeTab === "INDUSTRIES"
                  ? "text-[#ff4d00] underline underline-offset-8"
                  : "text-gray-400 hover:text-black"
              }`}
              onMouseEnter={() => setCursorState("hover")}
              onMouseLeave={() => setCursorState("default")}
            >
              INDUSTRIES
            </button>
            <button
              onClick={() => setActiveTab("SERVICES")}
              className={`transition-colors duration-200 ${
                activeTab === "SERVICES"
                  ? "text-[#ff4d00] underline underline-offset-8"
                  : "text-gray-400 hover:text-black"
              }`}
              onMouseEnter={() => setCursorState("hover")}
              onMouseLeave={() => setCursorState("default")}
            >
              SERVICES
            </button>
          </div>

          {/* INFINITE MARQUEE */}
          <div className="overflow-hidden py-6 sm:py-10">
            <motion.div
              className="flex whitespace-nowrap gap-6 sm:gap-12 text-xl sm:text-3xl font-black tracking-tight text-gray-300"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <span
                  key={index}
                  className="transition-colors duration-300 hover:text-black cursor-pointer flex items-center gap-6 sm:gap-12"
                  onMouseEnter={() => setCursorState("hover")}
                  onMouseLeave={() => setCursorState("default")}
                >
                  {item} <span className="text-gray-300">•</span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* CANVAS WATERMARK */}
          <div className="relative mt-4 sm:mt-8 w-full border-t border-gray-200 pt-6 sm:pt-8">
            <canvas ref={canvasRef} className="block w-full cursor-pointer" />
          </div>
        </div>
      </footer>

      {/* VIDEO FAQ POPUP MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-xl bg-black border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black font-bold text-xs"
              >
                ✕
              </button>
              <video
                src={activeVideo}
                controls
                autoPlay
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}