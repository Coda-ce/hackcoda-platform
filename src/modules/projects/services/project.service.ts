import { ResourceExistsException } from "@/shared/exceptions/resource-exists";
import type { ProjectRepository } from "../repositories/project.repository";
import type { CreateProjectData, Project } from "../types";

export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async createProject(data: CreateProjectData): Promise<Project> {
    const existing = await this.projectRepository.findByNameAndTeam(
      data.name,
      data.teamId,
    );
    if (existing) {
      throw new ResourceExistsException("Project");
    }
    return this.projectRepository.create(data);
  }
}
