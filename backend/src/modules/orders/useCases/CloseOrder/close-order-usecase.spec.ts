import { AppError } from '../../../../shared/errors/app-error';
import { InMemoryOrdersImplementations } from '../../repositories/in-memory/in-memory-orders-implementations';
import { CloseOrderUseCase } from './close-order-usecase';

let inMemoryOrdersImplementations: InMemoryOrdersImplementations;
let closeOrderUseCase: CloseOrderUseCase;

describe('Close Order', () => {
  beforeEach(() => {
    inMemoryOrdersImplementations = new InMemoryOrdersImplementations();
    closeOrderUseCase = new CloseOrderUseCase(inMemoryOrdersImplementations);
  });

  it('should not be able to close a order does not exists', async () => {
    await expect(
      closeOrderUseCase.execute({
        id: 'non-existent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should close a order', async () => {
    const order = await inMemoryOrdersImplementations.create({
      name: 'Name Test',
      table: 10,
      status: false,
      draft: false,
    });

    const closeOrder = await closeOrderUseCase.execute({
      id: order.id,
    });

    expect(closeOrder).toBeUndefined();
  });
});
