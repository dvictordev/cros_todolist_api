import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTaskRepository } from "../repositories/in-memory/task-in-memory.repository";
import { InMemoryUserRepository } from "../repositories/in-memory/user-in-memory.repository";
import { FindManyTaskUsecase } from "./find-many-tasks";

let inMemoryUserRepository: InMemoryUserRepository;
let taskRepository: InMemoryTaskRepository;
let findManyTasksUseCase: FindManyTaskUsecase;

describe("Register Use Case", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    taskRepository = new InMemoryTaskRepository();
    findManyTasksUseCase = new FindManyTaskUsecase(taskRepository);
  });

  it("should be able to find all tasks by user", async () => {
    const user = await inMemoryUserRepository.create({
      name: "victor",
      email: "example@email.com",
      password: "123456",
    });

    await taskRepository.create({
      status: false,
      title: "fazer teste crosoften",
      userId: user.id,
      description: "não esquecer",
    });

    await taskRepository.create({
      status: false,
      title: "finalizar testes unitarios do teste crosoften",
      userId: user.id,
      description: "não esquecer",
    });

    const { tasks } = await findManyTasksUseCase.execute({ userId: user.id });

    expect(tasks).toHaveLength(2);
  });
});
