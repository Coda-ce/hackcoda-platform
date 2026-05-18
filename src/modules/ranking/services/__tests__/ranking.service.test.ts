import { beforeEach, describe, expect, it, vi } from "vitest";
import type { RankedProject } from "../../types";
import { RankingService } from "../ranking.service";

const mockRankedProjects: RankedProject[] = [
  {
    position: 1,
    score: 95,
    project: {
      id: "project-uuid-1",
      name: "HealthTrack",
      teamId: "team-uuid-1",
      techStack: ["Next.js", "Prisma"],
    },
  },
  {
    position: 2,
    score: 88,
    project: {
      id: "project-uuid-2",
      name: "EcoMap",
      teamId: "team-uuid-2",
      techStack: ["React", "Node.js"],
    },
  },
];

const makeRepo = (overrides: Record<string, ReturnType<typeof vi.fn>> = {}) =>
  ({
    findByHackathon: vi.fn(),
    ...overrides,
  }) as never;

describe("RankingService.getHackathonRanking", () => {
  beforeEach(() => vi.clearAllMocks());

  it("retorna lista vazia quando não há rankings para o hackathon", async () => {
    const service = new RankingService(
      makeRepo({ findByHackathon: vi.fn().mockResolvedValue([]) }),
    );
    const result = await service.getHackathonRanking("hackathon-uuid-1");
    expect(result).toEqual([]);
  });

  it("retorna os projetos ranqueados ordenados por posição", async () => {
    const service = new RankingService(
      makeRepo({
        findByHackathon: vi.fn().mockResolvedValue(mockRankedProjects),
      }),
    );
    const result = await service.getHackathonRanking("hackathon-uuid-1");
    expect(result).toEqual(mockRankedProjects);
    expect(result[0].position).toBeLessThan(result[1].position);
  });

  it("delega ao repositório com o hackathonId correto", async () => {
    const findByHackathon = vi.fn().mockResolvedValue(mockRankedProjects);
    const service = new RankingService(makeRepo({ findByHackathon }));
    await service.getHackathonRanking("hackathon-uuid-42");
    expect(findByHackathon).toHaveBeenCalledOnce();
    expect(findByHackathon).toHaveBeenCalledWith("hackathon-uuid-42");
  });
});
