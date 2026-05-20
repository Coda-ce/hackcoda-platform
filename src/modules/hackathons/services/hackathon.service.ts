import { ResourceExistsException } from "@/shared/exceptions/resource-exists";
import type { HackathonRepository } from "../repositories/hackathon.repository";
import type { CreateHackathonData, Hackathon } from "../types";

export class HackathonService {
  constructor(private readonly hackathonRepository: HackathonRepository) {}

  async createHackathon(data: CreateHackathonData): Promise<Hackathon> {
    const existing = await this.hackathonRepository.findByTitle(data.title);
    if (existing) {
      throw new ResourceExistsException("Hackathon");
    }
    return this.hackathonRepository.create(data);
  }
}
