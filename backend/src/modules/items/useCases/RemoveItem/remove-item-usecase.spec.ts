import { AppError } from '../../../../shared/errors/app-error';
import { InMemoryItemsImplementations } from '../../repositories/in-memory/in-memory-items-implementations';
import { RemoveItemUseCase } from './remove-item-usecase';

let inMemoryItemsImplementations: InMemoryItemsImplementations;
let removeItemUseCase: RemoveItemUseCase;

describe('Remove Item', () => {
  beforeEach(() => {
    inMemoryItemsImplementations = new InMemoryItemsImplementations();
    removeItemUseCase = new RemoveItemUseCase(inMemoryItemsImplementations);
  });

  it('should not be able to remove a item does not exists', async () => {
    await expect(
      removeItemUseCase.execute({
        id: 'non-existent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should remove a item', async () => {
    const item = await inMemoryItemsImplementations.create({
      amount: 2,
      order_id: '7f7eab8f-e1ed-47d8-8cba-dc95bd9bf035',
      product_id: 'a9814566-901a-4a33-8615-5b2bcf8c80af',
    });

    const removeItem = await removeItemUseCase.execute({
      id: item.id,
    });

    expect(removeItem).toBeUndefined();
  });
});
