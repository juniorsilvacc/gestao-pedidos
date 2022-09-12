import { Request, Response } from 'express';
import { PostgresOrdersImplementations } from '../repositories/implementations/postgres-orders-implementations';
import { CreateOrderUseCase } from './create-order-usecase';

class CreateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, table } = request.body;

    const ordersImplementations = new PostgresOrdersImplementations();
    const createOrderUseCase = new CreateOrderUseCase(ordersImplementations);

    const order = await createOrderUseCase.execute({
      name,
      table,
      status: false,
      draft: true,
    });

    return response.status(201).json(order);
  }
}

export { CreateOrderController };
