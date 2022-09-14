import { AppError } from '../../../../shared/errors/app-error';
import { InMemoryItemsImplementations } from '../../../items/repositories/in-memory/in-memory-items-implementations';
import { ListOrderItemDetailsUseCase } from './list-order-item-details-usecase';

let inMemoryItemsImplementations: InMemoryItemsImplementations;
let listOrderItemDetailsUseCase: ListOrderItemDetailsUseCase;

describe('List Order Item Details', () => {
  beforeEach(() => {
    inMemoryItemsImplementations = new InMemoryItemsImplementations();
    listOrderItemDetailsUseCase = new ListOrderItemDetailsUseCase(
      inMemoryItemsImplementations,
    );
  });

  it('should not be able to list a order does not exists', async () => {
    await expect(
      listOrderItemDetailsUseCase.execute({
        order_id: 'non-existent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
