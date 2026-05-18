import { describe, expect, it } from "vitest";
import { validateCreateTeam, validateJoinTeam } from "../team.validator";

const validTeamData = {
  name: "Code Breakers",
  hackathonId: "550e8400-e29b-41d4-a716-446655440000",
};

describe("validateCreateTeam", () => {
  it("succeeds with valid data", () => {
    expect(validateCreateTeam(validTeamData).success).toBe(true);
  });

  it("succeeds with optional description", () => {
    expect(
      validateCreateTeam({
        ...validTeamData,
        description: "Nossa equipe incrível",
      }).success,
    ).toBe(true);
  });

  it("fails when name has fewer than 2 characters", () => {
    const result = validateCreateTeam({ ...validTeamData, name: "A" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Nome da equipe deve ter pelo menos 2 caracteres",
      );
    }
  });

  it("fails when name exceeds 50 characters", () => {
    const result = validateCreateTeam({
      ...validTeamData,
      name: "A".repeat(51),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Nome da equipe deve ter no máximo 50 caracteres",
      );
    }
  });

  it("fails when description exceeds 500 characters", () => {
    const result = validateCreateTeam({
      ...validTeamData,
      description: "A".repeat(501),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Descrição deve ter no máximo 500 caracteres",
      );
    }
  });

  it("fails when hackathonId is not a valid UUID", () => {
    const result = validateCreateTeam({
      ...validTeamData,
      hackathonId: "not-a-uuid",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("ID do hackathon inválido");
    }
  });

  it("fails when required fields are missing", () => {
    expect(validateCreateTeam({}).success).toBe(false);
  });
});

describe("validateJoinTeam", () => {
  it("succeeds with valid 8-char uppercase alphanumeric code", () => {
    expect(validateJoinTeam({ inviteCode: "ABC12345" }).success).toBe(true);
  });

  it("fails when code has fewer than 8 characters", () => {
    const result = validateJoinTeam({ inviteCode: "ABC123" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Código de convite deve ter 8 caracteres",
      );
    }
  });

  it("fails when code has more than 8 characters", () => {
    const result = validateJoinTeam({ inviteCode: "ABC123456" });
    expect(result.success).toBe(false);
  });

  it("fails when code contains lowercase letters", () => {
    const result = validateJoinTeam({ inviteCode: "abc12345" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Código de convite inválido");
    }
  });

  it("fails when required field is missing", () => {
    expect(validateJoinTeam({}).success).toBe(false);
  });
});
