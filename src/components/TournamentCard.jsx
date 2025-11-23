import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUsers, FaTrophy, FaClock } from "react-icons/fa";

export default function TournamentCard({ tournament }) {
  const navigate = useNavigate();

  const defaultImage =
    "https://framegames.es/wp-content/uploads/2023/08/web_torneo_sin_fondo-1.png";

  const imageSrc = tournament.imageUrl || tournament.image || defaultImage;
  const status = tournament.status?.toLowerCase() || "sin estado";
  const isFinished = status === "finalizado";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={() =>
        !isFinished && navigate(`/tournament/${tournament.id}`)
      }
      className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer group transition-all duration-500 ${
        isFinished
          ? "brightness-[0.55] hover:brightness-75"
          : "hover:shadow-2xl"
      }`}
    >
      {/* Imagen con overlay */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={tournament.title || "Torneo"}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isFinished ? "opacity-80" : "group-hover:scale-105"
          }`}
        />
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isFinished
              ? "bg-linear-to-b from-black/60 to-black/80"
              : "bg-linear-to-b from-black/30 to-black/60 group-hover:from-black/10"
          }`}
        />

        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full shadow-md capitalize ${
            status === "activo"
              ? "bg-green-500 text-white"
              : status === "en curso"
              ? "bg-blue-500 text-white"
              : status === "finalizado"
              ? "bg-red-600 text-white"
              : "bg-gray-500 text-white"
          }`}
        >
          {status}
        </span>

        {isFinished && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-gray-200 px-4 font-medium">
              Este torneo ya finalizó.<br />
              <span className="text-yellow-400 font-semibold">
                ¡Pronto inicia uno nuevo, espéralo!
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col justify-between bg-linear-to-br from-[#1a002b] via-[#13001f] to-[#0a0014] text-gray-100">
        <h2 className="text-xl font-bold mb-2 text-white group-hover:text-yellow-300 transition-colors">
          {tournament.title || tournament.name || "Torneo sin título"}
        </h2>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-yellow-400" />
            <span>{tournament.date || "Fecha no disponible"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUsers className="text-yellow-400" />
            <span>{tournament.participants || 0} jugadores</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={isFinished}
            className={`mt-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
              isFinished
                ? "bg-gray-600 cursor-not-allowed text-gray-300"
                : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
            }`}
          >
            <FaTrophy />
            {isFinished ? "Finalizado" : "Ver detalles"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
