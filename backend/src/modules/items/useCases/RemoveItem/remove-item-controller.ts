import { Request, Response } from 'express';
import { PostgresItemsImplementations } from '../../repositories/implementations/postgres-items-implementations';
import { RemoveItemUseCase } from './remove-item-usecase';

class RemoveItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const itemsImplementations = new PostgresItemsImplementations();
    const removeItemUseCase = new RemoveItemUseCase(itemsImplementations);

    await removeItemUseCase.execute({ id });

    return response.status(204).json();
  }
}

export { RemoveItemController };
