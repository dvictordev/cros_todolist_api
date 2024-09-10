import { RegisterUseCaseProps } from "../use-cases/register";
import { User } from "@prisma/client";

export interface UsersRepositoryInterface {
  create(data: RegisterUseCaseProps): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
