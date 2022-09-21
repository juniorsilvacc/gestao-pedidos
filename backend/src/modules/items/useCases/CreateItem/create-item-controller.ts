import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateItemUseCase } from './create-item-usecase';

class CreateItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { amount, order_id, product_id } = request.body;

    const createItemUseCase = container.resolve(CreateItemUseCase);

    const item = await createItemUseCase.execute({
      amount,
      order_id,
      product_id,
    });

    return response.status(201).json(item);
  }
}

export { CreateItemController };
