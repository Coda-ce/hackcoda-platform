import { beforeEach, describe, expect, it, vi } from "vitest";
import { ResourceExistsException } from "@/shared/exceptions/resource-exists";
import type { Project } from "../../types";
import { ProjectService } from "../project.service";

const mockProject: Project = {
  id: "uuid-proj-1",
  name: "HackBot",
  description: "Um bot que automatiza tarefas do hackathon",
  teamId: "550e8400-e29b-41d4-a716-446655440000",
  repoUrl: null,
  demoUrl: null,
  techStack: ["TypeScript", "Node.js"],
  status: "DRAFT",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const validCreateData = {
  name: "HackBot",
  description: "Um bot que automatiza tarefas do hackathon",
  teamId: "550e8400-e29b-41d4-a716-446655440000",
  techStack: ["TypeScript", "Node.js"],
};

const makeRepo = (overrides: Record<string, ReturnType<typeof vi.fn>> = {}) =>
  ({
    create: vi.fn(),
    findByNameAndTeam: vi.fn(),
    ...overrides,
  }) as never;

describe("ProjectService.createProject", () => {
  beforeEach(() => vi.clearAllMocks());

  it("throws ResourceExistsException when project name already exists in the team", async () => {
    const service = new ProjectService(
      makeRepo({ findByNameAndTeam: vi.fn().mockResolvedValue(mockProject) }),
    );
    await expect(service.createProject(validCreateData)).rejects.toBeInstanceOf(
      ResourceExistsException,
    );
  });

  it("creates and returns project when name is available", async () => {
    const create = vi.fn().mockResolvedValue(mockProject);
    const service = new ProjectService(
      makeRepo({
        findByNameAndTeam: vi.fn().mockResolvedValue(null),
        create,
      }),
    );
    const result = await service.createProject(validCreateData);
    expect(result).toEqual(mockProject);
    expect(create).toHaveBeenCalledWith(validCreateData);
  });
});
