import { Request, Response } from 'express';
import { PostgresCategoriesImplementations } from '../../repositories/implementations/postgres-categories-implementations';
import { CreateCategoryUseCase } from './create-category-usecase';

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const postgresCategoriesImplementations =
      new PostgresCategoriesImplementations();
    const createCategoryUseCase = new CreateCategoryUseCase(
      postgresCategoriesImplementations,
    );

    const category = await createCategoryUseCase.execute({ name, description });

    return response.status(201).json(category);
  }
}

export { CreateCategoryController };
