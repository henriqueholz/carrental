import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const updateUserAvatar = container.resolve(UpdateUserAvatarUseCase);
    const avatar_file = request.file.filename;
    await updateUserAvatar.execute({ user_id: id, avatar_file });
    return response.status(201).send();
  }
}

export { UpdateUserAvatarController };
