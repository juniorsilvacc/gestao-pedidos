import { ICreateUserDTO } from '../../dtos/create-user-dto';
import { User } from '../../models/user';
import { IUsersRepository } from '../users-repository';

class InMemoryUsersImplementations implements IUsersRepository {
  private users: User[] = [];

  async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      findCategory => findCategory.id === user.id,
    );

    this.users[findIndex] = user;

    return user;
  }

  async create({ name, email, cpf, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { name, email, cpf, password });

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);

    return user || null;
  }

  async findByCPF(cpf: string): Promise<User | null> {
    const user = this.users.find(user => user.cpf === cpf);

    return user || null;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id);

    return user || null;
  }
}

export { InMemoryUsersImplementations };
