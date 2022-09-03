import { Request, Response } from 'express';
import { PostgresCategoriesImplementations } from '../../repositories/implementations/postgres-categories-implementations';
import { ListCategoriesUseCase } from './list-categories-usecase';

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const postgresCategoriesImplementations =
      new PostgresCategoriesImplementations();
    const listCategoriesUseCase = new ListCategoriesUseCase(
      postgresCategoriesImplementations,
    );

    const categories = await listCategoriesUseCase.execute();

    return response.status(200).json(categories);
  }
}

export { ListCategoriesController };
