import { TaskRepositoryInterface } from "../repositories/task-interface.repository";

export interface CreateTaskUseCaseRequest {
  userId: string;
}

export class FindManyTaskUsecase {
  constructor(private taskRepository: TaskRepositoryInterface) {}

  async execute({ userId }: CreateTaskUseCaseRequest) {
    const tasks = await this.taskRepository.findManyByUseId(userId);

    return tasks;
  }
}
