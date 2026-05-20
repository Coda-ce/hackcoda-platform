import { describe, expect, it } from "vitest";
import { canJoinTeam, canLeaveTeam } from "../membership.rules";

describe("canJoinTeam", () => {
  it("returns true when team has available slots", () => {
    expect(canJoinTeam(3, 4)).toBe(true);
  });

  it("returns false when team is at full capacity", () => {
    expect(canJoinTeam(4, 4)).toBe(false);
  });

  it("returns true when team is empty", () => {
    expect(canJoinTeam(0, 4)).toBe(true);
  });
});

describe("canLeaveTeam", () => {
  it("returns true when member is not the leader", () => {
    expect(canLeaveTeam(false)).toBe(true);
  });

  it("returns false when member is the leader", () => {
    expect(canLeaveTeam(true)).toBe(false);
  });
});
