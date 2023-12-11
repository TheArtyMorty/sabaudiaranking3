import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/sabaudiaranking3/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["icon.png"],
      manifest: {
        name: "Sabaudia Ranking",
        short_name: "SabaudiaRanking",
        description: "Sabaudia Ranking progressive web app",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icon_192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon_512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
