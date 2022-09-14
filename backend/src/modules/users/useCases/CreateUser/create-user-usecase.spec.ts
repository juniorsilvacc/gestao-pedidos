import { AppError } from '../../../../shared/errors/app-error';
import { InMemoryBcryptProviderImplementations } from '../../../../shared/providers/bcrypt/in-memory/in-memory-bcrypt-provider';
import { InMemoryMailProviderImplementations } from '../../../../shared/providers/mail/in-memory/in-memory-mail-provider';
import { InMemoryUsersImplementations } from '../../repositories/in-memory/in-memory-users-implementations';
import { CreateUserUseCase } from './create-user-usecase';

let inMemoryUsersImplementations: InMemoryUsersImplementations;
let inMemoryHashProvider: InMemoryBcryptProviderImplementations;
let inMemoryMailProvider: InMemoryMailProviderImplementations;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersImplementations = new InMemoryUsersImplementations();
    inMemoryHashProvider = new InMemoryBcryptProviderImplementations();
    inMemoryMailProvider = new InMemoryMailProviderImplementations();
    createUserUseCase = new CreateUserUseCase(
      inMemoryUsersImplementations,
      inMemoryHashProvider,
      inMemoryMailProvider,
    );
  });

  it('should create a new user', async () => {
    const sendMail = jest.spyOn(inMemoryMailProvider, 'sendMail');

    const user = await createUserUseCase.execute({
      name: 'Júnior Silva',
      email: 'junior@hotmail.com',
      cpf: '11122233345',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to create a new user with email or cpf existing', async () => {
    await createUserUseCase.execute({
      name: 'Júnior Silva',
      email: 'junior@hotmail.com',
      cpf: '11122233345',
      password: '123456',
    });

    await expect(
      createUserUseCase.execute({
        name: 'Test Name',
        email: 'junior@hotmail.com',
        cpf: '11122233345',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
