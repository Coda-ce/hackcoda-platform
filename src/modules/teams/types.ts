export interface Team {
  id: string;
  name: string;
  description: string | null;
  leaderId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserTeam {
  id: string;
  userId: string;
  teamId: string;
  role: "LEADER" | "MEMBER";
  joinedAt: Date;
}

export interface TeamWithMembers extends Team {
  members: UserTeam[];
  leader: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateTeamInput {
  name: string;
  description?: string;
}

export interface TeamWithLeaderInfo extends Team {
  leader: {
    id: string;
    name: string;
    email: string;
  };
  memberCount?: number;
  isLeader?: boolean;
  isMember?: boolean;
}
