import { InMemoryBcryptProviderImplementations } from '../../../../shared/providers/bcrypt/in-memory/in-memory-bcrypt-provider';
import { InMemoryUsersImplementations } from '../../repositories/in-memory/in-memory-users-implementations';
import { AuthenticateUserUseCase } from './authenticate-user-usecase';

let inMemoryUsersImplementations: InMemoryUsersImplementations;
let inMemoryHashProvider: InMemoryBcryptProviderImplementations;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUsersImplementations = new InMemoryUsersImplementations();
    inMemoryHashProvider = new InMemoryBcryptProviderImplementations();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersImplementations,
      inMemoryHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await inMemoryUsersImplementations.create({
      name: 'Júnior Silva',
      email: 'junior@hotmail.com',
      cpf: '11122233345',
      password: '123456',
    });

    const response = await authenticateUserUseCase.execute({
      email: 'junior@hotmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.name).toBe(user.name);
    expect(response.email).toBe(user.email);
  });
});
