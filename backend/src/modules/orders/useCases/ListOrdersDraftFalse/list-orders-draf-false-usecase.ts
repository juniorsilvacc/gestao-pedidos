import { inject, injectable } from 'tsyringe';
import { Order } from '../../models/order';
import { IOrdersRepository } from '../../repositories/orders-repository';

@injectable()
class ListOrdersDraftFalseUseCase {
  constructor(
    @inject('OrdersRepository')
    private readonly ordersRepository: IOrdersRepository,
  ) {}

  async execute(): Promise<Order[]> {
    const orders = await this.ordersRepository.listOrdersDraftFalse();

    return orders;
  }
}

export { ListOrdersDraftFalseUseCase };
