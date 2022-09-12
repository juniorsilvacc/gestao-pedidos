import { Order } from '../../models/order';
import { IOrdersRepository } from '../../repositories/orders-repository';

class ListOrdersUseCase {
  constructor(private readonly ordersRepository: IOrdersRepository) {}

  async execute(): Promise<Order[]> {
    const orders = await this.ordersRepository.listOrders();

    return orders;
  }
}

export { ListOrdersUseCase };
