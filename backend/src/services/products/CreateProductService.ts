import { AppError } from '../../config/errors/AppError';
import prismaClient from '../../prisma';

interface IRequest {
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
}

class CreateProductService {
  async execute({ name, price, description, banner, category_id }: IRequest) {
    const productAlreadyExists = await prismaClient.product.findFirst({
      where: { name },
    });

    if (productAlreadyExists) {
      throw new AppError('Product already exists');
    }

    const product = await prismaClient.product.create({
      data: {
        name,
        price,
        description,
        banner,
        category_id,
      },
      select: {
        name: true,
        price: true,
        description: true,
        banner: true,
        category_id: true,
      },
    });

    return product;
  }
}

export { CreateProductService };
