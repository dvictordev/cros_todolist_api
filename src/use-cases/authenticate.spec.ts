import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InMemoryUserRepository } from "../repositories/in-memory/user-in-memory.repository";
import { InvalidCredentialError } from "./errors/invalid-credentia-error";

let inMemoryUserRepository: InMemoryUserRepository;
let authUseCase: AuthenticateUseCase;

describe("Auth Use Case", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    authUseCase = new AuthenticateUseCase(inMemoryUserRepository);
  });
  it("should authenticate a user", async () => {
    await inMemoryUserRepository.create({
      email: "example1@email.com",
      name: "victor",
      password: (await hash("123456", 6)).toString(),
    });

    const { user } = await authUseCase.execute({
      email: "example1@email.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not authenticate a user with invalid password", async () => {
    await inMemoryUserRepository.create({
      email: "example1@email.com",
      name: "victor",
      password: (await hash("123456", 6)).toString(),
    });

    await expect(() =>
      authUseCase.execute({
        email: "example1@email.com",
        password: "1234567",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });

  it("should not authenticate a user with invalid email", async () => {
    await expect(() =>
      authUseCase.execute({
        email: "example2@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });
});
