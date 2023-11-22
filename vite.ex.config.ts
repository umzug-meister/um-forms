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
          app: "./form.html",
        },
        output: {
          dir: "express",
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`,
        },
      },
    },
    server: {
      open: "/form.html",
    },
  };
});
