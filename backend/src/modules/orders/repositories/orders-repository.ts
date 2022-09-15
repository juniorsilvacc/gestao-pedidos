import { ICreateOrderDTO } from '../dtos/create-order-dto';
import { Order } from '../models/order';

interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
  findByTable(table: number): Promise<Order | null>;
  closeOrder(id: string): Promise<void>;
  findById(id: string): Promise<Order | null>;
  listOrdersDraftFalse(): Promise<Order[]>;
  save(order: Order): Promise<Order>;
}

export { IOrdersRepository };
