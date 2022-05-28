import { Request, Response } from 'express';
import { CreateCategoryService } from '../../services/categories/CreateCategoryService';

class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({ name });

    return response.status(201).json(category);
  }
}

export { CreateCategoryController };
