import { beforeEach, describe, expect, it, vi } from "vitest";
import { ResourceExistsException } from "@/shared/exceptions/resource-exists";
import type { Hackathon } from "../../types";
import { HackathonService } from "../hackathon.service";

const mockHackathon: Hackathon = {
  id: "uuid-hack-1",
  title: "HackCoda 2025",
  description: "Hackathon anual da comunidade Coda",
  rules: null,
  bannerUrl: null,
  maxTeamSize: 4,
  registrationDeadline: new Date("2025-08-01T00:00:00.000Z"),
  startDate: new Date("2025-08-10T00:00:00.000Z"),
  endDate: new Date("2025-08-12T00:00:00.000Z"),
  status: "DRAFT",
  createdBy: "user-uuid-1",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const validCreateData = {
  title: "HackCoda 2025",
  description: "Hackathon anual da comunidade Coda",
  maxTeamSize: 4,
  registrationDeadline: "2025-08-01T00:00:00.000Z",
  startDate: "2025-08-10T00:00:00.000Z",
  endDate: "2025-08-12T00:00:00.000Z",
  createdBy: "user-uuid-1",
};

const makeRepo = (overrides: Record<string, ReturnType<typeof vi.fn>> = {}) =>
  ({
    create: vi.fn(),
    findByTitle: vi.fn(),
    ...overrides,
  }) as never;

describe("HackathonService.createHackathon", () => {
  beforeEach(() => vi.clearAllMocks());

  it("throws ResourceExistsException when title is already taken", async () => {
    const service = new HackathonService(
      makeRepo({ findByTitle: vi.fn().mockResolvedValue(mockHackathon) }),
    );
    await expect(
      service.createHackathon(validCreateData),
    ).rejects.toBeInstanceOf(ResourceExistsException);
  });

  it("creates and returns hackathon when title is available", async () => {
    const create = vi.fn().mockResolvedValue(mockHackathon);
    const service = new HackathonService(
      makeRepo({ findByTitle: vi.fn().mockResolvedValue(null), create }),
    );
    const result = await service.createHackathon(validCreateData);
    expect(result).toEqual(mockHackathon);
    expect(create).toHaveBeenCalledWith(validCreateData);
  });
});
