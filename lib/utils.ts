import dayjs from "./dayjs";

export function hasScheduleCommand(text: string | null): boolean {
  if (!text) return false;
  return /(^|\n)\/schedule/.test(text);
}

type PullRequestRepos = {
  head: { repo?: { full_name: string } | null };
  base: { repo?: { full_name: string } | null };
};

/**
 * Whether the pull request is raised from a different repository.
 *
 * Comparing head against base rather than reading `head.repo.fork`: that flag
 * says the head repository is itself a fork of something, which is true for
 * every pull request in a repository that was forked -- including same-repo
 * ones. A missing head repository means the fork was deleted, which only
 * happens to forks, so it counts as one.
 */
export function isFork(pullRequest: PullRequestRepos): boolean {
  return pullRequest.head.repo?.full_name !== pullRequest.base.repo?.full_name;
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
