export type ProjectStatus = "DRAFT" | "SUBMITTED";

export interface Project {
  id: string;
  name: string;
  description: string;
  teamId: string;
  repoUrl: string | null;
  demoUrl: string | null;
  techStack: string[];
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectData {
  name: string;
  description: string;
  teamId: string;
  repoUrl?: string;
  demoUrl?: string;
  techStack: string[];
}
