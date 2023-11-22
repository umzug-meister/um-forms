import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: mode === "development" ? "/" : "/um-forms/form/",
    build: {
      rollupOptions: {
        input: {
          app: "./form.html",
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
