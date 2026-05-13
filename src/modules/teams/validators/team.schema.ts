import * as z from "zod";

export const createTeamSchema = z.object({
  name: z.string().min(2, "Nome do time deve ter no mínimo 2 caracteres").max(50, "Nome do time deve ter no máximo 50 caracteres"),
  description: z.string().max(200, "Descrição deve ter no máximo 200 caracteres").optional(),
});

export type CreateTeamInput = z.infer<typeof createTeamSchema>;

export const updateTeamSchema = z.object({
  name: z.string().min(2, "Nome do time deve ter no mínimo 2 caracteres").max(50, "Nome do time deve ter no máximo 50 caracteres").optional(),
  description: z.string().max(200, "Descrição deve ter no máximo 200 caracteres").optional(),
});

export type UpdateTeamInput = z.infer<typeof updateTeamSchema>;
