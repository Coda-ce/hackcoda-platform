import { z } from "zod";

export const createTeamSchema = z.object({
  name: z
    .string()
    .min(2, "Nome da equipe deve ter pelo menos 2 caracteres")
    .max(50, "Nome da equipe deve ter no máximo 50 caracteres"),
  description: z
    .string()
    .max(500, "Descrição deve ter no máximo 500 caracteres")
    .optional(),
  hackathonId: z.uuid("ID do hackathon inválido"),
});

export const joinTeamSchema = z.object({
  inviteCode: z
    .string()
    .length(8, "Código de convite deve ter 8 caracteres")
    .regex(/^[A-Z0-9]+$/, "Código de convite inválido"),
});

export type CreateTeamSchema = z.infer<typeof createTeamSchema>;
export type JoinTeamSchema = z.infer<typeof joinTeamSchema>;
