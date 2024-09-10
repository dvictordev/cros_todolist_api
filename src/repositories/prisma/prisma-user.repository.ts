import { Task } from "@prisma/client";
import { CreateTaskUseCaseRequest } from "../../use-cases/create-task";
import { TaskRepositoryInterface } from "../task-interface.repository";

export class PrismaUserRepository implements TaskRepositoryInterface {
  create(data: CreateTaskUseCaseRequest): Promise<Task> {
    throw new Error("Method not implemented.");
  }
}
