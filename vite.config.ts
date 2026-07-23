import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Change this to match your GitHub repo name.
// For user/organization pages (yourname.github.io) set it to "/".
// For project pages (yourname.github.io/saloon) set it to "/saloon/".
const REPO_NAME = "supercutsaloon";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages project site: https://<user>.github.io/<repo-name>/
  // Set REPO_NAME to your GitHub repository name (e.g. "premium-barber-portfolio").
  base: command === "build" ? `/${REPO_NAME}/` : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // Let Vite handle chunking
      },
    },
  },
}));
