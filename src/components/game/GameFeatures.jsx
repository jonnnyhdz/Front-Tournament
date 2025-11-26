"use client";
import { motion } from "framer-motion";
import { GiOpenBook, GiBattleGear, GiMagicSwirl } from "react-icons/gi";
import { pixelFont, medievalFont, bodyFont } from "../../fonts";

const features = [
  {
    title: "Fragmentos del Trisquel",
    desc: "Reliquias que contienen ecos del poder primordial. Su brillo guía al heredero.",
    icon: GiMagicSwirl,
    color: "#c8a4ff",
    glow: "rgba(200,164,255,0.55)",
  },
  {
    title: "Criaturas Corrompidas",
    desc: "Seres alterados por la sombra del rey. Deformados, furiosos… irreconocibles.",
    icon: GiBattleGear,
    color: "#ff8a8a",
    glow: "rgba(255,120,120,0.45)",
  },
  {
    title: "Historia Mítica",
    desc: "Crónicas antiguas escritas por las Tres Diosas. Revelan el destino de Étaria.",
    icon: GiOpenBook,
    color: "#ffd27f",
    glow: "rgba(255,210,127,0.55)",
  },
];

export default function GameFeatures() {
  return (
    <section
      id="game-features"
      className="relative py-32 bg-[#090612] text-gray-200 overflow-hidden"
    >
      {/* === FONDO PRINCIPAL (igual estilo que GameAbout) === */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12041f]/85 via-[#1a0a2e]/55 to-[#090612]/90 opacity-95" />

      {/* Halos épicos */}
      <div className="absolute left-[-15%] top-[15%] w-[850px] h-[850px] bg-purple-700/15 blur-[230px] rounded-full opacity-60" />
      <div className="absolute right-[-20%] bottom-[-5%] w-[950px] h-[950px] bg-yellow-400/10 blur-[240px] rounded-full opacity-70" />

      {/* Partículas brillantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full shadow-[0_0_8px_rgba(255,220,150,0.7)]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8,
              animation: `sparkle ${3 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* === CONTENIDO === */}
      <div className="relative z-20 max-w-6xl mx-auto px-8 text-center">

        {/* TÍTULO */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`
            ${medievalFont.className}
            text-4xl md:text-5xl lg:text-6xl
            text-[#e8dcae]
            mb-20
            drop-shadow-[0_0_35px_rgba(232,220,174,0.6)]
          `}
        >
          Elementos del Reino
        </motion.h2>

        {/* GRID DE ELEMENTOS */}
        <div className="grid md:grid-cols-3 gap-20 mt-10">
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: i * 0.15 }}
                className="relative flex flex-col items-center select-none"
              >
                {/* CÍRCULO MÁGICO */}
                <div
                  className="
                    relative w-[240px] h-[240px] rounded-full
                    bg-gradient-to-br from-[#1f0a33]/70 to-[#0e071c]/70
                    border border-[#c8a4ff]/20
                    shadow-[0_0_35px_rgba(110,60,180,0.25)]
                    backdrop-blur-md flex items-center justify-center
                    overflow-hidden
                  "
                >
                  {/* GLOW INTERNO */}
                  <div
                    className="absolute inset-0 blur-[45px]"
                    style={{
                      background: `radial-gradient(circle, ${f.glow} 0%, transparent 70%)`,
                    }}
                  />

                  {/* ICONO PRINCIPAL */}
                  <motion.div
                    animate={{ scale: [1, 1.07, 1] }}
                    transition={{ repeat: Infinity, duration: 2.4 }}
                  >
                    <Icon
                      className="text-6xl drop-shadow-[0_0_20px_currentColor]"
                      style={{ color: f.color }}
                    />
                  </motion.div>
                </div>

                {/* TEXTO */}
                <h3
                  className={`${medievalFont.className} text-2xl mt-8 mb-2`}
                  style={{ color: f.color }}
                >
                  {f.title}
                </h3>

                <p className={`${bodyFont.className} text-gray-300 text-sm max-w-xs leading-relaxed`}>
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* === ANIMACIONES EXTRAS === */}
      <style>
        {`
        @keyframes sparkle {
          0% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
          100% { opacity: 0.4; transform: scale(1); }
        }
        `}
      </style>
    </section>
  );
}
