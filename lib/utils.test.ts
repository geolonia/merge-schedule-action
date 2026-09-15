import { test, expect } from "vitest";
import {
  formatDateWithTimezone,
  getScheduleDateString,
  hasScheduleCommand,
  isFork,
  isValidMergeMethod,
} from "./utils";
import dayjs from "./dayjs";

test("isFork", () => {
  const base = { repo: { full_name: "gr2m/merge-schedule-action" } };

  expect(isFork({ base, head: base })).toBe(false);
  expect(
    isFork({
      base,
      head: { repo: { full_name: "contributor/merge-schedule-action" } },
    }),
  ).toBe(true);

  // A repository that is itself a fork still raises same-repo pull requests.
  const forked = { repo: { full_name: "geolonia/merge-schedule-action" } };
  expect(isFork({ base: forked, head: forked })).toBe(false);

  // The head repository is gone, which only happens once a fork is deleted.
  expect(isFork({ base, head: { repo: null } })).toBe(true);
});

test("getScheduleDateString", () => {
  expect(getScheduleDateString("")).toBe("");
  expect(getScheduleDateString("/schedule")).toBe("");
  expect(getScheduleDateString("/schedule 2022-06-08")).toBe("2022-06-08");
  expect(getScheduleDateString("/schedule 2022-06-08T12:00:00")).toBe(
    "2022-06-08T12:00:00",
  );
});

test("hasScheduleCommand", () => {
  expect(hasScheduleCommand(null)).toBe(false);
  expect(hasScheduleCommand("")).toBe(false);
  expect(hasScheduleCommand("/schedule")).toBe(true);
  expect(hasScheduleCommand("/schedule ")).toBe(true);
  expect(hasScheduleCommand("\n/schedule")).toBe(true);
  expect(hasScheduleCommand("\n/schedule ")).toBe(true);
  expect(hasScheduleCommand("Something\n/schedule")).toBe(true);
  expect(hasScheduleCommand("Something /schedule ")).toBe(false);
  expect(hasScheduleCommand("Something\n/schedule ")).toBe(true);
  expect(hasScheduleCommand("Something /schedule \nelse")).toBe(false);
  expect(hasScheduleCommand("Something\n/schedule \nelse")).toBe(true);
});

test("isValidMergeMethod", () => {
  expect(isValidMergeMethod("merge")).toBe(true);
  expect(isValidMergeMethod("squash")).toBe(true);
  expect(isValidMergeMethod("rebase")).toBe(true);
  expect(isValidMergeMethod("bad")).toBe(false);
});

test("formatDateWithTimezone", () => {
  expect(formatDateWithTimezone(dayjs.tz("2022-06-08T12:00:00", "UTC"))).toBe(
    "2022-06-08 12:00+00:00",
  );
  expect(
    formatDateWithTimezone(dayjs.tz("2022-06-08T12:00:00", "Asia/Tokyo")),
  ).toBe("2022-06-08 12:00+09:00");
});
