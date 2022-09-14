import { InMemoryStorageProviderImplementations } from '../../../../shared/providers/storage/in-memory/in-memory-storage-provider';
import { InMemoryUsersImplementations } from '../../repositories/in-memory/in-memory-users-implementations';
import { UploadAvatarUserUseCase } from './upload-avatar-user-usecase';

let inMemoryUsersImplementations: InMemoryUsersImplementations;
let inMemoryStorageProvider: InMemoryStorageProviderImplementations;
let uploadAvatarUserUseCase: UploadAvatarUserUseCase;

describe('Upload Avatar', () => {
  beforeEach(() => {
    inMemoryUsersImplementations = new InMemoryUsersImplementations();
    inMemoryStorageProvider = new InMemoryStorageProviderImplementations();
    uploadAvatarUserUseCase = new UploadAvatarUserUseCase(
      inMemoryUsersImplementations,
      inMemoryStorageProvider,
    );
  });

  it('should upload avatar', async () => {
    const user = await inMemoryUsersImplementations.create({
      name: 'Júnior Silva',
      email: 'junior@hotmail.com',
      cpf: '11122233345',
      password: '123456',
    });

    await uploadAvatarUserUseCase.execute({
      user_id: user.id,
      image: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });
});
