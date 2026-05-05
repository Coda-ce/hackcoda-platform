"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setErrorMsg("");
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (!result?.error) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setErrorMsg("Credenciais inválidas. Verifique seu e-mail e senha.");
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
            Bem-vindo de volta
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Acesse sua conta para continuar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
              <div className="flex items-center justify-between ml-1 mr-1">
                <label className="text-sm font-medium text-zinc-300">
                  Senha
                </label>
                <a href="#" className="text-xs font-medium text-brasil-verde hover:text-[#4bcc25] transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
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
              {isSubmitting ? "Entrando..." : "Entrar na plataforma"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-white/10 pt-6 pb-8 bg-white/[0.02]">
          <p className="text-sm text-zinc-400">
            Ainda não tem conta?{" "}
            <a
              href="/register"
              className="text-brasil-verde hover:text-[#4bcc25] font-medium transition-colors"
            >
              Criar conta agora
            </a>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}