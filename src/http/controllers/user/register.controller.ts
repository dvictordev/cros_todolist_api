import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { makeRegisterUseCase } from "../../../use-cases/factories/make-register-use-case";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists-error";

export class RegisterController {
  async register(req: Request, res: Response) {
    try {
      const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      });
      const { email, name, password } = registerBodySchema.parse(req.body);
      const registerUseCase = makeRegisterUseCase();
      const response = await registerUseCase.execute({ name, email, password });
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
