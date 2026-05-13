import { prisma } from "@/shared/lib/prisma";
import { TeamRepository } from "../repositories/team.repository";

const teamRepository = new TeamRepository(prisma);

export const teamService = {
  async createTeam(name: string, description: string | undefined, leaderId: string) {
    const team = await teamRepository.createTeam({
      name,
      description,
      leader: {
        connect: { id: leaderId },
      },
    });

    await teamRepository.addMemberToTeam(leaderId, team.id, "LEADER");

    return team;
  },

  async getTeamById(teamId: string) {
    return await teamRepository.findTeamById(teamId);
  },

  async getAllTeams() {
    const teams = await teamRepository.findAllTeams();
    return teams.map((team: any) => ({
      ...team,
      memberCount: team._count?.members || 0,
    }));
  },

  async getUserTeams(userId: string) {
    const userTeams = await teamRepository.findTeamsByUser(userId);
    return userTeams.map((ut: any) => ({
      ...ut.team,
      role: ut.role,
      isLeader: ut.role === "LEADER",
      isMember: true,
    }));
  },

  async getTeamsByLeader(leaderId: string) {
    return await teamRepository.findTeamsByLeader(leaderId);
  },

  async joinTeam(userId: string, teamId: string) {
    const team = await teamRepository.findTeamById(teamId);
    if (!team) {
      throw new Error("Time não encontrado");
    }

    const existingMembership = await teamRepository.getUserTeamMembership(userId, teamId);
    if (existingMembership) {
      throw new Error("Você já é membro deste time");
    }

    return await teamRepository.addMemberToTeam(userId, teamId, "MEMBER");
  },

  async leaveTeam(userId: string, teamId: string) {
    const membership = await teamRepository.getUserTeamMembership(userId, teamId);
    if (!membership) {
      throw new Error("Você não é membro deste time");
    }

    if (membership.role === "LEADER") {
      throw new Error("Líderes não podem sair do time. Transfira a liderança ou delete o time");
    }

    return await teamRepository.removeMemberFromTeam(userId, teamId);
  },

  async searchTeams(query: string) {
    if (!query || query.length < 2) {
      return [];
    }
    const teams = await teamRepository.searchTeams(query);
    return teams.map((team: any) => ({
      ...team,
      memberCount: team._count?.members || 0,
    }));
  },

  async deleteTeam(teamId: string, userId: string) {
    const team = await teamRepository.findTeamById(teamId);
    if (!team) {
      throw new Error("Time não encontrado");
    }

    if (team.leaderId !== userId) {
      throw new Error("Apenas o líder pode deletar o time");
    }

    return await teamRepository.deleteTeam(teamId);
  },

  async updateTeam(teamId: string, userId: string, data: any) {
    const team = await teamRepository.findTeamById(teamId);
    if (!team) {
      throw new Error("Time não encontrado");
    }

    if (team.leaderId !== userId) {
      throw new Error("Apenas o líder pode editar o time");
    }

    return await teamRepository.updateTeam(teamId, data);
  },
};
