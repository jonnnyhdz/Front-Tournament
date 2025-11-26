"use client";
import { motion } from "framer-motion";
import { medievalFont, bodyFont } from "../../fonts";

import {
  GiBlackHoleBolas,
  GiSpellBook,
  GiBreakingChain,
  GiWalkingBoot,
} from "react-icons/gi";

const events = [
  {
    icon: GiBlackHoleBolas,
    title: "Nacimiento del Vacío",
    desc: "Nulvór surge en la Nada absoluta, dando origen al Vacío Primordial.",
    date: "-9000 a.F.",
    color: "#c8a4ff",
  },
  {
    icon: GiSpellBook,
    title: "Creación de Étaria",
    desc: "Las Tres Diosas encierran a Nulvór y forjan un nuevo mundo.",
    date: "-8700 a.F.",
    color: "#ffd480",
  },
  {
    icon: GiBreakingChain,
    title: "La Fragmentación",
    desc: "El rey intenta controlar el Trisquel y provoca su quiebre.",
    date: "312 d.F.",
    color: "#ff9f9f",
  },
  {
    icon: GiWalkingBoot,
    title: "Destierro de Valenor",
    desc: "El heredero desafía al rey y es exiliado para siempre.",
    date: "320 d.F.",
    color: "#e8dcae",
  },
];

export default function GameLore() {
  return (
    <section
      id="game-lore"
      className="relative py-28 bg-[#090612] text-gray-100 overflow-hidden"
    >
      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12041f]/85 via-[#1a0a2e]/60 to-[#090612]/95" />

      {/* Halos */}
      <div className="absolute left-[-18%] top-[15%] w-[700px] h-[700px] rounded-full bg-purple-700/15 blur-[200px]" />
      <div className="absolute right-[-18%] bottom-[-5%] w-[900px] h-[900px] rounded-full bg-yellow-400/10 blur-[220px]" />

      {/* Partículas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(35)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-yellow-300/80 rounded-full shadow-[0_0_6px_rgba(255,230,160,0.7)]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6,
              animation: `sparkle 4s linear infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Contenido */}
      <div className="relative z-20 max-w-5xl mx-auto px-8">

        {/* Título */}
        <motion.h2
          className={`
            ${medievalFont.className}
            text-4xl md:text-5xl text-center text-[#e8dcae]
            mb-16 drop-shadow-[0_0_30px_rgba(232,220,174,0.5)]
          `}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Línea del Tiempo
        </motion.h2>

        {/* Línea central */}
        <div className="relative">
          <div
            className="
              absolute left-1/2 -translate-x-1/2 w-1 h-full
              bg-linear-to-b from-purple-300 to-purple-800
              rounded-full opacity-80 shadow-[0_0_20px_rgba(150,80,255,0.6)]
            "
          />

          {/* Eventos */}
          <div className="space-y-20 relative">
            {events.map((e, i) => {
              const Icon = e.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={`relative flex ${isLeft ? "justify-start" : "justify-end"}`}
                >

                  {/* Card */}
                  <div
                    className="
                      relative w-[300px] md:w-[330px]
                      p-6 rounded-3xl
                      bg-[#160a27]/70 backdrop-blur-md
                      border border-purple-400/20
                      shadow-[0_0_20px_rgba(120,60,200,0.3)]
                      clip-crystal-card
                    "
                  >
                    {/* Icon */}
                    <div className="flex flex-col items-center mb-5">
                      <div
                        className="
                          relative w-20 h-20 flex items-center justify-center
                          rounded-xl bg-[#1f0a33]/70 border border-purple-400/30
                          shadow-[0_0_20px_rgba(150,80,255,0.35)]
                        "
                      >
                        <div
                          className="absolute inset-0 blur-xl opacity-60"
                          style={{
                            background: `radial-gradient(circle, ${e.color}80 0%, transparent 70%)`,
                          }}
                        />
                        <Icon
                          className="text-4xl drop-shadow-[0_0_15px_currentColor]"
                          style={{ color: e.color }}
                        />
                      </div>

                      {/* Fecha */}
                      <span
                        className={`${bodyFont.className} mt-3 text-sm text-gray-300 italic`}
                      >
                        {e.date}
                      </span>
                    </div>

                    {/* Título */}
                    <h3
                      className={`${medievalFont.className} text-xl mb-2 text-center`}
                      style={{ color: e.color }}
                    >
                      {e.title}
                    </h3>

                    {/* Descripción */}
                    <p
                      className={`${bodyFont.className} text-gray-300 text-center text-sm leading-relaxed`}
                    >
                      {e.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Animación */}
      <style>
        {`
        @keyframes sparkle {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.4); opacity: 0.9; }
          100% { transform: scale(1); opacity: 0.2; }
        }

        .clip-crystal-card {
          clip-path: polygon(
            12% 0%, 88% 0%,
            100% 18%, 100% 82%,
            88% 100%, 12% 100%,
            0% 82%, 0% 18%
          );
        }
        `}
      </style>
    </section>
  );
}
