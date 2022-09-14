import { validate } from 'uuid';
import { Order } from './order';

describe('Order Model', () => {
  it('should be able to create an order with all props', () => {
    const order = new Order();

    Object.assign(order, {
      table: 10,
      status: false,
      draft: true,
      name: 'Name Example',
      created_at: new Date(),
      updated_at: new Date(),
    });

    expect(order).toMatchObject({
      table: 10,
      status: false,
      draft: true,
      name: 'Name Example',
    });

    expect(validate(order.id)).toBe(true);
    expect(order.created_at).toBeInstanceOf(Date);
    expect(order.updated_at).toBeInstanceOf(Date);
  });
});
