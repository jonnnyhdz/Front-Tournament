import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), 
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "/icons/pwa-192x192.png",
        "/icons/pwa-512x512.png",
        "/icons/pwa-maskable-512x512.png",
        "/icons/apple-touch-icon.png",
      ],

      manifest: {
        name: "Dark Company",
        short_name: "DarkCo",
        description: "Videojuego + Torneos oficiales — Dark Company",
        theme_color: "#0a0612",
        background_color: "#0a0612",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        icons: [
          {
            src: "/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
