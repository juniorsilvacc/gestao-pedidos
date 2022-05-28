import prismaClient from '../../prisma';

interface IRequest {
  order_id: string;
}

class FindByOrderService {
  async execute({ order_id }: IRequest) {
    const order = await prismaClient.item.findMany({
      where: { order_id },
      include: {
        product: true,
        order: true,
      },
    });

    return order;
  }
}

export { FindByOrderService };
