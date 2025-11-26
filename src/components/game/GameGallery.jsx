"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { medievalFont } from "../../fonts";
import GalleryCTA from "./GameGalleryCTA";

export default function GameGallery({ onUnlock }) {
  const images = Array.from({ length: 12 }, (_, i) => `/img/gallery/${i + 1}.png`);

  const galleryRef = useRef(null);
  const timerRef = useRef(null);
  const isVisibleRef = useRef(false);

  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const section = galleryRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const ratio = entries[0].intersectionRatio;
        const isVisible = ratio >= 0.4;

        if (isVisible) {
          if (!isVisibleRef.current) {
            isVisibleRef.current = true;

            timerRef.current = setTimeout(() => {
              if (isVisibleRef.current) {
                setShowCTA(true);
                document.body.style.overflow = "hidden";
              }
            }, 10000);
          }
        } else {
          isVisibleRef.current = false;
          setShowCTA(false);
          document.body.style.overflow = "auto";
          if (timerRef.current) clearTimeout(timerRef.current);
        }
      },
      { threshold: [0, 0.4, 1] }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleAccept = () => {
    setShowCTA(false);
    document.body.style.overflow = "auto";
    onUnlock();
  };

  const handleDecline = () => {
    setShowCTA(false);
    document.body.style.overflow = "auto";
  };

  return (
    <section
      id="game-gallery"
      ref={galleryRef}
      className="relative py-32 bg-[#0a0612] text-gray-100 overflow-hidden"
    >
      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12041f]/85 via-[#1a0a2e]/55 to-[#090612]/90" />

      {/* Halos */}
      <div className="absolute top-[10%] left-[-10%] w-[700px] h-[700px] bg-purple-700/15 blur-[200px] rounded-full"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[900px] h-[900px] bg-yellow-300/10 blur-[250px] rounded-full"></div>

      {/* Partículas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-purple-300/80 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.7)]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7,
              animation: `sparkle 4s linear infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          ></span>
        ))}
      </div>

      {/* Contenido */}
      <div className="relative z-20 max-w-7xl mx-auto px-8">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`${medievalFont.className} text-4xl md:text-5xl text-center text-[#e8dcae] mb-20 drop-shadow-[0_0_30px_rgba(232,220,174,0.5)]`}
        >
          Galería Oficial
        </motion.h2>

        {/* GRID */}
        <div
          className="
            grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4
            gap-6 auto-rows-[190px] md:auto-rows-[220px]
          "
        >
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.03 }}
              className="
                group relative overflow-hidden rounded-2xl
                bg-gradient-to-br from-[#1f0a33]/60 to-[#0e071c]/60
                border border-purple-400/20 backdrop-blur-md
                shadow-[0_0_25px_rgba(110,60,180,0.3)]
                clip-gallery-card
              "
            >
              <img
                src={src}
                className="
                  w-full h-full object-cover transition duration-700
                  group-hover:scale-110 group-hover:brightness-125
                "
              />

              <div
                className="
                  absolute inset-0 opacity-0 group-hover:opacity-60
                  bg-gradient-to-t from-purple-600/30 via-transparent to-yellow-300/20
                  transition duration-700 blur-[30px]
                "
              ></div>

              <div
                className="
                  absolute inset-0 rounded-2xl pointer-events-none
                  border border-purple-300/0 group-hover:border-purple-300/40
                  transition duration-700
                "
              />
            </motion.div>
          ))}
        </div>
      </div>

      {showCTA && (
        <GalleryCTA
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}

      <style>{`
        @keyframes sparkle {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.4); opacity: 1; }
          100% { transform: scale(1); opacity: 0.2; }
        }

        .clip-gallery-card {
          clip-path: polygon(
            8% 0%, 92% 0%,
            100% 12%, 100% 88%,
            92% 100%, 8% 100%,
            0% 88%, 0% 12%
          );
        }
      `}</style>
    </section>
  );
}
