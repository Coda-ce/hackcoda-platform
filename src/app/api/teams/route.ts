import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/core/auth/nextauth.config";
import { TeamRepository } from "@/modules/teams/repositories/team.repository";
import { TeamService } from "@/modules/teams/services/team.service";
import { validateCreateTeam } from "@/modules/teams/validators/team.validator";
import { ResourceExistsException } from "@/shared/exceptions/resource-exists";
import { prisma } from "@/shared/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: "Não autenticado." },
        { status: 401 },
      );
    }

    const body: unknown = await request.json();
    const result = validateCreateTeam(body);
    if (!result.success) {
      return NextResponse.json(
        { message: result.error.issues[0].message },
        { status: 400 },
      );
    }

    const service = new TeamService(new TeamRepository(prisma));
    const team = await service.createTeam({
      ...result.data,
      leaderId: session.userId,
    });

    return NextResponse.json({ team }, { status: 201 });
  } catch (error) {
    if (error instanceof ResourceExistsException) {
      return NextResponse.json(
        { message: "Já existe uma equipe com este nome neste hackathon." },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { message: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
