import { beforeEach, describe, expect, it, vi } from "vitest";
import { ResourceExistsException } from "@/shared/exceptions/resource-exists";
import { ResourceNotFoundException } from "@/shared/exceptions/resource-not-found";
import { UserService } from "../user.service";

vi.mock("bcryptjs", () => ({
  default: { hash: vi.fn().mockResolvedValue("hashed") },
}));

const mockUser = {
  id: "uuid-1",
  name: "Ana",
  email: "ana@example.com",
  password: "hashed",
  role: "USER" as const,
  photo: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const makeRepo = (overrides: Record<string, ReturnType<typeof vi.fn>> = {}) =>
  ({
    create: vi.fn(),
    findByEmail: vi.fn(),
    findById: vi.fn(),
    ...overrides,
  }) as never;

describe("UserService.getUserById", () => {
  it("throws ResourceNotFoundException when user is not found", async () => {
    const service = new UserService(
      makeRepo({ findById: vi.fn().mockResolvedValue(null) }),
    );
    await expect(service.getUserById("missing")).rejects.toBeInstanceOf(
      ResourceNotFoundException,
    );
  });

  it("returns user when found", async () => {
    const service = new UserService(
      makeRepo({ findById: vi.fn().mockResolvedValue(mockUser) }),
    );
    await expect(service.getUserById("uuid-1")).resolves.toEqual(mockUser);
  });
});

describe("UserService.getUserByEmail", () => {
  it("throws ResourceNotFoundException when user is not found", async () => {
    const service = new UserService(
      makeRepo({ findByEmail: vi.fn().mockResolvedValue(null) }),
    );
    await expect(service.getUserByEmail("ghost@x.com")).rejects.toBeInstanceOf(
      ResourceNotFoundException,
    );
  });

  it("returns user when found", async () => {
    const service = new UserService(
      makeRepo({ findByEmail: vi.fn().mockResolvedValue(mockUser) }),
    );
    await expect(service.getUserByEmail("ana@example.com")).resolves.toEqual(
      mockUser,
    );
  });
});

describe("UserService.registerUser", () => {
  it("throws ResourceExistsException when email is already taken", async () => {
    const service = new UserService(
      makeRepo({ findByEmail: vi.fn().mockResolvedValue(mockUser) }),
    );
    await expect(
      service.registerUser({
        name: "Ana",
        email: "ana@example.com",
        password: "secret",
      }),
    ).rejects.toBeInstanceOf(ResourceExistsException);
  });

  it("hashes password and creates user successfully", async () => {
    const create = vi.fn().mockResolvedValue(undefined);
    const service = new UserService(
      makeRepo({ findByEmail: vi.fn().mockResolvedValue(null), create }),
    );
    await expect(
      service.registerUser({
        name: "Ana",
        email: "ana@example.com",
        password: "secret",
      }),
    ).resolves.toBeUndefined();
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({ email: "ana@example.com", password: "hashed" }),
    );
  });
});
