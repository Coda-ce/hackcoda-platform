"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { User, Mail, Calendar, LogOut, Edit2, X, Check } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-8">
      <Card className="w-full max-w-2xl mx-auto z-10 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <CardHeader className="space-y-3 text-center pb-8 pt-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="h-12 w-12 rounded-xl bg-brasil-verde flex items-center justify-center shadow-[0_0_15px_rgba(93,214,44,0.4)]">
              <span className="text-2xl font-black text-black">HC</span>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-white">
            Meu Perfil
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Gerencie seus dados e preferências da conta
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1 flex items-center gap-2">
                <User size={16} className="text-brasil-verde" />
                Nome completo
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Seu nome"
                />
              ) : (
                <div className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-zinc-300">
                  {session?.user?.name}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1 flex items-center gap-2">
                <Mail size={16} className="text-brasil-verde" />
                E-mail
              </label>
              {isEditing ? (
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                />
              ) : (
                <div className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-zinc-300">
                  {session?.user?.email}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 ml-1 flex items-center gap-2">
              <Calendar size={16} className="text-brasil-verde" />
              Data de criação
            </label>
            <div className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-zinc-300">
              N/A
            </div>
          </div>

          <div className="space-y-3 p-4 bg-brasil-verde/10 border border-brasil-verde/20 rounded-lg">
            <p className="text-sm text-zinc-300">
              <span className="font-medium text-brasil-verde">Dica:</span> Mantenha seus dados atualizados para melhor experiência
            </p>
          </div>
        </CardContent>

        <div className="border-t border-white/10 p-6 bg-white/[0.02] flex gap-3 justify-end">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: session?.user?.name || "",
                    email: session?.user?.email || "",
                  });
                }}
                className="flex items-center gap-2"
              >
                <X size={18} />
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                className="flex items-center gap-2"
              >
                <Check size={18} />
                Salvar mudanças
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 border-red-400/30 hover:border-red-400/50"
              >
                <LogOut size={18} />
                Sair da conta
              </Button>
              <Button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
              >
                <Edit2 size={18} />
                Editar perfil
              </Button>
            </>
          )}
        </div>
      </Card>
    </main>
  );
}
