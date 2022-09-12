import { AppError } from '../../../../shared/errors/app-error';
import { Item } from '../../../items/models/item';
import { IItemsRepository } from '../../../items/repositories/items-repository';

interface IRequest {
  order_id: string;
}

class ListOrderItemDetailsUseCase {
  constructor(private readonly itemsRepository: IItemsRepository) {}

  async execute({ order_id }: IRequest): Promise<Item[]> {
    const orders = await this.itemsRepository.findDetail(order_id);

    if (!orders) {
      throw new AppError('Pedido não encontrado', 404);
    }

    return orders;
  }
}

export { ListOrderItemDetailsUseCase };
