import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const BACKEND_URL = "http://localhost:3000";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: BACKEND_URL,
        rewrite: (path) => path.replace("/api", ""),
      },
    },
  },
});
