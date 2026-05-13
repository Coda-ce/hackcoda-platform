import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/core/auth/nextauth.config";
import { teamService } from "@/modules/teams/services/team.service";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    let userId = (session.user as any).id;

    // Fallback: if id is not in session, try to get from email
    if (!userId && (session.user as any).email) {
      const userRepo = new (await import("@/modules/users/repositories/user.repository")).UserRepository(
        (await import("@/shared/lib/prisma")).prisma
      );
      const user = await userRepo.findByEmail((session.user as any).email);
      userId = user?.id;
    }

    if (!userId) {
      return NextResponse.json({ error: "Usuário não identificado" }, { status: 400 });
    }

    const { action } = await req.json();

    if (action === "join") {
      const membership = await teamService.joinTeam(userId, params.id);
      return NextResponse.json(membership);
    }

    if (action === "leave") {
      await teamService.leaveTeam(userId, params.id);
      return NextResponse.json({ success: true });
    }

    if (action === "delete") {
      await teamService.deleteTeam(params.id, userId);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Ação não suportada" }, { status: 400 });
  } catch (error: any) {
    console.error("Erro na operação do time:", error);
    return NextResponse.json(
      { error: error.message || "Erro na operação" },
      { status: 500 }
    );
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const team = await teamService.getTeamById(params.id);

    if (!team) {
      return NextResponse.json({ error: "Time não encontrado" }, { status: 404 });
    }

    return NextResponse.json(team);
  } catch (error: any) {
    console.error("Erro ao buscar time:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao buscar time" },
      { status: 500 }
    );
  }
}
