import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // ⚠️ Remplace "haikubot" par le nom exact de ton dépôt GitHub
  // Ex : si ton repo est https://github.com/ton-user/mon-chatbot
  //      → base: "/mon-chatbot/"
  base: "/haikubot/",
});
