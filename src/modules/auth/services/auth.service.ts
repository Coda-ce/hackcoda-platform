import { AuthCredentials, AuthUser, RegisterData } from "../types";
import { prisma } from "@/shared/lib/prisma";
import { ResourceExistsException } from "@/shared/exceptions/resource-exists";
import bcrypt from "bcryptjs";

export const authService = {
    /**
     * Valida as credenciais do usuário
     * @param credentials - Objeto com email e password
     */
    async validateUser(credentials: AuthCredentials): Promise<AuthUser | null> {
        const user = await prisma.user.findUnique({
            where: { email: credentials.email }
        });

        if (!user || !user.password) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (isPasswordValid) {
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            };
        }

        return null;
    },

    /**
     * Registra um novo usuário
     * @param data
     */
    async registerUser(data: RegisterData): Promise<AuthUser | null> {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (existingUser) {
            throw new ResourceExistsException("email");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: "USER" // Default role
            }
        });

        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        };
    }
};