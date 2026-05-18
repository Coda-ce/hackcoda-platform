import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/Card";
import type { Project } from "../projects-types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{project.name}</CardTitle>
        <span className="text-xs text-zinc-400 uppercase">
          {project.status === "SUBMITTED" ? "Submetido" : "Rascunho"}
        </span>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-zinc-300 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs bg-brasil-verde/20 text-brasil-verde px-2 py-0.5 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4 text-xs text-zinc-400">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brasil-verde"
            >
              Repositório
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brasil-verde"
            >
              Demo
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
