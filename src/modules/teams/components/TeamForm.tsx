"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { createTeam } from "../actions/createTeam";

interface TeamFormProps {
  hackathonId: string;
  onSuccess?: () => void;
}

export function TeamForm({ hackathonId, onSuccess }: TeamFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await createTeam({
      name,
      description: description || undefined,
      hackathonId,
    });
    setLoading(false);

    if (!result.success) {
      setError(result.message ?? "Erro desconhecido.");
      return;
    }

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Nome da equipe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Input
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Criando..." : "Criar equipe"}
      </Button>
    </form>
  );
}
