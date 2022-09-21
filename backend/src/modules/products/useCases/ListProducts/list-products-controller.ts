import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ListProductsUseCase } from './list-products-usecase';

class ListProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listProductsUseCase = container.resolve(ListProductsUseCase);

    const products = await listProductsUseCase.execute();

    return response.status(200).json(products);
  }
}

export { ListProductsController };
