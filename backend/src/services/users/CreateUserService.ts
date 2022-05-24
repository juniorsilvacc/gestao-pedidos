import prismaClient from '../../prisma';
import { AppError } from '../../config/errors/AppError';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: IUserRequest) {
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
