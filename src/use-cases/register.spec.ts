import { InMemoryUserRepository } from "../repositories/in-memory/user-in-memory.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let userRepository: InMemoryUserRepository;
let registerUseCase: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    registerUseCase = new RegisterUseCase(userRepository);
  });

  it("should be able to register a user", async () => {
    const { user } = await registerUseCase.execute({
      name: "victor",
      email: "example@email.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password before registration", async () => {
    const { user } = await registerUseCase.execute({
      name: "victor",
      email: "example@email.com",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", user.password);

    expect(isPasswordHashed).toBe(true);
  });

  it("should not register user with same email twice", async () => {
    await registerUseCase.execute({
      name: "victor",
      email: "example@email.com",
      password: "123456",
    });

    await expect(() =>
      registerUseCase.execute({
        name: "victor",
        email: "example@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
