import { AppError } from '../../../../shared/errors/app-error';
import { InMemoryProductsImplementations } from '../../repositories/in-memory/in-memory-products-implementations';
import { CreateProductUseCase } from './create-product-usecase';

let inMemoryProductsImplementations: InMemoryProductsImplementations;
let createProductUseCase: CreateProductUseCase;

describe('Create Product', () => {
  beforeEach(() => {
    inMemoryProductsImplementations = new InMemoryProductsImplementations();
    createProductUseCase = new CreateProductUseCase(
      inMemoryProductsImplementations,
    );
  });

  it('should create a new product', async () => {
    const product = await createProductUseCase.execute({
      name: 'Name Test',
      price: 30,
      description: 'Description Test',
      image: 'imagetest.png',
      category_id: 'a9814566-901a-4a33-8615-5b2bcf8c80af',
    });

    expect(product).toHaveProperty('id');
  });

  it('shold not be able to create a new product with the same name', async () => {
    await inMemoryProductsImplementations.create({
      name: 'Name Test',
      price: 30,
      description: 'Description Test',
      image: 'imagetest.png',
      category_id: 'a9814566-901a-4a33-8615-5b2bcf8c80af',
    });

    await expect(
      createProductUseCase.execute({
        name: 'Name Test',
        price: 25,
        description: 'Description Test 2',
        image: 'imagetest2.png',
        category_id: 'a9814566-901a-4a33-8615-5b2bcf8c80af',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
