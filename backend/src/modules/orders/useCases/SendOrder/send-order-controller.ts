import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { SendOrdersUseCase } from './send-order-usecase';

class SendOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.body;

    const sendOrderUseCase = container.resolve(SendOrdersUseCase);

    const order = await sendOrderUseCase.execute({
      order_id,
    });

    return response.status(200).json(order);
  }
}

export { SendOrderController };
