import { ICreateUserDTO } from '../dtos/create-user-dto';
import { User } from '../models/user';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByCPF(cpf: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}

export { IUsersRepository };
