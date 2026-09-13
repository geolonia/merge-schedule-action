import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./test/setup-test-env.ts"],
    // Spies are created inside individual tests, and several of them replace
    // process.stdout.write. Without this they stay installed for the rest of
    // the run and swallow anything written afterwards.
    restoreMocks: true,
  },
});
