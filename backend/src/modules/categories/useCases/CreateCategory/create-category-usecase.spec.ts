import { AppError } from '../../../../shared/errors/app-error';
import { InMemoryCategoriesImplementations } from '../../repositories/in-memory/in-memory-categories-implementations';
import { CreateCategoryUseCase } from './create-category-usecase';

let inMemoryCategoriesImplementations: InMemoryCategoriesImplementations;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create Category', () => {
  beforeEach(() => {
    inMemoryCategoriesImplementations = new InMemoryCategoriesImplementations();
    createCategoryUseCase = new CreateCategoryUseCase(
      inMemoryCategoriesImplementations,
    );
  });

  it('should create a new category', async () => {
    const category = await createCategoryUseCase.execute({
      name: 'Category Name',
      description: 'Category Description',
    });

    expect(category).toHaveProperty('id');
  });

  it('shold not be able to create a new category with the same name', async () => {
    await inMemoryCategoriesImplementations.create({
      name: 'Category Name',
      description: 'Category Description',
    });

    expect(
      createCategoryUseCase.execute({
        name: 'Category Name',
        description: 'Category Description 2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
