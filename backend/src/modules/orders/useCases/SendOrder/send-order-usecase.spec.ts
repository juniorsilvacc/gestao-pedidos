import { AppError } from '../../../../shared/errors/app-error';
import { InMemoryNotificationsImplementations } from '../../../notifications/repositories/in-memory/in-memory-notifications-implementations';
import { InMemoryOrdersImplementations } from '../../repositories/in-memory/in-memory-orders-implementations';
import { SendOrdersUseCase } from './send-order-usecase';

let inMemoryOrdersImplementations: InMemoryOrdersImplementations;
let inMemoryNotificationsImplementations: InMemoryNotificationsImplementations;
let sendOrdersUseCase: SendOrdersUseCase;

describe('Send Order', () => {
  beforeEach(() => {
    inMemoryOrdersImplementations = new InMemoryOrdersImplementations();
    inMemoryNotificationsImplementations =
      new InMemoryNotificationsImplementations();
    sendOrdersUseCase = new SendOrdersUseCase(
      inMemoryOrdersImplementations,
      inMemoryNotificationsImplementations,
    );
  });

  it('should not be able to send a order does not exists', async () => {
    await expect(
      sendOrdersUseCase.execute({
        order_id: 'non-existent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should send a order', async () => {
    const order = await inMemoryOrdersImplementations.create({
      name: 'Name Test',
      table: 10,
      status: false,
      draft: true,
    });

    const sendOrder = await sendOrdersUseCase.execute({
      order_id: order.id,
    });

    expect(sendOrder.draft).toBe(false);
  });
});
