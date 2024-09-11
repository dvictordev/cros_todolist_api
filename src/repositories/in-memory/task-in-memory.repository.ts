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

  async findManyByUseId(userId: string): Promise<Task[]> {
    const tasks = this.items.filter((item) => item.userId === userId);

    return tasks;
  }

  async updateTask(
    taskId: string,
    data: Prisma.TaskUpdateInput
  ): Promise<Task> {
    // Encontre o índice da tarefa que precisa ser atualizada
    const taskIndex = this.items.findIndex((item) => item.id === taskId);

    // Filtra os dados fornecidos para obter apenas valores primitivos
    const updatedData: Task = {
      id: typeof data.id === "string" ? data.id : this.items[taskIndex].id,
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
    };

    // Atualize a tarefa com os dados fornecidos
    const updatedTask = { ...this.items[taskIndex], ...updatedData };

    // Substitua a tarefa antiga pela tarefa atualizada
    this.items[taskIndex] = updatedTask;

    return updatedTask;
  }

  async deleteTask(taskId: string): Promise<string> {
    this.items = this.items.filter((item) => item.id !== taskId);

    return "Task deletada com sucesso";
  }

  async findById(taskId: string): Promise<Task | null> {
    const task = this.items.find((item) => item.id === taskId);

    if (!task) {
      return null;
    }

    return task;
  }
}
