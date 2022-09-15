import { Repository } from 'typeorm';
import { PostgresDataSource } from '../../../../shared/infra/typeorm';
import { ICreateUserDTO } from '../../dtos/create-user-dto';
import { User } from '../../models/user';
import { IUsersRepository } from '../users-repository';

class PostgresUsersImplementations implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(User);
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ id });

    return user;
  }

  async findByCPF(cpf: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ cpf });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ email });

    return user;
  }

  async create({ name, email, cpf, password }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ name, email, cpf, password });

    await this.repository.save(user);

    return user;
  }
}

export { PostgresUsersImplementations };
