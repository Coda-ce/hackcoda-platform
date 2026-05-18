export function canJoinTeam(
  currentMemberCount: number,
  maxTeamSize: number,
): boolean {
  return currentMemberCount < maxTeamSize;
}

export function canLeaveTeam(isLeader: boolean): boolean {
  return !isLeader;
}
