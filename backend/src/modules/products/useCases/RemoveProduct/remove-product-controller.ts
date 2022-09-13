import { Request, Response } from 'express';
import { PostgresProductsImplementations } from '../../repositories/implementations/postgres-products-implementations';
import { RemoveProductUseCase } from './remove-product-usecase';

class RemoveProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const productsImplementations = new PostgresProductsImplementations();
    const removeProductUseCase = new RemoveProductUseCase(
      productsImplementations,
    );

    await removeProductUseCase.execute({ id });

    return response.status(204).json();
  }
}

export { RemoveProductController };
