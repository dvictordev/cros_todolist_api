import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTaskRepository } from "../repositories/in-memory/task-in-memory.repository";
import { InMemoryUserRepository } from "../repositories/in-memory/user-in-memory.repository";
import { DeleteTaskUseCase } from "./delete-task";
import { TaskNotExistsError } from "./errors/task-not-exists-error";

let inMemoryUserRepository: InMemoryUserRepository;
let taskRepository: InMemoryTaskRepository;
let deleteTaskUseCase: DeleteTaskUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    taskRepository = new InMemoryTaskRepository();
    deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
  });

  it("should be able to delete a task", async () => {
    const user = await inMemoryUserRepository.create({
      name: "victor",
      email: "example@email.com",
      password: "123456",
    });

    const { id } = await taskRepository.create({
      status: false,
      title: "fazer teste crosoften",
      userId: user.id,
      description: "não esquecer",
    });

    const { message } = await deleteTaskUseCase.execute({ taskId: id });

    expect(message).toEqual("Task deleted successfully");
  });

  it("should not be able to delete a task that does not exist", async () => {
    await expect(() =>
      deleteTaskUseCase.execute({
        taskId: "not existent task",
      })
    ).rejects.toBeInstanceOf(TaskNotExistsError);
  });
});
