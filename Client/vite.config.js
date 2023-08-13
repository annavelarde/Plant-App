import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   "/api": "http://localhost:3000", // Ajusta esta URL para que coincida con tu servidor backend
    // },
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Your server address and port
        changeOrigin: true,
      },
    },
  },
});
