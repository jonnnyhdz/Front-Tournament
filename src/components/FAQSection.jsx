"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "¿Cómo me registro en un torneo?",
    answer:
      "Solo necesitas crear tu cuenta y dirigirte a la sección de torneos disponibles. Selecciona el torneo que te interese y haz clic en 'Unirme al torneo'.",
  },
  {
    question: "¿Los torneos son gratuitos?",
    answer:
      "Sí, todos los torneos disponibles en BattleZone son completamente gratuitos. Solo necesitas registrarte y cumplir con los requisitos del evento.",
  },
  {
    question: "¿Puedo seguir los brackets en tiempo real?",
    answer:
      "Sí. Cuando el torneo está en curso, el bracket se actualiza automáticamente para que veas tus enfrentamientos y el progreso general.",
  },
  {
    question: "¿Qué tipo de premios puedo ganar?",
    answer:
      "Los premios varían según el torneo: pueden ser recompensas digitales, reconocimientos dentro de la plataforma o puntos para el ranking global.",
  },
  {
    question: "¿Puedo organizar mis propios torneos?",
    answer:
      "Próximamente. Estamos trabajando en una función que te permitirá crear y gestionar tus propios torneos directamente desde BattleZone.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      id="faq"
      className="relative bg-[#0b0014] text-gray-100 py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-b from-[#0b0014] via-[#120022] to-[#0b0014]"></div>
      <div className="absolute left-1/2 top-1/2 w-[800px] h-[800px] bg-purple-700/10 blur-[200px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Columna izquierda */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            ¿Tienes <span className="text-purple-500">dudas</span>?
            <br />
            Aquí están las respuestas.
          </h2>
          <p className="text-gray-400 text-lg max-w-md">
            Nuestro objetivo es que tu experiencia competitiva sea tan fluida
            como emocionante. Si aún tienes preguntas, aquí encontrarás todo lo
            que necesitas saber para empezar.
          </p>

          <div className="mt-10 border-l-4 border-purple-500 pl-6">
            <p className="text-purple-400 italic text-sm">
              “Cada gran jugador empezó con una duda. La diferencia es que no se
              quedaron con ella.”
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                className={`border border-gray-800 rounded-2xl bg-linear-to-br from-[#13001f] to-[#0a0014] hover:border-purple-600/60 transition-all duration-300 shadow-lg ${
                  isOpen ? "border-purple-500/50 shadow-purple-700/30" : ""
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-purple-400"
                  >
                    <FaChevronDown />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="px-6 pb-5 text-gray-400"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#0b0014] via-[#0b0014] to-transparent"></div>
    </section>
  );
}
