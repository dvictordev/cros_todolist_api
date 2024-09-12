import { NextFunction, Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";
import { JWTService } from "./JWTService";

interface JwtPayload {
  sub: string;
}

export const verifyToken: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: "Not Authorized",
    });
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return res.status(404).json({
      error: "Not Authorized",
    });
  }

  const jwtData = JWTService.verify(token);
  if (jwtData === "JWT_SECRET_NOT_FOUND") {
    return res.status(50).json({
      errors: { default: "Erro ao verificar o token" },
    });
  } else if (jwtData === "INVALID_TOKEN") {
    return res.status(401).json({
      error: "Not Authorized",
    });
  }

  req.headers.sub = jwtData.sub;

  return next();
};
