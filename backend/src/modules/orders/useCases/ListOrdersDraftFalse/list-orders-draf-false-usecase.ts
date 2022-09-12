import { Order } from '../../models/order';
import { IOrdersRepository } from '../../repositories/orders-repository';

class ListOrdersDraftFalseUseCase {
  constructor(private readonly ordersRepository: IOrdersRepository) {}

  async execute(): Promise<Order[]> {
    const orders = await this.ordersRepository.listOrdersDraftFalse();

    return orders;
  }
}

export { ListOrdersDraftFalseUseCase };
