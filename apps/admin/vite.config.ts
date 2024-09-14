import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  server: {
    host: true,
    port: parseInt(process.env.VITE_PORT, 10) || 3000,
  },
  base: "./",
  css: {
    postcss: "./postcss.config.js",
  },
});
