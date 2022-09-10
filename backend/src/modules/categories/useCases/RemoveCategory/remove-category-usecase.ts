import { AppError } from '../../../../shared/errors/app-error';
import { ICategoriesRespository } from '../../repositories/categories-repository';

interface IRequest {
  id: string;
}

class RemoveCategoryUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRespository) {}

  async execute({ id }: IRequest): Promise<void> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Essa categoria não existe', 404);
    }

    await this.categoriesRepository.remove(id);
  }
}

export { RemoveCategoryUseCase };
