import { AppError } from '../../config/errors/AppError';
import prismaClient from '../../prisma';

interface IRequest {
  category_id: string;
}

class ListProductsService {
  async execute({ category_id }: IRequest) {
    const findByCategoryId = await prismaClient.product.findMany({
      where: {
        category_id: category_id,
      },
    });

    if (!findByCategoryId) {
      throw new AppError('Produto não encontrado');
    }

    return findByCategoryId;
  }
}

export { ListProductsService };
