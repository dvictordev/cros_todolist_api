import { Task } from "@prisma/client";
import { TaskRepositoryInterface } from "../repositories/task-interface.repository";
import { TaskNotExistsError } from "./errors/task-not-exists-error";

export interface UpdateTaskUseCaseRequest {
  taskId: string;
  data: {
    title?: string;
    description?: string;
    status?: boolean;
  };
}

interface UpdateTaskUseCaseResponse {
  task: Task;
}

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepositoryInterface) {}

  async execute({ taskId, data }: UpdateTaskUseCaseRequest): Promise<Task> {
    const existTask = await this.taskRepository.findById(taskId);

    if (!existTask) {
      throw new TaskNotExistsError();
    }
    const task = await this.taskRepository.updateTask(taskId, data);

    return task;
  }
}
