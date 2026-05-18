import { createProjectSchema, updateProjectSchema } from "./project.schema";

export function validateCreateProject(data: unknown) {
  return createProjectSchema.safeParse(data);
}

export function validateUpdateProject(data: unknown) {
  return updateProjectSchema.safeParse(data);
}
