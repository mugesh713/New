// Preloader.jsx
import React, { useState, useEffect } from "react";

const LEFT_LIST = [
  "AUSTRALIA",
  "NEW ZEALAND",
  "HONG KONG",
  "CHINA",
  "VIETNAM",
  "UNITED STATES",
  "THAILAND",
  "GERMANY",
  "UNITED KINGDOM",
  "JAPAN",
];

const RIGHT_LIST = [
  "AIR FREIGHT",
  "OCEAN FREIGHT",
  "CUSTOMS BROKERAGE",
  "WAREHOUSING & 3PL",
  "PROJECT CARGO",
  "DOMESTIC & LINEHAUL TRANSPORT",
];

const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [spinnerIdx, setSpinnerIdx] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 4) + 1;
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const spinnerInterval = setInterval(() => {
      setSpinnerIdx((prev) => (prev + 1) % SPINNER_FRAMES.length);
    }, 80);
    return () => clearInterval(spinnerInterval);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-between bg-black px-6 md:px-16 font-mono text-[10px] tracking-[0.2em] text-gray-500 select-none transition-opacity duration-700 ${
        isDone ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <style>{`
        @keyframes marquee-vertical {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marquee-vertical-reverse {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-marquee-vertical {
          animation: marquee-vertical 14s linear infinite;
        }
        .animate-marquee-vertical-reverse {
          animation: marquee-vertical-reverse 14s linear infinite;
        }
        @keyframes node-pulse {
          0%, 100% { opacity: 1;   r: 3.2; filter: drop-shadow(0 0 2px #0055ff) drop-shadow(0 0 6px #0055ff); }
          50%      { opacity: 0.45; r: 4.2; filter: drop-shadow(0 0 6px #0055ff) drop-shadow(0 0 14px #0055ff); }
        }
        .hub-node {
          animation: node-pulse 2.2s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .hub-node:nth-child(2) { animation-delay: 0.4s; }
        .hub-node:nth-child(3) { animation-delay: 0.9s; }
        .hub-node:nth-child(4) { animation-delay: 1.3s; }
      `}</style>

      {/* LEFT SIDE: BRANDING & SCROLLING LOCATIONS */}
      <div className="relative z-20 flex flex-col items-start space-y-8 md:space-y-12 w-36 md:w-64">
        <div className="font-extrabold uppercase text-white text-xs tracking-[0.25em]">
          LOGO
        </div>

        <div className="relative h-28 md:h-36 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black to-transparent z-10" />
          <div className="animate-marquee-vertical flex flex-col gap-2 font-semibold">
            {LEFT_LIST.concat(LEFT_LIST).map((item, idx) => (
              <div key={idx} className="whitespace-nowrap transition-colors hover:text-white">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CENTER: DOTTED WORLD MAP WITH HUB NODES */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 md:opacity-100">
        <div className="relative w-[85%] md:w-[58%] max-w-[850px] aspect-[2.1/1]">
          <svg viewBox="0 0 1000 480" className="w-full h-full">
            <defs>
              <pattern id="dot-matrix" x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
                <circle cx="1.4" cy="1.4" r="1.1" className="fill-[#3a3a44]" />
              </pattern>

              <mask id="continent-mask">
                <rect width="1000" height="480" fill="black" />
                <g fill="white">
                  <path d="M 90 70 C 150 40 230 45 270 70 C 300 88 300 100 330 110 C 360 120 355 150 320 160 C 335 180 320 205 290 205 C 300 230 270 250 245 235 C 230 260 195 255 190 230 C 160 235 140 210 155 185 C 120 180 110 150 130 130 C 105 120 95 95 90 70 Z" />
                  <path d="M 270 235 C 300 230 325 245 330 275 C 345 300 340 330 320 345 C 330 370 310 400 290 405 C 285 425 260 430 250 410 C 230 400 235 365 245 340 C 235 310 245 280 260 260 C 260 250 262 240 270 235 Z" />
                  <path d="M 460 65 C 490 55 520 60 540 75 C 560 70 575 85 570 100 C 590 105 590 125 570 135 C 575 150 555 165 535 155 C 520 170 495 165 490 145 C 470 150 450 135 455 115 C 435 110 440 85 460 65 Z" />
                  <path d="M 470 165 C 510 155 550 165 565 195 C 585 210 585 240 570 260 C 580 285 565 315 545 320 C 545 345 525 365 505 355 C 495 375 470 370 465 345 C 445 340 440 310 450 290 C 435 265 440 235 460 220 C 450 195 455 175 470 165 Z" />
                  <path d="M 580 55 C 650 35 730 40 790 60 C 830 55 860 75 855 100 C 880 105 885 130 865 145 C 875 165 855 185 830 180 C 830 205 800 220 775 205 C 760 225 730 220 720 200 C 690 210 665 195 665 170 C 635 175 610 160 610 135 C 585 130 570 100 580 80 C 570 70 572 60 580 55 Z" />
                  <path d="M 650 210 C 680 205 710 215 720 235 C 700 245 670 245 655 235 C 640 240 625 235 625 222 C 630 212 640 208 650 210 Z" />
                  <path d="M 720 300 C 760 290 810 295 835 315 C 855 320 855 345 835 355 C 840 375 815 390 790 380 C 770 395 740 385 735 365 C 715 360 705 335 715 315 C 710 308 712 302 720 300 Z" />
                </g>
              </mask>
            </defs>

            <rect width="1000" height="480" fill="url(#dot-matrix)" mask="url(#continent-mask)" />

            <circle cx="410" cy="210" r="2" className="fill-gray-500" />
            <circle cx="480" cy="140" r="2" className="fill-gray-500" />
            <circle cx="500" cy="220" r="2" className="fill-gray-500" />
            <circle cx="525" cy="190" r="2" className="fill-gray-500" />
            <circle cx="570" cy="245" r="2" className="fill-gray-500" />
            <circle cx="610" cy="210" r="2" className="fill-gray-500" />

            <g>
              <circle cx="590" cy="265" r="3.2" className="fill-[#0055ff] hub-node" />
              <circle cx="590" cy="285" r="3.2" className="fill-[#0055ff] hub-node" />
              <circle cx="628" cy="360" r="3.2" className="fill-[#0055ff] hub-node" />
              <circle cx="660" cy="360" r="3.2" className="fill-[#0055ff] hub-node" />
            </g>
          </svg>
        </div>
      </div>

      {/* RIGHT SIDE: COUNTER & SERVICES TICKER */}
      <div className="relative z-20 flex flex-col items-end space-y-8 md:space-y-12 w-36 md:w-64 text-right">
        <div className="flex items-center space-x-2 font-mono text-xs font-bold text-white">
          <span>{Math.min(progress, 100)}%</span>
          <span className="text-gray-400 text-sm">{SPINNER_FRAMES[spinnerIdx]}</span>
        </div>

        <div className="relative h-28 md:h-36 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black to-transparent z-10" />
          <div className="animate-marquee-vertical-reverse flex flex-col gap-2 font-semibold">
            {RIGHT_LIST.concat(RIGHT_LIST).map((item, idx) => (
              <div key={idx} className="whitespace-nowrap transition-colors hover:text-white">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preloader;