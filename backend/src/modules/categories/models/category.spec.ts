import { validate } from 'uuid';
import { Category } from './category';

describe('Category Model', () => {
  it('should be able to create an item with all props', () => {
    const category = new Category();

    Object.assign(category, {
      name: 'Name Example',
      description: 'Description Example',
      created_at: new Date(),
      updated_at: new Date(),
    });

    expect(category).toMatchObject({
      name: 'Name Example',
      description: 'Description Example',
    });

    expect(validate(category.id)).toBe(true);
    expect(category.created_at).toBeInstanceOf(Date);
    expect(category.updated_at).toBeInstanceOf(Date);
  });
});
