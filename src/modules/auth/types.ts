

export interface AuthCredentials {
    email: string;
    password?: string;
}

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "USER";
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}