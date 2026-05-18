import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/core/auth/nextauth.config";
import { HackathonRepository } from "@/modules/hackathons/repositories/hackathon.repository";
import { HackathonService } from "@/modules/hackathons/services/hackathon.service";
import { validateCreateHackathon } from "@/modules/hackathons/validators/hackathon.validator";
import { ResourceExistsException } from "@/shared/exceptions/resource-exists";
import { prisma } from "@/shared/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }

    const body: unknown = await request.json();
    const result = validateCreateHackathon(body);
    if (!result.success) {
      return NextResponse.json(
        { message: result.error.issues[0].message },
        { status: 400 },
      );
    }

    const service = new HackathonService(new HackathonRepository(prisma));
    const hackathon = await service.createHackathon({
      ...result.data,
      createdBy: session.userId,
    });

    return NextResponse.json({ hackathon }, { status: 201 });
  } catch (error) {
    if (error instanceof ResourceExistsException) {
      return NextResponse.json(
        { message: "Já existe um hackathon com este título." },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { message: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
