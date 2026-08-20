import React, { useEffect, useRef, useState, useCallback } from "react";
import Globe from "globe.gl";
import * as THREE from "three";

// --- 1. SMALLER WHITE ROUNDED MOUSE FOLLOWER ---
function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-50 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-white/10 backdrop-blur-[1px] transition-transform duration-75 ease-out"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div className="absolute inset-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 shadow-[0_0_6px_#f97316]" />
    </div>
  );
}

// --- 2. TEXT SCRAMBLE / DECODE ANIMATION COMPONENT ---
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

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
            return SCRAMBLE_CHARS[
              Math.floor(Math.random() * SCRAMBLE_CHARS.length)
            ];
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

// --- 3. TOP-LEFT VERTICAL UPWARD NEWS TICKER ---
const HEADLINES = [
  "NEWS: HOW AN AUSTRALIAN FREIGHT FORWARDER'S WEBSITE...",
  "NEWS: COLOMBIA EARTHQUAKE DISRUPTS KEY FREIGHT ROUTES...",
  "NEWS: CONFLICT DRIVES UP BUNKER PRICES, HELPING INTRA-ASIA...",
  "NEWS: NEW APAC PORT TERMINALS REDUCE CONTAINER DWELL TIME...",
];

function VerticalNewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HEADLINES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-5 overflow-hidden text-[11px] uppercase tracking-widest text-gray-400">
      <div
        className="transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(-${currentIndex * 20}px)` }}
      >
        {HEADLINES.map((headline, idx) => (
          <div key={idx} className="h-5 flex items-center">
            <ScrambleText text={headline} className="hover:text-white" />
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

  const locationsMap = {
    INDIA: { name: "INDIA", lat: 20.5937, lng: 78.9629 },
    SINGAPORE: { name: "SINGAPORE", lat: 1.3521, lng: 103.8198 },
    JAPAN: { name: "JAPAN", lat: 36.2048, lng: 138.2529 },
    AUSTRALIA: { name: "AUSTRALIA", lat: -25.2744, lng: 133.7751 },
    QATAR: { name: "QATAR", lat: 25.3548, lng: 51.1839 },
    GERMANY: { name: "GERMANY", lat: 51.1657, lng: 10.4515 },
    UK: { name: "UK", lat: 55.3781, lng: -3.436 },
    KENYA: { name: "KENYA", lat: -1.2921, lng: 36.8219 },
    USA: { name: "USA", lat: 37.0902, lng: -95.7129 },
  };

  const locationsList = Object.values(locationsMap);

  const routes = [
    {
      from: locationsMap.INDIA,
      to: locationsMap.SINGAPORE,
      duration: 3800,
      gap: 1.2,
      dash: 0.25,
      initialGap: 0.0,
      color: ["rgba(230, 80, 0, 0.1)", "rgba(255, 110, 0, 1)"],
    },
    {
      from: locationsMap.INDIA,
      to: locationsMap.QATAR,
      duration: 4200,
      gap: 1.1,
      dash: 0.28,
      initialGap: 0.2,
      color: ["rgba(230, 80, 0, 0.1)", "rgba(255, 110, 0, 1)"],
    },
    {
      from: locationsMap.SINGAPORE,
      to: locationsMap.JAPAN,
      duration: 4500,
      gap: 1.3,
      dash: 0.22,
      initialGap: 0.4,
      color: ["rgba(230, 80, 0, 0.1)", "rgba(255, 110, 0, 1)"],
    },
    {
      from: locationsMap.SINGAPORE,
      to: locationsMap.AUSTRALIA,
      duration: 4800,
      gap: 1.2,
      dash: 0.26,
      initialGap: 0.1,
      color: ["rgba(230, 80, 0, 0.1)", "rgba(255, 110, 0, 1)"],
    },
    {
      from: locationsMap.QATAR,
      to: locationsMap.GERMANY,
      duration: 5200,
      gap: 1.4,
      dash: 0.24,
      initialGap: 0.5,
      color: ["rgba(230, 80, 0, 0.1)", "rgba(255, 110, 0, 1)"],
    },
    {
      from: locationsMap.GERMANY,
      to: locationsMap.UK,
      duration: 3500,
      gap: 1.0,
      dash: 0.3,
      initialGap: 0.0,
      color: ["rgba(230, 80, 0, 0.1)", "rgba(255, 110, 0, 1)"],
    },
  ];

  // Track scroll position for smooth upward sliding movement
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson"
    )
      .then((res) => res.json())
      .then((data) => setCountriesData(data.features));
  }, []);

  useEffect(() => {
    if (!globeContainer.current || countriesData.length === 0) return;
    const container = globeContainer.current;

    const globe = Globe()(container)
      .backgroundColor("rgba(0,0,0,0)")
      .showAtmosphere(true)
      .atmosphereColor("#1d4ed8")
      .atmosphereAltitude(0.22)
      .showGraticules(false);

    globeInstance.current = globe;

    const darkSphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x0c0d10,
      emissive: 0x050608,
      specular: 0x22242b,
      shininess: 8,
      transparent: true,
      opacity: 0.96,
    });
    globe.globeMaterial(darkSphereMaterial);

    globe
      .polygonsData(countriesData)
      .polygonCapColor(() => "rgba(255, 255, 255, 0.9)")
      .polygonSideColor(() => "rgba(0, 0, 0, 0)")
      .polygonStrokeColor(() => "#1e2025")
      .polygonAltitude(0.005);

    globe
      .pointsData(locationsList)
      .pointLat("lat")
      .pointLng("lng")
      .pointColor(() => "#d94800")
      .pointRadius(0.4)
      .pointAltitude(0.025);

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
      .arcStroke(0.7)
      .arcAltitudeAutoScale(0.32);

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
            width: 5px;
            height: 5px;
            background-color: #d94800;
            border-radius: 50%;
            box-shadow: 0 0 6px #d94800;
          "></div>
          <span style="
            background: rgba(8, 8, 10, 0.92);
            color: #ffffff;
            padding: 2px 5px;
            border-radius: 2px;
            font-family: ui-monospace, monospace;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.5px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            white-space: nowrap;
          ">
            ${d.name}
          </span>
        `;
        return el;
      });

    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
    controls.enableZoom = false;

    // Focus on India
    globe.pointOfView({ lat: 20.5937, lng: 78.9629, altitude: 2.1 }, 0);

    const handleResize = () => {
      if (!globeContainer.current) return;
      globe
        .width(globeContainer.current.clientWidth)
        .height(globeContainer.current.clientHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (container) container.innerHTML = "";
      globeInstance.current = null;
    };
  }, [countriesData]);

  return (
    <div className="bg-[#050507] font-mono text-white cursor-none min-h-[150vh]">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Background Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,_var(--tw-gradient-stops))] from-blue-950/20 via-[#050507] to-[#050507]" />

        {/* Top Banner Ticker with Upward Moving Words */}
        <div className="relative z-20 border-b border-white/10 bg-black/60 px-8 py-1.5">
          <VerticalNewsTicker />
        </div>

        {/* Header Bar */}
        <header className="relative z-20 flex w-full items-center justify-between px-8 py-5 md:px-16">
          <div className="text-xl font-black tracking-tighter uppercase text-white">
            UNITEDCARRIERS
          </div>

          <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-300">
            <ScrambleText text="ABOUT" className="hover:text-orange-500" />
            <ScrambleText text="SERVICES" className="hover:text-orange-500" />
            <ScrambleText text="INDUSTRIES" className="hover:text-orange-500" />
            <ScrambleText text="INSIGHTS" className="hover:text-orange-500" />
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden text-[10px] font-semibold uppercase tracking-widest text-gray-400 lg:flex lg:gap-4">
              <ScrambleText text="CARBON CALCULATOR" className="hover:text-white" />
              <span>|</span>
              <ScrambleText text="LIVE TRACKING PORTAL" className="hover:text-white" />
            </div>

            <button className="rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-black">
              <ScrambleText text="WORK WITH US" />
            </button>
          </div>
        </header>

        {/* Main Layout - Content translates upward on scroll */}
        <div
          className="relative z-10 mx-auto flex min-h-[calc(100vh-100px)] w-full flex-col lg:flex-row transition-transform duration-300 ease-out"
          style={{ transform: `translateY(-${scrollY * 0.4}px)` }}
        >
          {/* Left Column Text */}
          <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-16">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-gray-400">
              One Operator
            </p>

            <h1 className="text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-[88px]">
              Every <br />
              Leg Of The <br />
              Journey
            </h1>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-gray-400 md:text-base">
              Freight forwarding, land transport, and customs brokerage, unified across APAC under one accountable team.
            </p>

            {/* ACTION BUTTONS: TALK WITH US & OUR SERVICES */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button className="rounded-full bg-white px-7 py-3 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-orange-500 hover:text-white">
                <ScrambleText text="TALK WITH US" />
              </button>

              <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20">
                <ScrambleText text="OUR SERVICES" />
                <span className="text-xs">→</span>
              </button>
            </div>
          </div>

          {/* Right Column Globe Viewport */}
          <div className="relative flex h-[600px] w-full items-center justify-center lg:h-auto lg:w-1/2">
            <div className="pointer-events-none absolute right-[8%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-600/20 blur-[110px] md:h-[650px] md:w-[650px]" />
            <div ref={globeContainer} className="h-full w-full" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;