import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: mode === "development" ? "/" : "/um-forms/form/",
    define: {
      global: {},
    },
    build: {
      rollupOptions: {
        input: {
          app: "./full.html",
        },
        output: {
          dir: "form",
          entryFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`,
        },
      },
    },
    server: {
      open: "/full.html",
    },
  };
});
