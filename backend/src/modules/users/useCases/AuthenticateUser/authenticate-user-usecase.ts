import { AppError } from '../../../../shared/errors/app-error';
import { IBcryptProvider } from '../../../../shared/providers/bcrypt/bcrypt-provider';
import { IUsersRepository } from '../../repositories/users-repository';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../../config/auth';

interface IRequest {
  email: string;
  password: string;
}

class AuthenticateUserUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly bcryptProvider: IBcryptProvider,
  ) {}

  async execute({ email, password }: IRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email e/ou senha incorreto', 401);
    }

    const passwordMatch = await this.bcryptProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppError('Email e/ou senha incorreto', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}

export { AuthenticateUserUseCase };
