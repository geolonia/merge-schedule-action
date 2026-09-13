import { vi } from "vitest";

/**
 * Replaces `process.stdout.write` with a spy that swallows the output, so
 * tests can assert on what `@actions/core` writes to the Actions log.
 *
 * `restoreMocks` in vitest.config.mts puts the real `write` back after each
 * test, which is what keeps the spy from leaking into the rest of the run.
 */
export function mockProcessStdout() {
  return vi.spyOn(process.stdout, "write").mockImplementation(() => true);
}
