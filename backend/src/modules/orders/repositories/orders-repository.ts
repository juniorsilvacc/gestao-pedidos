import { ICreateOrderDTO } from '../dtos/create-order-dto';
import { Order } from '../models/order';

interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
  findByTable(table: number): Promise<Order | null>;
  closeOrder(order_id: string): Promise<void>;
  findById(id: string): Promise<Order | null>;
}

export { IOrdersRepository };
