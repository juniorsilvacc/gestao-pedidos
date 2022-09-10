import { Request, Response } from 'express';
import { AppError } from '../../../../shared/errors/app-error';
import { PostgresProductsImplementations } from '../../repositories/implementations/postgres-products-implementations';
import { CreateProductUseCase } from './create-product-usecase';

class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, price, category_id } = request.body;

    const productsImplementations = new PostgresProductsImplementations();
    const createProductUseCase = new CreateProductUseCase(
      productsImplementations,
    );

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
