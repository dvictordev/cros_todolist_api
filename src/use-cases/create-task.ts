import { Task } from "@prisma/client";
import { TaskRepositoryInterface } from "../repositories/task-interface.repository";

export interface CreateTaskUseCaseRequest {
  title: string;
  description?: string;
  status: boolean;
  userId: string;
}

interface CreateTaskUseCaseResponse {
  task: Task;
}

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepositoryInterface) {}

  async execute({
    status,
    title,
    userId,
    description,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const task = await this.taskRepository.create({
      status,
      title,
      userId,
      description,
    });

    return { task };
  }
}
