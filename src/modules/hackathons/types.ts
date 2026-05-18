export type HackathonStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ACTIVE"
  | "FINISHED"
  | "CANCELLED";

export interface Hackathon {
  id: string;
  title: string;
  description: string;
  rules: string | null;
  bannerUrl: string | null;
  maxTeamSize: number;
  registrationDeadline: string;
  startDate: string;
  endDate: string;
  status: HackathonStatus;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateHackathonData {
  title: string;
  description: string;
  rules?: string;
  bannerUrl?: string;
  maxTeamSize: number;
  registrationDeadline: string;
  startDate: string;
  endDate: string;
  createdBy: string;
}
