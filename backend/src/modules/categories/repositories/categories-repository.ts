import { ICreateCategoryDTO } from '../dtos/create-category-dto';
import { Category } from '../models/category';

interface ICategoriesRespository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  findByName(name: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  save(category: Category): Promise<Category>;
  removeCategory(id: string): Promise<void>;
}

export { ICategoriesRespository };
