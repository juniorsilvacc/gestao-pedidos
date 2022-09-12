import { ICreateItemDTO } from '../dtos/create-item-dto';
import { Item } from '../models/item';

interface IItemsRepository {
  create(data: ICreateItemDTO): Promise<Item>;
}

export { IItemsRepository };
