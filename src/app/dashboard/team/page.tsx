"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { createTeamSchema } from "@/modules/teams/validators/team.schema";
import { Users, Plus, Search, Trash2, LogOut, Crown } from "lucide-react";

interface Team {
  id: string;
  name: string;
  description?: string;
  leaderId: string;
  leader: {
    id: string;
    name: string;
    email: string;
  };
  memberCount?: number;
  isLeader?: boolean;
  isMember?: boolean;
  role?: "LEADER" | "MEMBER";
}

export default function TeamsPage() {
  const { data: session } = useSession();
  const [myTeams, setMyTeams] = useState<Team[]>([]);
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [searchResults, setSearchResults] = useState<Team[]>([]);
  const [activeTab, setActiveTab] = useState<"my" | "browse" | "create">("my");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(createTeamSchema),
  });

  useEffect(() => {
    // Carregar times públicos sempre (não requer auth)
    loadAllTeams();
  }, []);

  useEffect(() => {
    // Carregar meus times quando session está disponível
    if (session?.user) {
      loadMyTeams();
    }
  }, [session?.user]);

  const loadMyTeams = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/teams?action=my-teams");
      if (response.ok) {
        const data = await response.json();
        setMyTeams(data);
      }
    } catch (error) {
      console.error("Erro ao carregar meus times:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllTeams = async () => {
    try {
      const response = await fetch("/api/teams");
      if (response.ok) {
        const data = await response.json();
        setAllTeams(data);
      } else {
        console.error("Erro ao carregar times:", response.status);
      }
    } catch (error) {
      console.error("Erro ao carregar times:", error);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      const response = await fetch(`/api/teams?action=search&q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      }
    } catch (error) {
      console.error("Erro ao buscar times:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const onCreateTeam = async (data: any) => {
    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        reset();
        setActiveTab("my");
        await loadMyTeams();
        await loadAllTeams();
      }
    } catch (error) {
      console.error("Erro ao criar time:", error);
    }
  };

  const handleJoinTeam = async (teamId: string) => {
    try {
      const response = await fetch(`/api/teams/${teamId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "join" }),
      });

      if (response.ok) {
        await loadMyTeams();
        await loadAllTeams();
        setSearchResults([]);
        setSearchQuery("");
      }
    } catch (error) {
      console.error("Erro ao entrar no time:", error);
    }
  };

  const handleLeaveTeam = async (teamId: string) => {
    if (!confirm("Tem certeza que deseja sair do time?")) return;

    try {
      const response = await fetch(`/api/teams/${teamId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "leave" }),
      });

      if (response.ok) {
        await loadMyTeams();
      }
    } catch (error) {
      console.error("Erro ao sair do time:", error);
    }
  };

  const handleDeleteTeam = async (teamId: string) => {
    if (!confirm("Tem certeza que deseja deletar este time? Esta ação é irreversível!")) return;

    try {
      const response = await fetch(`/api/teams/${teamId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete" }),
      });

      if (response.ok) {
        await loadMyTeams();
        await loadAllTeams();
      }
    } catch (error) {
      console.error("Erro ao deletar time:", error);
    }
  };

  const getTeamsToDisplay = () => {
    if (activeTab === "my") return myTeams;
    if (activeTab === "create") return [];

    const teamsToShow = searchQuery && isSearching ? searchResults : allTeams;
    const myTeamIds = new Set(myTeams.map(t => t.id));

    // Filtrar times que já estou participando
    return teamsToShow.filter(team => !myTeamIds.has(team.id));
  };

  const teams = getTeamsToDisplay();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Meus Times</h1>
          <p className="text-zinc-400 mt-1">Crie, gerencie e participe de times</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-white/10">
        <button
          onClick={() => setActiveTab("my")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "my"
              ? "text-brasil-verde border-b-2 border-brasil-verde"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Meus Times
        </button>
        <button
          onClick={() => setActiveTab("browse")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "browse"
              ? "text-brasil-verde border-b-2 border-brasil-verde"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Procurar Times
        </button>
        <button
          onClick={() => setActiveTab("create")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "create"
              ? "text-brasil-verde border-b-2 border-brasil-verde"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Criar Time
        </button>
      </div>

      {activeTab === "create" ? (
        <div className="max-w-2xl">
          <Card className="border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl">Criar Novo Time</CardTitle>
              <CardDescription>
                Crie um novo time e comece a colaborar com outros membros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onCreateTeam)} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-zinc-300 ml-1">
                    Nome do Time
                  </label>
                  <Input
                    type="text"
                    placeholder="Ex: Team Awesome"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 font-medium ml-1 mt-1">
                      {errors.name.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-zinc-300 ml-1">
                    Descrição (opcional)
                  </label>
                  <textarea
                    placeholder="Descreva o objetivo do time..."
                    {...register("description")}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-brasil-verde/50 transition-colors"
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-400 font-medium ml-1 mt-1">
                      {errors.description.message as string}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  <Plus size={18} />
                  {isSubmitting ? "Criando..." : "Criar Time"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : activeTab === "browse" ? (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            <Input
              type="text"
              placeholder="Buscar times..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>

          {isSearching && (
            <div className="text-center py-8 text-zinc-400">
              Buscando times...
            </div>
          )}

          {searchQuery && !isSearching && searchResults.length === 0 && (
            <div className="text-center py-8 text-zinc-400">
              Nenhum time encontrado para "{searchQuery}"
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teams.map((team) => (
              <Card key={team.id} className="border-white/10 overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Users size={20} className="text-brasil-verde" />
                        {team.name}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Liderado por {team.leader?.name}
                      </CardDescription>
                    </div>
                    {team.isLeader && (
                      <Crown size={20} className="text-brasil-verde" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {team.description && (
                    <p className="text-sm text-zinc-400">{team.description}</p>
                  )}
                  <div className="text-xs text-zinc-500">
                    {team.memberCount || 1} membro{(team.memberCount || 1) > 1 ? "s" : ""}
                  </div>
                </CardContent>
                <div className="border-t border-white/10 p-4 flex gap-2">
                  {team.isMember ? (
                    <>
                      {team.isLeader ? (
                        <Button
                          variant="outline"
                          onClick={() => handleDeleteTeam(team.id)}
                          className="flex-1 flex items-center justify-center gap-2 text-red-400 hover:text-red-300 border-red-400/30"
                        >
                          <Trash2 size={16} />
                          Deletar
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => handleLeaveTeam(team.id)}
                          className="flex-1 flex items-center justify-center gap-2 text-red-400 hover:text-red-300 border-red-400/30"
                        >
                          <LogOut size={16} />
                          Sair
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button
                      onClick={() => handleJoinTeam(team.id)}
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      <Plus size={16} />
                      Entrar
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {!searchQuery && teams.length === 0 && (
            <div className="text-center py-12 text-zinc-400">
              Nenhum time disponível
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myTeams.length === 0 ? (
            <Card className="border-white/10 md:col-span-2">
              <CardContent className="pt-8">
                <div className="text-center py-8">
                  <Users size={40} className="mx-auto mb-4 text-zinc-600" />
                  <p className="text-zinc-400 mb-4">Você ainda não participa de nenhum time</p>
                  <Button onClick={() => setActiveTab("create")}>
                    Criar um Time
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            myTeams.map((team) => (
              <Card key={team.id} className="border-white/10 overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Users size={20} className="text-brasil-verde" />
                        {team.name}
                      </CardTitle>
                      {team.role === "LEADER" ? (
                        <div className="flex items-center gap-1 mt-2 text-xs text-brasil-verde">
                          <Crown size={14} />
                          Você é o líder
                        </div>
                      ) : (
                        <CardDescription className="mt-2">
                          Liderado por {team.leader?.name}
                        </CardDescription>
                      )}
                    </div>
                    {team.role === "LEADER" && (
                      <Crown size={20} className="text-brasil-verde" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {team.description && (
                    <p className="text-sm text-zinc-400">{team.description}</p>
                  )}
                  <div className="text-xs text-zinc-500">
                    {team.memberCount || 1} membro{(team.memberCount || 1) > 1 ? "s" : ""}
                  </div>
                </CardContent>
                <div className="border-t border-white/10 p-4">
                  {team.role === "LEADER" ? (
                    <Button
                      variant="outline"
                      onClick={() => handleDeleteTeam(team.id)}
                      className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 border-red-400/30"
                    >
                      <Trash2 size={16} />
                      Deletar Time
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => handleLeaveTeam(team.id)}
                      className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 border-red-400/30"
                    >
                      <LogOut size={16} />
                      Sair do Time
                    </Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
