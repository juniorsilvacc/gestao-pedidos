import { AppError } from '../../../../shared/errors/app-error';
import { INotificationsRepository } from '../../../notifications/repositories/notifications-repository';
import { Order } from '../../models/order';
import { IOrdersRepository } from '../../repositories/orders-repository';

interface IRequest {
  order_id: string;
}

class SendOrdersUseCase {
  constructor(
    private readonly ordersRepository: IOrdersRepository,
    private readonly notificationsRepository: INotificationsRepository,
  ) {}

  async execute({ order_id }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.findById(order_id);

    if (!order) {
      throw new AppError('Pedido não encontrado', 404);
    }

    order.draft = false;

    await this.ordersRepository.save(order);

    await this.notificationsRepository.create({
      order_id,
      content: `Novo Pedido Enviado. Mesa ${order.table} solicitando o pedido.`,
    });

    return order;
  }
}

export { SendOrdersUseCase };
