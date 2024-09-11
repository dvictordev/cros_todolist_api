import { TaskRepositoryInterface } from "../repositories/task-interface.repository";
import { TaskNotExistsError } from "./errors/task-not-exists-error";

export interface DeleteTaskUseCaseRequest {
  taskId: string;
}

interface DeleteTaskUseCaseResponse {
  response: string;
}

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepositoryInterface) {}

  async execute({
    taskId,
  }: DeleteTaskUseCaseRequest): Promise<DeleteTaskUseCaseResponse> {
    const existTask = await this.taskRepository.findById(taskId);

    if (!existTask) {
      throw new TaskNotExistsError();
    }

    const task = await this.taskRepository.deleteTask(taskId);

    return { response: task };
  }
}
