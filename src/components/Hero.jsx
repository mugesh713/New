// Hero.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import Globe from "globe.gl";
import * as THREE from "three";

// --- DATA DEFINITIONS ---
const HEADLINES = [
  "NEWS: HOW AN AUSTRALIAN FREIGHT FORWARDER'S WEBSITE...",
  "NEWS: COLOMBIA EARTHQUAKE DISRUPTS KEY FREIGHT ROUTES...",
  "NEWS: CONFLICT DRIVES UP BUNKER PRICES, HELPING INTRA-ASIA...",
  "NEWS: NEW APAC PORT TERMINALS REDUCE CONTAINER DWELL TIME...",
];

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

// --- CUSTOM CURSOR (DESKTOP ONLY) ---
function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 hidden lg:block h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-white/10 backdrop-blur-[1px] transition-transform duration-75 ease-out"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div className="absolute inset-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 shadow-[0_0_6px_#f97316]" />
    </div>
  );
}

// --- TEXT SCRAMBLE ANIMATION ---
function ScrambleText({ text, className = "", onClick, autoTrigger = false }) {
  const [displayText, setDisplayText] = useState(text);
  const animationFrameRef = useRef(null);

  const startScramble = useCallback(() => {
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
      }
    };

    scrambleLoop();
  }, [text]);

  useEffect(() => {
    setDisplayText(text);
    if (autoTrigger) {
      startScramble();
    }
  }, [text, autoTrigger, startScramble]);

  return (
    <span
      className={`cursor-pointer transition-colors ${className}`}
      onMouseEnter={startScramble}
      onClick={onClick}
    >
      {displayText}
    </span>
  );
}

// --- VERTICAL NEWS TICKER ---
function VerticalNewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HEADLINES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-5 overflow-hidden text-[9px] sm:text-[11px] uppercase tracking-widest text-gray-400">
      <div
        className="transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(-${currentIndex * 20}px)` }}
      >
        {HEADLINES.map((headline, idx) => (
          <div key={idx} className="h-5 flex items-center truncate">
            <ScrambleText text={headline} className="hover:text-white truncate" />
          </div>
        ))}
      </div>
    </div>
  );
}

// --- MAIN HERO COMPONENT ---
function Hero() {
  const globeContainer = useRef(null);
  const globeInstance = useRef(null);
  const [countriesData, setCountriesData] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Locations matching an EMEA-focused network (Europe / Middle East / Africa)
  const locationsMap = {
    GERMANY: { name: "GERMANY", lat: 51.1657, lng: 10.4515 },
    ITALY: { name: "ITALY", lat: 41.8719, lng: 12.5674 },
    SPAIN: { name: "SPAIN", lat: 40.4637, lng: -3.7492 },
    TURKEY: { name: "TURKEY", lat: 38.9637, lng: 35.2433 },
    ISRAEL: { name: "ISRAEL", lat: 31.0461, lng: 34.8516 },
    EGYPT: { name: "EGYPT", lat: 26.8206, lng: 30.8025 },
    QATAR: { name: "QATAR", lat: 25.3548, lng: 51.1839 },
    SAUDI_ARABIA: { name: "SAUDI ARABIA", lat: 23.8859, lng: 45.0792 },
    KENYA: { name: "KENYA", lat: -1.2921, lng: 36.8219 },
    SOUTH_AFRICA: { name: "SOUTH AFRICA", lat: -30.5595, lng: 22.9375 },
  };

  const locationsList = Object.values(locationsMap);

  const routes = [
    {
      from: locationsMap.SPAIN,
      to: locationsMap.ITALY,
      duration: 3600,
      gap: 1.1,
      dash: 0.26,
      initialGap: 0.0,
      color: ["rgba(230, 80, 0, 0.1)", "rgba(255, 110, 0, 1)"],
    },
    {
      from: locationsMap.ITALY,
      to: locationsMap.TURKEY,
      duration: 3900,
      gap: 1.2,
      dash: 0.25,
      initialGap: 0.15,
      color: ["rgba(230, 80, 0, 0.1)", "rgba(255, 110, 0, 1)"],
    },
    {
      from: locationsMap.TURKEY,
      to: locationsMap.ISRAEL,
      duration: 3200,
      gap: 1.0,
      dash: 0.28,
      initialGap: 0.3,
      color: ["rgba(230, 80, 0, 0.1)", "rgba(255, 110, 0, 1)"],
    },
    {
      from: locationsMap.ISRAEL,
      to: locationsMap.EGYPT,
      duration: 2800,
      gap: 1.0,
      dash: 0.3,
      initialGap: 0.45,
      color: ["rgba(230, 80, 0, 0.1)", "rgba(255, 110, 0, 1)"],
    },
    {
      from: locationsMap.EGYPT,
      to: locationsMap.QATAR,
      duration: 4000,
      gap: 1.2,
      dash: 0.24,
      initialGap: 0.05,
      color: ["rgba(230, 80, 0, 0.1)", "rgba(255, 110, 0, 1)"],
    },
    {
      from: locationsMap.QATAR,
      to: locationsMap.SAUDI_ARABIA,
      duration: 3000,
      gap: 1.0,
      dash: 0.3,
      initialGap: 0.2,
      color: ["rgba(230, 80, 0, 0.1)", "rgba(255, 110, 0, 1)"],
    },
    {
      from: locationsMap.EGYPT,
      to: locationsMap.KENYA,
      duration: 4400,
      gap: 1.3,
      dash: 0.22,
      initialGap: 0.35,
      color: ["rgba(230, 80, 0, 0.1)", "rgba(255, 110, 0, 1)"],
    },
    {
      from: locationsMap.KENYA,
      to: locationsMap.SOUTH_AFRICA,
      duration: 4800,
      gap: 1.3,
      dash: 0.24,
      initialGap: 0.5,
      color: ["rgba(230, 80, 0, 0.1)", "rgba(255, 110, 0, 1)"],
    },
    {
      from: locationsMap.GERMANY,
      to: locationsMap.SPAIN,
      duration: 3400,
      gap: 1.1,
      dash: 0.27,
      initialGap: 0.6,
      color: ["rgba(230, 80, 0, 0.1)", "rgba(255, 110, 0, 1)"],
    },
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch countries data
  useEffect(() => {
    const controller = new AbortController();

    fetch(
      "https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson",
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setCountriesData(data.features);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Error loading countries data:", err);
        }
      });

    return () => controller.abort();
  }, []);

  // Initialize Globe
  useEffect(() => {
    if (!globeContainer.current || countriesData.length === 0) return;
    if (globeInstance.current) return;

    const container = globeContainer.current;

    const globe = Globe()(container)
      .backgroundColor("rgba(0,0,0,0)")
      .showAtmosphere(true)
      .atmosphereColor("#3b82f6")
      .atmosphereAltitude(0.22)
      .showGraticules(false)
      .showGlobe(true);

    globeInstance.current = globe;

    // Near-black, subtly emissive sphere so the dotted hex texture reads
    // as glowing points against deep space, matching the reference look.
    const darkSphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x050608,
      emissive: 0x02030a,
      specular: 0x1d2433,
      shininess: 10,
      transparent: true,
      opacity: 1,
    });
    globe.globeMaterial(darkSphereMaterial);

    // --- DOTTED / STIPPLED CONTINENT TEXTURE ---
    // Swap the old solid-cap polygonsData rendering for hexPolygonsData,
    // which fills each landmass with a fine hex-dot grid instead of a
    // flat white shape. Small resolution + tight margin = dense dot look.
    globe
      .hexPolygonsData(countriesData)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.72)
      .hexPolygonUseDots(true)
      .hexPolygonColor(() => "rgba(255, 255, 255, 0.85)")
      .hexPolygonAltitude(0.003);

    globe
      .pointsData(locationsList)
      .pointLat("lat")
      .pointLng("lng")
      .pointColor(() => "#f97316")
      .pointRadius(0.45)
      .pointAltitude(0.015);

    globe
      .arcsData(routes)
      .arcStartLat((d) => d.from.lat)
      .arcStartLng((d) => d.from.lng)
      .arcEndLat((d) => d.to.lat)
      .arcEndLng((d) => d.to.lng)
      .arcColor((d) => d.color)
      .arcDashLength((d) => d.dash)
      .arcDashGap((d) => d.gap)
      .arcDashInitialGap((d) => d.initialGap)
      .arcDashAnimateTime((d) => d.duration)
      .arcStroke(0.8)
      .arcAltitudeAutoScale(0.25);

    globe
      .htmlElementsData(locationsList)
      .htmlLat("lat")
      .htmlLng("lng")
      .htmlElement((d) => {
        const el = document.createElement("div");
        el.style.cssText = `
          display: flex;
          align-items: center;
          gap: 4px;
          transform: translate(-10%, -50%);
          pointer-events: none;
          user-select: none;
        `;
        el.innerHTML = `
          <div style="
            width: 4px;
            height: 4px;
            background-color: #f97316;
            border-radius: 50%;
            box-shadow: 0 0 6px #f97316;
          "></div>
          <span style="
            background: rgba(0, 0, 0, 0.95);
            color: #ffffff;
            padding: 1px 4px;
            border-radius: 2px;
            font-family: monospace;
            font-size: ${isMobile ? "6px" : "8px"};
            font-weight: 700;
            letter-spacing: 0.5px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            white-space: nowrap;
          ">
            ${d.name}
          </span>
        `;
        return el;
      });

    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = isMobile ? 0.6 : 0.4;
    controls.enableZoom = false;

    // Frame on the Europe / Middle East / Africa cluster, tucked toward
    // the upper-right of the viewport the way the reference crops it.
    const altitude = isMobile ? 2.4 : 1.5;
    globe.pointOfView({ lat: 15.0, lng: 25.0, altitude }, 0);

    const handleResize = () => {
      if (!globeContainer.current) return;
      const width = globeContainer.current.clientWidth;
      const height = globeContainer.current.clientHeight;
      if (width > 0 && height > 0) {
        globe.width(width).height(height);
      }
    };

    requestAnimationFrame(handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (globeInstance.current) {
        try {
          const controls = globeInstance.current.controls();
          if (controls && controls.dispose) {
            controls.dispose();
          }
        } catch (e) {
          // Ignore cleanup errors
        }
      }
      if (container) {
        container.innerHTML = "";
      }
      globeInstance.current = null;
    };
  }, [countriesData, isMobile]);

  // Pause rotation on cursor enter, resume on exit
  const handleMouseEnter = () => {
    if (globeInstance.current) {
      try {
        const controls = globeInstance.current.controls();
        if (controls) controls.autoRotate = false;
      } catch (e) {
        // Ignore
      }
    }
  };

  const handleMouseLeave = () => {
    if (globeInstance.current) {
      try {
        const controls = globeInstance.current.controls();
        if (controls) controls.autoRotate = true;
      } catch (e) {
        // Ignore
      }
    }
  };

  return (
    <div className={`bg-[#050507] font-mono text-white ${!isMobile ? "lg:cursor-none" : ""} min-h-[100vh]`}>
      <CustomCursor />

      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Atmosphere Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_50%,_var(--tw-gradient-stops))] from-blue-900/30 via-[#050507] to-[#050507]" />

        {/* Top Banner Ticker */}
        <div className="relative z-20 border-b border-white/10 bg-black/60 px-4 md:px-8 py-1.5">
          <VerticalNewsTicker />
        </div>

        {/* Header Bar */}
        <header className="relative z-30 flex w-full items-center justify-between px-4 py-5 md:px-16">
          <div className="text-lg md:text-xl font-black tracking-tighter uppercase text-white">
            COMPANY NAME
          </div>

          {/* Desktop Navigation - ONLY visible on desktop */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-300">
            <ScrambleText text="ABOUT" className="hover:text-orange-500" />
            <ScrambleText text="SERVICES" className="hover:text-orange-500" />
            <ScrambleText text="INDUSTRIES" className="hover:text-orange-500" />
            <ScrambleText text="INSIGHTS" className="hover:text-orange-500" />
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 flex gap-4">
              <ScrambleText text="CARBON CALCULATOR" className="hover:text-white" />
              <span>|</span>
              <ScrambleText text="LIVE TRACKING PORTAL" className="hover:text-white" />
            </div>

            <button className="rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-black">
              <ScrambleText text="WORK WITH US" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button - ONLY visible on mobile */}
          <button
            className="block lg:hidden text-white focus:outline-none p-2 z-40"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                />
              )}
            </svg>
          </button>

          {/* Mobile Overlay Navigation Drawer - ONLY visible on mobile when menu is open */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md lg:hidden space-y-6 text-sm font-bold uppercase tracking-widest text-gray-200">
              <ScrambleText text="ABOUT" className="hover:text-orange-500 py-2" />
              <ScrambleText text="SERVICES" className="hover:text-orange-500 py-2" />
              <ScrambleText text="INDUSTRIES" className="hover:text-orange-500 py-2" />
              <ScrambleText text="INSIGHTS" className="hover:text-orange-500 py-2" />
              <div className="h-px w-24 bg-white/20 my-2" />
              <ScrambleText text="CARBON CALCULATOR" className="hover:text-white py-1 text-xs text-gray-400" />
              <ScrambleText text="LIVE TRACKING PORTAL" className="hover:text-white py-1 text-xs text-gray-400" />
              <button className="mt-4 rounded-full border border-white/20 bg-white/10 px-8 py-3 text-xs font-bold uppercase tracking-wider text-white">
                <ScrambleText text="WORK WITH US" />
              </button>
            </div>
          )}
        </header>

        {/* Main Content Layout */}
        <div
          className="relative z-10 mx-auto flex min-h-[calc(100vh-100px)] w-full flex-col lg:flex-row transition-transform duration-300 ease-out"
          style={{
            transform: !isMobile ? `translateY(-${scrollY * 0.4}px)` : "none",
          }}
        >
          {/* Left Text */}
          <div className="flex w-full flex-col justify-center px-6 py-8 md:px-16 lg:w-1/2 z-20">
            <p className="mb-2 md:mb-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-gray-400">
              One Operator
            </p>

            <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[84px]">
              Every <br />
              Leg Of The <br />
              Journey
            </h1>

            <p className="mt-4 md:mt-6 max-w-md text-xs sm:text-sm leading-relaxed text-gray-400 md:text-base">
              Freight forwarding, land transport, and customs brokerage, unified across APAC under one accountable team.
            </p>

            <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
              <button className="rounded-full bg-white px-6 sm:px-7 py-3 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-orange-500 hover:text-white">
                <ScrambleText text="TALK WITH US" />
              </button>

              <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 sm:px-7 py-3 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20">
                <ScrambleText text="OUR SERVICES" />
                <span className="text-xs">→</span>
              </button>
            </div>
          </div>

          {/* GLOBE CONTAINER */}
          <div
            className={`relative ${
              isMobile
                ? "h-[280px] sm:h-[400px] w-full mt-4"
                : "h-[380px] sm:h-[480px] w-full lg:absolute lg:right-[-12%] lg:top-[-5%] lg:h-[110vh] lg:w-[68vw]"
            } z-10 pointer-events-auto`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}
          >
            <div ref={globeContainer} className="h-full w-full" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;