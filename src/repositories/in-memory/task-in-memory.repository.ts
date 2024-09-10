import { Prisma, Task, User } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { TaskRepositoryInterface } from "../task-interface.repository";
import { CreateTaskUseCaseRequest } from "../../use-cases/create-task";

export class InMemoryTaskRepository implements TaskRepositoryInterface {
  public items: Task[] = [];
  async create({
    status,
    title,
    userId,
    description,
  }: CreateTaskUseCaseRequest): Promise<Task> {
    const task: Task = {
      id: randomUUID(),
      title,
      status,
      description: description ? description : null,
      userId,
    };

    this.items.push(task);

    return task;
  }
}
