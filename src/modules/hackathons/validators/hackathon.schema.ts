import { z } from "zod";

const hackathonBaseSchema = z.object({
  title: z
    .string()
    .min(3, "Título deve ter pelo menos 3 caracteres")
    .max(100, "Título deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(2000, "Descrição deve ter no máximo 2000 caracteres"),
  rules: z
    .string()
    .max(5000, "Regras deve ter no máximo 5000 caracteres")
    .optional(),
  bannerUrl: z.url("URL do banner inválida").optional(),
  maxTeamSize: z
    .number({ error: "Tamanho máximo de equipe deve ser um número" })
    .int("Tamanho máximo de equipe deve ser inteiro")
    .min(2, "Equipe deve ter pelo menos 2 integrantes")
    .max(10, "Equipe deve ter no máximo 10 integrantes"),
  registrationDeadline: z.iso.datetime({
    error: "Prazo de inscrição inválido",
  }),
  startDate: z.iso.datetime({ error: "Data de início inválida" }),
  endDate: z.iso.datetime({ error: "Data de término inválida" }),
});

export const createHackathonSchema = hackathonBaseSchema
  .refine((data) => new Date(data.startDate) < new Date(data.endDate), {
    message: "Data de término deve ser posterior à data de início",
    path: ["endDate"],
  })
  .refine(
    (data) => new Date(data.registrationDeadline) <= new Date(data.startDate),
    {
      message: "Prazo de inscrição deve ser anterior ou igual à data de início",
      path: ["registrationDeadline"],
    },
  );

export const updateHackathonSchema = hackathonBaseSchema.partial();

export type CreateHackathonSchema = z.infer<typeof createHackathonSchema>;
export type UpdateHackathonSchema = z.infer<typeof updateHackathonSchema>;
