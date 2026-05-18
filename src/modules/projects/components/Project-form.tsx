"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { submitProject } from "../actions/submitProject";

interface ProjectFormProps {
  teamId: string;
  onSuccess?: () => void;
}

export function ProjectForm({ teamId, onSuccess }: ProjectFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [techInput, setTechInput] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function addTech() {
    const tech = techInput.trim();
    if (tech && !techStack.includes(tech)) {
      setTechStack((prev) => [...prev, tech]);
    }
    setTechInput("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await submitProject({
      name,
      description,
      teamId,
      repoUrl: repoUrl || undefined,
      demoUrl: demoUrl || undefined,
      techStack,
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
      <Input
        placeholder="Nome do projeto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Descrição do projeto"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="flex w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-400 focus-visible:outline-none focus-visible:bg-white/20 resize-none min-h-[100px]"
        required
      />
      <Input
        placeholder="URL do repositório (opcional)"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />
      <Input
        placeholder="URL da demonstração (opcional)"
        value={demoUrl}
        onChange={(e) => setDemoUrl(e.target.value)}
      />
      <div className="flex gap-2">
        <Input
          placeholder="Adicionar tecnologia"
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTech();
            }
          }}
        />
        <Button type="button" variant="outline" onClick={addTech}>
          +
        </Button>
      </div>
      {techStack.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {techStack.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() =>
                setTechStack((prev) => prev.filter((t) => t !== tech))
              }
              className="text-xs bg-brasil-verde/20 text-brasil-verde px-2 py-0.5 rounded-full hover:bg-red-500/20 hover:text-red-400"
            >
              {tech} ×
            </button>
          ))}
        </div>
      )}
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Enviando..." : "Submeter projeto"}
      </Button>
    </form>
  );
}
