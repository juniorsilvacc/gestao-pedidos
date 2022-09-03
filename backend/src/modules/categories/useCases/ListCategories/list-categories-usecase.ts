import { Category } from '../../models/category';
import { ICategoriesRespository } from '../../repositories/categories-repository';

class ListCategoriesUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRespository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.findAll();

    return categories;
  }
}

export { ListCategoriesUseCase };
