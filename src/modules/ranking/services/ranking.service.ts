import type { RankingRepository } from "../repositories/ranking.repository";
import type { RankedProject } from "../types";

export class RankingService {
  constructor(private readonly rankingRepository: RankingRepository) {}

  async getHackathonRanking(hackathonId: string): Promise<RankedProject[]> {
    return this.rankingRepository.findByHackathon(hackathonId);
  }
}
