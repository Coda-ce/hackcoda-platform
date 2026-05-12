import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/modules/auth/services/auth.service";
import { validateRegisterData } from "@/modules/auth/validators/register.validator";
import { ResourceExistsException } from "@/shared/exceptions/resource-exists";

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    const result = validateRegisterData(body);
    if (!result.success) {
      return NextResponse.json(
        { message: result.error.issues[0].message },
        { status: 400 },
      );
    }

    const newUser = await authService.registerUser(result.data);

    return NextResponse.json(
      {
        message: "Conta criada com sucesso!",
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ResourceExistsException) {
      return NextResponse.json(
        { message: "Este e-mail já está cadastrado." },
        { status: 409 },
      );
    }

    console.error("Erro no registro:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
