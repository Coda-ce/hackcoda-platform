import { ResourceExistsException } from "@/shared/exceptions/resource-exists";
import type { TeamRepository } from "../repositories/team.repository";
import type { CreateTeamData, Team } from "../types";

function generateInviteCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length: 8 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}

export class TeamService {
  constructor(private readonly teamRepository: TeamRepository) {}

  async createTeam(data: CreateTeamData): Promise<Team> {
    const existing = await this.teamRepository.findByNameAndHackathon(
      data.name,
      data.hackathonId,
    );
    if (existing) {
      throw new ResourceExistsException("Team");
    }
    const inviteCode = generateInviteCode();
    return this.teamRepository.create({ ...data, inviteCode });
  }
}
