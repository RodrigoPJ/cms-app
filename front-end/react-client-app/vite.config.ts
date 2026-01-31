// vite.config.js
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mkcert from "vite-plugin-mkcert";

export default {
  server: {
    proxy: {
      "/api/content": {
        target: "https://localhost:3001",
        secure: false,
      },
      "/api/auth": {
        target: "https://localhost:3000",
        secure: false,
      },
      "/ws": {
        target: "wss://localhost:8000",
        ws: true,
      },
      "/api/chat": {
        target: "https://localhost:8000",
        secure: false,
      }
    },
  },
  plugins: [react(), mkcert(), tailwindcss()],
};
