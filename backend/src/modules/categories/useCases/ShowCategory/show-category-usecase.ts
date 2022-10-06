import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/app-error';
import { Category } from '../../models/category';
import { ICategoriesRespository } from '../../repositories/categories-repository';

interface IRequest {
  id: string;
}

@injectable()
class ShowCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRespository,
  ) {}

  async execute({ id }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Categoria não encontrada', 404);
    }

    return category;
  }
}

export { ShowCategoriesUseCase };
