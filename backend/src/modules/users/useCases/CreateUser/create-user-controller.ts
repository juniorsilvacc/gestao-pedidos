import { Request, Response } from 'express';
import { BcrypyProviderImplementations } from '../../../../shared/providers/bcrypt/implementations/bcrypt-provider-implementations';
import { MailProviderImplementations } from '../../../../shared/providers/mail/implementations/mail-provider-implementations';
import { PostgresUsersImplementations } from '../../repositories/implementations/postgres-users-implementations';
import { CreateUserUseCase } from './create-user-usecase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf, password } = request.body;

    const usersImplementations = new PostgresUsersImplementations();
    const bcrypyProviderImplementations = new BcrypyProviderImplementations();
    const mailProviderImplementations = new MailProviderImplementations();
    const createUserUseCase = new CreateUserUseCase(
      usersImplementations,
      bcrypyProviderImplementations,
      mailProviderImplementations,
    );

    const user = await createUserUseCase.execute({
      name,
      email,
      cpf,
      password,
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
