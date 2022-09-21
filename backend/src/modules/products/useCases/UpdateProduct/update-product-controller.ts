import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { UpdateProductUseCase } from './update-product-usecase';

class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, price, category_id } = request.body;

    const updateProductUseCase = container.resolve(UpdateProductUseCase);

    const product = await updateProductUseCase.execute({
      id,
      name,
      description,
      price,
      category_id,
    });

    return response.status(200).json(product);
  }
}

export { UpdateProductController };
