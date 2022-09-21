import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/app-error';
import { ICacheProvider } from '../../../../shared/providers/cache/models/cache-provider';
import { IProductsRepository } from '../../repositories/products-repository';

interface IRequest {
  id: string;
}

@injectable()
class RemoveProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
    @inject('CacheProvider')
    private readonly cacheProvider: ICacheProvider,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    await this.cacheProvider.invalidate('api-PRODUCT_LIST');

    await this.productsRepository.removeProduct(id);
  }
}

export { RemoveProductUseCase };
