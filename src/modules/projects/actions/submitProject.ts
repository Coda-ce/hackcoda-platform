"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/core/auth/nextauth.config";
import { ResourceExistsException } from "@/shared/exceptions/resource-exists";
import { prisma } from "@/shared/lib/prisma";
import { ProjectRepository } from "../repositories/project.repository";
import { ProjectService } from "../services/project.service";
import { validateCreateProject } from "../validators/project.validator";

export async function submitProject(data: unknown) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { success: false, message: "Não autenticado." };
  }

  const result = validateCreateProject(data);
  if (!result.success) {
    return { success: false, message: result.error.issues[0].message };
  }

  const service = new ProjectService(new ProjectRepository(prisma));
  try {
    const project = await service.createProject(result.data);
    return { success: true, project };
  } catch (error) {
    if (error instanceof ResourceExistsException) {
      return {
        success: false,
        message: "Já existe um projeto com este nome nesta equipe.",
      };
    }
    return { success: false, message: "Erro interno do servidor." };
  }
}
