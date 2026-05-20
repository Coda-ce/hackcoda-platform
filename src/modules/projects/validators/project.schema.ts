import { z } from "zod";

const projectBaseSchema = z.object({
  name: z
    .string()
    .min(2, "Nome do projeto deve ter pelo menos 2 caracteres")
    .max(100, "Nome do projeto deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(2000, "Descrição deve ter no máximo 2000 caracteres"),
  repoUrl: z.url("URL do repositório inválida").optional(),
  demoUrl: z.url("URL da demonstração inválida").optional(),
  techStack: z
    .array(z.string().min(1))
    .min(1, "Selecione pelo menos uma tecnologia")
    .max(15, "Máximo de 15 tecnologias permitidas"),
});

export const createProjectSchema = projectBaseSchema.extend({
  teamId: z.uuid("ID da equipe inválido"),
});

export const updateProjectSchema = projectBaseSchema.partial();

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;
