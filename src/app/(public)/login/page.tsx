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
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-brasil-preto via-[#1b4310] to-brasil-preto bg-[length:300%_100%] animate-gradient-x px-4 py-8">
            <div className="flex w-full max-w-7xl overflow-hidden rounded-3xl bg-brasil-cinza/80 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">

                <div className="relative hidden lg:flex w-1/2 flex-col justify-between bg-gradient-to-br from-brasil-verde to-brasil-verdeEscuro p-16 text-brasil-preto">
                    

                    <div className="relative z-10 flex items-center gap-2">
                        <span className="text-4xl font-black tracking-tighter">HC</span>
                        <span className="text-2xl font-bold tracking-tight">HackCoda</span>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-brasil-verde/30 bg-brasil-preto/40 px-3 py-1 text-xs font-bold text-brasil-verde backdrop-blur-md w-fit">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brasil-verde opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-brasil-verde"></span>
                            </span>
                            Inscrições Abertas
                        </div>
                        <h1 className="text-7xl font-black leading-none tracking-tighter text-white">
                            Minds <br />
                            <span className="text-brasil-preto">cearenses.</span>
                        </h1>
                        <p className="text-white/90 text-xl max-w-md font-medium leading-relaxed">
                            A plataforma para a maior comunidade tech do Ceará.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <p className="text-sm font-bold uppercase tracking-widest text-brasil-preto/60">
                            © {new Date().getFullYear()} Hackathon. Todos os direitos reservados
                        </p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 p-12 md:p-16 lg:p-24 bg-transparent flex flex-col justify-center">

                    <div className="flex items-center gap-2 lg:hidden mb-12">
                        <span className="text-4xl font-black tracking-tighter text-brasil-verde">HC</span>
                        <span className="text-xl font-bold tracking-tight text-brasil-creme">HackCoda</span>
                    </div>

                    <div className="mb-12 space-y-3">
                        <h2 className="text-5xl font-black tracking-tighter text-brasil-creme">
                            Login
                        </h2>
                        <p className="text-lg text-zinc-400">
                            Acesse a plataforma para gerenciar seus projetos e times.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-2 group">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1 group-focus-within:text-brasil-verde transition-colors duration-300">
                                E-mail
                            </label>
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                className="w-full p-4 bg-brasil-preto/50 border border-white/10 rounded-2xl text-brasil-creme placeholder:text-zinc-700 focus:ring-2 focus:ring-brasil-verde focus:border-transparent focus:shadow-[0_0_15px_rgba(93,214,44,0.3)] outline-none transition-all duration-300 backdrop-blur-sm"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2 group">
                            <div className="flex items-center justify-between px-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-brasil-verde transition-colors duration-300">
                                    Senha
                                </label>
                                <a href="#" className="text-xs font-bold text-brasil-verde hover:underline uppercase tracking-widest">
                                    Esqueceu?
                                </a>
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full p-4 bg-brasil-preto/50 border border-white/10 rounded-2xl text-brasil-creme placeholder:text-zinc-700 focus:ring-2 focus:ring-brasil-verde focus:border-transparent focus:shadow-[0_0_15px_rgba(93,214,44,0.3)] outline-none transition-all duration-300 backdrop-blur-sm"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-brasil-verde to-brasil-verdeEscuro text-brasil-preto font-black text-lg py-5 rounded-2xl hover:opacity-100 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(93,214,44,0.2)] hover:shadow-[0_0_30px_rgba(93,214,44,0.6)] active:scale-95"
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