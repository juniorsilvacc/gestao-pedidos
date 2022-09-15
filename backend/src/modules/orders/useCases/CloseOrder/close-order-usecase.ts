import { AppError } from '../../../../shared/errors/app-error';
import { IOrdersRepository } from '../../repositories/orders-repository';

interface IRequest {
  id: string;
}

class CloseOrderUseCase {
  constructor(private readonly ordersRepository: IOrdersRepository) {}

  async execute({ id }: IRequest): Promise<void> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Pedido não encontrado', 404);
    }

    await this.ordersRepository.closeOrder(id);
  }
}

export { CloseOrderUseCase };
