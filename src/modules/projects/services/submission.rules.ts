import type { ProjectStatus } from "../projects-types";

export function canSubmitProject(
  projectStatus: ProjectStatus,
  hackathonEndDate: Date,
): boolean {
  return projectStatus === "DRAFT" && new Date() <= hackathonEndDate;
}
