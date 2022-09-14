import { ICreateItemDTO } from '../../dtos/create-item-dto';
import { Item } from '../../models/item';
import { IItemsRepository } from '../items-repository';

class InMemoryItemsImplementations implements IItemsRepository {
  private items: Item[] = [];

  async create({
    amount,
    order_id,
    product_id,
  }: ICreateItemDTO): Promise<Item> {
    const item = new Item();

    Object.assign(item, { amount, order_id, product_id });

    this.items.push(item);

    return item;
  }

  async removeItem(id: string): Promise<void> {
    this.items.find(item => item.id === id);
  }

  async findById(id: string): Promise<Item | null> {
    const item = this.items.find(item => item.id === id);

    return item || null;
  }

  async findDetail(order_id: string): Promise<Item[]> {
    const item = this.items.find(item => item.id === order_id) as any;

    return item;
  }
}

export { InMemoryItemsImplementations };
