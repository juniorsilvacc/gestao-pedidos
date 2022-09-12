import { ICreateItemDTO } from '../dtos/create-item-dto';
import { Item } from '../models/item';

interface IItemsRepository {
  create(data: ICreateItemDTO): Promise<Item>;
  removeItem(id: string): Promise<void>;
  findById(id: string): Promise<Item | null>;
}

export { IItemsRepository };
