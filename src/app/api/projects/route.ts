import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/core/auth/nextauth.config";
import { ProjectRepository } from "@/modules/projects/repositories/project.repository";
import { ProjectService } from "@/modules/projects/services/project.service";
import { validateCreateProject } from "@/modules/projects/validators/project.validator";
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
    const result = validateCreateProject(body);
    if (!result.success) {
      return NextResponse.json(
        { message: result.error.issues[0].message },
        { status: 400 },
      );
    }

    const service = new ProjectService(new ProjectRepository(prisma));
    const project = await service.createProject(result.data);

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    if (error instanceof ResourceExistsException) {
      return NextResponse.json(
        { message: "Já existe um projeto com este nome nesta equipe." },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { message: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
