import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: mode === "development" ? "/" : "/um-forms/fur/",
    build: {
      rollupOptions: {
        input: {
          app: "./fur.html",
        },
        output: {
          dir: "fur",
          entryFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`,
        },
      },
    },
    server: {
      open: "/fur.html",
    },
  };
});
