import { describe, expect, it } from "vitest";
import {
  validateCreateProject,
  validateUpdateProject,
} from "../project.validator";

const validData = {
  name: "HackBot",
  description: "Um bot que automatiza tarefas do hackathon",
  teamId: "550e8400-e29b-41d4-a716-446655440000",
  techStack: ["TypeScript", "Node.js"],
};

describe("validateCreateProject", () => {
  it("succeeds with valid data", () => {
    expect(validateCreateProject(validData).success).toBe(true);
  });

  it("succeeds with optional URL fields", () => {
    const result = validateCreateProject({
      ...validData,
      repoUrl: "https://github.com/example/hackbot",
      demoUrl: "https://hackbot.example.com",
    });
    expect(result.success).toBe(true);
  });

  it("fails when name has fewer than 2 characters", () => {
    const result = validateCreateProject({ ...validData, name: "A" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Nome do projeto deve ter pelo menos 2 caracteres",
      );
    }
  });

  it("fails when description has fewer than 10 characters", () => {
    const result = validateCreateProject({
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

  it("fails when repoUrl is not a valid URL", () => {
    const result = validateCreateProject({
      ...validData,
      repoUrl: "github/example",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "URL do repositório inválida",
      );
    }
  });

  it("fails when demoUrl is not a valid URL", () => {
    const result = validateCreateProject({
      ...validData,
      demoUrl: "not-a-url",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "URL da demonstração inválida",
      );
    }
  });

  it("fails when techStack is empty", () => {
    const result = validateCreateProject({ ...validData, techStack: [] });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Selecione pelo menos uma tecnologia",
      );
    }
  });

  it("fails when techStack exceeds 15 items", () => {
    const result = validateCreateProject({
      ...validData,
      techStack: Array.from({ length: 16 }, (_, i) => `Tech${i}`),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Máximo de 15 tecnologias permitidas",
      );
    }
  });

  it("fails when teamId is not a valid UUID", () => {
    const result = validateCreateProject({
      ...validData,
      teamId: "not-a-uuid",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("ID da equipe inválido");
    }
  });

  it("fails when required fields are missing", () => {
    expect(validateCreateProject({}).success).toBe(false);
  });
});

describe("validateUpdateProject", () => {
  it("succeeds with empty object (all fields optional)", () => {
    expect(validateUpdateProject({}).success).toBe(true);
  });

  it("succeeds with partial data", () => {
    expect(
      validateUpdateProject({ name: "HackBot v2", techStack: ["Go"] }).success,
    ).toBe(true);
  });

  it("fails when provided repoUrl is invalid", () => {
    const result = validateUpdateProject({ repoUrl: "github/example" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "URL do repositório inválida",
      );
    }
  });
});
