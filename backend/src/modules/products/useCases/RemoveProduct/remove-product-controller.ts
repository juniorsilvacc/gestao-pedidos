import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { RemoveProductUseCase } from './remove-product-usecase';

class RemoveProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removeProductUseCase = container.resolve(RemoveProductUseCase);

    await removeProductUseCase.execute({ id });

    return response.status(204).json();
  }
}

export { RemoveProductController };
