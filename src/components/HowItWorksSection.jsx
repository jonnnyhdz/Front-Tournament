"use client";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Explora los torneos",
    desc: "Encuentra los próximos eventos y elige dónde competir. Información clara y actualizada en todo momento.",
  },
  {
    title: "Regístrate fácilmente",
    desc: "Únete con un clic. Sin procesos largos ni fricción. Solo tú y tu pasión por ganar.",
  },
  {
    title: "Compite y asciende",
    desc: "Mide tu nivel frente a otros jugadores y escala en el ranking en tiempo real.",
  },
  {
    title: "Sigue el bracket",
    desc: "Visualiza el progreso del torneo y analiza tus enfrentamientos en vivo.",
  },
];

export default function HowItWorksMinimal() {
  return (
    <section className="relative bg-[#0b0014] text-gray-100 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-[#0b0014] via-[#0c001a] to-[#0b0014]" />
      <div className="absolute left-1/2 top-0 h-[70%] mt-56 w-[2px] bg-linear-to-b from-purple-500/60 via-purple-400/40 to-purple-700/10 -translate-x-1/2" />

      <div className="absolute left-1/2 top-1/3 w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full -translate-x-1/2" />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-4xl md:text-5xl font-extrabold text-white mb-24"
        >
          El Camino del <span className="text-purple-500">Jugador</span>
        </motion.h2>

        <div className="relative space-y-16">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`relative flex items-center justify-between w-full ${
                i % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div
                className={`w-[43%] ${
                  i % 2 === 0
                    ? "text-right pr-10 md:pr-12"
                    : "text-left pl-10 md:pl-12"
                }`}
              >
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-base">
                  {step.desc}
                </p>
              </div>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <motion.div
                  className="absolute w-16 h-16 bg-purple-600/20 blur-3xl rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    delay: i * 0.3,
                  }}
                />
                <div className="relative w-5 h-5 bg-purple-500 rounded-full border-[3px] border-purple-400/30 shadow-[0_0_25px_rgba(147,51,234,0.7)]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-28 bg-linear-to-t from-[#0b0014] via-[#0b0014] to-transparent" />
    </section>
  );
}
