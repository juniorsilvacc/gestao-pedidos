import { AppError } from '../../../../shared/errors/app-error';
import { IProductsRepository } from '../../repositories/products-repository';

class RemoveProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(id: string): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    await this.productsRepository.removeProduct(id);
  }
}

export { RemoveProductUseCase };
