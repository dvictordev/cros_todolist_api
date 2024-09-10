import { RegisterUseCaseProps } from "@/use-cases/register";
import { User } from "@prisma/client";
import { UsersRepositoryInterface } from "../user-interface.repository";

export class PrismaUserRepository implements UsersRepositoryInterface {
  create(data: RegisterUseCaseProps): Promise<User> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
}
