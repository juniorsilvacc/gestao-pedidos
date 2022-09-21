import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/app-error';
import { ICacheProvider } from '../../../../shared/providers/cache/models/cache-provider';
import { ICreateProductDTO } from '../../dtos/create-product-dto';
import { Product } from '../../models/product';
import { IProductsRepository } from '../../repositories/products-repository';

@injectable()
class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
    @inject('CacheProvider')
    private readonly cacheProvider: ICacheProvider,
  ) {}

  async execute({
    name,
    description,
    price,
    image,
    category_id,
  }: ICreateProductDTO): Promise<Product> {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('Esse produto já existe');
    }

    const product = await this.productsRepository.create({
      name,
      description,
      price,
      image,
      category_id,
    });

    await this.cacheProvider.invalidate('api-PRODUCT_LIST');

    return product;
  }
}

export { CreateProductUseCase };
