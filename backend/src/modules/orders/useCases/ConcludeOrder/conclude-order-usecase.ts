import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/app-error';
import { Order } from '../../models/order';
import { IOrdersRepository } from '../../repositories/orders-repository';

interface IRequest {
  order_id: string;
}

@injectable()
class ConcludeOrdersUseCase {
  constructor(
    @inject('OrdersRepository')
    private readonly ordersRepository: IOrdersRepository,
  ) {}

  async execute({ order_id }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.findById(order_id);

    if (!order) {
      throw new AppError('Pedido não encontrado', 404);
    }

    order.status = true;

    await this.ordersRepository.save(order);

    return order;
  }
}

export { ConcludeOrdersUseCase };
