import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "8dc497ec2e5f87c17752ed92c5bf603f"
    ) as IPayload;
    const user_id = sub;

    request.user = {
      id: user_id,
    };

    next();
  } catch (e) {
    throw new AppError("Invalid token", 401);
  }
}

export { ensureAuthenticated };
