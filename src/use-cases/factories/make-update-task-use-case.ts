import { PrismaTaskRepository } from "../../repositories/prisma/prisma-task.repository";
import { UpdateTaskUseCase } from "../update-task";

export async function makeUpdateTaskUseCase() {
  const prismaTaskRepository = new PrismaTaskRepository();
  const registerUseCase = new UpdateTaskUseCase(prismaTaskRepository);

  return registerUseCase;
}
