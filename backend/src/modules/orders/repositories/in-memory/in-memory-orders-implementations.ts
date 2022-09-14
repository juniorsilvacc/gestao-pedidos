import { ICreateOrderDTO } from '../../dtos/create-order-dto';
import { Order } from '../../models/order';
import { IOrdersRepository } from '../orders-repository';
import { v4 as uuidV4 } from 'uuid';

class InMemoryOrdersImplementations implements IOrdersRepository {
  private orders: Order[] = [];

  async create({
    name,
    table,
    status,
    draft,
  }: ICreateOrderDTO): Promise<Order> {
    const order = new Order();

    Object.assign(order, {
      id: uuidV4(),
      name,
      table,
      status,
      draft,
    });

    this.orders.push(order);

    return order;
  }

  async findByTable(table: number): Promise<Order | null> {
    const order = this.orders.find(order => order.table === table);

    return order || null;
  }

  async closeOrder(order_id: string): Promise<void> {
    this.orders.find(order => order.id === order_id);
  }

  async findById(id: string): Promise<Order | null> {
    const order = this.orders.find(order => order.id === id);

    return order || null;
  }

  async listOrdersDraftFalse(): Promise<Order[]> {
    const orders = this.orders;

    return orders;
  }

  async save(order: Order): Promise<Order> {
    const findIndex = this.orders.findIndex(
      findCategory => findCategory.id === order.id,
    );

    this.orders[findIndex] = order;

    return order;
  }
}

export { InMemoryOrdersImplementations };
