import { AppError } from '../../../../shared/errors/app-error';
import { InMemoryCategoriesImplementations } from '../../repositories/in-memory/in-memory-categories-implementations';
import { UpdateCategoryUseCase } from './update-category-usecase';

let inMemoryCategoriesImplementations: InMemoryCategoriesImplementations;
let updateCategoryUseCase: UpdateCategoryUseCase;

describe('Update Category', () => {
  beforeEach(() => {
    inMemoryCategoriesImplementations = new InMemoryCategoriesImplementations();
    updateCategoryUseCase = new UpdateCategoryUseCase(
      inMemoryCategoriesImplementations,
    );
  });

  it('should not be able to update a user does not exists', async () => {
    expect(
      updateCategoryUseCase.execute({
        id: 'b6a3582a-e54d-444b-bf70-3affd4fb28fe',
        name: 'non-existing category',
        description: 'Category Description',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to switch to another user name if it already exists', async () => {
    const category = await inMemoryCategoriesImplementations.create({
      name: 'Name Category',
      description: 'Category Description',
    });

    await expect(
      updateCategoryUseCase.execute({
        id: category.id,
        name: 'Name Category',
        description: 'Category Description',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update', async () => {
    const category = await inMemoryCategoriesImplementations.create({
      name: 'Name Category',
      description: 'Category Description',
    });

    await updateCategoryUseCase.execute({
      id: category.id,
      name: 'Name Category Update',
      description: 'Category Description Update',
    });

    expect(category.name).toBe('Name Category Update');
    expect(category.description).toBe('Category Description Update');
  });
});
