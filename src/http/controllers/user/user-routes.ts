import { Router } from "express";
import { RegisterController } from "./register.controller";
import { AuthenticateController } from "./authenticate.controller";

const registerController = new RegisterController();
const authenticateController = new AuthenticateController();
const userRouter = Router();

userRouter.post("/user", registerController.register);
userRouter.post("/login", authenticateController.execute);

export { userRouter };
