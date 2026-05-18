import type { PrismaClient } from "@prisma/client";
import type { RankedProject } from "../types";

export class RankingRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByHackathon(hackathonId: string): Promise<RankedProject[]> {
    const rows = await this.prisma.ranking.findMany({
      where: { hackathonId },
      orderBy: { position: "asc" },
      include: {
        project: {
          select: { id: true, name: true, teamId: true, techStack: true },
        },
      },
    });

    return rows.map((row) => ({
      position: row.position,
      score: row.score,
      project: row.project,
    }));
  }
}
