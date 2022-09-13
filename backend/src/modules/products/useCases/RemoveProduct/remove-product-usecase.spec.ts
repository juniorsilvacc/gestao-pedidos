import { AppError } from '../../../../shared/errors/app-error';
import { InMemoryProductsImplementations } from '../../repositories/in-memory/in-memory-products-implementations';
import { RemoveProductUseCase } from './remove-product-usecase';

let inMemoryProductsImplementations: InMemoryProductsImplementations;
let removeProductUseCase: RemoveProductUseCase;

describe('Remove Product', () => {
  beforeEach(() => {
    inMemoryProductsImplementations = new InMemoryProductsImplementations();
    removeProductUseCase = new RemoveProductUseCase(
      inMemoryProductsImplementations,
    );
  });

  it('should not be able to remove a product does not exists', async () => {
    await expect(
      removeProductUseCase.execute({ id: 'non-existent' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
