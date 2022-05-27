import prismaClient from '../../prisma';

interface IRequest {
  amount: number;
  order_id: string;
  product_id: string;
}

class CreateOrderItemService {
  async execute({ amount, order_id, product_id }: IRequest) {
    const item = await prismaClient.item.create({
      data: {
        amount,
        order_id,
        product_id,
      },
      select: {
        id: true,
        amount: true,
        order_id: true,
        product_id: true,
      },
    });

    return item;
  }
}

export { CreateOrderItemService };
