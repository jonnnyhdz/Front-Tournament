"use client";
import { motion } from "framer-motion";
import { medievalFont, bodyFont } from "../../fonts";

export default function GalleryCTA({ onAccept, onDecline }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="
        fixed bottom-0 left-0 right-0 z-[9999]
        bg-[#090612]/95 backdrop-blur-xl
        border-t border-purple-500/30
        shadow-[0_-10px_40px_rgba(168,85,247,0.4)]
        px-8 py-10 text-center
      "
    >
      <h3
        className={`
          ${medievalFont.className}
          text-3xl md:text-4xl text-[#e8dcae]
          drop-shadow-[0_0_25px_rgba(232,220,174,0.55)]
          mb-6
        `}
      >
        ¿Quieres conocer más sobre Dark Company?
      </h3>

      <p
        className={`
          ${bodyFont.className}
          text-gray-300 max-w-2xl mx-auto
          text-lg leading-relaxed mb-10
        `}
      >
        Tenemos torneos, mundos, sistemas y experiencias épicas esperando por ti.
      </p>

      <div className="flex justify-center gap-6">
        <button
          onClick={onAccept}
          className="
            px-10 py-4 rounded-lg font-bold text-white
            bg-purple-600 hover:bg-purple-700
            shadow-[0_0_35px_rgba(168,85,247,0.5)]
            transition
          "
        >
          Sí, muéstrame más
        </button>

        <button
          onClick={onDecline}
          className="
            px-10 py-4 rounded-lg font-bold
            text-purple-300 border border-purple-500
            hover:bg-black/40 transition
          "
        >
          No por ahora
        </button>
      </div>
    </motion.div>
  );
}
