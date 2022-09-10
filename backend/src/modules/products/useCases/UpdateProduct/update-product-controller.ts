import { Request, Response } from 'express';
import { PostgresProductsImplementations } from '../../repositories/implementations/postgres-products-implementations';
import { UpdateProductUseCase } from './update-product-usecase';

class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, price, category_id } = request.body;

    const productsImplementations = new PostgresProductsImplementations();
    const updateProductUseCase = new UpdateProductUseCase(
      productsImplementations,
    );

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
