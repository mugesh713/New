// PremiumAnimatedFooter.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ============================================================================
   TEXT ANIMATION PRIMITIVES
   (character-reveal, line-fade, scramble) — reused everywhere in this file so
   every heading, label and word in the page shares the same motion language.
============================================================================ */

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

// Line-by-line fade + rise reveal — used for small dense paragraph/value text
// where a per-character flip would be too noisy to read comfortably.
function FadeLines({ lines, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {lines.map((line, i) => (
        <motion.p key={i} variants={item}>
          {line}
        </motion.p>
      ))}
    </motion.div>
  );
}

// Text Scramble Animation Component
function ScrambleText({ text, className = "", onClick }) {
  const [displayText, setDisplayText] = useState(text);
  const animationFrameRef = useRef(null);
  const isHovering = useRef(false);

  const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

  const startScramble = () => {
    if (isHovering.current) return;
    isHovering.current = true;

    let iteration = 0;
    const maxIterations = text.length * 3;
    cancelAnimationFrame(animationFrameRef.current);

    const scrambleLoop = () => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "|") return char;
            if (index < iteration / 3) return text[index];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );

      if (iteration < maxIterations) {
        iteration += 1;
        animationFrameRef.current = requestAnimationFrame(scrambleLoop);
      } else {
        setDisplayText(text);
        isHovering.current = false;
      }
    };

    scrambleLoop();
  };

  const reverseScramble = () => {
    if (!isHovering.current) return;

    let iteration = text.length * 3;
    const maxIterations = 0;
    cancelAnimationFrame(animationFrameRef.current);

    const reverseLoop = () => {
      const progress = iteration / (text.length * 3);
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "|") return char;
            const threshold = Math.floor(index * progress);
            if (threshold > index) return text[index];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );

      if (iteration > maxIterations) {
        iteration -= 1;
        animationFrameRef.current = requestAnimationFrame(reverseLoop);
      } else {
        setDisplayText(text);
        isHovering.current = false;
      }
    };

    reverseLoop();
  };

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  return (
    <span
      className={`cursor-pointer transition-colors ${className}`}
      onMouseEnter={startScramble}
      onMouseLeave={reverseScramble}
      onClick={onClick}
    >
      {displayText}
    </span>
  );
}

// Small pulsing ring + centre dot — a location / ping indicator used next to
// the "Find Us" label, echoing the pulse-ring language from the dark CTA.
function LocationPulse({ size = 34 }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <motion.span
        className="absolute inset-0 rounded-full border border-black/25"
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="absolute inset-0 rounded-full border border-black/30" />
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
    </div>
  );
}

/* ============================================================================
   DOT-MATRIX WORLD MAP
   Same technique as the big canvas wordmark below: paint a silhouette to an
   offscreen canvas, sample it into a dot grid, then render the dots with a
   mouse-reactive glow. The silhouette here is a set of simplified continent
   blobs (positioned by rough lon/lat) instead of text. Highlighted trade-lane
   cities pulse in blue on top of the dot field.
============================================================================ */
function DotWorldMap({ markers = [], isMobile }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = isMobile ? 220 : 300);
    let mouse = { x: -9999, y: -9999, radius: isMobile ? 70 : 120 };

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const handleTouch = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };
    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = isMobile ? 220 : 300;
      initDots();
    };

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("touchmove", handleTouch);
    window.addEventListener("resize", handleResize);

    const maskCanvas = document.createElement("canvas");
    const maskCtx = maskCanvas.getContext("2d");
    let dots = [];

    const blob = (cx, cy, rx, ry) => {
      maskCtx.beginPath();
      maskCtx.ellipse(cx * width, cy * height, rx * width, ry * height, 0, 0, Math.PI * 2);
      maskCtx.fill();
    };

    // Simplified continent silhouette, positioned using rough
    // lon/lat -> (x = (lon+180)/360, y = (90-lat)/180) proportions.
    const paintSilhouette = () => {
      maskCtx.clearRect(0, 0, width, height);
      maskCtx.fillStyle = "#000";
      // North America
      blob(0.15, 0.17, 0.05, 0.055);
      blob(0.18, 0.28, 0.065, 0.085);
      blob(0.172, 0.4, 0.032, 0.042);
      blob(0.205, 0.44, 0.018, 0.02);
      blob(0.28, 0.1, 0.02, 0.026);
      // South America
      blob(0.24, 0.52, 0.04, 0.038);
      blob(0.232, 0.62, 0.048, 0.095);
      // Europe
      blob(0.495, 0.18, 0.045, 0.05);
      // Africa
      blob(0.515, 0.34, 0.058, 0.075);
      blob(0.53, 0.47, 0.042, 0.07);
      blob(0.555, 0.3, 0.028, 0.032);
      // Asia
      blob(0.64, 0.175, 0.105, 0.085);
      blob(0.755, 0.18, 0.085, 0.07);
      blob(0.822, 0.22, 0.04, 0.04);
      blob(0.62, 0.36, 0.03, 0.048);
      blob(0.71, 0.4, 0.033, 0.042);
      blob(0.73, 0.445, 0.026, 0.013);
      blob(0.768, 0.435, 0.018, 0.011);
      blob(0.818, 0.23, 0.013, 0.026);
      // Australia + NZ
      blob(0.822, 0.575, 0.052, 0.042);
      blob(0.89, 0.635, 0.011, 0.018);
    };

    const initDots = () => {
      dots = [];
      maskCanvas.width = width;
      maskCanvas.height = height;
      paintSilhouette();
      const imgData = maskCtx.getImageData(0, 0, width, height).data;
      const gap = isMobile ? 5 : 6;
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const idx = (y * width + x) * 4;
          if (imgData[idx + 3] > 128) {
            dots.push({ x, y, baseAlpha: 0.16 });
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
        let size = isMobile ? 0.9 : 1.1;

        if (dist < mouse.radius) {
          const factor = 1 - dist / mouse.radius;
          alpha = dot.baseAlpha + factor * 0.7;
          size += factor * 1.6;
        }

        ctx.fillStyle = `rgba(15, 15, 15, ${alpha})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pulsing highlight markers (trade lane cities)
      const t = Date.now() / 1000;
      markers.forEach((m, i) => {
        const mx = m.x * width;
        const my = m.y * height;
        const pulse = (Math.sin(t * 1.6 + i * 1.3) + 1) / 2; // 0..1

        ctx.beginPath();
        ctx.arc(mx, my, 4 + pulse * 8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(37, 99, 235, ${0.55 - pulse * 0.45})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mx, my, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = "#2563eb";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [markers, isMobile]);

  return <canvas ref={canvasRef} className="block w-full" />;
}

/* ============================================================================
   CONTACT SECTION
   Plain design - no boxes, no emojis, clean typography, no animations on labels
============================================================================ */
function ContactSection({ setCursorState, isMobile }) {
  const markers = [
    { id: "hq", label: "Melbourne HQ", x: 0.822, y: 0.575 },
    { id: "hk", label: "Hong Kong", x: 0.73, y: 0.4 },
    { id: "cn", label: "China", x: 0.68, y: 0.28 },
    { id: "nz", label: "New Zealand", x: 0.89, y: 0.635 },
  ];

  const hoverProps = !isMobile
    ? {
        onMouseEnter: () => setCursorState("target"),
        onMouseLeave: () => setCursorState("default"),
      }
    : {};

  // Static label - NO ANIMATION for ALL labels
  const StaticLabel = ({ children }) => (
    <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
      {children}
    </h4>
  );

  return (
    <div className="border-t border-gray-200 pt-8 pb-4 sm:pt-16 sm:pb-6">
      <div className="mb-6 flex items-center gap-3 sm:mb-10">
        <LocationPulse size={isMobile ? 28 : 34} />
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
          <MovingText text="Find Us" />
        </h3>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        {/* IMAGE - Hidden on mobile */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
            <img
              src="https://picsum.photos/seed/uc-freight-tunnel/700/900"
              alt="Freight transport"
              className="h-full w-full object-cover grayscale contrast-125 brightness-90"
              loading="lazy"
            />
          </div>
        </div>

        {/* DETAILS - Plain design, no boxes, no animations on labels */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:col-span-5">
          {/* Row 1: Head Office & Operating Across */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* HEAD OFFICE - Static heading, no animation */}
            <div>
              <StaticLabel>Head Office</StaticLabel>
              <div className="space-y-1">
                <p className="text-sm sm:text-base font-medium leading-snug text-black">
                  2A International Square,
                </p>
                <p className="text-sm sm:text-base font-medium leading-snug text-black">
                  Tullamarine VIC 3043, Australia.
                </p>
              </div>
              <a
                href="https://maps.google.com"
                {...hoverProps}
                className="group inline-flex items-center gap-2 mt-2 text-xs font-bold uppercase text-black transition-all duration-300 hover:text-[#ff4d00]"
              >
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
                <span className="relative">
                  Direction on Google
                  <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-[#ff4d00] transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            </div>

            {/* Operating Across - Static label, NO ANIMATION */}
            <div>
              <StaticLabel>Operating Across</StaticLabel>
              <p className="text-sm sm:text-base font-medium leading-snug text-black">
                Australia
                <br className="sm:hidden" />
                <span className="hidden sm:inline">&nbsp;/&nbsp;</span>
                New Zealand
                <br className="sm:hidden" />
                <span className="hidden sm:inline">&nbsp;/&nbsp;</span>
                Hong Kong
                <br className="sm:hidden" />
                <span className="hidden sm:inline">&nbsp;/&nbsp;</span>
                China
              </p>
            </div>
          </div>

          {/* Row 2: Email, Hotline & Office Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Email & Hotline */}
            <div>
              <StaticLabel>Email</StaticLabel>
              <a
                href="mailto:contact@unitedcarriers.com"
                {...hoverProps}
                className="group relative inline-block text-sm font-medium text-black transition-all duration-300 hover:text-[#ff4d00] break-all"
              >
                <span className="relative z-10">contact@unitedcarriers.com</span>
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#ff4d00] transition-all duration-300 group-hover:w-full" />
              </a>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <StaticLabel>Hotline</StaticLabel>
                <a
                  href="tel:1300000082"
                  {...hoverProps}
                  className="group relative inline-block text-base sm:text-lg font-bold text-black transition-all duration-300 hover:text-[#ff4d00]"
                >
                  <span className="relative z-10">1300 000 082</span>
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#ff4d00] transition-all duration-300 group-hover:w-full" />
                </a>
              </div>
            </div>

            {/* Office Hours - Static label, NO ANIMATION */}
            <div>
              <StaticLabel>Office Hours</StaticLabel>
              <p className="text-sm sm:text-base font-medium leading-snug text-black">
                Monday - Friday
              </p>
              <p className="text-sm sm:text-base font-medium leading-snug text-black">
                8:30AM - 5PM
              </p>
            </div>
          </div>
        </div>

        {/* MAP */}
        <div className="lg:col-span-4">
          <div className="relative h-[200px] sm:h-[240px] lg:h-full lg:min-h-[240px] w-full overflow-hidden border border-gray-200">
            <DotWorldMap markers={markers} isMobile={isMobile} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   MAIN PAGE
============================================================================ */
export default function PremiumAnimatedFooter() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState("default");
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState("INDUSTRIES");
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [marqueeKey, setMarqueeKey] = useState(0);
  const [isWorkWithUsHovered, setIsWorkWithUsHovered] = useState(false);

  const darkSectionRef = useRef(null);
  const canvasRef = useRef(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track global mouse position (only on desktop)
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Responsive Canvas Dot-Matrix Watermark Text Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = isMobile ? 100 : 180);
    let mouse = { x: width / 2, y: height / 2, radius: isMobile ? 90 : 160 };

    const handleCanvasMouseMove = (e) => {
      if (isMobile) return;
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
      height = canvas.height = isMobile ? 100 : 180;
      mouse.radius = isMobile ? 90 : 160;
      initDots();
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleCanvasMouseMove);
    }
    window.addEventListener("touchmove", handleCanvasTouchMove);
    window.addEventListener("resize", handleResize);

    const textCanvas = document.createElement("canvas");
    const textCtx = textCanvas.getContext("2d");
    let dots = [];

    const initDots = () => {
      dots = [];
      textCanvas.width = width;
      textCanvas.height = height;

      const fontSize = isMobile ? Math.floor(width / 8) : 110;

      textCtx.fillStyle = "black";
      textCtx.fillRect(0, 0, width, height);
      textCtx.fillStyle = "white";
      textCtx.font = `900 ${fontSize}px system-ui, -apple-system, sans-serif`;
      textCtx.textAlign = "center";
      textCtx.textBaseline = "middle";
      textCtx.fillText("UNITED CARRIERS", width / 2, height / 2);

      const imgData = textCtx.getImageData(0, 0, width, height).data;
      const gap = isMobile ? 3 : 4;

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
        let size = isMobile ? 0.8 : 1.1;

        if (dist < mouse.radius) {
          const factor = 1 - dist / mouse.radius;
          alpha = dot.baseAlpha + factor * 0.88;
          size = (isMobile ? 0.8 : 1.1) + factor * (isMobile ? 1.4 : 2.2);
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
      if (!isMobile) {
        window.removeEventListener("mousemove", handleCanvasMouseMove);
      }
      window.removeEventListener("touchmove", handleCanvasTouchMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [cursorState, isMobile]);

  const faqs = [
    {
      id: "01",
      question: "What does United Carriers do?",
      answer:
        "We provide end-to-end freight forwarding, customs brokerage, and 3PL supply chain logistics across global trade lanes.",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: "02",
      question: "What industries do you specialise in?",
      answer:
        "We specialize in Energy, Automotive, Mining, Construction, Project Cargo, Engineering, and Commodities.",
      videoUrl: null,
    },
    {
      id: "03",
      question: "What shipping methods do you offer?",
      answer:
        "Air freight, Ocean freight (FCL & LCL), Road transport, Rail freight, and Specialized heavy haulage.",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: "04",
      question: "Do you provide customs clearance services?",
      answer:
        "Our in-house customs brokers handle full tariff classifications, compliance, and border documentation.",
      videoUrl: null,
    },
    {
      id: "05",
      question: "How is freight pricing calculated?",
      answer:
        "Pricing is calculated based on dimensional weight, origin/destination routes, transit speed, and surcharges.",
      videoUrl: null,
    },
    {
      id: "06",
      question: "Do you offer warehousing and 3PL services?",
      answer:
        "We operate fully integrated fulfillment hubs with dynamic WMS tracking and climate-controlled storage.",
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMarqueeKey((prev) => prev + 1);
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#f9f9f7] text-black font-sans select-none">
      {/* 1. DYNAMIC CURSOR - Hidden on mobile */}
      {!isMobile && (
        <motion.div
          className={`pointer-events-none fixed left-0 top-0 z-50 rounded-full transition-colors duration-200 ${
            cursorState === "orange"
              ? "bg-[#ff4d00] border-transparent shadow-[0_0_30px_rgba(255,77,0,0.8)]"
              : cursorState === "dark"
              ? "border border-white/60 bg-white/10"
              : cursorState === "target"
              ? "border border-black/50 bg-transparent"
              : "border border-black/30 bg-black/5"
          }`}
          animate={{
            x:
              mousePos.x -
              (cursorState === "hover"
                ? 32
                : cursorState === "dark"
                ? 28
                : cursorState === "target"
                ? 18
                : 12),
            y:
              mousePos.y -
              (cursorState === "hover"
                ? 32
                : cursorState === "dark"
                ? 28
                : cursorState === "target"
                ? 18
                : 12),
            width:
              cursorState === "hover" ? 64 : cursorState === "dark" ? 56 : cursorState === "target" ? 36 : 24,
            height:
              cursorState === "hover" ? 64 : cursorState === "dark" ? 56 : cursorState === "target" ? 36 : 24,
          }}
          transition={{ type: "spring", stiffness: 450, damping: 25, mass: 0.1 }}
        >
          {cursorState === "target" && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-black/60" />
            </span>
          )}
        </motion.div>
      )}

      {/* 2. FAQ SECTION */}
      <section className="mx-auto max-w-[1400px] px-4 py-12 sm:py-16 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* LEFT HEADLINE */}
          <div className="lg:col-span-4">
            <h2 className="text-4xl sm:text-5xl lg:text-8xl font-black uppercase tracking-tight">
              <MovingText text="F.A.Q" />
            </h2>
            <p className="mt-3 sm:mt-4 max-w-xs text-xs font-semibold leading-relaxed text-gray-500">
              Clear answers, real transparency. Expand any topic or watch quick video insights.
            </p>
          </div>

          {/* ACCORDION CONTAINER */}
          <div className="lg:col-span-6">
            <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {faqs.map((faq) => (
                <div key={faq.id} className="py-3 sm:py-5">
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="flex w-full items-center justify-between text-left transition-colors active:text-[#ff4d00] hover:text-[#ff4d00]"
                    onMouseEnter={() => !isMobile && setCursorState("hover")}
                    onMouseLeave={() => !isMobile && setCursorState("default")}
                  >
                    <span className="text-xs font-bold text-gray-400 mr-3 sm:mr-6 flex-shrink-0">
                      {faq.id}
                    </span>
                    <span className="flex-1 text-xs sm:text-sm font-medium text-black pr-2">
                      {faq.question}
                    </span>
                    <span className="text-sm sm:text-base font-sans text-gray-400 flex-shrink-0">
                      {openFaq === faq.id ? "\u2212" : "+"}
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
                        <p className="text-xs leading-relaxed text-gray-600 mb-3">{faq.answer}</p>

                        {faq.videoUrl && (
                          <div className="mt-2">
                            <button
                              onClick={() => setActiveVideo(faq.videoUrl)}
                              className="group flex items-center gap-2 rounded bg-black px-3 py-2 sm:py-1.5 text-[10px] font-bold uppercase text-white transition-transform active:scale-95 hover:scale-105"
                              onMouseEnter={() => !isMobile && setCursorState("hover")}
                              onMouseLeave={() => !isMobile && setCursorState("default")}
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
          <div className="lg:col-span-2 space-y-3 text-xs">
            <p className="font-semibold text-gray-500 leading-relaxed">
              Have specific logistics requirements?
            </p>
            <a
              href="#contact"
              className="inline-block font-extrabold uppercase text-black hover:text-[#ff4d00] underline"
              onMouseEnter={() => !isMobile && setCursorState("hover")}
              onMouseLeave={() => !isMobile && setCursorState("default")}
            >
              Contact Support &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* 3. DARK CTA SECTION */}
      <section
        ref={darkSectionRef}
        onMouseEnter={() => !isMobile && setCursorState("dark")}
        onMouseLeave={() => !isMobile && setCursorState("default")}
        className="relative overflow-hidden bg-[#0a0a0a] px-4 py-16 sm:py-24 lg:py-36 text-center text-white"
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
          {/* CTA Orb with Scramble Text */}
          <motion.div
            className="relative mx-auto mb-6 sm:mb-10 flex h-20 w-20 sm:h-32 sm:w-32 items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 rounded-full">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/20"
                animate={{
                  borderColor: isWorkWithUsHovered ? "rgba(255,77,0,0.8)" : "rgba(255,255,255,0.2)",
                  boxShadow: isWorkWithUsHovered
                    ? "0 0 60px rgba(255,77,0,0.6), 0 0 120px rgba(255,77,0,0.3)"
                    : "0 0 20px rgba(255,255,255,0.05)",
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-[-4px] rounded-full border border-transparent"
                animate={{
                  borderColor: isWorkWithUsHovered ? "rgba(255,77,0,0.4)" : "transparent",
                  opacity: isWorkWithUsHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              {isWorkWithUsHovered && (
                <motion.div
                  className="absolute inset-[-8px] rounded-full border border-[#ff4d00]/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </div>

            <a
              href="#contact"
              className="group relative flex h-16 w-16 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-[#ff4d00] text-center font-bold uppercase text-white shadow-[0_0_40px_rgba(255,77,0,0.3)] transition-all duration-300 hover:shadow-[0_0_80px_rgba(255,77,0,0.6)]"
              onMouseEnter={() => {
                if (!isMobile) {
                  setCursorState("orange");
                  setIsWorkWithUsHovered(true);
                }
              }}
              onMouseLeave={() => {
                if (!isMobile) {
                  setCursorState("dark");
                  setIsWorkWithUsHovered(false);
                }
              }}
            >
              <span className="text-[8px] sm:text-[11px] leading-tight font-black tracking-widest">
                <ScrambleText text="WORK WITH US" />
              </span>
            </a>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-8xl font-black uppercase tracking-tight leading-none">
            <MovingText text="READY TO MOVE" />
            <br />
            <span className="text-[#ff4d00]">
              <MovingText text="SMARTER?" delay={0.02} />
            </span>
          </h2>

          <p className="mx-auto mt-4 sm:mt-8 max-w-md text-xs text-gray-400 leading-relaxed px-4">
            No endless call queues. No standard operational delays. Dedicated logistics engineers
            handling your cargo end-to-end.
          </p>
        </div>
      </section>

      {/* 4. TABBED TICKER, CONTACT, & FOOTER DIRECTORY */}
      <footer className="bg-[#f9f9f7] px-4 pt-8 pb-6 sm:px-6 sm:pt-20 lg:px-12 lg:pb-10">
        <div className="mx-auto max-w-[1400px]">
          {/* TAB CONTROLS */}
          <div className="flex gap-4 sm:gap-8 border-b border-gray-200 pb-3 sm:pb-4 text-xs font-black uppercase tracking-widest">
            <button
              onClick={() => handleTabChange("INDUSTRIES")}
              className={`transition-colors duration-200 ${
                activeTab === "INDUSTRIES"
                  ? "text-[#ff4d00] underline underline-offset-8"
                  : "text-gray-400 hover:text-black"
              }`}
              onMouseEnter={() => !isMobile && setCursorState("hover")}
              onMouseLeave={() => !isMobile && setCursorState("default")}
            >
              INDUSTRIES
            </button>
            <button
              onClick={() => handleTabChange("SERVICES")}
              className={`transition-colors duration-200 ${
                activeTab === "SERVICES"
                  ? "text-[#ff4d00] underline underline-offset-8"
                  : "text-gray-400 hover:text-black"
              }`}
              onMouseEnter={() => !isMobile && setCursorState("hover")}
              onMouseLeave={() => !isMobile && setCursorState("default")}
            >
              SERVICES
            </button>
          </div>

          {/* INFINITE MARQUEE */}
          <div className="overflow-hidden py-4 sm:py-10">
            <motion.div
              key={marqueeKey}
              className="flex whitespace-nowrap gap-4 sm:gap-12 text-lg sm:text-3xl font-black tracking-tight text-gray-300"
              initial={{ x: "0%" }}
              animate={{ x: "-50%" }}
              transition={{
                repeat: Infinity,
                duration: isMobile ? 14 : 20,
                ease: "linear",
                repeatType: "loop",
              }}
            >
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <span
                  key={index}
                  className="transition-colors duration-300 hover:text-black cursor-pointer flex items-center gap-4 sm:gap-12"
                  onMouseEnter={() => !isMobile && setCursorState("hover")}
                  onMouseLeave={() => !isMobile && setCursorState("default")}
                >
                  <span className={isMobile ? "text-sm" : "text-3xl"}>{item}</span>
                  <span className="text-gray-300">&bull;</span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* CONTACT SECTION */}
          <ContactSection setCursorState={setCursorState} isMobile={isMobile} />

          {/* BOTTOM LEGAL & FOOTER INFO */}
          <div className="border-t border-gray-200 pt-4 sm:pt-6">
            <div className="flex flex-col items-center justify-between gap-3 text-[10px] sm:text-xs text-gray-500 sm:flex-row">
              <p className="text-center sm:text-left">&copy; 2026 UNITED CARRIERS APAC PTY LTD.</p>
              <div className="flex flex-wrap items-center gap-1.5 justify-center sm:justify-end">
                <a href="#" className="hover:text-[#ff4d00] transition-colors">QHSE</a>
                <span className="text-gray-300">|</span>
                <a href="#" className="hover:text-[#ff4d00] transition-colors">PRIVACY</a>
                <span className="text-gray-300">|</span>
                <a href="#" className="hover:text-[#ff4d00] transition-colors">TERMS</a>
                <span className="text-gray-300">|</span>
                <a href="#" className="hover:text-[#ff4d00] transition-colors">PAYMENT</a>
                <span className="text-gray-300">|</span>
                <a href="#" className="hover:text-[#ff4d00] transition-colors">DELIVERY</a>
                <span className="text-gray-300">|</span>
                <a href="#" className="hover:text-[#ff4d00] transition-colors">REFUND</a>
                <span className="text-gray-300">|</span>
                <a href="#" className="hover:text-[#ff4d00] transition-colors">COOKIES</a>
              </div>
            </div>
          </div>

          {/* CANVAS WATERMARK */}
          <div className="relative mt-6 sm:mt-8 w-full">
            <canvas ref={canvasRef} className="block w-full" />
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
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
                className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white text-black font-bold text-xs"
              >
                &#10005;
              </button>
              <video src={activeVideo} controls autoPlay playsInline className="h-full w-full object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}