import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@repo-js": path.resolve(__dirname, "../JS"),
      "@repo-fsd": path.resolve(__dirname, "../frontend-system-design"),
    },
  },
});
