"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (!result?.error) {
            router.push("/dashboard");
            router.refresh();
        } else {
            alert("Erro ao logar!");
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
                <h1 className="text-2xl font-bold">Login HackCoda</h1>
                <input
                    type="email"
                    placeholder="E-mail"
                    className="p-2 border rounded text-black"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    className="p-2 border rounded text-black"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Entrar
                </button>
            </form>
        </main>
    );
}