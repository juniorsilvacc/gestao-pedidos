import { ICreateProductDTO } from '../dtos/create-product-dto';
import { Product } from '../models/product';

interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findByName(name: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
}

export { IProductsRepository };
