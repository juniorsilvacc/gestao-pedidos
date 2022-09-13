import { InMemoryProductsImplementations } from '../../repositories/in-memory/in-memory-products-implementations';
import { ListProductsUseCase } from './list-products-usecase';

let inMemoryProductsImplementations: InMemoryProductsImplementations;
let listProductsUseCase: ListProductsUseCase;

describe('List Products', () => {
  beforeEach(() => {
    inMemoryProductsImplementations = new InMemoryProductsImplementations();
    listProductsUseCase = new ListProductsUseCase(
      inMemoryProductsImplementations,
    );
  });

  it('should list a all products', async () => {
    const productOne = await inMemoryProductsImplementations.create({
      name: 'Name Test 1',
      price: 30,
      description: 'Description Test 1',
      image: 'imagetest1.png',
      category_id: 'a9814566-901a-4a33-8615-5b2bcf8c80af',
    });

    const productTwo = await inMemoryProductsImplementations.create({
      name: 'Name Test 2',
      price: 40,
      description: 'Description Test 2',
      image: 'imagetest2.png',
      category_id: 'a9814566-901a-4a33-8615-5b2bcf8c80af',
    });

    const productTree = await inMemoryProductsImplementations.create({
      name: 'Name Test 3',
      price: 50,
      description: 'Description Test 3',
      image: 'imagetest3.png',
      category_id: 'a9814566-901a-4a33-8615-5b2bcf8c80af',
    });

    const products = await listProductsUseCase.execute();

    expect(products).toEqual([productOne, productTwo, productTree]);
  });
});
