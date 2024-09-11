import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTaskRepository } from "../repositories/in-memory/task-in-memory.repository";
import { CreateTaskUseCase } from "./create-task";
import { InMemoryUserRepository } from "../repositories/in-memory/user-in-memory.repository";

let inMemoryUserRepository: InMemoryUserRepository;
let taskRepository: InMemoryTaskRepository;
let createTaskUseCase: CreateTaskUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    taskRepository = new InMemoryTaskRepository();
    createTaskUseCase = new CreateTaskUseCase(taskRepository);
  });

  it("should be able to create a task", async () => {
    const user = await inMemoryUserRepository.create({
      name: "victor",
      email: "example@email.com",
      password: "123456",
    });

    const { task } = await createTaskUseCase.execute({
      status: false,
      title: "fazer teste crosoften",
      userId: user.id,
      description: "não esquecer",
    });

    expect(task.id).toEqual(expect.any(String));
    expect(task.title).toEqual("fazer teste crosoften");
    expect(task.userId).toEqual(user.id);
  });

  it("should be able to create a sub task", async () => {
    const user = await inMemoryUserRepository.create({
      name: "victor",
      email: "example@email.com",
      password: "123456",
    });

    const response = await createTaskUseCase.execute({
      status: false,
      title: "fazer teste crosoften",
      userId: user.id,
      description: "não esquecer",
    });

    const { task } = await createTaskUseCase.execute({
      status: false,
      title: "fazer teste crosoften",
      userId: user.id,
      description: "não esquecer",
      mainTask: response.task.id,
    });

    console.log(task);

    expect(task.id).toEqual(expect.any(String));
    expect(task.title).toEqual("fazer teste crosoften");
    expect(task.userId).toEqual(user.id);
  });
});
