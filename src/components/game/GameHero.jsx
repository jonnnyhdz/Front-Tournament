"use client";
import { motion } from "framer-motion";
import { pixelFont, medievalFont, bodyFont } from "../../fonts";

export default function GameHero() {
  return (
    <section
      id="game-hero"
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden bg-[#090612]"
    >
      {/* === FONDO PRINCIPAL (Tu nueva imagen, clara y protagonista) === */}
      <img
        src="/img/fondo/bg.png"
        alt="Etaria Background"
        className="
          absolute inset-0 w-full h-full object-cover
          opacity-80
          z-0
        "
      />

      {/* === VIGNETTE OSCURA PARA DAR PROFUNDIDAD === */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-b from-black/70 via-black/30 to-[#090612]/40
          z-0
        "
      />

      {/* === LUZ DEL TRISQUEL DORADA (Ambient Light) === */}
      <div
        className="
          absolute top-[15%] left-1/2 -translate-x-1/2
          w-[900px] h-[900px]
          bg-yellow-400/15
          blur-[150px]
          rounded-full
          opacity-90
          pointer-events-none
        "
      />

      {/* === HALO MÍSTICO MORADO (Atmosphere) === */}
      <div
        className="
          absolute bottom-[-20%] right-[-10%]
          w-[1100px] h-[1100px]
          bg-purple-700/20
          blur-[300px]
          rounded-full
          pointer-events-none
        "
      />

      {/* === PARTÍCULAS ÉPICAS (Muy suaves) === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 bg-yellow-300/90 rounded-full shadow-[0_0_12px_rgba(255,223,120,0.8)]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8,
              animation: `sparkle ${4 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* === CONTENIDO CENTRADO === */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center select-none">

        {/* TÍTULO PRINCIPAL */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`
            ${pixelFont.className}
            text-[3.6rem] md:text-[5rem] lg:text-[6rem]
            font-bold
            tracking-[0.18em]
            text-[#f3e9c5]
            drop-shadow-[0_0_30px_rgba(243,233,197,0.8)]
          `}
        >
          ETARIA
        </motion.h1>

        {/* SUBTÍTULO ÉPICO */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 1 }}
          className={`
            ${medievalFont.className}
            text-2xl md:text-3xl lg:text-4xl
            italic mt-4
            text-[#d9c2ff]
            drop-shadow-[0_0_20px_rgba(160,120,255,0.6)]
          `}
        >
          La Sombra del Trisquel
        </motion.h2>

        {/* DESCRIPCIÓN */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className={`
            ${bodyFont.className}
            text-gray-300 mt-6 text-lg md:text-xl
            leading-relaxed max-w-2xl mx-auto
          `}
        >
          Un reino al borde del colapso.  
          Un artefacto sagrado fracturado.  
          Y un poder ancestral que intenta despertar bajo la tormenta púrpura.
        </motion.p>

        {/* BOTÓN CENTRAL — VERSION GOLD PURPLE */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1 }}
          className="flex justify-center mt-10"
        >
          <a
            href="#game-about"
            className={`
              ${bodyFont.className}
              bg-gradient-to-r from-purple-600 to-purple-500
              hover:from-purple-700 hover:to-purple-600
              px-10 py-4 rounded-xl font-bold text-lg
              shadow-[0_0_30px_rgba(155,85,255,0.8)]
              hover:shadow-[0_0_45px_rgba(170,100,255,1)]
              transition-all duration-300
            `}
          >
            Comenzar la Aventura
          </a>
        </motion.div>

      </div>
    </section>
  );
}
