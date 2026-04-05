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
            alert("Erro ao logar! Verifique suas credenciais.");
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-brasil-preto px-4 py-8 font-['Inter']">
            <div className="flex w-full max-w-7xl overflow-hidden rounded-3xl bg-brasil-cinza shadow-2xl border border-white/5">

                <div className="relative hidden lg:flex w-1/2 flex-col justify-between bg-brasil-verde p-16 text-brasil-preto">
                    <div className="absolute inset-0 opacity-20 bg-[url('/pattern.png')] bg-repeat bg-center"></div>

                    <div className="relative z-10 flex items-center gap-2">
                        <span className="text-4xl font-black tracking-tighter">HC</span>
                        <span className="text-2xl font-bold tracking-tight">HackCoda</span>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <h1 className="text-7xl font-black leading-none tracking-tighter text-white uppercase italic">
                            Minds <br />
                            <span className="text-brasil-preto">cearenses.</span>
                        </h1>
                        <p className="text-white/90 text-xl max-w-md font-medium leading-relaxed">
                            A plataforma para a maior comunidade tech do Ceará.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <p className="text-sm font-bold uppercase tracking-widest text-brasil-preto/60">
                            Hackathon • 2024 • Made in Ceará
                        </p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 p-12 md:p-16 lg:p-24 bg-brasil-cinza flex flex-col justify-center">

                    <div className="flex items-center gap-2 lg:hidden mb-12">
                        <span className="text-4xl font-black tracking-tighter text-brasil-verde">HC</span>
                        <span className="text-xl font-bold tracking-tight text-brasil-creme">HackCoda</span>
                    </div>

                    <div className="mb-12 space-y-3">
                        <h2 className="text-5xl font-black tracking-tighter text-brasil-creme uppercase italic">
                            Login
                        </h2>
                        <p className="text-lg text-zinc-400">
                            Acesse a plataforma para gerenciar seus projetos e times.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">
                                E-mail
                            </label>
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                className="w-full p-4 bg-brasil-preto border border-white/10 rounded-2xl text-brasil-creme placeholder:text-zinc-700 focus:ring-2 focus:ring-brasil-verde focus:border-transparent outline-none transition-all"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between px-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                                    Senha
                                </label>
                                <a href="#" className="text-xs font-bold text-brasil-verde hover:underline uppercase tracking-widest">
                                    Esqueceu?
                                </a>
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full p-4 bg-brasil-preto border border-white/10 rounded-2xl text-brasil-creme placeholder:text-zinc-700 focus:ring-2 focus:ring-brasil-verde focus:border-transparent outline-none transition-all"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-brasil-verde text-brasil-preto font-black text-lg py-5 rounded-2xl hover:opacity-90 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(51,116,24,0.3)] active:scale-95 uppercase italic"
                        >
                            Entrar no HackCoda
                        </button>
                    </form>

                    <div className="mt-16 text-center text-sm font-medium text-zinc-500">
                        Ainda não faz parte?{' '}
                        <a href="/register" className="font-bold text-brasil-verde hover:underline uppercase tracking-tighter">
                            Crie sua conta
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}