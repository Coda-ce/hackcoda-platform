import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { canSubmitProject } from "../submission.rules";

describe("canSubmitProject", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-08-11T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns true when project is DRAFT and hackathon is still ongoing", () => {
    expect(canSubmitProject("DRAFT", new Date("2025-08-12T00:00:00Z"))).toBe(
      true,
    );
  });

  it("returns false when project is already SUBMITTED", () => {
    expect(
      canSubmitProject("SUBMITTED", new Date("2025-08-12T00:00:00Z")),
    ).toBe(false);
  });

  it("returns false when hackathon has ended", () => {
    expect(canSubmitProject("DRAFT", new Date("2025-08-10T00:00:00Z"))).toBe(
      false,
    );
  });

  it("returns false when project is SUBMITTED and hackathon has ended", () => {
    expect(
      canSubmitProject("SUBMITTED", new Date("2025-08-10T00:00:00Z")),
    ).toBe(false);
  });
});
