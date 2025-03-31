import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "/*": ["./*"],
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "babel-plugin-styled-components",
            {
              displayName: true,
              fileName: false,
              pure: true,
            },
          ],
        ],
      },
    }),
  ],
  server: {
    strictPort: true,
    port: 2001,
    watch: {
      usePolling: true,
    },
  },
});
