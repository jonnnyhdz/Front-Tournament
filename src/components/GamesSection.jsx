"use client";
import { motion } from "framer-motion";

const logos = [
  { name: "King of Fighters", src: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Logo_King_of_Fighters.png" },
  //{ name: "Valorant", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/langes-1100px-Valorant_logo_-_pink_color_version.svg.png" },
  { name: "League of Legends", src: "https://www.pcspecialist.it/images/landing/pcs/game-based-computers/lol-logo-25.png" },
  { name: "Fortnite", src: "https://s3.amazonaws.com/www-itopvpn-com/blog/20231115/1700035827333287.png" },
  { name: "Call of Duty", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Call_of_Duty_Black_Ops_logo.svg/2560px-Call_of_Duty_Black_Ops_logo.svg.png" },
  { name: "Overwatch", src: "https://1000marcas.net/wp-content/uploads/2020/03/Logo-Overwatch.png" },
  { name: "Clash Royale", src: "https://supercell.com/images/53c91cc7ddf17d5b6fa13cae4762af1b/main_logo_clashroyale.5e3fbb70__1_.webp" },
  { name: "Super Smash Bros", src: "https://bluejays-esport.org/wp-content/uploads/2023/05/9d11bc7e-fce6-4181-9a04-1db9342c1491.png" },
];

export default function GamesSection() {
  return (
    <section className="bg-[#0b0014] py-16 px-8 text-center">
      <h2 className="text-gray-400 uppercase tracking-widest mb-10 text-sm font-semibold">
        Juegos y plataformas en los que competimos
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
        {logos.map((logo, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="opacity-70 hover:opacity-100 transition duration-300"
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="h-12 md:h-14 object-contain grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
