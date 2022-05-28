import { AppError } from '../../config/errors/AppError';
import prismaClient from '../../prisma';

interface IRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: IRequest) {
    const category = await prismaClient.category.findFirst({ where: { name } });

    if (category) {
      throw new AppError('Category already exists');
    }

    const create = await prismaClient.category.create({
      data: {
        name,
      },
      select: { id: true, name: true },
    });

    return create;
  }
}

export { CreateCategoryService };
