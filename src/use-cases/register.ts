import { UsersRepositoryInterface } from "../repositories/user-interface.repository";
import { Prisma, User } from "@prisma/client";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { hash } from "bcryptjs";

export interface RegisterUseCaseProps {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUseCaseProps): Promise<RegisterUseCaseResponse> {
    const existUserWithEmail = await this.usersRepository.findByEmail(email);

    if (existUserWithEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash: string = (await hash(password, 6)).toString();

    const user = await this.usersRepository.create({
      email,
      name,
      password: password_hash,
    });

    return { user };
  }
}
