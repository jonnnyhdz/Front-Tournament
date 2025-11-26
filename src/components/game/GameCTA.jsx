"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { medievalFont, bodyFont } from "../../fonts";

export default function GameCTA() {
  const [phase, setPhase] = useState("banner"); 
  // phases: "banner" | "trailer" | "end"

  // Handler cuando termina el video
  const handleVideoEnd = () => {
    setPhase("end");
  };

  return (
    <section
      id="game-cta"
      className="relative py-32 text-center text-gray-200 overflow-hidden bg-[#090612]"
    >
      {/* === FONDO IDENTICO A GameAbout === */}
      <div className="absolute inset-0 bg-gradient-to-b 
        from-[#12041f]/80 
        via-[#1a0a2e]/60 
        to-[#090612]/90 
        opacity-95" 
      />

      {/* Halos */}
      <div className="absolute left-[-15%] top-[20%] w-[900px] h-[900px] 
        bg-purple-700/15 blur-[220px] rounded-full opacity-60" />
      <div className="absolute right-[-20%] bottom-[-10%] w-[1000px] h-[1000px] 
        bg-yellow-400/10 blur-[200px] rounded-full opacity-70" />

      {/* Partículas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 bg-yellow-300/80 rounded-full 
            shadow-[0_0_10px_rgba(255,220,150,0.8)]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8,
              animation: `sparkle ${3 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* === CONTENIDO === */}
      <div className="relative z-20 max-w-5xl mx-auto px-6">

        {/* TITULO */}
        <motion.h2
          className={`
            ${medievalFont.className}
            text-4xl md:text-5xl lg:text-6xl
            text-[#e8dcae]
            mb-8
            drop-shadow-[0_0_30px_rgba(232,220,174,0.6)]
          `}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          El viaje apenas comienza…
        </motion.h2>

        {/* SUBTÍTULO */}
        {phase !== "end" && (
          <motion.p
            className={`${bodyFont.className} text-gray-300 max-w-2xl mx-auto mb-16 text-lg leading-relaxed`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            Descubre un adelanto exclusivo del conflicto que definirá el destino de Étaria.
          </motion.p>
        )}

        {/* === BODY === */}
        <div className="relative w-full max-w-4xl mx-auto">
          <AnimatePresence mode="wait">

            {/* ⭐ PHASE 1 — BANNER INICIAL ⭐ */}
            {phase === "banner" && (
              <motion.div
                key="banner"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.7 }}
                className="
                  relative rounded-2xl overflow-hidden
                  border border-purple-400/25
                  shadow-[0_0_35px_rgba(168,85,247,0.4)]
                  backdrop-blur-md
                "
              >
                <img
                  src="/img/fondo/bannerTrailer.jpg"
                  className="w-full h-[280px] md:h-[360px] object-cover opacity-85"
                />

                <div className="absolute inset-0 bg-black/45" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <h3
                    className={`
                      ${medievalFont.className}
                      text-3xl md:text-4xl text-[#e8dcae]
                      drop-shadow-[0_0_25px_rgba(232,220,174,0.5)]
                    `}
                  >
                    El Despertar del Trisquel
                  </h3>

                  <button
                    onClick={() => setPhase("trailer")}
                    className="
                      mt-8 px-8 py-3 rounded-lg font-bold text-white
                      bg-purple-600 hover:bg-purple-700
                      shadow-[0_0_30px_rgba(168,85,247,0.6)]
                      transition-all
                    "
                  >
                    Ver Trailer
                  </button>
                </div>
              </motion.div>
            )}

            {/* ⭐ PHASE 2 — TRAILER ⭐ */}
            {phase === "trailer" && (
              <motion.div
                key="trailer"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7 }}
                className="
                  relative rounded-2xl overflow-hidden
                  border border-purple-400/30
                  shadow-[0_0_45px_rgba(168,85,247,0.55)]
                "
              >
                <iframe
                  className="w-full h-[280px] md:h-[360px]"
                  src="https://www.youtube.com/embed/3rgwIp6D3ow?autoplay=1&enablejsapi=1"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  onEnded={handleVideoEnd}
                />

                <button
                  onClick={() => setPhase("end")}
                  className="
                    absolute top-4 right-4 px-4 py-2 rounded-md
                    bg-black/60 hover:bg-black/80 
                    text-white text-sm font-semibold
                    border border-purple-400/30
                    shadow-[0_0_18px_rgba(168,85,247,0.5)]
                    transition
                  "
                >
                  Cerrar
                </button>
              </motion.div>
            )}

            {/* ⭐ PHASE 3 — FINAL: GALERIA + REPLAY ⭐ */}
            {phase === "end" && (
              <motion.div
                key="end"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center space-y-10"
              >
                <h3
                  className={`
                    ${medievalFont.className}
                    text-3xl text-[#e8dcae]
                    drop-shadow-[0_0_25px_rgba(232,220,174,0.5)]
                  `}
                >
                  ¿Listo para ver más del mundo de Étaria?
                </h3>

                <p
                  className={`${bodyFont.className} text-gray-300 max-w-xl mx-auto`}
                >
                  Explora la galería oficial y descubre nuevas regiones, criaturas
                  y fragmentos del Trisquel.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <a
                    href="#game-gallery"
                    className="px-8 py-3 font-bold rounded-lg bg-purple-600 
                    hover:bg-purple-700 text-white shadow-[0_0_25px_rgba(168,85,247,0.55)]
                    transition"
                  >
                    Ver Galería
                  </a>

                  <button
                    onClick={() => setPhase("trailer")}
                    className="px-8 py-3 font-bold rounded-lg border border-purple-400/40 
                    bg-black/40 hover:bg-black/60 text-purple-300
                    shadow-[0_0_20px_rgba(168,85,247,0.3)] transition"
                  >
                    Ver Trailer Nuevamente
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Partículas */}
      <style>
        {`
        @keyframes sparkle {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.4); opacity: 1; }
          100% { transform: scale(1); opacity: 0.3; }
        }
        `}
      </style>
    </section>
  );
}
