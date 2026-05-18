"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/core/auth/nextauth.config";
import { ResourceExistsException } from "@/shared/exceptions/resource-exists";
import { prisma } from "@/shared/lib/prisma";
import { HackathonRepository } from "../repositories/hackathon.repository";
import { HackathonService } from "../services/hackathon.service";
import { validateCreateHackathon } from "../validators/hackathon.validator";

export async function createHackathon(data: unknown) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return { success: false, message: "Não autorizado." };
  }

  const result = validateCreateHackathon(data);
  if (!result.success) {
    return { success: false, message: result.error.issues[0].message };
  }

  const service = new HackathonService(new HackathonRepository(prisma));
  try {
    const hackathon = await service.createHackathon({
      ...result.data,
      createdBy: session.userId,
    });
    return { success: true, hackathon };
  } catch (error) {
    if (error instanceof ResourceExistsException) {
      return {
        success: false,
        message: "Já existe um hackathon com este título.",
      };
    }
    return { success: false, message: "Erro interno do servidor." };
  }
}
