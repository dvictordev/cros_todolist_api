import express from "express";
import { userRouter } from "./http/controllers/user/user-routes";
import { taskRouter } from "./http/controllers/task/task-routes";

export const app = express();

app.use(express.json());
app.use(taskRouter);
app.use(userRouter);
