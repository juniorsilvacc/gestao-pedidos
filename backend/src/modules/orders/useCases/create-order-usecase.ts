import { AppError } from '../../../shared/errors/app-error';
import { ICreateOrderDTO } from '../dtos/create-order-dto';
import { Order } from '../models/order';
import { IOrdersRepository } from '../repositories/orders-repository';

class CreateOrderUseCase {
  constructor(private readonly ordersRepository: IOrdersRepository) {}

  async execute({ name, table }: ICreateOrderDTO): Promise<Order> {
    const registeredTable = await this.ordersRepository.findByTable(table);

    if (registeredTable) {
      throw new AppError('Essa mesa foi registrada');
    }

    const order = await this.ordersRepository.create({
      name,
      table,
      status: false,
      draft: true,
    });

    return order;
  }
}

export { CreateOrderUseCase };
