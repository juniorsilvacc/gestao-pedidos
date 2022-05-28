import prismaClient from '../../prisma';

class ListAllOrderNotDraftService {
  async execute() {
    const listOrder = await prismaClient.order.findMany({
      where: {
        draft: false,
        status: false,
      },
      orderBy: {
        created_at: 'desc',
      },
      select: {
        id: true,
        table: true,
        status: true,
        draft: true,
        name: true,
      },
    });

    return listOrder;
  }
}

export { ListAllOrderNotDraftService };
