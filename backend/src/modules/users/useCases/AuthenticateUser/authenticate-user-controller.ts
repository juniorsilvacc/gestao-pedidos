import { Request, Response } from 'express';
import { BcrypyProviderImplementations } from '../../../../shared/providers/bcrypt/implementations/bcrypt-provider-implementations';
import { PostgresUsersImplementations } from '../../repositories/implementations/postgres-users-implementations';
import { AuthenticateUserUseCase } from './authenticate-user-usecase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const usersImplementations = new PostgresUsersImplementations();
    const bcrypyProviderImplementations = new BcrypyProviderImplementations();
    const authenticateUserUseCase = new AuthenticateUserUseCase(
      usersImplementations,
      bcrypyProviderImplementations,
    );

    const user = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.status(200).json(user);
  }
}

export { AuthenticateUserController };
