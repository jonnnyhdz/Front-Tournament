"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaTrophy, FaQuestionCircle } from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-lg bg-[#0b0014]/70 border-b border-purple-500/20 shadow-[0_2px_15px_rgba(147,51,234,0.15)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
          {/* LOGO */}
          <h1 className="text-2xl font-extrabold tracking-wide">
            <span className="text-purple-500">Tournament</span>{" "}
            <span className="hidden sm:inline text-gray-200">Arena</span>
          </h1>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center space-x-8 font-medium">
            <a
              href="#tournaments"
              className="flex items-center gap-2 hover:text-purple-400 transition-colors duration-300"
            >
              <FaTrophy className="text-purple-400" />
              Torneos
            </a>
            <a
              href="#faq"
              className="flex items-center gap-2 hover:text-purple-400 transition-colors duration-300"
            >
              <FaQuestionCircle className="text-purple-400" />
              Preguntas
            </a>
          </div>

          {/* BOTÓN HAMBURGUESA (MÓVIL) */}
          <button
            className="md:hidden text-2xl text-purple-400 focus:outline-none"
            onClick={() => setMenuOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </motion.nav>

      {/* SIDEBAR MÓVIL */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* FONDO OSCURO */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* PANEL DESLIZANTE */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="fixed right-0 top-0 h-full w-64 bg-gradient-to-b from-[#120022] via-[#0b0014] to-[#0a0013] shadow-2xl z-50 flex flex-col justify-between"
            >
              <div className="p-6 flex flex-col gap-8 mt-10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-purple-400 tracking-wide">
                    Menu
                  </h2>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-400 hover:text-purple-400 transition"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                <a
                  href="#tournaments"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-gray-300 hover:text-purple-400 text-lg transition"
                >
                  <FaTrophy className="text-purple-400" />
                  Torneos
                </a>

                <a
                  href="#faq"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-gray-300 hover:text-purple-400 text-lg transition"
                >
                  <FaQuestionCircle className="text-purple-400" />
                  Preguntas
                </a>
              </div>

              {/* PIE DEL SIDEBAR */}
              <div className="p-6 border-t border-purple-500/20 text-gray-500 text-sm text-center">
                © {new Date().getFullYear()} Tournament Arena
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
