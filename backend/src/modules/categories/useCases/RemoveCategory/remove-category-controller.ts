import { Request, Response } from 'express';
import { PostgresCategoriesImplementations } from '../../repositories/implementations/postgres-categories-implementations';
import { RemoveCategoryUseCase } from './remove-category-usecase';

class RemoveCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const postgresCategoriesImplementations =
      new PostgresCategoriesImplementations();
    const removeCategoryUseCase = new RemoveCategoryUseCase(
      postgresCategoriesImplementations,
    );

    await removeCategoryUseCase.execute({ id });

    return response.status(204).json();
  }
}

export { RemoveCategoryController };
