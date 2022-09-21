import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateUserUseCase } from './create-user-usecase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf, password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

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
