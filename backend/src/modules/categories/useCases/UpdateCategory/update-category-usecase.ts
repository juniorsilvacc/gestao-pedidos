import { AppError } from '../../../../shared/errors/app-error';
import { IUpdateCategoryDTO } from '../../dtos/update-category-dto';
import { Category } from '../../models/category';
import { ICategoriesRespository } from '../../repositories/categories-repository';

class UpdateCategoryUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRespository) {}

  async execute({
    id,
    name,
    description,
  }: IUpdateCategoryDTO): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Categoria não encontrada', 404);
    }

    const categoryWithUpdateName = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryWithUpdateName) {
      throw new AppError('Categoria existente');
    }

    category.name = name;
    category.description = description as string;

    await this.categoriesRepository.save(category);

    return category;
  }
}

export { UpdateCategoryUseCase };
