import { Request, Response } from 'express';
import { RedisCacheProviderImplementations } from '../../../../shared/providers/cache/implementations/redis-cache-provider-implementations';
import { PostgresProductsImplementations } from '../../repositories/implementations/postgres-products-implementations';
import { UpdateProductUseCase } from './update-product-usecase';

class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, price, category_id } = request.body;

    const productsImplementations = new PostgresProductsImplementations();
    const redisCacheProviderImplementations =
      new RedisCacheProviderImplementations();
    const updateProductUseCase = new UpdateProductUseCase(
      productsImplementations,
      redisCacheProviderImplementations,
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
