import type { PrismaClient } from "@prisma/client";
import type { CreateProjectData, Project } from "../projects-types";

export class ProjectRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateProjectData): Promise<Project> {
    return this.prisma.project.create({ data });
  }

  async findByNameAndTeam(
    name: string,
    teamId: string,
  ): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: { name_teamId: { name, teamId } },
    });
  }
}
