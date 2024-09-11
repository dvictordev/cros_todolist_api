import { Router } from "express";
import { CreateTaskController } from "./create-task.controller";
import { verifyToken } from "../../middlewares/authMiddleware";
import { FindManyTaskController } from "./find-many-tasks.controller";
import { FindTaskByStatusController } from "./find-task-by-status.controller";

const createTaskController = new CreateTaskController();
const findManyTaskController = new FindManyTaskController();
const findTaskByStatusController = new FindTaskByStatusController();

const taskRouter = Router();

taskRouter.post("/task", verifyToken, createTaskController.execute);
taskRouter.get("/tasks", verifyToken, findManyTaskController.execute);
taskRouter.get("/task", verifyToken, findTaskByStatusController.execute);

export { taskRouter };
