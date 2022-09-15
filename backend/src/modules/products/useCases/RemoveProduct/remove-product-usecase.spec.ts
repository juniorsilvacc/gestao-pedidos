import { AppError } from '../../../../shared/errors/app-error';
import { InMemoryCacheProviderImplementations } from '../../../../shared/providers/cache/in-memory/in-memory-cache-provider';
import { InMemoryProductsImplementations } from '../../repositories/in-memory/in-memory-products-implementations';
import { RemoveProductUseCase } from './remove-product-usecase';

let inMemoryProductsImplementations: InMemoryProductsImplementations;
let inMemoryCacheProviderImplementations: InMemoryCacheProviderImplementations;
let removeProductUseCase: RemoveProductUseCase;

describe('Remove Product', () => {
  beforeEach(() => {
    inMemoryProductsImplementations = new InMemoryProductsImplementations();
    inMemoryCacheProviderImplementations =
      new InMemoryCacheProviderImplementations();
    removeProductUseCase = new RemoveProductUseCase(
      inMemoryProductsImplementations,
      inMemoryCacheProviderImplementations,
    );
  });

  it('should not be able to remove a product does not exists', async () => {
    await expect(
      removeProductUseCase.execute({ id: 'non-existent' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete a product', async () => {
    const product = await inMemoryProductsImplementations.create({
      name: 'Name Test',
      price: 30,
      description: 'Description Test',
      image: 'imagetest.png',
      category_id: 'a9814566-901a-4a33-8615-5b2bcf8c80af',
    });

    const removeProduct = await removeProductUseCase.execute({
      id: product.id,
    });

    expect(removeProduct).toBeUndefined();
  });
});
