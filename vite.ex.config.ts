import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: mode === "development" ? "/" : "/konfigurator/express/",
    build: {
      rollupOptions: {
        input: {
          app: "./ex.html",
        },
        output: {
          dir: "express",
          entryFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`,
        },
      },
    },
    server: {
      open: "/ex.html",
    },
  };
});
