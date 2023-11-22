import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: mode === "development" ? "/" : "/um-forms/express/",
    build: {
      rollupOptions: {
        input: {
          app: "./ex.html",
        },
        output: {
          dir: "express",
          entryFileNames: `index.js`,
          assetFileNames: `[name].[ext]`,
        },
      },
    },
    server: {
      open: "/ex.html",
    },
  };
});
