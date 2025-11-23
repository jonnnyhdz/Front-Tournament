import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import TournamentCard from "./TournamentCard";
import { getTournaments } from "../services/api";

export default function TournamentsSection() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    setLoading(true);

    getTournaments().then((data) => {
      setTournaments(data);
      setLoading(false);

      setTimeout(checkScrollPosition, 300);
    });

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const checkScrollPosition = () => {
    const container = carouselRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scroll = (direction) => {
    const container = carouselRef.current;
    if (!container) return;
    const scrollAmount = container.offsetWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="tournaments"
      className="relative bg-[#0b0014] py-28 text-gray-100 overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-b from-[#0b0014] via-[#120022] to-[#0b0014] opacity-95"></div>
      <div className="absolute left-1/2 top-1/3 w-[700px] h-[700px] bg-purple-700/10 blur-[200px] rounded-full -translate-x-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-4xl md:text-5xl font-extrabold text-white mb-16"
        >
          Torneos <span className="text-purple-500">Disponibles</span>
        </motion.h2>

        {/* Loader premium */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <motion.div
              className="w-16 h-16 rounded-full border-4 border-purple-600 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            ></motion.div>

            <motion.p
              className="text-purple-300 mt-6 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            >
              Cargando torneos...
            </motion.p>
          </div>
        )}

        {/* Contenido normal */}
        {!loading && tournaments.length > 0 && (
          <div className="relative">
            <motion.div
              ref={carouselRef}
              onScroll={checkScrollPosition}
              className="flex gap-10 overflow-x-auto scroll-smooth no-scrollbar px-4 pb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {tournaments.map((tournament) => (
                <motion.div
                  key={tournament.id}
                  className="min-w-[300px] sm:min-w-[340px] lg:min-w-[360px] flex-shrink-0"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <TournamentCard tournament={tournament} />
                </motion.div>
              ))}
            </motion.div>

            {/* Indicador mobile */}
            {isMobile && tournaments.length > 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: [0, 1, 0], x: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-4 right-6 text-xs text-gray-400 flex items-center gap-2"
              >
                <span className="animate-pulse">Desliza</span>
                <FaChevronRight className="text-purple-400 opacity-70" />
              </motion.div>
            )}

            {/* Botones desktop */}
            {!isMobile && tournaments.length > 4 && (
              <>
                <motion.button
                  onClick={() => scroll("left")}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: canScrollLeft ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-purple-700/30 hover:bg-purple-600/50 text-white p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md ${
                    !canScrollLeft ? "pointer-events-none" : ""
                  }`}
                >
                  <FaChevronLeft size={22} />
                </motion.button>

                <motion.button
                  onClick={() => scroll("right")}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: canScrollRight ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-purple-700/30 hover:bg-purple-600/50 text-white p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md ${
                    !canScrollRight ? "pointer-events-none" : ""
                  }`}
                >
                  <FaChevronRight size={22} />
                </motion.button>
              </>
            )}
          </div>
        )}

        {!loading && tournaments.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No hay torneos disponibles aún.</p>
            <p className="text-gray-500 mt-2">
              Vuelve pronto para descubrir nuevos desafíos.
            </p>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#0b0014] via-[#0b0014] to-transparent"></div>
    </section>
  );
}
