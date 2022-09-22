import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/app-error';
import { ICategoriesRespository } from '../../repositories/categories-repository';

interface IRequest {
  id: string;
}

@injectable()
class RemoveCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRespository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Categoria não encontrada', 404);
    }

    await this.categoriesRepository.removeCategory(id);
  }
}

export { RemoveCategoryUseCase };
