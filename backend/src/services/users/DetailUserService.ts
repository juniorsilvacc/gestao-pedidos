import { AppError } from '../../config/errors/AppError';
import prismaClient from '../../prisma';

interface IRequest {
  id: string;
}

class DetailUserService {
  async execute({ id }: IRequest) {
    const user = await prismaClient.user.findFirst({
      where: { id },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export { DetailUserService };
