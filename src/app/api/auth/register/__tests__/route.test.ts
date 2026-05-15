import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ResourceExistsException } from "@/shared/exceptions/resource-exists";

vi.mock("@/modules/auth/services/auth.service", () => ({
  authService: { registerUser: vi.fn() },
}));

import { authService } from "@/modules/auth/services/auth.service";
import { POST } from "../route";

const makeRequest = (body: unknown) =>
  new NextRequest("http://localhost/api/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

describe("POST /api/auth/register", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 400 when data fails validation", async () => {
    const res = await POST(
      makeRequest({ name: "", email: "bad", password: "123" }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 409 when email is already registered", async () => {
    vi.mocked(authService.registerUser).mockRejectedValue(
      new ResourceExistsException("email"),
    );
    const res = await POST(
      makeRequest({
        name: "Ana",
        email: "ana@example.com",
        password: "secret123",
      }),
    );
    expect(res.status).toBe(409);
  });

  it("returns 201 with user data on success", async () => {
    vi.mocked(authService.registerUser).mockResolvedValue({
      id: "uuid-1",
      name: "Ana",
      email: "ana@example.com",
      role: "USER",
    });
    const res = await POST(
      makeRequest({
        name: "Ana",
        email: "ana@example.com",
        password: "secret123",
      }),
    );
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.user).toEqual({
      id: "uuid-1",
      name: "Ana",
      email: "ana@example.com",
    });
  });

  it("returns 500 on unexpected errors", async () => {
    vi.mocked(authService.registerUser).mockRejectedValue(new Error("db down"));
    const res = await POST(
      makeRequest({
        name: "Ana",
        email: "ana@example.com",
        password: "secret123",
      }),
    );
    expect(res.status).toBe(500);
  });
});
