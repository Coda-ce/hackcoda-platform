import type { HackathonStatus } from "../types";

export function canPublishHackathon(status: HackathonStatus): boolean {
  return status === "DRAFT";
}

export function isRegistrationOpen(registrationDeadline: Date): boolean {
  return new Date() <= registrationDeadline;
}

export function isHackathonActive(startDate: Date, endDate: Date): boolean {
  const now = new Date();
  return now >= startDate && now <= endDate;
}
