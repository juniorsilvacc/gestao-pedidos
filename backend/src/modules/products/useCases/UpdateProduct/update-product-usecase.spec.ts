import { AppError } from '../../../../shared/errors/app-error';
import { InMemoryProductsImplementations } from '../../repositories/in-memory/in-memory-products-implementations';
import { UpdateProductUseCase } from './update-product-usecase';

let inMemoryProductsImplementations: InMemoryProductsImplementations;
let updateProductUseCase: UpdateProductUseCase;

describe('Update Product', () => {
  beforeEach(() => {
    inMemoryProductsImplementations = new InMemoryProductsImplementations();
    updateProductUseCase = new UpdateProductUseCase(
      inMemoryProductsImplementations,
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
});
