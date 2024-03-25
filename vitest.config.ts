import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// ViteJS config options
export default defineConfig({
  esbuild: {
    target: "es2017", // match tsconfig.json
  },
  plugins: [react()],
  test: {
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
    environment: "jsdom",
  },
});
