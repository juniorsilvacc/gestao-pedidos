import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { RemoveCategoryUseCase } from './remove-category-usecase';

class RemoveCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removeCategoryUseCase = container.resolve(RemoveCategoryUseCase);

    await removeCategoryUseCase.execute({ id });

    return response.status(204).json();
  }
}

export { RemoveCategoryController };
