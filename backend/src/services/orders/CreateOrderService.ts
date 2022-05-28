import prismaClient from '../../prisma';

interface IRequest {
  table: number;
  name: string;
}

class CreateOrderService {
  async execute({ table, name }: IRequest) {
    const order = await prismaClient.order.create({
      data: {
        table,
        name,
      },
      select: {
        id: true,
        table: true,
        status: true,
        draft: true,
        name: true,
      },
    });

    return order;
  }
}

export { CreateOrderService };
