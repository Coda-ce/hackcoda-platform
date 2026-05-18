import type { PrismaClient } from "@prisma/client";
import type { CreateTeamData, Team } from "../types";

export class TeamRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateTeamData & { inviteCode: string }): Promise<Team> {
    return this.prisma.team.create({ data });
  }

  async findByNameAndHackathon(
    name: string,
    hackathonId: string,
  ): Promise<Team | null> {
    return this.prisma.team.findUnique({
      where: { name_hackathonId: { name, hackathonId } },
    });
  }

  async findByInviteCode(inviteCode: string): Promise<Team | null> {
    return this.prisma.team.findUnique({ where: { inviteCode } });
  }
}
