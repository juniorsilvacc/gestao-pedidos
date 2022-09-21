import { inject, injectable } from 'tsyringe';
import { ICreateItemDTO } from '../../dtos/create-item-dto';
import { Item } from '../../models/item';
import { IItemsRepository } from '../../repositories/items-repository';

@injectable()
class CreateItemUseCase {
  constructor(
    @inject('ItemsRepository')
    private readonly itemsRepository: IItemsRepository,
  ) {}

  async execute({
    amount,
    order_id,
    product_id,
  }: ICreateItemDTO): Promise<Item> {
    const item = await this.itemsRepository.create({
      amount,
      order_id,
      product_id,
    });

    return item;
  }
}

export { CreateItemUseCase };
