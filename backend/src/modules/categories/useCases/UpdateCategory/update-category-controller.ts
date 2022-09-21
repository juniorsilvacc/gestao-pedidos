import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { UpdateCategoryUseCase } from './update-category-usecase';

class UpdateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description } = request.body;

    const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase);

    const category = await updateCategoryUseCase.execute({
      id,
      name,
      description,
    });

    return response.status(200).json(category);
  }
}

export { UpdateCategoryController };
