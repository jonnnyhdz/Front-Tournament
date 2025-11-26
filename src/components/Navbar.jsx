"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ unlockSections = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScroll = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`
          fixed top-0 w-full z-50 px-6
          transition-all duration-500
          ${
            scrolled
              ? "backdrop-blur-xl bg-[#07040d]/70 border-b border-purple-500/20"
              : "bg-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto py-5 flex justify-between items-center">

          {/* ==== LOGO ==== */}
          <motion.h1
            initial={{ letterSpacing: "-2px" }}
            animate={{ letterSpacing: "0px" }}
            transition={{ duration: 1 }}
            className="text-3xl font-bold text-white tracking-wider select-none"
          >
            <span className="text-purple-400">DARK</span> COMPANY
          </motion.h1>

          {/* ==== DESKTOP MENU ==== */}
          <div className="hidden md:flex items-center space-x-10 text-gray-300 text-sm font-medium">

            <button
              onClick={() => smoothScroll("game-about")}
              className="nav-link"
            >
              Historia
            </button>

            <button
              onClick={() => smoothScroll("game-features")}
              className="nav-link"
            >
              Características
            </button>

            <button
              onClick={() => smoothScroll("game-lore")}
              className="nav-link"
            >
              Lore
            </button>

            <button
              onClick={() => smoothScroll("game-gallery")}
              className="nav-link"
            >
              Galería
            </button>

            <button
              onClick={() => smoothScroll("game-cta")}
              className="nav-link"
            >
              Trailer
            </button>

            {unlockSections && (
              <>
                <button
                  onClick={() => smoothScroll("tournaments")}
                  className="nav-link"
                >
                  Torneos
                </button>

                <button
                  onClick={() => smoothScroll("faq")}
                  className="nav-link"
                >
                  Preguntas
                </button>
              </>
            )}
          </div>

          {/* ==== MOBILE BTN ==== */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-2xl text-purple-400"
          >
            <FaBars />
          </button>
        </div>
      </motion.nav>

      {/* ==== MOBILE SIDEBAR ==== */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              className="
                fixed right-0 top-0 h-full w-64
                bg-gradient-to-b from-[#140920] via-[#0a0412] to-[#08020c]
                shadow-lg z-50 p-6 flex flex-col gap-8 text-gray-300
              "
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-purple-400">
                  Navegación
                </h2>
                <button
                  className="text-xl text-purple-400"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaTimes />
                </button>
              </div>

              {/* Lista */}
              <MobileItem smoothScroll={smoothScroll} id="game-about" label="Historia" />
              <MobileItem smoothScroll={smoothScroll} id="game-features" label="Características" />
              <MobileItem smoothScroll={smoothScroll} id="game-lore" label="Lore" />
              <MobileItem smoothScroll={smoothScroll} id="game-gallery" label="Galería" />
              <MobileItem smoothScroll={smoothScroll} id="game-cta" label="Trailer" />

              {unlockSections && (
                <>
                  <MobileItem smoothScroll={smoothScroll} id="tournaments" label="Torneos" />
                  <MobileItem smoothScroll={smoothScroll} id="faq" label="Preguntas" />
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ==== STYLES ==== */}
      <style>
        {`
          .nav-link {
            position: relative;
            padding-bottom: 4px;
            transition: all 0.3s ease;
          }

          .nav-link:hover {
            color: #c084fc;
          }

          .nav-link::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            width: 0%;
            background: linear-gradient(to right, #c084fc, #8b5cf6);
            transition: width 0.3s ease;
            border-radius: 2px;
          }

          .nav-link:hover::after {
            width: 100%;
          }
        `}
      </style>
    </>
  );
}

function MobileItem({ smoothScroll, id, label }) {
  return (
    <button
      onClick={() => smoothScroll(id)}
      className="text-lg py-2 border-b border-white/10 hover:text-purple-300 transition"
    >
      {label}
    </button>
  );
}
