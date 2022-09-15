import { AppError } from '../../../../shared/errors/app-error';
import { ICacheProvider } from '../../../../shared/providers/cache/cache-provider';
import { IProductsRepository } from '../../repositories/products-repository';

interface IRequest {
  id: string;
}

class RemoveProductUseCase {
  constructor(
    private readonly productsRepository: IProductsRepository,
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
