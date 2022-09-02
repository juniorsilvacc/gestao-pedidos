import { Request, Response } from 'express';
import { PostgresUsersImplementations } from '../../repositories/implementations/postgres-users-implementations';
import { DetailsUserUseCase } from './details-user-usecase';
import { instanceToInstance } from 'class-transformer';

class DetailsUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const usersImplementations = new PostgresUsersImplementations();
    const detailsUserUseCase = new DetailsUserUseCase(usersImplementations);

    const user = await detailsUserUseCase.execute({ id });

    return response.status(200).json(instanceToInstance(user));
  }
}

export { DetailsUserController };
