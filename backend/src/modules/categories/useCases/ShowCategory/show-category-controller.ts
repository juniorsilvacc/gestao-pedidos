import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ShowCategoriesUseCase } from './show-category-usecase';

class ShowCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCategoriesUseCase = container.resolve(ShowCategoriesUseCase);

    const category = await showCategoriesUseCase.execute({ id });

    return response.status(200).json(category);
  }
}

export { ShowCategoryController };
