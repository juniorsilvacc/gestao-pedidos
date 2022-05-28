import prismaClient from '../../prisma';
import { AppError } from '../../config/errors/AppError';

interface IRequest {
  order_id: string;
}

class SendOrderService {
  async execute({ order_id }: IRequest) {
    const order = await prismaClient.order.findFirst({
      where: { id: order_id },
    });

    if (!order) {
      throw new AppError('Order not found');
    }

    const sendOrder = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        draft: false,
      },
      select: {
        id: true,
        table: true,
        status: true,
        draft: true,
        name: true,
      },
    });

    return sendOrder;
  }
}

export { SendOrderService };
