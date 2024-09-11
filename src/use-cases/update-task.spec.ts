import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTaskRepository } from "../repositories/in-memory/task-in-memory.repository";
import { InMemoryUserRepository } from "../repositories/in-memory/user-in-memory.repository";
import { UpdateTaskUseCase } from "./update-task";
import { TaskNotExistsError } from "./errors/task-not-exists-error";

let inMemoryUserRepository: InMemoryUserRepository;
let taskRepository: InMemoryTaskRepository;
let updateTaskUseCase: UpdateTaskUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    taskRepository = new InMemoryTaskRepository();
    updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
  });

  it("should be able to update a task", async () => {
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

    expect(task.title).toEqual("finalizar teste crosoften");
    expect(task.status).toEqual(true);
  });

  it("should not be able to update a task that does not exist", async () => {
    const user = await inMemoryUserRepository.create({
      name: "victor",
      email: "example@email.com",
      password: "123456",
    });

    await expect(() =>
      updateTaskUseCase.execute({
        taskId: "not existent task",
        data: {
          status: true,
          title: "finalizar teste crosoften",
          description: "não esquecer os teste unitarios",
        },
      })
    ).rejects.toBeInstanceOf(TaskNotExistsError);
  });
});
