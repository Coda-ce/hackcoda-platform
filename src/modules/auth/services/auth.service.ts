import { AuthCredentials, AuthUser } from "../types";

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
    }
};