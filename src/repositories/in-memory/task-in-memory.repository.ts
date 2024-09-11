import { Prisma, Task } from "@prisma/client";
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
    mainTask,
  }: CreateTaskUseCaseRequest): Promise<Task> {
    const task: Task = {
      id: randomUUID(),
      title,
      status,
      description: description ? description : null,
      userId,
      mainTask: mainTask ? mainTask : null,
      createdAt: new Date(),
    };

    this.items.push(task);

    return task;
  }

  async findManyByUseId(userId: string): Promise<Task[]> {
    const tasks = this.items.filter((item) => item.userId === userId);

    return tasks;
  }

  async updateTask(
    taskId: string,
    data: CreateTaskUseCaseRequest
  ): Promise<Task> {
    // Encontre o índice da tarefa que precisa ser atualizada
    const taskIndex = this.items.findIndex((item) => item.id === taskId);

    // Filtra os dados fornecidos para obter apenas valores primitivos
    const updatedData: Task = {
      id: taskId,
      title:
        typeof data.title === "string"
          ? data.title
          : this.items[taskIndex].title,
      description: data.description
        ? this.items[taskIndex].description
        : this.items[taskIndex].description,
      status:
        typeof data.status === "boolean"
          ? data.status
          : this.items[taskIndex].status,
      userId: this.items[taskIndex].userId,
      createdAt: this.items[taskIndex].createdAt,
      mainTask: data.mainTask ? data.mainTask : this.items[taskIndex].mainTask,
    };

    // Atualize a tarefa com os dados fornecidos
    const updatedTask = { ...this.items[taskIndex], ...updatedData };

    // Substitua a tarefa antiga pela tarefa atualizada
    this.items[taskIndex] = updatedTask;

    return updatedTask;
  }

  async deleteTask(taskId: string): Promise<Task | null> {
    const task = this.items.find((item) => item.id === taskId);

    if (!task) {
      return null;
    }

    this.items = this.items.filter((item) => item.id !== taskId);

    return task;
  }

  async findById(taskId: string): Promise<Task | null> {
    const task = this.items.find((item) => item.id === taskId);

    if (!task) {
      return null;
    }

    return task;
  }

  async findByStatus(userId: string, status: boolean): Promise<Task[]> {
    const tasks = this.items.filter(
      (item) => item.userId === userId && item.status === status
    );

    return tasks;
  }
}
