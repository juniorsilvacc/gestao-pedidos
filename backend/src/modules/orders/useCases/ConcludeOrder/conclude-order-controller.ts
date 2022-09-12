import { Request, Response } from 'express';
import { PostgresOrdersImplementations } from '../../repositories/implementations/postgres-orders-implementations';
import { ConcludeOrdersUseCase } from './conclude-order-usecase';

class ConcludeOrdersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.body;

    const ordersImplementations = new PostgresOrdersImplementations();
    const concludeOrdersUseCase = new ConcludeOrdersUseCase(
      ordersImplementations,
    );

    const order = await concludeOrdersUseCase.execute({
      order_id,
    });

    return response.status(200).json(order);
  }
}

export { ConcludeOrdersController };
