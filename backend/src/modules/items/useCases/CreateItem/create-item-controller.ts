import { Request, Response } from 'express';
import { PostgresItemsImplementations } from '../../repositories/implementations/postgres-items-implementations';

import { CreateItemUseCase } from './create-item-usecase';

class CreateItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { amount, order_id, product_id } = request.body;

    const itemsImplementations = new PostgresItemsImplementations();
    const createItemUseCase = new CreateItemUseCase(itemsImplementations);

    const item = await createItemUseCase.execute({
      amount,
      order_id,
      product_id,
    });

    return response.status(201).json(item);
  }
}

export { CreateItemController };
