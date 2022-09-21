import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/app-error';
import { ICacheProvider } from '../../../../shared/providers/cache/models/cache-provider';
import { IUpdateProductDTO } from '../../dtos/update-product-dto';
import { Product } from '../../models/product';
import { IProductsRepository } from '../../repositories/products-repository';

@injectable()
class UpdateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
    @inject('CacheProvider')
    private readonly cacheProvider: ICacheProvider,
  ) {}

  async execute({
    id,
    name,
    description,
    price,
    category_id,
  }: IUpdateProductDTO): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    const productWithUpdateName = await this.productsRepository.findByName(
      name,
    );

    if (productWithUpdateName) {
      throw new AppError('Produto existente');
    }

    await this.cacheProvider.invalidate('api-PRODUCT_LIST');

    product.name = name;
    product.description = description;
    product.price = price;
    product.category_id = category_id;

    await this.productsRepository.save(product);

    return product;
  }
}

export { UpdateProductUseCase };
