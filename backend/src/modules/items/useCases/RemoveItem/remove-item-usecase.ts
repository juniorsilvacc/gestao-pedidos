import { AppError } from '../../../../shared/errors/app-error';
import { IItemsRepository } from '../../repositories/items-repository';

interface IRequest {
  id: string;
}

class RemoveItemUseCase {
  constructor(private readonly itemsRepository: IItemsRepository) {}

  async execute({ id }: IRequest): Promise<void> {
    const itemExists = await this.itemsRepository.findById(id);

    if (!itemExists) {
      throw new AppError('Item não encontrado', 404);
    }

    await this.itemsRepository.removeItem(id);
  }
}

export { RemoveItemUseCase };
