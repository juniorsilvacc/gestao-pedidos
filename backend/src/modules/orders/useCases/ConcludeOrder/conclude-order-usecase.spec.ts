import { AppError } from '../../../../shared/errors/app-error';
import { InMemoryOrdersImplementations } from '../../repositories/in-memory/in-memory-orders-implementations';
import { ConcludeOrdersUseCase } from './conclude-order-usecase';

let inMemoryOrdersImplementations: InMemoryOrdersImplementations;
let concludeOrdersUseCase: ConcludeOrdersUseCase;

describe('Conclude Order', () => {
  beforeEach(() => {
    inMemoryOrdersImplementations = new InMemoryOrdersImplementations();
    concludeOrdersUseCase = new ConcludeOrdersUseCase(
      inMemoryOrdersImplementations,
    );
  });

  it('should not be able to conclude a order does not exists', async () => {
    expect(
      concludeOrdersUseCase.execute({
        order_id: 'non-existent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
