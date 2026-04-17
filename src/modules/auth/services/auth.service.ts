import { AuthCredentials, AuthUser, RegisterData } from "../types";

export const authService = {
    /**
     * Valida as credenciais do usuário
     * @param credentials - Objeto com email e password
     */
    async validateUser(credentials: AuthCredentials): Promise<AuthUser | null> {

        const mockUser: AuthUser = {
            id: "1",
            email: "admin@hackcoda.com",
            name: "Admin HackCoda",
            role: "ADMIN"
        };

        const isPasswordValid = credentials.password === "123456";

        if (credentials.email === mockUser.email && isPasswordValid) {
            return mockUser;
        }

        return null;
    },

    /**
     * Registra um novo usuário
     * @param data
     */
    async registerUser(data: RegisterData): Promise<AuthUser | null> {
        if (data.email === "admin@hackcoda.com") {
            return null;
        }

        const newUser: AuthUser = {
            id: Date.now().toString(),
            name: data.name,
            email: data.email,
            role: "USER"
        };
        return newUser;
    }
};