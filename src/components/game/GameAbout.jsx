"use client";
import { pixelFont, medievalFont, bodyFont } from "../../fonts";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const trisquelFrames = [
  "/img/fondo/trisquel.png",
  "/img/fondo/trisquel2.png",
  "/img/fondo/trisquel3.png",
  "/img/fondo/trisquel4.png",
  "/img/fondo/trisquel5.png",
  "/img/fondo/trisquel6.png",
];

export default function GameAbout() {
  const [index, setIndex] = useState(0);

  // Cambio suave entre las imágenes sin tocar el resto del componente
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % trisquelFrames.length);
    }, 2400); // duración entre cambios

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="game-about"
      className="relative py-32 bg-[#090612] text-gray-200 overflow-hidden"
    >
      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12041f]/80 via-[#1a0a2e]/60 to-[#090612]/90 opacity-95" />

      {/* Halos */}
      <div className="absolute left-[-15%] top-[20%] w-[900px] h-[900px] bg-purple-700/15 blur-[220px] rounded-full opacity-60" />
      <div className="absolute right-[-20%] bottom-[-10%] w-[1000px] h-[1000px] bg-yellow-400/10 blur-[200px] rounded-full opacity-70" />

      {/* Partículas que NO se reinician */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 bg-yellow-300/80 rounded-full shadow-[0_0_10px_rgba(255,220,150,0.8)]"
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

      {/* CONTENIDO */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-24 items-center">

        {/* TEXTO */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="select-none"
        >
          <h2
            className={`
              ${medievalFont.className}
              text-4xl md:text-5xl lg:text-6xl
              text-[#e8dcae]
              mb-10
              drop-shadow-[0_0_30px_rgba(232,220,174,0.6)]
              tracking-wide
            `}
          >
            El Origen de Étaria
          </h2>

          <p className={`${bodyFont.className} text-gray-300 leading-relaxed mb-6 text-lg`}>
            En el vacío eterno habitaba{" "}
            <span className="text-[#c8a4ff] font-semibold">Nulvór</span>,  
            devorador de mundos y enemigo primordial del equilibrio.
          </p>

          <p className={`${bodyFont.className} text-gray-300 leading-relaxed mb-6 text-lg`}>
            Tras una guerra celestial, las Tres Diosas sellaron su esencia y 
            forjaron Étaria, dejando como legado el{" "}
            <span className="text-[#e8dcae] font-semibold">Trisquel Dorado</span>.
          </p>

          <p className={`${bodyFont.className} text-gray-300 leading-relaxed text-lg`}>
            Ahora, fragmentado por la corrupción del rey, solo un heredero desterrado puede restaurar el equilibrio.
          </p>
        </motion.div>

        {/* ORBE MÁGICO — Trisquel con animación */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="relative flex justify-center"
        >
          <div
            className="
              relative w-[370px] h-[370px] md:w-[420px] md:h-[420px]
              rounded-full bg-gradient-to-br from-[#1f0a33]/70 to-[#0e071c]/70
              border border-[#c8a4ff]/20 shadow-[0_0_35px_rgba(110,60,180,0.3)]
              backdrop-blur-md overflow-hidden flex items-center justify-center
            "
          >
            {/* Glow interno */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-600/25 via-transparent to-yellow-300/20 blur-[40px]" />

            {/* === Fade entre las imágenes del trisquel === */}
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={trisquelFrames[index]}
                alt="Trisquel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="
                  w-[100%] h-[100%] object-contain
                  drop-shadow-[0_0_45px_rgba(255,230,150,0.65)]
                "
              />
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}