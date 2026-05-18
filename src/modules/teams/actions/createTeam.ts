"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/core/auth/nextauth.config";
import { ResourceExistsException } from "@/shared/exceptions/resource-exists";
import { prisma } from "@/shared/lib/prisma";
import { TeamRepository } from "../repositories/team.repository";
import { TeamService } from "../services/team.service";
import { validateCreateTeam } from "../validators/team.validator";

export async function createTeam(data: unknown) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { success: false, message: "Não autenticado." };
  }

  const result = validateCreateTeam(data);
  if (!result.success) {
    return { success: false, message: result.error.issues[0].message };
  }

  const service = new TeamService(new TeamRepository(prisma));
  try {
    const team = await service.createTeam({
      ...result.data,
      leaderId: session.userId,
    });
    return { success: true, team };
  } catch (error) {
    if (error instanceof ResourceExistsException) {
      return {
        success: false,
        message: "Já existe uma equipe com este nome neste hackathon.",
      };
    }
    return { success: false, message: "Erro interno do servidor." };
  }
}
