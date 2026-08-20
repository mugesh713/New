import { useEffect, useRef, useState } from "react";
import Globe from "globe.gl";

function GlobalMarkets() {
  const sectionRef = useRef(null);
  const globeContainer = useRef(null);
  const globeInstance = useRef(null);

  // Prevent country selection animation from
  // interfering with the initial India animation.
  const globeReadyRef = useRef(false);
  const initialAnimationTimer = useRef(null);

  const [activeCountry, setActiveCountry] =
    useState("India");

  /*
  ==========================================================
  COUNTRIES
  ==========================================================
  */

  const countries = [
    {
      name: "United Arab Emirates",
      shortName: "UAE",
      lat: 23.4241,
      lng: 53.8478,
    },
    {
      name: "United Kingdom",
      shortName: "UK",
      lat: 55.3781,
      lng: -3.436,
    },
    {
      name: "Germany",
      shortName: "Germany",
      lat: 51.1657,
      lng: 10.4515,
    },
    {
      name: "Singapore",
      shortName: "Singapore",
      lat: 1.3521,
      lng: 103.8198,
    },
    {
      name: "Australia",
      shortName: "Australia",
      lat: -25.2744,
      lng: 133.7751,
    },
    {
      name: "United States",
      shortName: "USA",
      lat: 37.0902,
      lng: -95.7129,
    },
    {
      name: "Canada",
      shortName: "Canada",
      lat: 56.1304,
      lng: -106.3468,
    },
  ];

  /*
  ==========================================================
  INDIA
  ==========================================================
  */

  const india = {
    name: "India",
    shortName: "India",
    lat: 20.5937,
    lng: 78.9629,
  };

  /*
  ==========================================================
  GET COUNTRY
  ==========================================================
  */

  const getCountry = (name) => {
    if (name === "India") {
      return india;
    }

    return countries.find(
      (country) =>
        country.name === name
    );
  };

  /*
  ==========================================================
  GLOBE INITIALIZATION
  ==========================================================
  */

  useEffect(() => {
    if (!globeContainer.current) return;

    const container =
      globeContainer.current;

    const globe = Globe()(container)
      .globeImageUrl(
        "https://unpkg.com/three-globe/example/img/earth-night.jpg"
      )
      .bumpImageUrl(
        "https://unpkg.com/three-globe/example/img/earth-topology.png"
      )
      .backgroundColor("#080808")
      .showAtmosphere(true)
      .atmosphereColor("#D4A62A")
      .atmosphereAltitude(0.12)
      .showGraticules(false);

    globeInstance.current = globe;

    /*
    ==========================================================
    POINTS
    ==========================================================
    */

    const allPoints = [
      india,
      ...countries,
    ];

    globe
      .pointsData(allPoints)
      .pointLat("lat")
      .pointLng("lng")
      .pointColor((point) => {
        if (
          point.name === activeCountry
        ) {
          return "#E6BE52";
        }

        if (point.name === "India") {
          return "#D4A62A";
        }

        return "#F5F1E8";
      })
      .pointRadius((point) => {
        if (
          point.name === activeCountry
        ) {
          return 0.7;
        }

        if (point.name === "India") {
          return 0.65;
        }

        return 0.28;
      })
      .pointAltitude((point) => {
        if (
          point.name === activeCountry ||
          point.name === "India"
        ) {
          return 0.045;
        }

        return 0.018;
      })
      .pointLabel((point) => {
        return `
          <div style="
            background:#080808;
            color:#F5F1E8;
            border:1px solid #D4A62A;
            padding:8px 13px;
            border-radius:999px;
            font-family:Arial,sans-serif;
            font-size:12px;
            font-weight:800;
            white-space:nowrap;
          ">
            ${point.name}
          </div>
        `;
      });

    /*
    ==========================================================
    COUNTRY LABELS
    ==========================================================
    */

    globe
      .labelsData(allPoints)
      .labelLat("lat")
      .labelLng("lng")
      .labelText(
        (point) =>
          point.shortName
      )
      .labelColor((point) => {
        if (
          point.name === activeCountry
        ) {
          return "#E6BE52";
        }

        if (point.name === "India") {
          return "#D4A62A";
        }

        return "#F5F1E8";
      })
      .labelSize((point) => {
        if (
          point.name === activeCountry ||
          point.name === "India"
        ) {
          return 1.5;
        }

        return 1;
      })
      .labelDotRadius((point) => {
        if (
          point.name === activeCountry ||
          point.name === "India"
        ) {
          return 0.5;
        }

        return 0.25;
      })
      .labelAltitude(0.055);

    /*
    ==========================================================
    EXPORT ROUTES
    ==========================================================
    */

    const routes =
      countries.map((country) => ({
        startLat: india.lat,
        startLng: india.lng,
        endLat: country.lat,
        endLng: country.lng,
        country: country.name,
      }));

    globe
      .arcsData(routes)
      .arcStartLat("startLat")
      .arcStartLng("startLng")
      .arcEndLat("endLat")
      .arcEndLng("endLng")
      .arcColor((route) => {
        if (
          route.country ===
          activeCountry
        ) {
          return "#E6BE52";
        }

        return "rgba(212,166,42,0.28)";
      })
      .arcDashLength(0.35)
      .arcDashGap(0.15)
      .arcDashAnimateTime(2200)
      .arcStroke((route) => {
        if (
          route.country ===
          activeCountry
        ) {
          return 1.5;
        }

        return 0.45;
      })
      .arcAltitudeAutoScale(0.5);

    /*
    ==========================================================
    CONTROLS
    ==========================================================
    */

    const controls =
      globe.controls();

    // IMPORTANT:
    // The earth does NOT continuously rotate.
    controls.autoRotate = false;

    // Allow zooming.
    controls.enableZoom = true;

    // Prevent sideways panning.
    controls.enablePan = false;

    /*
    ==========================================================
    INITIAL CAMERA
    ==========================================================

    First:
      Start with a wider view.

    Then:
      Zoom into India.

    ==========================================================
    */

    globe.pointOfView(
      {
        lat: india.lat,
        lng: india.lng,
        altitude: 2.8,
      },
      0
    );

    /*
    ----------------------------------------------------------
    FIRST CAMERA MOVE
    ----------------------------------------------------------

    Zoom toward India.
    */

    globe.pointOfView(
      {
        lat: india.lat,
        lng: india.lng,
        altitude: 0.95,
      },
      1800
    );

    /*
    ----------------------------------------------------------
    MARK GLOBE READY
    ----------------------------------------------------------

    We wait until the India intro animation
    finishes before allowing destination
    camera movements.
    */

    initialAnimationTimer.current =
      setTimeout(() => {
        globeReadyRef.current = true;

        /*
        If the user selected a destination
        during the intro animation, move
        there now.
        */

        const selected =
          getCountry(activeCountry);

        if (
          selected &&
          activeCountry !== "India"
        ) {
          globe.pointOfView(
            {
              lat: selected.lat,
              lng: selected.lng,
              altitude: 0.95,
            },
            1600
          );
        }
      }, 1900);

    /*
    ==========================================================
    RESPONSIVE SIZE
    ==========================================================
    */

    const resize = () => {
      if (!globeContainer.current) {
        return;
      }

      const width =
        globeContainer.current
          .clientWidth;

      const height =
        window.innerWidth < 768
          ? 520
          : 700;

      globe.width(width);
      globe.height(height);
    };

    resize();

    const resizeObserver =
      new ResizeObserver(resize);

    resizeObserver.observe(container);

    window.addEventListener(
      "resize",
      resize
    );

    /*
    ==========================================================
    CLEANUP
    ==========================================================
    */

    return () => {
      if (
        initialAnimationTimer.current
      ) {
        clearTimeout(
          initialAnimationTimer.current
        );
      }

      resizeObserver.disconnect();

      window.removeEventListener(
        "resize",
        resize
      );

      if (container) {
        container.innerHTML = "";
      }

      globeInstance.current = null;
      globeReadyRef.current = false;
    };
  }, []);

  /*
  ==========================================================
  ACTIVE COUNTRY
  ==========================================================

  Whenever the user selects a country:

  India
     ↓
  Germany
     ↓
  Singapore
     ↓
  USA

  the camera moves to that country.
  ==========================================================
  */

  useEffect(() => {
    const globe =
      globeInstance.current;

    if (!globe) return;

    const selectedCountry =
      getCountry(activeCountry);

    if (!selectedCountry) return;

    /*
    ========================================================
    UPDATE POINTS
    ========================================================
    */

    const allPoints = [
      india,
      ...countries,
    ];

    globe
      .pointsData(allPoints)
      .pointColor((point) => {
        if (
          point.name === activeCountry
        ) {
          return "#E6BE52";
        }

        if (point.name === "India") {
          return "#D4A62A";
        }

        return "#F5F1E8";
      })
      .pointRadius((point) => {
        if (
          point.name === activeCountry
        ) {
          return 0.7;
        }

        if (point.name === "India") {
          return 0.65;
        }

        return 0.28;
      });

    /*
    ========================================================
    UPDATE LABELS
    ========================================================
    */

    globe
      .labelsData(allPoints)
      .labelColor((point) => {
        if (
          point.name === activeCountry
        ) {
          return "#E6BE52";
        }

        if (point.name === "India") {
          return "#D4A62A";
        }

        return "#F5F1E8";
      })
      .labelSize((point) => {
        if (
          point.name === activeCountry ||
          point.name === "India"
        ) {
          return 1.5;
        }

        return 1;
      });

    /*
    ========================================================
    UPDATE ROUTES
    ========================================================
    */

    globe
      .arcsData(
        countries.map((country) => ({
          startLat: india.lat,
          startLng: india.lng,
          endLat: country.lat,
          endLng: country.lng,
          country: country.name,
        }))
      )
      .arcColor((route) => {
        if (
          route.country ===
          activeCountry
        ) {
          return "#E6BE52";
        }

        return "rgba(212,166,42,0.25)";
      })
      .arcStroke((route) => {
        if (
          route.country ===
          activeCountry
        ) {
          return 1.5;
        }

        return 0.45;
      });

    /*
    ========================================================
    CAMERA

    Do not move the camera during the
    initial India intro animation.

    ========================================================
    */

    if (!globeReadyRef.current) {
      return;
    }

    /*
    ========================================================
    INDIA

    If India is selected, zoom/focus on India.
    ========================================================
    */

    if (activeCountry === "India") {
      globe.pointOfView(
        {
          lat: india.lat,
          lng: india.lng,
          altitude: 0.95,
        },
        1600
      );

      return;
    }

    /*
    ========================================================
    SELECTED DESTINATION

    Move and zoom toward the selected country.
    ========================================================
    */

    globe.pointOfView(
      {
        lat: selectedCountry.lat,
        lng: selectedCountry.lng,
        altitude: 0.95,
      },
      1800
    );
  }, [activeCountry]);

  /*
  ==========================================================
  SCROLL REVEAL
  ==========================================================
  */

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const elements =
      section.querySelectorAll(
        ".markets-reveal, .markets-globe, .markets-country"
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (
              entry.isIntersecting
            ) {
              entry.target.classList.add(
                "markets-visible"
              );
            }
          });
        },
        {
          threshold: 0.08,
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
      id="markets"
      className="
        overflow-hidden
        bg-[#080808]
        px-6
        py-28
        text-[#F5F1E8]
        lg:px-10
        lg:py-40
      "
    >
      <div className="mx-auto max-w-[1400px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            markets-reveal
            grid
            gap-12
            lg:grid-cols-12
            lg:items-end
          "
        >
          <div className="lg:col-span-7">

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#D4A62A]
              "
            >
              Global Markets
            </p>

            <h2
              className="
                mt-6
                text-5xl
                font-medium
                leading-[0.92]
                tracking-[-0.05em]
                md:text-7xl
                lg:text-[92px]
              "
            >
              From India
              <br />

              <span className="text-[#F5F1E8]/25">
                to the world.
              </span>
            </h2>

          </div>

          <div className="lg:col-span-5">

            <p
              className="
                max-w-lg
                text-lg
                leading-8
                text-[#F5F1E8]/55
              "
            >
              Connecting Indian spice sourcing
              with international buyers and
              emerging global markets.
            </p>

          </div>
        </div>

        {/* =================================================
            GLOBE
        ================================================= */}

        <div
          className="
            markets-globe
            relative
            mt-20
            overflow-hidden
            rounded-[2rem]
            border
            border-white/10
            bg-[#080808]
          "
        >
          <div
            ref={globeContainer}
            className="
              h-[520px]
              w-full
              md:h-[700px]
            "
          />

          {/* INDIA / ORIGIN */}

          <div
            className="
              pointer-events-none
              absolute
              left-6
              top-6
              z-10
              md:left-10
              md:top-10
            "
          >
            <p
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-[#F5F1E8]/35
              "
            >
              Origin
            </p>

            <p
              className="
                mt-2
                text-2xl
                font-extrabold
                tracking-wide
                text-[#D4A62A]
              "
            >
              INDIA
            </p>
          </div>

          {/* SELECTED MARKET */}

          <div
            className="
              pointer-events-none
              absolute
              right-6
              top-6
              z-10
              text-right
              md:right-10
              md:top-10
            "
          >
            <p
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-[#F5F1E8]/35
              "
            >
              Selected Market
            </p>

            <p
              className="
                mt-2
                max-w-[280px]
                text-xl
                font-extrabold
                text-[#E6BE52]
                md:text-2xl
              "
            >
              {activeCountry === "India"
                ? "GLOBAL"
                : activeCountry.toUpperCase()}
            </p>
          </div>

          {/* ROUTE STATUS */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-6
              left-6
              z-10
              md:bottom-10
              md:left-10
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-2.5
                  w-2.5
                  animate-pulse
                  rounded-full
                  bg-[#D4A62A]
                  shadow-[0_0_18px_rgba(212,166,42,0.9)]
                "
              />

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-[#F5F1E8]/55
                "
              >
                India → Global Market
              </p>
            </div>
          </div>

          {/* CTA */}

          <div
            className="
              absolute
              bottom-6
              right-6
              z-10
              md:bottom-10
              md:right-10
            "
          >
            <a
              href="#quote"
              className="
                group
                flex
                items-center
                gap-4
                rounded-full
                bg-[#D4A62A]
                px-6
                py-4
                text-sm
                font-semibold
                text-black
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#E6BE52]
              "
            >
              Start a Conversation

              <span
                className="
                  text-lg
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </a>
          </div>
        </div>

        {/* =================================================
            COUNTRY SELECTOR
        ================================================= */}

        <div
          className="
            mt-8
            grid
            grid-cols-2
            gap-px
            overflow-hidden
            rounded-[2rem]
            bg-white/10
            md:grid-cols-4
          "
        >
          {countries.map(
            (country, index) => {
              const isActive =
                activeCountry ===
                country.name;

              return (
                <button
                  key={country.name}
                  type="button"
                  onMouseEnter={() =>
                    setActiveCountry(
                      country.name
                    )
                  }
                  onFocus={() =>
                    setActiveCountry(
                      country.name
                    )
                  }
                  onClick={() =>
                    setActiveCountry(
                      country.name
                    )
                  }
                  className={`
                    markets-country
                    group
                    p-6
                    text-left
                    md:p-8
                    ${
                      isActive
                        ? "bg-[#D4A62A] text-black"
                        : "bg-[#111111] text-[#F5F1E8]"
                    }
                  `}
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <span
                      className={`
                        text-xs
                        font-semibold
                        ${
                          isActive
                            ? "text-black/50"
                            : "text-[#D4A62A]"
                        }
                      `}
                    >
                      0{index + 1}
                    </span>

                    <span
                      className={`
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "border-black/30"
                            : "border-white/15"
                        }
                        group-hover:translate-x-1
                      `}
                    >
                      →
                    </span>
                  </div>

                  <p
                    className={`
                      mt-6
                      text-lg
                      md:text-xl
                      ${
                        isActive
                          ? "font-extrabold"
                          : "font-bold"
                      }
                    `}
                  >
                    {country.name}
                  </p>

                  <p
                    className={`
                      mt-2
                      text-xs
                      ${
                        isActive
                          ? "text-black/50"
                          : "text-[#F5F1E8]/30"
                      }
                    `}
                  >
                    Target Market
                  </p>
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* =====================================================
          ANIMATION CSS
      ===================================================== */}

      <style>{`

        .markets-reveal {
          opacity: 0;
          transform: translateY(60px);

          transition:
            opacity 1000ms
              cubic-bezier(0.22, 1, 0.36, 1),
            transform 1000ms
              cubic-bezier(0.22, 1, 0.36, 1);
        }

        .markets-reveal.markets-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .markets-globe {
          opacity: 0;
          transform:
            translateY(70px)
            scale(0.97);

          transition:
            opacity 1200ms
              cubic-bezier(0.22, 1, 0.36, 1),
            transform 1400ms
              cubic-bezier(0.22, 1, 0.36, 1);
        }

        .markets-globe.markets-visible {
          opacity: 1;
          transform:
            translateY(0)
            scale(1);
        }

        .markets-country {
          opacity: 0;
          transform: translateY(35px);

          transition:
            opacity 700ms ease,
            transform 700ms
              cubic-bezier(0.22, 1, 0.36, 1),
            background-color 400ms ease;
        }

        .markets-country.markets-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .markets-country:nth-child(1) {
          transition-delay: 100ms;
        }

        .markets-country:nth-child(2) {
          transition-delay: 180ms;
        }

        .markets-country:nth-child(3) {
          transition-delay: 260ms;
        }

        .markets-country:nth-child(4) {
          transition-delay: 340ms;
        }

        .markets-country:nth-child(5) {
          transition-delay: 420ms;
        }

        .markets-country:nth-child(6) {
          transition-delay: 500ms;
        }

        .markets-country:nth-child(7) {
          transition-delay: 580ms;
        }

        .markets-country:hover {
          transform: translateY(-5px);
        }

        @media (
          prefers-reduced-motion: reduce
        ) {
          .markets-reveal,
          .markets-globe,
          .markets-country {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

      `}</style>
    </section>
  );
}

export default GlobalMarkets;