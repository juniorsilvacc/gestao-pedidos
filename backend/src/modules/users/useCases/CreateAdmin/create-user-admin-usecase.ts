import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/app-error';
import { IBcryptProvider } from '../../../../shared/providers/bcrypt/models/bcrypt-provider';
import { ICreateUserDTO } from '../../dtos/create-user-dto';
import { User } from '../../models/user';
import { IUsersRepository } from '../../repositories/users-repository';

@injectable()
class CreateUserAdminUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('BcryptProvider')
    private readonly bcryptProvider: IBcryptProvider,
  ) {}

  async execute({ name, email, cpf, password }: ICreateUserDTO): Promise<User> {
    const emailExits = await this.usersRepository.findByEmail(email);
    const cpfExists = await this.usersRepository.findByCPF(cpf);

    if (emailExits || cpfExists) {
      throw new AppError('Esse usuário já existe');
    }

    const passwordHash = await this.bcryptProvider.generateHash(password);

    const userAdmin = await this.usersRepository.createAdmin({
      name,
      email,
      cpf,
      password: passwordHash,
    });

    return userAdmin;
  }
}

export { CreateUserAdminUseCase };
