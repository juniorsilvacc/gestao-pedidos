import { AppError } from '../../config/errors/AppError';
import prismaClient from '../../prisma';

interface IRequest {
  order_id: string;
}

class ConcludeOrderService {
  async execute({ order_id }: IRequest) {
    const order = await prismaClient.order.findFirst({
      where: { id: order_id },
    });

    if (!order) {
      throw new AppError('Order not found');
    }

    const conclude = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        status: true,
      },
      select: {
        id: true,
        table: true,
        status: true,
        draft: true,
        name: true,
      },
    });

    return conclude;
  }
}

export { ConcludeOrderService };
