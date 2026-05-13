"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Users, ArrowLeft, Crown, UserPlus, LogOut, Trash2, Calendar } from "lucide-react";

interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  role: "LEADER" | "MEMBER";
  joinedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface TeamDetail {
  id: string;
  name: string;
  description: string | null;
  leaderId: string;
  leader: {
    id: string;
    name: string;
    email: string;
  };
  members: TeamMember[];
  createdAt: string;
  updatedAt: string;
}

export default function TeamDetailPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [team, setTeam] = useState<TeamDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [isLeader, setIsLeader] = useState(false);

  useEffect(() => {
    loadTeamDetails();
  }, []);

  const loadTeamDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/teams/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setTeam(data);

        // Verificar se o usuário é membro
        const userIdFromSession = (session?.user as any)?.id;
        const membershipCheck = data.members?.some(
          (m: TeamMember) => m.userId === userIdFromSession
        );
        setIsMember(!!membershipCheck);

        // Verificar se é líder
        setIsLeader(data.leaderId === userIdFromSession);
      }
    } catch (error) {
      console.error("Erro ao carregar detalhes do time:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTeam = async () => {
    try {
      const response = await fetch(`/api/teams/${params.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "join" }),
      });

      if (response.ok) {
        setIsMember(true);
        await loadTeamDetails();
      }
    } catch (error) {
      console.error("Erro ao entrar no time:", error);
    }
  };

  const handleLeaveTeam = async () => {
    if (!confirm("Tem certeza que deseja sair do time?")) return;

    try {
      const response = await fetch(`/api/teams/${params.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "leave" }),
      });

      if (response.ok) {
        setIsMember(false);
        router.push("/dashboard/team");
      }
    } catch (error) {
      console.error("Erro ao sair do time:", error);
    }
  };

  const handleDeleteTeam = async () => {
    if (!confirm("Tem certeza que deseja deletar este time? Esta ação é irreversível!")) return;

    try {
      const response = await fetch(`/api/teams/${params.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete" }),
      });

      if (response.ok) {
        router.push("/dashboard/team");
      }
    } catch (error) {
      console.error("Erro ao deletar time:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-zinc-400">Carregando...</div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md border-white/10">
          <CardContent className="pt-8">
            <div className="text-center">
              <p className="text-zinc-400 mb-4">Time não encontrado</p>
              <Button onClick={() => router.back()}>Voltar</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-brasil-verde hover:text-[#4bcc25] transition-colors"
      >
        <ArrowLeft size={20} />
        Voltar
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações do Time */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-white/10">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl flex items-center gap-2">
                    <Users size={32} className="text-brasil-verde" />
                    {team.name}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Liderado por {team.leader?.name}
                  </CardDescription>
                </div>
                {isLeader && (
                  <Crown size={24} className="text-brasil-verde" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {team.description && (
                <div>
                  <h3 className="text-sm font-medium text-zinc-300 mb-2">Descrição</h3>
                  <p className="text-zinc-400">{team.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">Membros</p>
                  <p className="text-2xl font-bold text-white">{team.members?.length || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">Criado em</p>
                  <p className="text-sm text-zinc-300">
                    {new Date(team.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Membros */}
          <Card className="border-white/10">
            <CardHeader>
              <CardTitle>Membros do Time</CardTitle>
              <CardDescription>
                {team.members?.length || 0} membro{(team.members?.length || 0) > 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {team.members && team.members.length > 0 ? (
                  team.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-white">{member.user?.name}</p>
                          {member.role === "LEADER" && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-brasil-verde/20 text-brasil-verde text-xs rounded-full">
                              <Crown size={12} />
                              Líder
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-zinc-400">{member.user?.email}</p>
                        <div className="flex items-center gap-1 text-xs text-zinc-500 mt-1">
                          <Calendar size={12} />
                          Entrou em {new Date(member.joinedAt).toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-400 text-center py-4">Nenhum membro</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Sidebar */}
        <div>
          <Card className="border-white/10 sticky top-6">
            <CardHeader>
              <CardTitle>Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isMember ? (
                <>
                  {isLeader ? (
                    <Button
                      onClick={handleDeleteTeam}
                      className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 border-red-400/30 hover:border-red-400/50"
                      variant="outline"
                    >
                      <Trash2 size={18} />
                      Deletar Time
                    </Button>
                  ) : (
                    <Button
                      onClick={handleLeaveTeam}
                      className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 border-red-400/30 hover:border-red-400/50"
                      variant="outline"
                    >
                      <LogOut size={18} />
                      Sair do Time
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  onClick={handleJoinTeam}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <UserPlus size={18} />
                  Entrar no Time
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
