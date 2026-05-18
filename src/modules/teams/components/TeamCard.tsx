import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/Card";
import type { Team } from "../types";

interface TeamCardProps {
  team: Team;
  showInviteCode?: boolean;
}

export function TeamCard({ team, showInviteCode = false }: TeamCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{team.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {team.description && (
          <p className="text-sm text-zinc-300 line-clamp-2">
            {team.description}
          </p>
        )}
        {showInviteCode && (
          <p className="text-xs font-mono bg-white/10 rounded px-2 py-1 w-fit">
            Código: {team.inviteCode}
          </p>
        )}
        <p className="text-xs text-zinc-500">
          Criado em {team.createdAt.toLocaleDateString("pt-BR")}
        </p>
      </CardContent>
    </Card>
  );
}
