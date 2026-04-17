import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/modules/auth/services/auth.service";
import { RegisterData } from "@/modules/auth/types";

export async function POST(request: NextRequest) {
    try {
        const body: RegisterData = await request.json();

        if (!body.name || !body.email || !body.password) {
            return NextResponse.json(
                { message: "Nome, email e senha são obrigatórios." },
                { status: 400 }
            );
        }

        if (body.password.length < 6) {
            return NextResponse.json(
                { message: "A senha deve ter pelo menos 6 caracteres." },
                { status: 400 }
            );
        }

        const existingUser = await authService.validateUser({ email: body.email });
        if (existingUser) {
            return NextResponse.json(
                { message: "Usuário já existe com este email." },
                { status: 409 }
            );
        }

        const newUser = await authService.registerUser(body);
        if (!newUser) {
            return NextResponse.json(
                { message: "Erro ao criar conta." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Conta criada com sucesso!", user: { id: newUser.id, name: newUser.name, email: newUser.email } },
            { status: 201 }
        );
    } catch (error) {
        console.error("Erro no registro:", error);
        return NextResponse.json(
            { message: "Erro interno do servidor." },
            { status: 500 }
        );
    }
}