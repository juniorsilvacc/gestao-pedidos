import { AppError } from '../../../../shared/errors/app-error';
import { InMemoryUsersImplementations } from '../../repositories/in-memory/in-memory-users-implementations';
import { DetailsUserUseCase } from './details-user-usecase';

let inMemoryUsersImplementations: InMemoryUsersImplementations;
let detailsUserUseCase: DetailsUserUseCase;

describe('Details User', () => {
  beforeEach(() => {
    inMemoryUsersImplementations = new InMemoryUsersImplementations();
    detailsUserUseCase = new DetailsUserUseCase(inMemoryUsersImplementations);
  });

  it('should be able to detail a user', async () => {
    const user = await inMemoryUsersImplementations.create({
      name: 'Júnior Silva',
      email: 'junior@hotmail.com',
      cpf: '11122233345',
      password: '123456',
    });

    const detail = await detailsUserUseCase.execute({ id: user.id });

    expect(detail).toBe(user);
  });

  it('should not be able to detail a user does not exists', async () => {
    await expect(
      detailsUserUseCase.execute({ id: 'non-existent' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
