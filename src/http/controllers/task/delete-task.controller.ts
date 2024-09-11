import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists-error";
import { makeCreateTaskUsecase } from "../../../use-cases/factories/make-create-task-use-case";
import { makeDeleteTaskUseCase } from "../../../use-cases/factories/make-delete-task-use-case";

export class DeleteTaskController {
  async execute(req: Request, res: Response) {
    try {
      const deleteTaskBodySchema = z.object({
        taskId: z.string(),
      });

      const { taskId } = deleteTaskBodySchema.parse(req.body);

      const createTaskUseCase = makeDeleteTaskUseCase();
      const { message } = await createTaskUseCase.execute({ taskId });

      return res.status(201).send({ message });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send({
          error_code: "INVALID_DATA",
          error_description: `${error.errors[0].path}: ${error.errors[0].message}`,
        });
      }
      if (error instanceof UserAlreadyExistsError) {
        return res.status(409).send({
          error_code: "INVALID_DATA",
          error_description: error.message,
        });
      }
      return res.send(error);
    }
  }
}
