import { validate } from 'uuid';
import { Product } from './product';

describe('Product Model', () => {
  it('should be able to create an product with all props', () => {
    const product = new Product();

    Object.assign(product, {
      name: 'Name Test',
      description: 'Description Test',
      price: 30,
      image: 'imagetest.jpg',
      category_id: '95c1c95f-590f-45dc-b253-699f623e8374',
      created_at: new Date(),
      updated_at: new Date(),
    });

    expect(product).toMatchObject({
      name: 'Name Test',
      description: 'Description Test',
      price: 30,
      image: 'imagetest.jpg',
      category_id: '95c1c95f-590f-45dc-b253-699f623e8374',
    });

    expect(validate(product.id)).toBe(true);
    expect(product.created_at).toBeInstanceOf(Date);
    expect(product.updated_at).toBeInstanceOf(Date);
  });
});
