import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/http/**/*.spec.ts"],
    setupFiles: ["src/http/test/helper/setup.ts"],
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
  resolve: {
    alias: {
      auth: "/src/auth",
      quotes: "/src/quotes",
      lib: "/src/lib",
    },
  },
});
