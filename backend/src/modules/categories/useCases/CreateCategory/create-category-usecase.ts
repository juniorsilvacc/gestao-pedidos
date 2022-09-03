import { AppError } from '../../../../shared/errors/app-error';
import { ICreateCategoryDTO } from '../../dtos/create-category-dto';
import { Category } from '../../models/category';
import { ICategoriesRespository } from '../../repositories/categories-repository';

class CreateCategoryUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRespository) {}

  async execute({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = await this.categoriesRepository.findByName(name);

    if (category) {
      throw new AppError('Essa categoria já existe');
    }

    const newCategory = await this.categoriesRepository.create({
      name,
      description,
    });

    return newCategory;
  }
}

export { CreateCategoryUseCase };
