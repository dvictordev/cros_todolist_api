import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists-error";
import { makeFindManyTaskUseCase } from "../../../use-cases/factories/make-find-many-task-use-case";

export class FindManyTaskController {
  async execute(req: Request, res: Response) {
    try {
      const userId: any = req.headers.sub;

      const createTaskUseCase = makeFindManyTaskUseCase();
      const response = await createTaskUseCase.execute({ userId });

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
