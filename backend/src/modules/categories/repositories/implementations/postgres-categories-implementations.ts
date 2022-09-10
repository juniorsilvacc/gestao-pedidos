import { Repository } from 'typeorm';
import { dataSource } from '../../../../shared/infra/typeorm';
import { ICreateCategoryDTO } from '../../dtos/create-category-dto';
import { Category } from '../../models/category';
import { ICategoriesRespository } from '../categories-repository';

class PostgresCategoriesImplementations implements ICategoriesRespository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = dataSource.getRepository(Category);
  }

  async removeCategory(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.repository.findOneBy({ id });

    return category;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.repository.findOneBy({ name });

    return category;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({ name, description });

    await this.repository.save(category);

    return category;
  }
}

export { PostgresCategoriesImplementations };
