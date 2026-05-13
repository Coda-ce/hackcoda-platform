import { PrismaClient } from "@prisma/client";

export class TeamRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createTeam(data: any): Promise<any> {
    return await (this.prisma as any).team.create({ data });
  }

  async findTeamById(id: string) {
    return await (this.prisma as any).team.findUnique({
      where: { id },
      include: {
        leader: {
          select: { id: true, name: true, email: true },
        },
        members: true,
      },
    });
  }

  async findAllTeams() {
    return await (this.prisma as any).team.findMany({
      include: {
        leader: {
          select: { id: true, name: true, email: true },
        },
        _count: {
          select: { members: true },
        },
      },
    });
  }

  async findTeamsByLeader(leaderId: string) {
    return await (this.prisma as any).team.findMany({
      where: { leaderId },
      include: {
        leader: {
          select: { id: true, name: true, email: true },
        },
        members: true,
      },
    });
  }

  async findTeamsByUser(userId: string) {
    return await (this.prisma as any).userTeam.findMany({
      where: { userId },
      include: {
        team: {
          include: {
            leader: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
    });
  }

  async addMemberToTeam(userId: string, teamId: string, role: "LEADER" | "MEMBER" = "MEMBER"): Promise<any> {
    return await (this.prisma as any).userTeam.create({
      data: {
        userId,
        teamId,
        role,
      },
    });
  }

  async removeMemberFromTeam(userId: string, teamId: string): Promise<any> {
    return await (this.prisma as any).userTeam.delete({
      where: {
        userId_teamId: {
          userId,
          teamId,
        },
      },
    });
  }

  async updateTeam(id: string, data: any): Promise<any> {
    return await (this.prisma as any).team.update({
      where: { id },
      data,
    });
  }

  async deleteTeam(id: string): Promise<any> {
    return await (this.prisma as any).team.delete({
      where: { id },
    });
  }

  async searchTeams(query: string) {
    return await (this.prisma as any).team.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        leader: {
          select: { id: true, name: true, email: true },
        },
        _count: {
          select: { members: true },
        },
      },
    });
  }

  async getUserTeamMembership(userId: string, teamId: string) {
    return await (this.prisma as any).userTeam.findUnique({
      where: {
        userId_teamId: {
          userId,
          teamId,
        },
      },
    });
  }
}

