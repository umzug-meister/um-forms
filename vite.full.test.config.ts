import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import fullconfig from "./vite.full.config";

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  //@ts-ignore
  const conf = fullconfig({ mode: mode });
  return {
    ...conf,
    base: "/",
  };
});
