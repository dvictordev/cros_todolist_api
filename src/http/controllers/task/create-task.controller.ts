import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists-error";
import { makeCreateTaskUsecase } from "../../../use-cases/factories/make-create-task-use-case";

export class CreateTaskController {
  async execute(req: Request, res: Response) {
    try {
      const createTaskBodySchema = z.object({
        status: z.boolean(),
        title: z.string(),
        description: z.string().optional(),
      });
      const { status, title, description } = createTaskBodySchema.parse(
        req.body
      );

      const userId: any = req.headers.sub;

      const createTaskUseCase = makeCreateTaskUsecase();
      const response = await createTaskUseCase.execute({
        status,
        title,
        userId: userId,
        description,
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
