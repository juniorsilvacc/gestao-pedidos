import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/app-error';
import { ICreateCategoryDTO } from '../../dtos/create-category-dto';
import { Category } from '../../models/category';
import { ICategoriesRespository } from '../../repositories/categories-repository';

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRespository,
  ) {}

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
