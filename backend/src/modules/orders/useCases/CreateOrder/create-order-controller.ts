import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateOrderUseCase } from './create-order-usecase';

class CreateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, table } = request.body;

    const createOrderUseCase = container.resolve(CreateOrderUseCase);

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
