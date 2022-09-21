import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { DetailsUserUseCase } from './details-user-usecase';
import { instanceToInstance } from 'class-transformer';

class DetailsUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const detailsUserUseCase = container.resolve(DetailsUserUseCase);

    const user = await detailsUserUseCase.execute({ id });

    return response.status(200).json(instanceToInstance(user));
  }
}

export { DetailsUserController };
