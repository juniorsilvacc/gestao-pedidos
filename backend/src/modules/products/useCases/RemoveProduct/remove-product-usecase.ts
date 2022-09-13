import { AppError } from '../../../../shared/errors/app-error';
import { IProductsRepository } from '../../repositories/products-repository';

interface IRequest {
  id: string;
}

class RemoveProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute({ id }: IRequest): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    await this.productsRepository.removeProduct(id);
  }
}

export { RemoveProductUseCase };
