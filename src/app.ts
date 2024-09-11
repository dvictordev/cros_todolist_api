import express, { NextFunction, Request, Response } from "express";
import { userRouter } from "./http/controllers/user/user-routes";

export const app = express();

app.use(express.json());
app.use(userRouter);
