import { Request, Response } from 'express';
import { PostgresProductsImplementations } from '../../repositories/implementations/postgres-products-implementations';
import { ListProductsUseCase } from './list-products-usecase';

class ListProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const productsImplementations = new PostgresProductsImplementations();
    const listProductsUseCase = new ListProductsUseCase(
      productsImplementations,
    );

    const products = await listProductsUseCase.execute();

    return response.status(200).json(products);
  }
}

export { ListProductsController };
