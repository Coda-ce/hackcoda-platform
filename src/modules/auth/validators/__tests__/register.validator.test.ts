import { describe, expect, it } from "vitest";
import { validateRegisterData } from "../register.validator";

describe("validateRegisterData", () => {
  it("succeeds with valid data", () => {
    const result = validateRegisterData({
      name: "Ana",
      email: "ana@example.com",
      password: "secret123",
    });
    expect(result.success).toBe(true);
  });

  it("fails when name is empty", () => {
    const result = validateRegisterData({
      name: "",
      email: "ana@example.com",
      password: "secret123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Nome é obrigatório");
    }
  });

  it("fails when email is invalid", () => {
    const result = validateRegisterData({
      name: "Ana",
      email: "not-an-email",
      password: "secret123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Email inválido");
    }
  });

  it("fails when password has fewer than 6 characters", () => {
    const result = validateRegisterData({
      name: "Ana",
      email: "ana@example.com",
      password: "123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Senha deve ter pelo menos 6 caracteres",
      );
    }
  });

  it("fails when required fields are missing", () => {
    const result = validateRegisterData({});
    expect(result.success).toBe(false);
  });
});
