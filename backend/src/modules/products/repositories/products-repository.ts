import { ICreateProductDTO } from '../dtos/create-product-dto';
import { Product } from '../models/product';

interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findByName(name: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  removeProduct(id: string): Promise<void>;
  findById(id: string): Promise<Product | null>;
  save(prodject: Product): Promise<Product>;
}

export { IProductsRepository };
