import { Product } from '../../models/product';
import { IProductsRepository } from '../../repositories/products-repository';

class ListProductsUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(): Promise<Product[]> {
    const products = await this.productsRepository.findAll();

    return products;
  }
}

export { ListProductsUseCase };
