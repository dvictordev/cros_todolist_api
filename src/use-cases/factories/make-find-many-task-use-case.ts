import { PrismaTaskRepository } from "../../repositories/prisma/prisma-task.repository";
import { CreateTaskUseCase } from "../create-task";
import { FindManyTaskUsecase } from "../find-many-tasks";

export function makeFindManyTaskUseCase() {
  const prismaTaskRepository = new PrismaTaskRepository();
  const registerUseCase = new FindManyTaskUsecase(prismaTaskRepository);

  return registerUseCase;
}
