"use client";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTournaments, registerPlayer, getParticipants, getMatches } from "../services/api";
import BracketTree from "../components/BracketTree";
import {
  FaArrowLeft,
  FaTrophy,
  FaUsers,
  FaInfoCircle,
  FaEnvelope,
  FaUser,
  FaGamepad,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function TournamentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tournament, setTournament] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [matches, setMatches] = useState([]);
  const [players, setPlayers] = useState([]);

  const defaultImage =
    "https://framegames.es/wp-content/uploads/2023/08/web_torneo_sin_fondo-1.png";

  useEffect(() => {
    const loadTournament = async () => {
      const data = await getTournaments();
      const found = data.find((t) => String(t.id) === String(id));
      setTournament(found);
    };

    const loadRelations = async () => {
      try {
        const [participantList, matchList] = await Promise.all([
          getParticipants(id),
          getMatches(id),
        ]);

        setPlayers(participantList.map((p) => p.name || "Jugador"));
        setMatches(matchList);
      } catch (err) {
        console.error("Error al obtener participantes/matches:", err);
      }
    };

    loadTournament();
    loadRelations();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");

    if (!form.name.trim() || !form.email.trim()) {
      setErrorMsg("Por favor completa todos los campos.");
      return;
    }

    try {
      const payload = {
        tournamentId: id,
        name: form.name.trim(),
        email: form.email.trim(),
      };

      const res = await registerPlayer(payload);

      if (res?.participant) {
        localStorage.setItem(`registered_${id}`, "true");

        setSubmitted(true);
        setPlayers((prev) => [...prev, form.name]);

        setTournament((prev) => ({
          ...prev,
          registeredCount: (prev?.registeredCount || 0) + 1,
        }));
      } else if (res?.error) {
        setErrorMsg(res.error);
      } else {
        setErrorMsg("Error desconocido. Intenta de nuevo.");
      }
    } catch (error) {
      setErrorMsg(error.message || "Error al registrar jugador.");
    }
  };

  if (!tournament)
    return (
      <div className="text-center text-gray-400 mt-40">Cargando torneo...</div>
    );

  const isFull =
    tournament.registeredCount >= tournament.participants ||
    ["en curso", "finalizado"].includes(
      tournament.status?.toLowerCase() || ""
    );

  const alreadyRegistered =
    typeof window !== "undefined" &&
    localStorage.getItem(`registered_${id}`) === "true";

  const hasMatches = matches.length > 0;
  const hasPlayers = players.length > 1;

  const showBracket = isFull || hasMatches || hasPlayers;
  const showForm = !alreadyRegistered && !submitted && !isFull;

  const imageSrc = tournament.image || tournament.imageUrl || defaultImage;

  const statusColor =
    tournament.status?.toLowerCase() === "en curso"
      ? "text-blue-400"
      : tournament.status?.toLowerCase() === "finalizado"
      ? "text-red-400"
      : "text-green-400";

  return (
    <section className="relative bg-[#0b0014] text-gray-100 min-h-screen overflow-hidden py-24 px-6 md:px-10">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0014] via-[#120022] to-[#0b0014] opacity-95"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Botón Volver */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition mb-10"
        >
          <FaArrowLeft /> Volver
        </button>

        {/* Layout principal */}
        {showForm ? (
          <>
            {/* SI NO ESTÁ REGISTRADO */}
            <div className="flex flex-col lg:flex-row items-start gap-12">
              {/* Imagen */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl border border-purple-700/30"
              >
                <img
                  src={imageSrc}
                  alt={tournament.name}
                  className="w-full h-[500px] object-cover brightness-90"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#1a002f]/95 via-[#250046]/90 to-[#0b0014]/95 backdrop-blur-md py-6 px-6">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_0_25px_rgba(147,51,234,0.6)] uppercase">
                    {tournament.name}
                  </h1>

                  {tournament.game && (
                    <div className="flex items-center gap-2 mt-2">
                      <FaGamepad className="text-purple-400" />
                      <span className="text-purple-300 font-semibold uppercase text-sm tracking-widest">
                        {tournament.game}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Info + Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2"
              >
                <p className="text-gray-300 leading-relaxed text-lg mb-8">
                  {tournament.description ||
                    "Prepárate para una experiencia competitiva sin igual, donde solo los mejores llegarán a la cima."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-8">
                  <div className="flex items-center gap-2">
                    <FaInfoCircle className="text-purple-400 text-lg" />
                    <p>
                      Estado:{" "}
                      <span className={`font-semibold ${statusColor}`}>
                        {tournament.status}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaUsers className="text-purple-400 text-lg" />
                    <p>
                      {tournament.registeredCount} / {tournament.participants}{" "}
                      jugadores
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaTrophy className="text-purple-400 text-lg" />
                    <p>Premio: {tournament.prize || "Por anunciar"}</p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Inscríbete al Torneo
                  </h2>

                  <div className="flex items-center bg-[#120022]/80 border border-purple-500/20 rounded-lg px-4">
                    <FaUser className="text-purple-400 mr-3" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Tu nombre completo"
                      value={form.name}
                      onChange={handleChange}
                      className="bg-transparent w-full py-2 text-gray-200 placeholder-gray-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center bg-[#120022]/80 border border-purple-500/20 rounded-lg px-4">
                    <FaEnvelope className="text-purple-400 mr-3" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Correo electrónico"
                      value={form.email}
                      onChange={handleChange}
                      className="bg-transparent w-full py-2 text-gray-200 placeholder-gray-500 focus:outline-none"
                    />
                  </div>

                  {errorMsg && (
                    <div className="flex items-center gap-2 text-red-400 mt-2">
                      <FaTimesCircle /> <span>{errorMsg}</span>
                    </div>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    className="mt-4 bg-purple-600 hover:bg-purple-700 transition-all text-white py-2 rounded-lg font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]"
                  >
                    Inscribirme
                  </motion.button>
                </form>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center text-green-400 font-semibold flex items-center justify-center gap-2 bg-[#120022]/60 py-6 rounded-lg border border-green-400/20 shadow-lg mt-6"
                  >
                    <FaCheckCircle className="text-xl text-green-300" />
                    <span>¡Tu registro fue exitoso!</span>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </>
        ) : (
          <>
            {/* YA REGISTRADO */}
            <div className="flex flex-col lg:flex-row items-start gap-12">
              {/* Imagen */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl border border-purple-700/30"
              >
                <img
                  src={imageSrc}
                  alt={tournament.name}
                  className="w-full h-[500px] object-cover brightness-90"
                />
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2 flex flex-col justify-center bg-gradient-to-r from-[#1a002f]/80 via-[#250046]/70 to-transparent rounded-2xl p-8 backdrop-blur-md border border-purple-700/30 shadow-lg"
              >
                <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_0_25px_rgba(147,51,234,0.6)] uppercase mb-3">
                  {tournament.name}
                </h1>

                {tournament.game && (
                  <div className="flex items-center gap-2 mb-4">
                    <FaGamepad className="text-purple-400" />
                    <span className="text-purple-300 font-semibold uppercase text-sm tracking-widest">
                      {tournament.game}
                    </span>
                  </div>
                )}

                <p className="text-gray-300 mb-6">
                  {tournament.description ||
                    "Ya estás registrado. Aquí puedes ver la información completa del torneo y su bracket."}
                </p>

                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <FaInfoCircle className="text-purple-400 text-lg" />
                    <span>
                      Estado:{" "}
                      <span className={`font-semibold ${statusColor}`}>
                        {tournament.status}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaUsers className="text-purple-400 text-lg" />
                    <span>
                      {tournament.registeredCount} / {tournament.participants}{" "}
                      jugadores
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaTrophy className="text-purple-400 text-lg" />
                    <span>Premio: {tournament.prize || "Por anunciar"}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}

        {/* BRACKET */}
        {showBracket && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{
                delay: 1,
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              className="flex justify-center lg:justify-end mt-12"
            >
              <div className="flex items-center gap-2 text-purple-400 text-sm tracking-wide">
                <span className="hidden sm:block text-gray-400">
                  Ver bracket del torneo
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 animate-pulse"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-24 bg-[#10001c]/80 border-t border-purple-700/20 rounded-2xl shadow-2xl p-10"
            >
              <h2 className="text-3xl font-bold text-center text-white mb-8">
                Bracket del Torneo
              </h2>

              <div className="overflow-x-auto w-full">
                <div className="flex justify-center">
                  <BracketTree
                    players={players}
                    matches={matches}
                    totalSlots={tournament.participants}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}