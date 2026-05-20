import type { PrismaClient } from "@prisma/client";
import type { CreateHackathonData, Hackathon } from "../types";

export class HackathonRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateHackathonData): Promise<Hackathon> {
    return this.prisma.hackathon.create({
      data: {
        ...data,
        registrationDeadline: new Date(data.registrationDeadline),
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
    });
  }

  async findByTitle(title: string): Promise<Hackathon | null> {
    return this.prisma.hackathon.findUnique({ where: { title } });
  }
}
