"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/shared/components/ui/Button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";

const registerSchema = z.object({
	name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
	email: z.string().email("E-mail inválido"),
	password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
	const router = useRouter();
	const [errorMsg, setErrorMsg] = useState("");
	const [emailTaken, setEmailTaken] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormValues) => {
		setErrorMsg("");
		setEmailTaken(false);
		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				router.push("/login?registered=true");
				router.refresh();
			} else if (response.status === 409) {
				setEmailTaken(true);
			} else {
				const errorData = await response.json();
				setErrorMsg(errorData.message || "Falha ao registrar.");
			}
		} catch (error) {
			console.error("Erro ao registrar:", error);
			setErrorMsg("Erro interno de conexão.");
		}
	};

	return (
		<main className="flex min-h-screen items-center justify-center p-4 sm:p-8">
			<Card className="w-full max-w-md mx-auto z-10 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
				<CardHeader className="space-y-3 text-center pb-8 pt-8">
					<div className="flex justify-center items-center gap-2 mb-2">
						<div className="h-12 w-12 rounded-xl bg-brasil-verde flex items-center justify-center shadow-[0_0_15px_rgba(93,214,44,0.4)]">
							<span className="text-2xl font-black text-black">HC</span>
						</div>
					</div>
					<CardTitle className="text-3xl font-bold tracking-tight text-white">
						Criar conta
					</CardTitle>
					<CardDescription className="text-zinc-400">
						Junte-se à maior comunidade tech do Ceará.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
						<div className="space-y-2">
							<label className="text-sm font-medium text-zinc-300 ml-1">
								Nome completo
							</label>
							<Input type="text" placeholder="Seu nome" {...register("name")} />
							{errors.name && (
								<p className="text-xs text-red-400 font-medium ml-1">
									{errors.name.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-zinc-300 ml-1">
								E-mail
							</label>
							<Input
								type="email"
								placeholder="seu@email.com"
								{...register("email")}
							/>
							{errors.email && (
								<p className="text-xs text-red-400 font-medium ml-1">
									{errors.email.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-zinc-300 ml-1">
								Senha
							</label>
							<div className="relative">
								<Input
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									{...register("password")}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
								>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
							{errors.password && (
								<p className="text-xs text-red-400 font-medium ml-1">
									{errors.password.message}
								</p>
							)}
						</div>

						{emailTaken && (
							<div className="p-3 bg-amber-900/30 border border-amber-500/50 rounded-xl flex items-center justify-between gap-3">
								<p className="text-amber-300 text-sm font-medium">
									Este e-mail já possui uma conta.
								</p>
								<a
									href="/login"
									className="text-brasil-verde text-sm font-semibold hover:text-[#4bcc25] whitespace-nowrap transition-colors"
								>
									Fazer login →
								</a>
							</div>
						)}

						{errorMsg && (
							<div className="p-3 bg-red-900/30 border border-red-500/50 text-red-400 text-sm font-medium rounded-xl">
								{errorMsg}
							</div>
						)}

						<Button
							type="submit"
							className="w-full h-12 text-base mt-2"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Criando conta..." : "Criar minha conta"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center border-t border-white/10 pt-6 pb-8 bg-white/[0.02]">
					<p className="text-sm text-zinc-400">
						Já possui uma conta?{" "}
						<a
							href="/login"
							className="text-brasil-verde hover:text-[#4bcc25] font-medium transition-colors"
						>
							Fazer login
						</a>
					</p>
				</CardFooter>
			</Card>
		</main>
	);
}
