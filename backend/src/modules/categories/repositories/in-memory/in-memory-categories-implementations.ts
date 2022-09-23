import { ICreateCategoryDTO } from '../../dtos/create-category-dto';
import { Category } from '../../models/category';
import { ICategoriesRespository } from '../categories-repository';
import { v4 as uuidV4 } from 'uuid';

class InMemoryCategoriesImplementations implements ICategoriesRespository {
  private categories: Category[] = [];

  async removeCategory(id: string): Promise<void> {
    this.categories.find(category => category.id === id);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: uuidV4(), name, description });

    this.categories.push(category);

    return category;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find(category => category.name === name);

    return category || null;
  }

  async findAll(): Promise<Category[]> {
    const categories = this.categories;

    return categories;
  }

  async findById(id: string): Promise<Category | null> {
    const category = this.categories.find(category => category.id === id);

    return category || null;
  }

  async save(category: Category): Promise<Category> {
    const findIndex = this.categories.findIndex(
      findCategory => findCategory.id === category.id,
    );

    this.categories[findIndex] = category;

    return category;
  }
}

export { InMemoryCategoriesImplementations };
