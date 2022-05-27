import { AppError } from '../../config/errors/AppError';
import prismaClient from '../../prisma';

interface IRequest {
  order_id: string;
}

class CloseOrderService {
  async execute({ order_id }: IRequest) {
    const order = await prismaClient.order.findFirst({
      where: { id: order_id },
    });

    if (!order) {
      throw new AppError('Order not found');
    }

    const closeOrder = await prismaClient.order.delete({
      where: { id: order_id },
    });

    return closeOrder;
  }
}

export { CloseOrderService };
