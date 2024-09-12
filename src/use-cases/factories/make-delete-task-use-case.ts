import { PrismaTaskRepository } from "../../repositories/prisma/prisma-task.repository";
import { DeleteTaskUseCase } from "../delete-task";

export async function makeDeleteTaskUseCase() {
  const prismaTaskRepository = new PrismaTaskRepository();
  const registerUseCase = new DeleteTaskUseCase(prismaTaskRepository);

  return registerUseCase;
}
