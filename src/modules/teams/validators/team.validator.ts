import { createTeamSchema, joinTeamSchema } from "./team.schema";

export function validateCreateTeam(data: unknown) {
  return createTeamSchema.safeParse(data);
}

export function validateJoinTeam(data: unknown) {
  return joinTeamSchema.safeParse(data);
}
