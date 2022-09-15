import { Repository } from 'typeorm';
import { PostgresDataSource } from '../../../../shared/infra/typeorm';
import { ICreateItemDTO } from '../../dtos/create-item-dto';
import { Item } from '../../models/item';
import { IItemsRepository } from '../items-repository';

class PostgresItemsImplementations implements IItemsRepository {
  private repository: Repository<Item>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(Item);
  }

  async findDetail(order_id: string): Promise<Item[]> {
    const order = await this.repository.find({
      where: { order_id },
      relations: ['product', 'order'],
      order: {
        created_at: 'DESC',
      },
    });

    return order;
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
