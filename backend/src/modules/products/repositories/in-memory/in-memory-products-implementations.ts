import { ICreateProductDTO } from '../../dtos/create-product-dto';
import { Product } from '../../models/product';
import { IProductsRepository } from '../products-repository';
import { v4 as uuidV4 } from 'uuid';

class InMemoryProductsImplementations implements IProductsRepository {
  private products: Product[] = [];

  async create({
    name,
    price,
    description,
    image,
    category_id,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      id: uuidV4(),
      name,
      price,
      description,
      image,
      category_id,
    });

    this.products.push(product);

    return product;
  }

  async findByName(name: string): Promise<Product | null> {
    const product = this.products.find(product => product.name === name);

    return product || null;
  }

  async findAll(): Promise<Product[]> {
    const products = this.products;

    return products;
  }

  async removeProduct(id: string): Promise<void> {
    this.products.find(product => product.id === id);
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find(product => product.id === id);

    return product || null;
  }

  async save(product: Product): Promise<Product> {
    const findIndex = this.products.findIndex(
      findCategory => findCategory.id === product.id,
    );

    this.products[findIndex] = product;

    return product;
  }
}

export { InMemoryProductsImplementations };
