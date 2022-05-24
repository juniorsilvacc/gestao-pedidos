import prismaClient from '../../prisma';
import { compare } from 'bcryptjs';
import { AppError } from '../../config/errors/AppError';

interface IAuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: IAuthRequest) {
    const user = await prismaClient.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect');
    }

    return user;
  }
}

export { AuthUserService };
