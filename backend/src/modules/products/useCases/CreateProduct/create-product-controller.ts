import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { AppError } from '../../../../shared/errors/app-error';
import { CreateProductUseCase } from './create-product-usecase';

class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, price, category_id } = request.body;

    const createProductUseCase = container.resolve(CreateProductUseCase);

    if (!request.file) {
      throw new AppError('Error: upload image');
    } else {
      const { filename: image } = request.file;

      const product = await createProductUseCase.execute({
        name,
        description,
        price,
        image,
        category_id,
      });

      return response.status(201).json(product);
    }
  }
}

export { CreateProductController };
