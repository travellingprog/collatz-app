import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// ViteJS config options
export default defineConfig({
  esbuild: {
    target: "es2017", // match tsconfig.json
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
  test: {
    environment: "jsdom",
    include: ["__tests__/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
  },
});
