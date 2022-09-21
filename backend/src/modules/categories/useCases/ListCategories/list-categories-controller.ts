import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ListCategoriesUseCase } from './list-categories-usecase';

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const categories = await listCategoriesUseCase.execute();

    return response.status(200).json(categories);
  }
}

export { ListCategoriesController };
