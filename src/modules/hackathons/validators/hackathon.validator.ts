import {
  createHackathonSchema,
  updateHackathonSchema,
} from "./hackathon.schema";

export function validateCreateHackathon(data: unknown) {
  return createHackathonSchema.safeParse(data);
}

export function validateUpdateHackathon(data: unknown) {
  return updateHackathonSchema.safeParse(data);
}
