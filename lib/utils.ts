import type { SimplePullRequest } from "@octokit/webhooks-types";
import dayjs from "./dayjs";

export function hasScheduleCommand(text: string | null): boolean {
  if (!text) return false;
  return /(^|\n)\/schedule/.test(text);
}

export function isFork(pullRequest: SimplePullRequest): boolean {
  return pullRequest.head.repo.fork;
}

export function getScheduleDateString(text: string | null): string {
  if (!text) return "";
  return text.match(/(^|\n)\/schedule (.*)/)?.pop() ?? "";
}

type MergeMethod = "merge" | "squash" | "rebase";

export function isValidMergeMethod(method: string): method is MergeMethod {
  return ["merge", "squash", "rebase"].includes(method);
}

export function formatDateWithTimezone(date: dayjs.Dayjs): string {
  return date.format("YYYY-MM-DD HH:mmZ");
}
