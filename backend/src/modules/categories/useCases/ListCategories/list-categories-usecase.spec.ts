import { InMemoryCategoriesImplementations } from '../../repositories/in-memory/in-memory-categories-implementations';
import { ListCategoriesUseCase } from './list-categories-usecase';

let inMemoryCategoriesImplementations: InMemoryCategoriesImplementations;
let listCategoriesUseCase: ListCategoriesUseCase;

describe('List Categories', () => {
  beforeEach(() => {
    inMemoryCategoriesImplementations = new InMemoryCategoriesImplementations();
    listCategoriesUseCase = new ListCategoriesUseCase(
      inMemoryCategoriesImplementations,
    );
  });

  it('should list a all categories', async () => {
    const categoryOne = await inMemoryCategoriesImplementations.create({
      name: 'Category Name 1',
      description: 'Category Description',
    });

    const categoryTwo = await inMemoryCategoriesImplementations.create({
      name: 'Category Name 2',
      description: 'Category Description',
    });

    const categoryTreee = await inMemoryCategoriesImplementations.create({
      name: 'Category Name 3',
      description: 'Category Description',
    });

    const categories = await listCategoriesUseCase.execute();

    expect(categories).toEqual([categoryOne, categoryTwo, categoryTreee]);
  });
});
