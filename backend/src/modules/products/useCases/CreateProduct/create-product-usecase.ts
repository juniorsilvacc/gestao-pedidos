import { AppError } from '../../../../shared/errors/app-error';
import { ICreateProductDTO } from '../../dtos/create-product-dto';
import { Product } from '../../models/product';
import { IProductsRepository } from '../../repositories/products-repository';

class CreateProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

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

    return product;
  }
}

export { CreateProductUseCase };
