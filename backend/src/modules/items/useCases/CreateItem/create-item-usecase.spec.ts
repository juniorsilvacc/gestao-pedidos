import { InMemoryItemsImplementations } from '../../../items/repositories/in-memory/in-memory-items-implementations';
import { CreateItemUseCase } from './create-item-usecase';

let inMemoryItemsImplementations: InMemoryItemsImplementations;
let createItemUseCase: CreateItemUseCase;

describe('Create Item', () => {
  beforeEach(() => {
    inMemoryItemsImplementations = new InMemoryItemsImplementations();
    createItemUseCase = new CreateItemUseCase(inMemoryItemsImplementations);
  });

  it('should create a new item', async () => {
    const item = await createItemUseCase.execute({
      amount: 2,
      order_id: '7f7eab8f-e1ed-47d8-8cba-dc95bd9bf035',
      product_id: 'a9814566-901a-4a33-8615-5b2bcf8c80af',
    });

    expect(item).toHaveProperty('id');
  });
});
