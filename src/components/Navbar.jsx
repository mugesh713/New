import { useEffect, useState } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[#080808]/95 shadow-lg backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 transition-all duration-500 lg:px-10 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        {/* LOGO */}
       

       
        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-[#F5F1E8] transition-all duration-300 hover:border-[#D4A62A] hover:text-[#D4A62A] lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="text-lg">
            {menuOpen ? "×" : "☰"}
          </span>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`overflow-hidden transition-all duration-500 lg:hidden ${
          menuOpen
            ? "max-h-[600px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mb-4 rounded-[1.5rem] border border-white/10 bg-[#111111] p-6 shadow-2xl">
          <div className="flex flex-col">
            <a
              href="#about"
              onClick={closeMenu}
              className="mobile-link"
            >
              About
            </a>

            <a
              href="#products"
              onClick={closeMenu}
              className="mobile-link"
            >
              Products
            </a>

            <a
              href="#quality"
              onClick={closeMenu}
              className="mobile-link"
            >
              Quality
            </a>

            <a
              href="#markets"
              onClick={closeMenu}
              className="mobile-link"
            >
              Markets
            </a>

            <a
              href="#process"
              onClick={closeMenu}
              className="mobile-link"
            >
              Export Process
            </a>

            <a
              href="#why-us"
              onClick={closeMenu}
              className="mobile-link"
            >
              Why Us
            </a>

            <a
              href="#bulk"
              onClick={closeMenu}
              className="mobile-link"
            >
              Bulk Supply
            </a>

            <a
              href="#contact"
              onClick={closeMenu}
              className="mobile-link"
            >
              Contact
            </a>

            <a
              href="#quote"
              onClick={closeMenu}
              className="mt-4 rounded-full bg-[#D4A62A] px-6 py-4 text-center text-sm font-medium text-black transition hover:bg-[#E6BE52]"
            >
              Get a Quote →
            </a>
          </div>
        </div>
      </div>

      {/* NAVBAR ANIMATION CSS */}
      <style>{`
        .nav-logo {
          animation: navLogoIn 0.8s 0.15s
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes navLogoIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .nav-link {
          position: relative;
          color: #f5f1e8;
          font-size: 0.875rem;
          font-weight: 500;
          transition:
            color 300ms ease,
            opacity 300ms ease;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -7px;
          height: 2px;
          width: 0;
          background: #d4a62a;
          transition: width 300ms ease;
        }

        .nav-link:hover {
          color: #d4a62a;
          opacity: 1;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .mobile-link {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 16px 0;
          color: #f5f1e8;
          font-size: 1rem;
          font-weight: 500;
          transition:
            padding-left 300ms ease,
            color 300ms ease;
        }

        .mobile-link:hover {
          padding-left: 8px;
          color: #d4a62a;
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-logo {
            animation: none;
          }

          .nav-link,
          .mobile-link {
            transition: none;
          }
        }
      `}</style>
    </header>
  );
}

export default Navbar;