import { validate } from 'uuid';
import { Item } from './item';

describe('Item Model', () => {
  it('should be able to create an item with all props', () => {
    const item = new Item();

    Object.assign(item, {
      amount: 2,
      order_id: '7f7eab8f-e1ed-47d8-8cba-dc95bd9bf035',
      product_id: 'a9814566-901a-4a33-8615-5b2bcf8c80af',
      created_at: new Date(),
      updated_at: new Date(),
    });

    expect(item).toMatchObject({
      amount: 2,
      order_id: '7f7eab8f-e1ed-47d8-8cba-dc95bd9bf035',
      product_id: 'a9814566-901a-4a33-8615-5b2bcf8c80af',
    });

    expect(validate(item.id)).toBe(true);
    expect(item.created_at).toBeInstanceOf(Date);
    expect(item.updated_at).toBeInstanceOf(Date);
  });
});
