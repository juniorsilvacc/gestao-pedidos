import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { RemoveItemUseCase } from './remove-item-usecase';

class RemoveItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removeItemUseCase = container.resolve(RemoveItemUseCase);

    await removeItemUseCase.execute({ id });

    return response.status(204).json();
  }
}

export { RemoveItemController };
