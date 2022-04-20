import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import "reflect-metadata";
import "express-async-errors";
import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";
import "@shared/container";

import "@shared/infra/typeorm";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `internal server error -${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("Server is running!"));
