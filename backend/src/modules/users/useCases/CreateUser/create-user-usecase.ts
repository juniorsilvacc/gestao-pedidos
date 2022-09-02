import { AppError } from '../../../../shared/errors/app-error';
import { ICreateUserDTO } from '../../dtos/create-user-dto';
import { User } from '../../models/user';
import { IUsersRepository } from '../../repositories/users-repository';

class CreateUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute({ name, email, cpf, password }: ICreateUserDTO): Promise<User> {
    const emailExits = await this.usersRepository.findByEmail(email);
    const cpfExists = await this.usersRepository.findByCPF(cpf);

    if (emailExits || cpfExists) {
      throw new AppError('User already exists');
    }

    const newUser = await this.usersRepository.create({
      name,
      email,
      cpf,
      password,
    });

    return newUser;
  }
}

export { CreateUserUseCase };
