import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  canPublishHackathon,
  isHackathonActive,
  isRegistrationOpen,
} from "../rules";

describe("canPublishHackathon", () => {
  it("returns true when status is DRAFT", () => {
    expect(canPublishHackathon("DRAFT")).toBe(true);
  });

  it("returns false when status is PUBLISHED", () => {
    expect(canPublishHackathon("PUBLISHED")).toBe(false);
  });

  it("returns false when status is ACTIVE", () => {
    expect(canPublishHackathon("ACTIVE")).toBe(false);
  });

  it("returns false when status is FINISHED", () => {
    expect(canPublishHackathon("FINISHED")).toBe(false);
  });

  it("returns false when status is CANCELLED", () => {
    expect(canPublishHackathon("CANCELLED")).toBe(false);
  });
});

describe("isRegistrationOpen", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-07-01T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns true when deadline is in the future", () => {
    expect(isRegistrationOpen(new Date("2025-08-01T00:00:00Z"))).toBe(true);
  });

  it("returns false when deadline is in the past", () => {
    expect(isRegistrationOpen(new Date("2025-06-01T00:00:00Z"))).toBe(false);
  });

  it("returns true when deadline is exactly now", () => {
    expect(isRegistrationOpen(new Date("2025-07-01T12:00:00Z"))).toBe(true);
  });
});

describe("isHackathonActive", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-08-11T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns true when now is between start and end dates", () => {
    expect(
      isHackathonActive(
        new Date("2025-08-10T00:00:00Z"),
        new Date("2025-08-12T00:00:00Z"),
      ),
    ).toBe(true);
  });

  it("returns false when now is before start date", () => {
    expect(
      isHackathonActive(
        new Date("2025-08-12T00:00:00Z"),
        new Date("2025-08-14T00:00:00Z"),
      ),
    ).toBe(false);
  });

  it("returns false when now is after end date", () => {
    expect(
      isHackathonActive(
        new Date("2025-08-08T00:00:00Z"),
        new Date("2025-08-10T00:00:00Z"),
      ),
    ).toBe(false);
  });
});
