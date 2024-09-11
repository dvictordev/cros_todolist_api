import { Task } from "@prisma/client";
import { TaskRepositoryInterface } from "../repositories/task-interface.repository";

export interface FindManyTaskUseCaseRequest {
  userId: string;
  status: boolean;
}

interface FindManyTaskUseCaseResponse {
  tasks: Task[];
}

export class FindByStatusUseCase {
  constructor(private taskRepository: TaskRepositoryInterface) {}

  async execute({
    userId,
    status,
  }: FindManyTaskUseCaseRequest): Promise<FindManyTaskUseCaseResponse> {
    const tasks = await this.taskRepository.findByStatus(userId, status);

    return { tasks };
  }
}
