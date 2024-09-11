import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTaskRepository } from "../repositories/in-memory/task-in-memory.repository";
import { InMemoryUserRepository } from "../repositories/in-memory/user-in-memory.repository";
import { FindByStatusUseCase } from "./find-tasks-by-status";

let inMemoryUserRepository: InMemoryUserRepository;
let taskRepository: InMemoryTaskRepository;
let findByStatusUseCase: FindByStatusUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    taskRepository = new InMemoryTaskRepository();
    findByStatusUseCase = new FindByStatusUseCase(taskRepository);
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
      status: true,
      title: "finalizar testes unitarios do teste crosoften",
      userId: user.id,
      description: "não esquecer",
    });

    const { tasks } = await findByStatusUseCase.execute({
      userId: user.id,
      status: false,
    });

    expect(tasks).toHaveLength(1);
  });
});
