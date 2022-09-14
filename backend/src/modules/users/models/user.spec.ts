import { validate } from 'uuid';
import { User } from './user';

describe('User Model', () => {
  it('should be able to create an user with all props', () => {
    const user = new User();

    Object.assign(user, {
      name: 'Junior',
      email: 'junior@example.com',
      cpf: '32132112332',
      password: '123456',
      isAdmin: false,
      created_at: new Date(),
      updated_at: new Date(),
    });

    expect(user).toMatchObject({
      name: 'Junior',
      email: 'junior@example.com',
      cpf: '32132112332',
      password: '123456',
      isAdmin: false,
    });

    expect(validate(user.id)).toBe(true);
    expect(user.created_at).toBeInstanceOf(Date);
    expect(user.updated_at).toBeInstanceOf(Date);
  });
});
