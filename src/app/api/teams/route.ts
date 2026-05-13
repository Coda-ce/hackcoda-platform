import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/core/auth/nextauth.config";
import { teamService } from "@/modules/teams/services/team.service";
import { createTeamSchema } from "@/modules/teams/validators/team.schema";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");
    const query = searchParams.get("q");

    if (!session?.user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    if (action === "my-teams") {
      const teams = await teamService.getUserTeams(userId);
      return NextResponse.json(teams);
    }

    if (action === "search" && query) {
      const teams = await teamService.searchTeams(query);
      return NextResponse.json(teams);
    }

    if (action === "led") {
      const teams = await teamService.getTeamsByLeader(userId);
      return NextResponse.json(teams);
    }

    const teams = await teamService.getAllTeams();
    return NextResponse.json(teams);
  } catch (error: any) {
    console.error("Erro ao buscar times:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao buscar times" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
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

    const body = await req.json();
    const validatedData = createTeamSchema.parse(body);

    const team = await teamService.createTeam(
      validatedData.name,
      validatedData.description,
      userId
    );

    return NextResponse.json(team, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar time:", error);
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: error.message || "Erro ao criar time" },
      { status: 500 }
    );
  }
}
