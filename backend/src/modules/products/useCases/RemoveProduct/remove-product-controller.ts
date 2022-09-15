import { Request, Response } from 'express';
import { RedisCacheProviderImplementations } from '../../../../shared/providers/cache/implementations/redis-cache-provider-implementations';
import { PostgresProductsImplementations } from '../../repositories/implementations/postgres-products-implementations';
import { RemoveProductUseCase } from './remove-product-usecase';

class RemoveProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const productsImplementations = new PostgresProductsImplementations();
    const redisCacheProviderImplementations =
      new RedisCacheProviderImplementations();
    const removeProductUseCase = new RemoveProductUseCase(
      productsImplementations,
      redisCacheProviderImplementations,
    );

    await removeProductUseCase.execute({ id });

    return response.status(204).json();
  }
}

export { RemoveProductController };
