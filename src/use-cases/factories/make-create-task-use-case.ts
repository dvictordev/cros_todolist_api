import { PrismaTaskRepository } from "../../repositories/prisma/prisma-task.repository";
import { CreateTaskUseCase } from "../create-task";

export function makeCreateTaskUsecase() {
  const prismaTaskRepository = new PrismaTaskRepository();
  const registerUseCase = new CreateTaskUseCase(prismaTaskRepository);

  return registerUseCase;
}
