import { InMemoryOrdersImplementations } from '../../repositories/in-memory/in-memory-orders-implementations';
import { CreateOrderUseCase } from './create-order-usecase';

let inMemoryOrdersImplementations: InMemoryOrdersImplementations;
let createOrderUseCase: CreateOrderUseCase;

describe('Create Order', () => {
  beforeEach(() => {
    inMemoryOrdersImplementations = new InMemoryOrdersImplementations();
    createOrderUseCase = new CreateOrderUseCase(inMemoryOrdersImplementations);
  });

  it('should create a new order', async () => {
    const order = await createOrderUseCase.execute({
      name: 'Name Test',
      table: 10,
      status: false,
      draft: true,
    });

    expect(order).toHaveProperty('id');
  });
});
