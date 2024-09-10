import { Prisma, Task, User } from "@prisma/client";
import { CreateTaskUseCaseRequest } from "../use-cases/create-task";

export interface TaskRepositoryInterface {
  create(data: CreateTaskUseCaseRequest): Promise<Task>;
  findManyByUseId(userId: string): Promise<Task[]>;
}
