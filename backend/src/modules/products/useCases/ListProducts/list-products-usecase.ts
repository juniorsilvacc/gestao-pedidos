import { ICacheProvider } from '../../../../shared/providers/cache/cache-provider';
import { Product } from '../../models/product';
import { IProductsRepository } from '../../repositories/products-repository';

class ListProductsUseCase {
  constructor(
    private readonly productsRepository: IProductsRepository,
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
