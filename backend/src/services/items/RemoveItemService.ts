import { AppError } from '../../config/errors/AppError';
import prismaClient from '../../prisma';

interface IRequest {
  item_id: string;
}

class RemoveItemService {
  async execute({ item_id }: IRequest) {
    const item = await prismaClient.item.findFirst({
      where: { id: item_id },
    });

    if (!item) {
      throw new AppError('Item not found');
    }

    const removeItem = await prismaClient.item.delete({
      where: { id: item_id },
    });

    return removeItem;
  }
}

export { RemoveItemService };
