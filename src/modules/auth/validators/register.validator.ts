import { registerSchema } from "./register.schema";

export function validateRegisterData(data: unknown) {
  return registerSchema.safeParse(data);
}
