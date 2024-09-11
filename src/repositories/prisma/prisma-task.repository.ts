import { Prisma, Task } from "@prisma/client";
import { CreateTaskUseCaseRequest } from "../../use-cases/create-task";
import { TaskRepositoryInterface } from "../task-interface.repository";

export class PrismaTaskRepository implements TaskRepositoryInterface {
  findById(taskId: string): Promise<Task | null> {
    throw new Error("Method not implemented.");
  }
  findTaskById(taskId: string): Promise<Task | null> {
    throw new Error("Method not implemented.");
  }
  findManyByUseId(userId: string): Promise<Task[]> {
    throw new Error("Method not implemented.");
  }
  updateTask(taskId: string, data: Prisma.TaskUpdateInput): Promise<Task> {
    throw new Error("Method not implemented.");
  }
  deleteTask(taskId: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  create(data: CreateTaskUseCaseRequest): Promise<Task> {
    throw new Error("Method not implemented.");
  }
}
