import { AppError } from '../../../../shared/errors/app-error';
import { InMemoryCacheProviderImplementations } from '../../../../shared/providers/cache/in-memory/in-memory-cache-provider';
import { InMemoryProductsImplementations } from '../../repositories/in-memory/in-memory-products-implementations';
import { UpdateProductUseCase } from './update-product-usecase';

let inMemoryProductsImplementations: InMemoryProductsImplementations;
let inMemoryCacheProviderImplementations: InMemoryCacheProviderImplementations;
let updateProductUseCase: UpdateProductUseCase;

describe('Update Product', () => {
  beforeEach(() => {
    inMemoryProductsImplementations = new InMemoryProductsImplementations();
    inMemoryCacheProviderImplementations =
      new InMemoryCacheProviderImplementations();
    updateProductUseCase = new UpdateProductUseCase(
      inMemoryProductsImplementations,
      inMemoryCacheProviderImplementations,
    );
  });

  it('should not be able to update a product does not exists', async () => {
    await expect(
      updateProductUseCase.execute({
        id: 'non-existent',
        name: 'Name Test',
        price: 50,
        description: 'Description Test 3',
        image: 'imagetest3.png',
        category_id: 'a9814566-901a-4a33-8615-5b2bcf8c80af',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update name to an already using name', async () => {
    const product = await inMemoryProductsImplementations.create({
      name: 'Name Test',
      price: 50,
      description: 'Description Test',
      image: 'imagetest.png',
      category_id: 'a9814566-901a-4a33-8615-5b2bcf8c80af',
    });

    await expect(
      updateProductUseCase.execute({
        id: product.id,
        name: 'Name Test',
        price: 60,
        description: 'Description Test 2',
        image: 'imagetest 2.png',
        category_id: 'a9814566-901a-4a33-8615-5b2bcf8c80af',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update', async () => {
    const product = await inMemoryProductsImplementations.create({
      name: 'Name Test',
      price: 50,
      description: 'Description Test',
      image: 'imagetest.png',
      category_id: 'a9814566-901a-4a33-8615-5b2bcf8c80af',
    });

    const updateProduct = await updateProductUseCase.execute({
      id: product.id,
      name: 'Name Test Update',
      price: 60,
      description: 'Description Test Update',
      image: 'imagetest.png',
      category_id: 'd19a44ef-45a8-406f-af71-bb5febb5fbfd',
    });

    expect(updateProduct.name).toBe('Name Test Update');
    expect(updateProduct.price).toBe(60);
    expect(updateProduct.description).toBe('Description Test Update');
    expect(updateProduct.category_id).toBe(
      'd19a44ef-45a8-406f-af71-bb5febb5fbfd',
    );
  });
});
