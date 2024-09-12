import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Configuração para executar os testes sequencialmente
    sequence: {
      shuffle: false, // Não embaralhar os testes
      concurrent: false, // Executar os testes sequencialmente
    },
  },
});
