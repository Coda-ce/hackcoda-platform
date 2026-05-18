import type { PrismaClient } from "@prisma/client";
import type { CreateProjectData, Project } from "../projects-types";

export class ProjectRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(_data: CreateProjectData): Promise<Project> {
    throw new Error("Not implemented: add Project model to Prisma schema");
  }

  async findByNameAndTeam(
    _name: string,
    _teamId: string,
  ): Promise<Project | null> {
    throw new Error("Not implemented: add Project model to Prisma schema");
  }
}
