import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    strictPort: true, // Set this to true
    hmr: {
      clientPort: 2001, // Replace with your server port
      // port: 2002, // Set this to a different value if needed
    },
  },
});
