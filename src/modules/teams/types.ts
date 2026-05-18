export interface Team {
  id: string;
  name: string;
  description: string | null;
  hackathonId: string;
  leaderId: string;
  inviteCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTeamData {
  name: string;
  description?: string;
  hackathonId: string;
  leaderId: string;
}
