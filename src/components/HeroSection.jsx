"use client";
import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";

const handleScrollToTournaments = () => {
  const section = document.getElementById("tournaments");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

export default function HeroSection() {
  return (
    <section className="relative bg-[#07050c] text-white overflow-hidden py-28 px-6 md:px-20">
      <div className="absolute inset-0 bg-linear-to-br from-[#0a0015] via-[#100322] to-[#220a45] opacity-95"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-r from-[#07050cee] via-[#07050c88] to-transparent z-10"></div>

        <img
          src="https://gingerspice417.wordpress.com/wp-content/uploads/2018/03/headeresports03.gif"
          alt="Fondo animado eSports"
          className="absolute right-0 top-0 w-full h-full object-cover opacity-80 mix-blend-screen scale-105 brightness-[1.2] contrast-[1.05]"
        />
      </div>

      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/30 blur-[200px] rounded-full opacity-80"></div>

      <div className="relative z-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
          >
            Compite. <span className="text-purple-500">Gana.</span>
            <span className="block">Demuestra tu nivel.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-6 text-gray-300 text-lg max-w-md mx-auto md:mx-0"
          >
            Participa en los torneos más grandes de la temporada. Vive la
            experiencia competitiva definitiva junto a los mejores jugadores del
            mundo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <button
              onClick={handleScrollToTournaments}
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 transition-all px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]"
            >
              <FaTrophy className="inline mr-2" />
              Unirme al Torneo
            </button>
            {/* <button className="border border-gray-500 hover:border-purple-500 hover:text-purple-400 transition-all px-8 py-3 rounded-lg font-semibold">
              Ver Competencias
            </button> */}
          </motion.div>
        </div>
      </div>

      <div className="absolute right-0 top-0 w-[40%] h-full bg-linear-to-l from-[#9b4dff1a] via-[#9b4dff09] to-transparent pointer-events-none"></div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#0b0014] to-transparent"></div>
    </section>
  );
}
