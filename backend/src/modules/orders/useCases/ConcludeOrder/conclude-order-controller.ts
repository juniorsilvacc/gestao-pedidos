import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ConcludeOrdersUseCase } from './conclude-order-usecase';

class ConcludeOrdersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.body;

    const concludeOrdersUseCase = container.resolve(ConcludeOrdersUseCase);

    const order = await concludeOrdersUseCase.execute({
      order_id,
    });

    return response.status(200).json(order);
  }
}

export { ConcludeOrdersController };
