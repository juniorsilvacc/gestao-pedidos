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
});
