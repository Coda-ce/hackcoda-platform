import bcrypt from "bcryptjs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ResourceExistsException } from "@/shared/exceptions/resource-exists";
import { authService } from "../auth.service";

vi.mock("@/shared/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock("bcryptjs", () => ({
  default: {
    compare: vi.fn(),
    hash: vi.fn(),
  },
}));

import { prisma } from "@/shared/lib/prisma";

const mockUser = {
  id: "uuid-1",
  name: "Ana",
  email: "ana@example.com",
  password: "hashed_password",
  role: "USER" as const,
  photo: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("authService.validateUser", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns null when user is not found", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
    const result = await authService.validateUser({
      email: "ghost@example.com",
      password: "pass",
    });
    expect(result).toBeNull();
  });

  it("returns null when credentials.password is absent", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser);
    const result = await authService.validateUser({
      email: "ana@example.com",
    });
    expect(result).toBeNull();
  });

  it("returns null when password is wrong", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser);
    vi.mocked(bcrypt.compare).mockResolvedValue(false as never);
    const result = await authService.validateUser({
      email: "ana@example.com",
      password: "wrong",
    });
    expect(result).toBeNull();
  });

  it("returns AuthUser when credentials are valid", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser);
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never);
    const result = await authService.validateUser({
      email: "ana@example.com",
      password: "secret123",
    });
    expect(result).toEqual({
      id: "uuid-1",
      name: "Ana",
      email: "ana@example.com",
      role: "USER",
    });
  });
});

describe("authService.registerUser", () => {
  beforeEach(() => vi.clearAllMocks());

  it("throws ResourceExistsException when email is already taken", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser);
    await expect(
      authService.registerUser({
        name: "Ana",
        email: "ana@example.com",
        password: "secret123",
      }),
    ).rejects.toBeInstanceOf(ResourceExistsException);
  });

  it("creates user and returns AuthUser on success", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
    vi.mocked(bcrypt.hash).mockResolvedValue("hashed_password" as never);
    vi.mocked(prisma.user.create).mockResolvedValue(mockUser);

    const result = await authService.registerUser({
      name: "Ana",
      email: "ana@example.com",
      password: "secret123",
    });

    expect(bcrypt.hash).toHaveBeenCalledWith("secret123", 10);
    expect(result).toEqual({
      id: "uuid-1",
      name: "Ana",
      email: "ana@example.com",
      role: "USER",
    });
  });
});
