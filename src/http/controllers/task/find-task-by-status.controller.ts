import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists-error";
import { makeFindManyTaskUseCase } from "../../../use-cases/factories/make-find-many-task-use-case";
import { makeFindTaskByStatusUseCase } from "../../../use-cases/factories/make-find-task-by-status-use-case";

export class FindTaskByStatusController {
  async execute(req: Request, res: Response) {
    try {
      const findTaskByStatusBodySchema = z.object({
        status: z.boolean(),
      });

      const { status } = findTaskByStatusBodySchema.parse(req.body);

      const userId: any = req.headers.sub;

      const createTaskUseCase = makeFindTaskByStatusUseCase();
      const response = await createTaskUseCase.execute({
        status,
        userId,
      });

      return res.status(200).send(response);
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
