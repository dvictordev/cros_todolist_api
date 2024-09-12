import express from "express";
import { userRouter } from "./http/controllers/user/user-routes";
import { taskRouter } from "./http/controllers/task/task-routes";
import swaggerUi from "swagger-ui-express";

import swaggerDocs from "./swagger.json";

export const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(taskRouter);
app.use(userRouter);
