import { Request, Response } from 'express';
import { PostgresOrdersImplementations } from '../../repositories/implementations/postgres-orders-implementations';
import { ListOrdersUseCase } from './list-orders-usecase';

class ListOrdersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const ordersImplementations = new PostgresOrdersImplementations();
    const listOrdersUseCase = new ListOrdersUseCase(ordersImplementations);

    const orders = await listOrdersUseCase.execute();

    return response.status(200).json(orders);
  }
}

export { ListOrdersController };
