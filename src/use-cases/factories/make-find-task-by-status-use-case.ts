import { PrismaTaskRepository } from "../../repositories/prisma/prisma-task.repository";
import { FindByStatusUseCase } from "../find-tasks-by-status";

export function makeFindTaskByStatusUseCase() {
  const prismaTaskRepository = new PrismaTaskRepository();
  const registerUseCase = new FindByStatusUseCase(prismaTaskRepository);

  return registerUseCase;
}
