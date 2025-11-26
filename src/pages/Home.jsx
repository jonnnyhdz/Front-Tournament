"use client";
import { useState, useEffect } from "react";

import HeroSection from "../components/HeroSection";
import GamesSection from "../components/GamesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import TournamentsSection from "../components/TournamentsSection";
import DownloadSection from "../components/DownloadSection";
import FAQSection from "../components/FAQSection";

import GameHero from "../components/game/GameHero";
import GameAbout from "../components/game/GameAbout";
import GameFeatures from "../components/game/GameFeatures";
import GameGallery from "../components/game/GameGallery";
import GameLore from "../components/game/GameLore";
import GameCTA from "../components/game/GameCTA";

export default function Home() {
  const [unlockSections, setUnlockSections] = useState(false);

  const handleUnlock = () => {
    setUnlockSections(true);

    setTimeout(() => {
      const target = document.getElementById("heroTorneos");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  return (
    <>
      <GameHero />
      <GameAbout />
      <GameFeatures />
      <GameLore />
      <GameCTA />

      <GameGallery onUnlock={handleUnlock} />

      {unlockSections && (
        <>
          <div id="heroTorneos">
            <HeroSection />
          </div>

          <GamesSection />
          <HowItWorksSection />
          <TournamentsSection />
          <DownloadSection />
          <FAQSection />
        </>
      )}
    </>
  );
}
