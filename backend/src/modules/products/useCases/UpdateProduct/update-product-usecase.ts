import { AppError } from '../../../../shared/errors/app-error';
import { IUpdateProductDTO } from '../../dtos/update-product-dto';
import { Product } from '../../models/product';
import { IProductsRepository } from '../../repositories/products-repository';

class UpdateProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

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

    if (productWithUpdateName && productWithUpdateName.id !== id) {
      throw new AppError('Produto existente');
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.category_id = category_id;

    await this.productsRepository.save(product);

    return product;
  }
}

export { UpdateProductUseCase };
