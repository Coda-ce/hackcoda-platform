import type { PrismaClient } from "@prisma/client";
import type { CreateHackathonData, Hackathon } from "../types";

export class HackathonRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(_data: CreateHackathonData): Promise<Hackathon> {
    throw new Error("Not implemented: add Hackathon model to Prisma schema");
  }

  async findByTitle(_title: string): Promise<Hackathon | null> {
    throw new Error("Not implemented: add Hackathon model to Prisma schema");
  }
}
