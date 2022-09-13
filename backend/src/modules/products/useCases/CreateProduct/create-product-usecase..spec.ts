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
      name: 'Nam Test',
      price: 30,
      description: 'Description Test',
      image: 'imagetest.png',
      category_id: 'a9814566-901a-4a33-8615-5b2bcf8c80af',
    });

    expect(product).toHaveProperty('id');
  });
});
