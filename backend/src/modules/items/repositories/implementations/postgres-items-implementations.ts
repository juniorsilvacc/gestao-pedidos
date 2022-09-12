import { Repository } from 'typeorm';
import { dataSource } from '../../../../shared/infra/typeorm';
import { ICreateItemDTO } from '../../dtos/create-item-dto';
import { Item } from '../../models/item';
import { IItemsRepository } from '../items-repository';

class PostgresItemsImplementations implements IItemsRepository {
  private repository: Repository<Item>;

  constructor() {
    this.repository = dataSource.getRepository(Item);
  }

  async findById(id: string): Promise<Item | null> {
    const item = await this.repository.findOneBy({ id });

    return item;
  }

  async removeItem(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async create({
    amount,
    order_id,
    product_id,
  }: ICreateItemDTO): Promise<Item> {
    const item = this.repository.create({
      amount,
      order_id,
      product_id,
    });

    await this.repository.save(item);

    return item;
  }
}

export { PostgresItemsImplementations };
