import { Task } from "@prisma/client";
import { TaskRepositoryInterface } from "../repositories/task-interface.repository";

export interface FindManyTaskUseCaseRequest {
  userId: string;
}

interface FindManyTaskUseCaseResponse {
  tasks: Task[];
}

export class FindManyTaskUsecase {
  constructor(private taskRepository: TaskRepositoryInterface) {}

  async execute({
    userId,
  }: FindManyTaskUseCaseRequest): Promise<FindManyTaskUseCaseResponse> {
    const tasks = await this.taskRepository.findManyByUseId(userId);

    return { tasks };
  }
}
