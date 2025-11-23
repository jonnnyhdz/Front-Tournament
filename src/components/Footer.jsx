"use client";
import { motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaDiscord, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0013] text-gray-400 overflow-hidden pt-8 pb-10">
      <motion.div
        className="absolute inset-0 bg-linear-to-t from-[#0b0014] via-[#120022] to-[#0a0013]"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute left-1/2 bottom-0 w-[800px] h-[800px] bg-purple-700/10 blur-[200px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center gap-2">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-extrabold text-white tracking-wide"
        >
          DARK <span className="text-purple-500">COMPANY</span>
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-gray-400 max-w-lg text-sm md:text-base"
        >
          Dedicados a crear experiencias digitales únicas donde la competencia,  
          la tecnología y el diseño convergen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center gap-6 mt-4 text-xl"
        >
          <a
            href="https://discord.gg/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-all"
          >
            <FaDiscord />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-all"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-all"
          >
            <FaInstagram />
          </a>
          <a
            href="mailto:contacto@darkcompany.dev"
            className="text-purple-400 hover:text-purple-300 transition-all"
          >
            <FaEnvelope />
          </a>
        </motion.div>

        <motion.div
          className="w-40 h-[1.5px] bg-linear-to-r from-transparent via-purple-500 to-transparent my-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xs text-gray-500 tracking-wide"
        >
          © {new Date().getFullYear()} <span className="text-purple-400">Dark Company</span>. Todos los derechos reservados.
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-purple-600 via-yellow-400 to-purple-600 opacity-70"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
    </footer>
  );
}
