import { Request, Response } from 'express';
import { PostgresCategoriesImplementations } from '../../repositories/implementations/postgres-categories-implementations';
import { UpdateCategoryUseCase } from './update-category-usecase';

class UpdateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description } = request.body;

    const postgresCategoriesImplementations =
      new PostgresCategoriesImplementations();
    const updateCategoryUseCase = new UpdateCategoryUseCase(
      postgresCategoriesImplementations,
    );

    const category = await updateCategoryUseCase.execute({
      id,
      name,
      description,
    });

    return response.status(200).json(category);
  }
}

export { UpdateCategoryController };
