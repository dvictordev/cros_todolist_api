import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { makeAuthenticateUseCase } from "../../../use-cases/factories/make-authenticate-use-case";
import { InvalidCredentialError } from "../../../use-cases/errors/invalid-credentia-error";

import jwt from "jsonwebtoken";
import { env } from "../../../env";

export class AuthenticateController {
  async execute(req: Request, res: Response) {
    try {
      const registerBodySchema = z.object({
        email: z.string().email(),
        password: z.string(),
      });

      const { email, password } = registerBodySchema.parse(req.body);

      const authenticateUseCase = makeAuthenticateUseCase();
      const { user } = await authenticateUseCase.execute({ email, password });

      const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const refreshToken = jwt.sign({ sub: user.id }, env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return res
        .cookie("refresh_token", refreshToken, {
          path: "/",
          secure: true,
          sameSite: true,
          httpOnly: true,
        })
        .status(201)
        .send({ token });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send({
          error_code: "INVALID_DATA",
          error_description: `${error.errors[0].path}: ${error.errors[0].message}`,
        });
      }
      if (error instanceof InvalidCredentialError) {
        return res.status(409).send({
          error_code: "INVALID_DATA",
          error_description: error.message,
        });
      }

      return res.send(error);
    }
  }
}
