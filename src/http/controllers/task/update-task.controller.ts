import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists-error";
import { makeUpdateTaskUseCase } from "../../../use-cases/factories/make-update-task-use-case";

export class UpdateTaskController {
  async execute(req: Request, res: Response) {
    try {
      const updateTaskBodySchema = z.object({
        status: z.boolean().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        taskId: z.string(),
      });
      const { status, title, description, taskId } = updateTaskBodySchema.parse(
        req.body
      );

      const updateTaskUseCase = await makeUpdateTaskUseCase();
      const response = await updateTaskUseCase.execute({
        taskId,
        data: {
          status,
          title,
          description,
        },
      });

      return res.status(201).send(response);
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
