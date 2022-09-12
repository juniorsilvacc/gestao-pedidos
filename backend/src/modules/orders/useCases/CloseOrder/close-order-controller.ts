import { Request, Response } from 'express';
import { PostgresOrdersImplementations } from '../../repositories/implementations/postgres-orders-implementations';
import { CloseOrderUseCase } from './close-order-usecase';

class CloseOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const ordersImplementations = new PostgresOrdersImplementations();
    const closeOrderUseCase = new CloseOrderUseCase(ordersImplementations);

    await closeOrderUseCase.execute({ order_id: id });

    return response.status(204).json();
  }
}

export { CloseOrderController };
