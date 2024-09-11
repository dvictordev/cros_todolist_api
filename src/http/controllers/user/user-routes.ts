import { Router } from "express";
import { RegisterController } from "./register.controller";

const registerController = new RegisterController();
const userRouter = Router();

userRouter.post("/user", registerController.register);

export { userRouter };
