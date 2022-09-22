import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateUserAdminUseCase } from './create-user-admin-usecase';

class CreateUserAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf, password } = request.body;

    const createUserAdminUseCase = container.resolve(CreateUserAdminUseCase);

    const user = await createUserAdminUseCase.execute({
      name,
      email,
      cpf,
      password,
    });

    return response.status(201).json(user);
  }
}

export { CreateUserAdminController };
