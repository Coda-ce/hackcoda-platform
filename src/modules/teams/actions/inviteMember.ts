"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/core/auth/nextauth.config";
import { prisma } from "@/shared/lib/prisma";
import { TeamRepository } from "../repositories/team.repository";
import { validateJoinTeam } from "../validators/team.validator";

export async function joinTeamByInviteCode(data: unknown) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { success: false, message: "Não autenticado." };
  }

  const result = validateJoinTeam(data);
  if (!result.success) {
    return { success: false, message: result.error.issues[0].message };
  }

  const repository = new TeamRepository(prisma);
  const team = await repository.findByInviteCode(result.data.inviteCode);
  if (!team) {
    return { success: false, message: "Código de convite inválido." };
  }

  return { success: true, team };
}
