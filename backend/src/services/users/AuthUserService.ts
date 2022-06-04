import prismaClient from '../../prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from '../../config/errors/AppError';
import auth from '../../config/auth';

interface IRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: IRequest) {
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

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}

export { AuthUserService };
