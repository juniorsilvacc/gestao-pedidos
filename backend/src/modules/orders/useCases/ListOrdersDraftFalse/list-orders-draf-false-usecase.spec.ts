import { InMemoryOrdersImplementations } from '../../repositories/in-memory/in-memory-orders-implementations';
import { ListOrdersDraftFalseUseCase } from './list-orders-draf-false-usecase';

let inMemoryOrdersImplementations: InMemoryOrdersImplementations;
let listOrdersDraftFalseUseCase: ListOrdersDraftFalseUseCase;

describe('List Orders Draft False', () => {
  beforeEach(() => {
    inMemoryOrdersImplementations = new InMemoryOrdersImplementations();
    listOrdersDraftFalseUseCase = new ListOrdersDraftFalseUseCase(
      inMemoryOrdersImplementations,
    );
  });

  it('should list a orders draft false', async () => {
    const orderOne = await inMemoryOrdersImplementations.create({
      name: 'Name Test',
      table: 10,
      status: false,
      draft: false,
    });

    const orderTwo = await inMemoryOrdersImplementations.create({
      name: 'Name Test',
      table: 10,
      status: false,
      draft: false,
    });

    const orderTree = await inMemoryOrdersImplementations.create({
      name: 'Name Test',
      table: 10,
      status: false,
      draft: false,
    });

    const listOrders = await listOrdersDraftFalseUseCase.execute();

    expect(listOrders).toEqual([orderOne, orderTwo, orderTree]);
  });
});
