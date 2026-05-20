export interface Ranking {
  id: string;
  projectId: string;
  hackathonId: string;
  score: number;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RankedProject {
  position: number;
  score: number;
  project: {
    id: string;
    name: string;
    teamId: string;
    techStack: string[];
  };
}
