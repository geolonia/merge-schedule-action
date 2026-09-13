import { vi } from "vitest";

/**
 * Replaces `process.stdout.write` with a spy that swallows the output, so
 * tests can assert on what `@actions/core` writes to the Actions log.
 * Call history is reset on every call, so each test starts clean.
 */
export function mockProcessStdout() {
  const spy = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
  spy.mockClear();
  return spy;
}
