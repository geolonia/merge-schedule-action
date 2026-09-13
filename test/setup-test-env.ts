import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { server } from "./mocks";

// `@actions/github` v9 defaults every request to `undici`'s own `fetch`
// export, which msw cannot intercept. Hand each client the global `fetch`
// that msw patches instead.
vi.mock("@actions/github", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@actions/github")>();
  return {
    ...actual,
    getOctokit: (token: string, options?: Record<string, unknown>) =>
      actual.getOctokit(token, {
        ...options,
        request: { fetch: globalThis.fetch },
      }),
  };
});

process.env.GITHUB_TOKEN = "some-token-here";
process.env.GITHUB_REPOSITORY = "gr2m/merge-schedule-action";
process.env.INPUT_MERGE_METHOD = "merge";
process.env.INPUT_TIME_ZONE = "UTC";
process.env.INPUT_REQUIRE_STATUSES_SUCCESS = "false";
process.env.INPUT_AUTOMERGE_FAIL_LABEL = "automerge-fail";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterAll(() => server.close());

afterEach(() => {
  server.resetHandlers();
  process.env.INPUT_TIME_ZONE = "UTC";
});
