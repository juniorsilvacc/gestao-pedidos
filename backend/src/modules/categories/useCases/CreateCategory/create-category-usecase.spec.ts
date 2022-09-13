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
});
