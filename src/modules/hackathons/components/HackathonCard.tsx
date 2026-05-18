import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/Card";
import type { Hackathon } from "../types";

const STATUS_LABEL: Record<Hackathon["status"], string> = {
  DRAFT: "Rascunho",
  PUBLISHED: "Publicado",
  ACTIVE: "Em andamento",
  FINISHED: "Encerrado",
  CANCELLED: "Cancelado",
};

interface HackathonCardProps {
  hackathon: Hackathon;
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  const start = hackathon.startDate.toLocaleDateString("pt-BR");
  const end = hackathon.endDate.toLocaleDateString("pt-BR");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{hackathon.title}</CardTitle>
        <span className="text-xs text-brasil-verde font-semibold uppercase tracking-wide">
          {STATUS_LABEL[hackathon.status]}
        </span>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-zinc-300 line-clamp-2">
          {hackathon.description}
        </p>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            {start} - {end}
          </span>
          <span>Até {hackathon.maxTeamSize} por equipe</span>
        </div>
      </CardContent>
    </Card>
  );
}
