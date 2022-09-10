import { ICreateCategoryDTO } from '../dtos/create-category-dto';
import { Category } from '../models/category';

interface ICategoriesRespository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  findByName(name: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  remove(id: string): Promise<void>;
  findById(id: string): Promise<Category | null>;
}

export { ICategoriesRespository };
