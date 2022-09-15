import { Request, Response } from 'express';
import { RedisCacheProviderImplementations } from '../../../../shared/providers/cache/implementations/redis-cache-provider-implementations';
import { PostgresProductsImplementations } from '../../repositories/implementations/postgres-products-implementations';
import { ListProductsUseCase } from './list-products-usecase';

class ListProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const productsImplementations = new PostgresProductsImplementations();
    const redisCacheProviderImplementations =
      new RedisCacheProviderImplementations();
    const listProductsUseCase = new ListProductsUseCase(
      productsImplementations,
      redisCacheProviderImplementations,
    );

    const products = await listProductsUseCase.execute();

    return response.status(200).json(products);
  }
}

export { ListProductsController };
