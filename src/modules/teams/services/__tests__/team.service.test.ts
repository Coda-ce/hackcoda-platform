import { beforeEach, describe, expect, it, vi } from "vitest";
import { ResourceExistsException } from "@/shared/exceptions/resource-exists";
import type { Team } from "../../types";
import { TeamService } from "../team.service";

const mockTeam: Team = {
  id: "uuid-team-1",
  name: "Code Breakers",
  description: null,
  hackathonId: "550e8400-e29b-41d4-a716-446655440000",
  leaderId: "user-uuid-1",
  inviteCode: "ABCD1234",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const validCreateData = {
  name: "Code Breakers",
  hackathonId: "550e8400-e29b-41d4-a716-446655440000",
  leaderId: "user-uuid-1",
};

const makeRepo = (overrides: Record<string, ReturnType<typeof vi.fn>> = {}) =>
  ({
    create: vi.fn(),
    findByNameAndHackathon: vi.fn(),
    ...overrides,
  }) as never;

describe("TeamService.createTeam", () => {
  beforeEach(() => vi.clearAllMocks());

  it("throws ResourceExistsException when team name already exists in the hackathon", async () => {
    const service = new TeamService(
      makeRepo({ findByNameAndHackathon: vi.fn().mockResolvedValue(mockTeam) }),
    );
    await expect(service.createTeam(validCreateData)).rejects.toBeInstanceOf(
      ResourceExistsException,
    );
  });

  it("creates team and returns it with a generated inviteCode", async () => {
    const create = vi.fn().mockResolvedValue(mockTeam);
    const service = new TeamService(
      makeRepo({
        findByNameAndHackathon: vi.fn().mockResolvedValue(null),
        create,
      }),
    );
    const result = await service.createTeam(validCreateData);
    expect(result).toEqual(mockTeam);
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        ...validCreateData,
        inviteCode: expect.stringMatching(/^[A-Z0-9]{8}$/),
      }),
    );
  });
});
