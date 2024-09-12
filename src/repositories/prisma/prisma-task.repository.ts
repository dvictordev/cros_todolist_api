import { Prisma, Task } from "@prisma/client";
import { CreateTaskUseCaseRequest } from "../../use-cases/create-task";
import { TaskRepositoryInterface } from "../task-interface.repository";
import { prisma } from "../../lib/prisma";

export class PrismaTaskRepository implements TaskRepositoryInterface {
  async findByStatus(userId: string, status: boolean): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
        status,
      },
    });

    return tasks;
  }
  async findById(taskId: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    return task;
  }

  async findManyByUseId(userId: string): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return tasks;
  }
  async updateTask(
    taskId: string,
    data: Prisma.TaskUpdateInput
  ): Promise<Task> {
    // filtra os campos que foram enviados para garantir que seja atualizado apenas os campos enviados
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: filteredData,
    });

    return updatedTask;
  }

  async deleteTask(taskId: string): Promise<Task> {
    const deletedTask = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    return deletedTask;
  }
  async create(data: CreateTaskUseCaseRequest): Promise<Task> {
    const task = await prisma.task.create({
      data,
    });

    return task;
  }
}
