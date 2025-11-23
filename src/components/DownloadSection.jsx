"use client";
import { motion } from "framer-motion";

export default function DownloadSection() {
  return (
    <section
      id="download"
      className="relative bg-[#0b0014] text-gray-100 py-32 overflow-hidden"
    >
      {/* Fondos y glow morado */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0b0014] via-[#120022] to-[#0b0014]"></div>
      <div className="absolute left-1/2 top-1/2 w-[850px] h-[850px] bg-purple-700/10 blur-[220px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="
            bg-linear-to-br from-[#13001f] to-[#0a0014]
            border border-gray-800 rounded-3xl p-10
            shadow-xl hover:border-purple-500/60
            hover:shadow-purple-600/30 transition-all duration-500
            flex flex-col items-center
          "
        >
          {/* QR */}
          <img
            src="/qr_morado_negro.png"
            alt="QR App"
            className="w-64 h-64 md:w-72 md:h-72 rounded-xl object-contain shadow-[0_0_25px_rgba(139,92,246,0.45)]"
          />

          {/* Texto */}
          <p className="text-gray-400 mt-6 text-sm text-center">
            Escanea el código o descárgala directamente
          </p>

          {/* Botón */}
          <a
            href="https://github.com/jonnnyhdz/TournamentAPK/releases/download/v1.0.0/app-release.apk"
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-4 inline-block px-8 py-3 rounded-xl
              bg-purple-700 text-white font-semibold
              hover:bg-purple-600 transition
            "
          >
            Descargar APK
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            ¿Quieres gestionar<br />
            <span className="text-purple-500">tus torneos</span>?
          </h2>

          <p className="text-gray-400 text-lg max-w-md">
            Descarga nuestra app oficial para administradores y controla todo el
            sistema competitivo: creación de torneos, aprobación de jugadores,
            seguimiento del bracket y herramientas avanzadas.
          </p>

          <div className="mt-10 border-l-4 border-purple-500 pl-6">
            <p className="text-purple-400 italic text-sm">
              “El verdadero poder de un torneo está en quien lo organiza.”
            </p>
          </div>
        </motion.div>
      </div>

      {/* Fade inferior para cerrar el diseño */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#0b0014] via-[#0b0014] to-transparent"></div>
    </section>
  );
}
