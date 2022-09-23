import { AppError } from '../../../../shared/errors/app-error';
import { InMemoryCategoriesImplementations } from '../../repositories/in-memory/in-memory-categories-implementations';
import { RemoveCategoryUseCase } from './remove-category-usecase';

let inMemoryCategoriesImplementations: InMemoryCategoriesImplementations;
let removeCategoryUseCase: RemoveCategoryUseCase;

describe('Remove Category', () => {
  beforeEach(() => {
    inMemoryCategoriesImplementations = new InMemoryCategoriesImplementations();
    removeCategoryUseCase = new RemoveCategoryUseCase(
      inMemoryCategoriesImplementations,
    );
  });

  it('should not be able to remove a category does not exists', async () => {
    await expect(
      removeCategoryUseCase.execute({ id: 'non-existent' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
