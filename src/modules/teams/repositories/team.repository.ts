import type { PrismaClient } from "@prisma/client";
import type { CreateTeamData, Team } from "../types";

export class TeamRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(_data: CreateTeamData & { inviteCode: string }): Promise<Team> {
    throw new Error("Not implemented: add Team model to Prisma schema");
  }

  async findByNameAndHackathon(
    _name: string,
    _hackathonId: string,
  ): Promise<Team | null> {
    throw new Error("Not implemented: add Team model to Prisma schema");
  }
}
