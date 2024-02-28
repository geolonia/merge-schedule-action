import { test, expect } from "vitest";
import {
  formatDateWithTimezone,
  getScheduleDateString,
  hasScheduleCommand,
  isValidMergeMethod,
} from "./utils";
import dayjs from "./dayjs";

test("getScheduleDateString", () => {
  expect(getScheduleDateString("")).toBe("");
  expect(getScheduleDateString("/schedule")).toBe("");
  expect(getScheduleDateString("/schedule 2022-06-08")).toBe("2022-06-08");
  expect(getScheduleDateString("/schedule 2022-06-08T12:00:00")).toBe(
    "2022-06-08T12:00:00"
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
    "2022-06-08 12:00+00:00"
  );
  expect(
    formatDateWithTimezone(dayjs.tz("2022-06-08T12:00:00", "Asia/Tokyo"))
  ).toBe("2022-06-08 12:00+09:00");
});
