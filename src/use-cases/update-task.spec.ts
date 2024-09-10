import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTaskRepository } from "../repositories/in-memory/task-in-memory.repository";
import { CreateTaskUseCase } from "./create-task";
import { InMemoryUserRepository } from "../repositories/in-memory/user-in-memory.repository";
import { FindManyTaskUsecase } from "./find-many-tasks";
import { UpdateTaskUseCase } from "./update-task";

let inMemoryUserRepository: InMemoryUserRepository;
let taskRepository: InMemoryTaskRepository;
let updateTaskUseCase: UpdateTaskUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    taskRepository = new InMemoryTaskRepository();
    updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
  });

  it("should be able to register a user", async () => {
    const user = await inMemoryUserRepository.create({
      name: "victor",
      email: "example@email.com",
      password: "123456",
    });

    const oldTask = await taskRepository.create({
      status: false,
      title: "fazer teste crosoften",
      userId: user.id,
      description: "não esquecer",
    });

    const { task } = await updateTaskUseCase.execute({
      taskId: oldTask.id,
      data: {
        status: true,
        title: "finalizar teste crosoften",
        description: "não esquecer os teste unitarios",
      },
    });

    console.log(task);

    expect(task.title).toEqual("finalizar teste crosoften");
    expect(task.status).toEqual(true);
  });
});
