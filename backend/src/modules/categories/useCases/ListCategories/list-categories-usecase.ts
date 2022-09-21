import { inject, injectable } from 'tsyringe';
import { Category } from '../../models/category';
import { ICategoriesRespository } from '../../repositories/categories-repository';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRespository,
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.findAll();

    return categories;
  }
}

export { ListCategoriesUseCase };
