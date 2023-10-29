import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    strictPort: true,
    port: 2001,
    hmr: {
      host: "coding.family",
      protocol: "wss",
      clientPort: 2001,
    },
  },
});
