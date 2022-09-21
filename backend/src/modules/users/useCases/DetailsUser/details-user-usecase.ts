import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/app-error';
import { User } from '../../models/user';
import { IUsersRepository } from '../../repositories/users-repository';

interface IRequest {
  id: string;
}

@injectable()
class DetailsUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({ id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    return user;
  }
}

export { DetailsUserUseCase };
