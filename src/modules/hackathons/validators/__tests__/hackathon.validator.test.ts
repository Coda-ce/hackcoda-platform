import { describe, expect, it } from "vitest";
import {
  validateCreateHackathon,
  validateUpdateHackathon,
} from "../hackathon.validator";

const validData = {
  title: "HackCoda 2025",
  description: "Hackathon anual da comunidade Coda",
  maxTeamSize: 4,
  registrationDeadline: "2025-08-01T00:00:00Z",
  startDate: "2025-08-10T00:00:00Z",
  endDate: "2025-08-12T00:00:00Z",
};

describe("validateCreateHackathon", () => {
  it("succeeds with valid data", () => {
    expect(validateCreateHackathon(validData).success).toBe(true);
  });

  it("succeeds with optional fields", () => {
    const result = validateCreateHackathon({
      ...validData,
      rules: "Sem plágio.",
      bannerUrl: "https://example.com/banner.png",
    });
    expect(result.success).toBe(true);
  });

  it("fails when title has fewer than 3 characters", () => {
    const result = validateCreateHackathon({ ...validData, title: "AB" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Título deve ter pelo menos 3 caracteres",
      );
    }
  });

  it("fails when title exceeds 100 characters", () => {
    const result = validateCreateHackathon({
      ...validData,
      title: "A".repeat(101),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Título deve ter no máximo 100 caracteres",
      );
    }
  });

  it("fails when description has fewer than 10 characters", () => {
    const result = validateCreateHackathon({
      ...validData,
      description: "Curto",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Descrição deve ter pelo menos 10 caracteres",
      );
    }
  });

  it("fails when maxTeamSize is below 2", () => {
    const result = validateCreateHackathon({ ...validData, maxTeamSize: 1 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Equipe deve ter pelo menos 2 integrantes",
      );
    }
  });

  it("fails when maxTeamSize exceeds 10", () => {
    const result = validateCreateHackathon({ ...validData, maxTeamSize: 11 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Equipe deve ter no máximo 10 integrantes",
      );
    }
  });

  it("fails when startDate is not a valid ISO datetime", () => {
    const result = validateCreateHackathon({
      ...validData,
      startDate: "10/08/2025",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Data de início inválida");
    }
  });

  it("fails when endDate is before startDate", () => {
    const result = validateCreateHackathon({
      ...validData,
      startDate: "2025-08-12T00:00:00Z",
      endDate: "2025-08-10T00:00:00Z",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Data de término deve ser posterior à data de início",
      );
    }
  });

  it("fails when registrationDeadline is after startDate", () => {
    const result = validateCreateHackathon({
      ...validData,
      registrationDeadline: "2025-08-15T00:00:00Z",
      startDate: "2025-08-10T00:00:00Z",
      endDate: "2025-08-20T00:00:00Z",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Prazo de inscrição deve ser anterior ou igual à data de início",
      );
    }
  });

  it("fails when required fields are missing", () => {
    expect(validateCreateHackathon({}).success).toBe(false);
  });
});

describe("validateUpdateHackathon", () => {
  it("succeeds with empty object (all fields optional)", () => {
    expect(validateUpdateHackathon({}).success).toBe(true);
  });

  it("succeeds with partial data", () => {
    expect(
      validateUpdateHackathon({ title: "Novo título atualizado" }).success,
    ).toBe(true);
  });

  it("fails when provided maxTeamSize is invalid", () => {
    const result = validateUpdateHackathon({ maxTeamSize: 0 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Equipe deve ter pelo menos 2 integrantes",
      );
    }
  });
});
