import { Repository } from 'typeorm';
import { PostgresDataSource } from '../../../../shared/infra/typeorm';
import { ICreateOrderDTO } from '../../dtos/create-order-dto';
import { Order } from '../../models/order';
import { IOrdersRepository } from '../orders-repository';

class PostgresOrdersImplementations implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(Order);
  }

  async save(order: Order): Promise<Order> {
    return await this.repository.save(order);
  }

  async listOrdersDraftFalse(): Promise<Order[]> {
    const order = await this.repository.find({
      where: { status: false, draft: false },
      order: {
        created_at: 'DESC',
      },
    });

    return order;
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
