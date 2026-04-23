import { ResourceNotFoundException } from "@/shared/exceptions/resouce-not-found";
import { ResourceExistsException } from "@/shared/exceptions/resource-exists";
import { UserRepository } from "../repositories/user.repository";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async registerUser({ name, email, password }: Prisma.UserCreateInput): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ResourceExistsException("User");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new ResourceNotFoundException("User");
    }

    return user;
  }
}
