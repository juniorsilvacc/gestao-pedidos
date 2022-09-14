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

  it('should list order items', async () => {
    const item = await inMemoryItemsImplementations.create({
      amount: 2,
      order_id: '7f7eab8f-e1ed-47d8-8cba-dc95bd9bf035',
      product_id: 'a9814566-901a-4a33-8615-5b2bcf8c80af',
    });

    const listOrdersDetails = await listOrderItemDetailsUseCase.execute({
      order_id: item.id,
    });

    expect(listOrdersDetails).toEqual(item);
  });
});
