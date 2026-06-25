import type { MatePost, MatePostStatus } from "@/types/mate";

type MateStatusSource = Pick<
  MatePost,
  "status" | "deadline" | "currentPeople" | "maxPeople"
>;

export function isMateDeadlinePassed(
  deadline?: string,
  now: number = Date.now(),
) {
  if (!deadline) return false;

  const deadlineTime = new Date(deadline).getTime();
  return Number.isFinite(deadlineTime) && deadlineTime <= now;
}

export function getEffectiveMateStatus(
  post: MateStatusSource,
  now: number = Date.now(),
): MatePostStatus {
  if (
    post.status === "DELETED" ||
    post.status === "MATCHED" ||
    post.status === "CLOSED"
  ) {
    return post.status;
  }

  if (
    post.currentPeople >= post.maxPeople ||
    isMateDeadlinePassed(post.deadline, now)
  ) {
    return "CLOSED";
  }

  return post.status;
}

export function isMatePostClosed(
  post: MateStatusSource,
  now: number = Date.now(),
) {
  const status = getEffectiveMateStatus(post, now);
  return status === "CLOSED" || status === "MATCHED" || status === "DELETED";
}
