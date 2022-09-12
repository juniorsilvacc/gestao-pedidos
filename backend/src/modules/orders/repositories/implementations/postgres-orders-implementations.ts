import { Repository } from 'typeorm';
import { dataSource } from '../../../../shared/infra/typeorm';
import { ICreateOrderDTO } from '../../dtos/create-order-dto';
import { Order } from '../../models/order';
import { IOrdersRepository } from '../orders-repository';

class PostgresOrdersImplementations implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = dataSource.getRepository(Order);
  }

  async listOrders(): Promise<Order[]> {
    const orders = await this.repository.find();

    return orders;
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.repository.findOneBy({ id });

    return order;
  }

  async closeOrder(order_id: string): Promise<void> {
    await this.repository.delete(order_id);
  }

  async findByTable(table: number): Promise<Order | null> {
    const order = await this.repository.findOneBy({ table });

    return order;
  }

  async create({ name, table }: ICreateOrderDTO): Promise<Order> {
    const order = this.repository.create({
      name,
      table,
      status: false,
      draft: true,
    });

    await this.repository.save(order);

    return order;
  }
}

export { PostgresOrdersImplementations };
