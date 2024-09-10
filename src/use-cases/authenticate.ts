import { User } from "@prisma/client";
import { UsersRepositoryInterface } from "../repositories/user-interface.repository";
import { InvalidCredentialError } from "./errors/invalid-credentia-error";
import { compare } from "bcryptjs";

interface AuthUseCaseRequest {
  email: string;
  password: string;
}

interface AuthUseCaseResponse {
  user: User;
}
export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepositoryInterface) {}
  async execute({
    email,
    password,
  }: AuthUseCaseRequest): Promise<AuthUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialError();
    }

    const doesPasswordMatches = await compare(password, user.password);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialError();
    }

    return {
      user,
    };
  }
}
