import { Repository } from 'typeorm';
import { dataSource } from '../../../../shared/infra/typeorm';
import { ICreateProductDTO } from '../../dtos/create-product-dto';
import { Product } from '../../models/product';
import { IProductsRepository } from '../products-repository';

class PostgresProductsImplementations implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = dataSource.getRepository(Product);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.repository.find({
      relations: ['category'],
      select: {
        name: true,
        description: true,
        price: true,
        image: true,
        created_at: true,
        updated_at: true,
      },
    });

    return products;
  }

  async create({
    name,
    description,
    price,
    image,
    category_id,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create({
      name,
      description,
      price,
      image,
      category_id,
    });

    await this.repository.save(product);

    return product;
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await this.repository.findOneBy({ name });

    return product;
  }
}

export { PostgresProductsImplementations };
