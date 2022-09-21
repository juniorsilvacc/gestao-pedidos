import { inject, injectable } from 'tsyringe';
import { ICacheProvider } from '../../../../shared/providers/cache/models/cache-provider';
import { Product } from '../../models/product';
import { IProductsRepository } from '../../repositories/products-repository';

@injectable()
class ListProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
    @inject('CacheProvider')
    private readonly cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<Product[]> {
    let products = await this.cacheProvider.recover<Product[]>(
      'api-PRODUCT_LIST',
    );

    if (!products) {
      products = await this.productsRepository.findAll();

      await this.cacheProvider.save('api-PRODUCT_LIST', products);
    }

    return products;
  }
}

export { ListProductsUseCase };
