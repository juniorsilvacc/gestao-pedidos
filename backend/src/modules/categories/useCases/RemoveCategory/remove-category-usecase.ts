import { AppError } from '../../../../shared/errors/app-error';
import { ICategoriesRespository } from '../../repositories/categories-repository';

interface IRequest {
  id: string;
}

class RemoveCategoryUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRespository) {}

  async execute({ id }: IRequest): Promise<void> {
    const categoryExists = await this.categoriesRepository.findById(id);

    if (!categoryExists) {
      throw new AppError('Essa categoria não existe', 404);
    }

    await this.categoriesRepository.removeCategory(id);
  }
}

export { RemoveCategoryUseCase };
