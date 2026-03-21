import { UserRepository } from "../repositories/user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async registerUser(name: string, email: string): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    await this.userRepository.create({ name, email });
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
