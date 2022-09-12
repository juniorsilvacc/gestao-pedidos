import { Request, Response } from 'express';
import { PostgresOrdersImplementations } from '../../repositories/implementations/postgres-orders-implementations';
import { SendOrdersUseCase } from './send-order-usecase';

class SendOrdersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.body;

    const ordersImplementations = new PostgresOrdersImplementations();
    const sendOrdersUseCase = new SendOrdersUseCase(ordersImplementations);

    const order = await sendOrdersUseCase.execute({
      order_id,
    });

    return response.status(200).json(order);
  }
}

export { SendOrdersController };
